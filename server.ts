import express, { Request, Response } from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '50mb' }));

// In-memory cache for generated TTS audio to save tokens and provide instant playback
const audioCache = new Map<string, string>();

// Initialize Gemini client if API key is present
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function createWavHeader(dataLength: number, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const buffer = Buffer.alloc(44);

  // RIFF chunk descriptor
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataLength, 4);
  buffer.write('WAVE', 8);

  // "fmt " sub-chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM format
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // "data" sub-chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataLength, 40);

  return buffer;
}

function createSilenceBuffer(durationMs: number, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  const bytesPerSample = bitsPerSample / 8;
  const numSamples = Math.floor((sampleRate * durationMs) / 1000);
  const totalBytes = numSamples * numChannels * bytesPerSample;
  return Buffer.alloc(totalBytes, 0);
}

// Helper function to fetch native German TTS audio as fallback
async function fetchFallbackAudio(text: string, maxRetries = 2): Promise<{ base64: string; mimeType: string }> {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=de&client=tw-ob`;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': '*/*',
        },
      });
      if (!response.ok) {
        throw new Error(`Fallback TTS service returned ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return {
        base64: buffer.toString('base64'),
        mimeType: 'audio/mpeg',
      };
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise((resolve) => setTimeout(resolve, 200 * (attempt + 1)));
    }
  }
  throw new Error('Fallback TTS failed after retries');
}

// Track Gemini quota status to avoid repeating 429 errors when quota is exhausted
let geminiQuotaExhaustedUntil = 0;

// API endpoint for Text-to-Speech using gemini-3.8-flash-lite-tts with automatic native fallback
app.post('/api/tts', async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, voice = 'Kore', style = 'Clear, authentic native German language instructor pronunciation with natural pacing' } = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text parameter is required' });
      return;
    }

    const cacheKey = `${voice}_${style}_${text}`;
    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey)!;
      res.json({
        audioBase64: cached,
        mimeType: cached.startsWith('UklGR') ? 'audio/wav' : 'audio/mpeg',
        cached: true,
      });
      return;
    }

    // Try Gemini TTS first if API key is present and not currently in quota cooldown
    const ai = getGeminiClient();
    if (ai && Date.now() > geminiQuotaExhaustedUntil) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash-lite-tts',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: text,
                  speechMetadata: {
                    style: style,
                  },
                },
              ],
            },
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: voice,
                },
              },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          if (audioCache.size > 500) {
            const firstKey = audioCache.keys().next().value;
            if (firstKey) audioCache.delete(firstKey);
          }
          audioCache.set(cacheKey, base64Audio);

          res.json({
            audioBase64: base64Audio,
            mimeType: 'audio/wav',
            cached: false,
            source: 'gemini',
          });
          return;
        }
      } catch (geminiError: any) {
        const errMsg = geminiError?.message || String(geminiError);
        const isQuota = errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota');
        if (isQuota) {
          geminiQuotaExhaustedUntil = Date.now() + 30 * 60 * 1000;
          console.warn('Gemini 3.8 Flash Lite TTS quota exhausted. Seamlessly activating native German speech audio.');
        } else {
          console.warn('Gemini TTS failed, falling back to native German audio:', errMsg);
        }
      }
    }

    // Fallback: Native German TTS audio
    const fallback = await fetchFallbackAudio(text);
    if (audioCache.size > 500) {
      const firstKey = audioCache.keys().next().value;
      if (firstKey) audioCache.delete(firstKey);
    }
    audioCache.set(cacheKey, fallback.base64);

    res.json({
      audioBase64: fallback.base64,
      mimeType: fallback.mimeType,
      cached: false,
      source: 'native-german-tts',
    });
  } catch (error: any) {
    console.error('All TTS methods failed:', error);
    res.status(500).json({
      error: 'TTS_GENERATION_FAILED',
      message: error?.message || 'Failed to generate speech',
    });
  }
});

// Concatenate multiple base64 WAVs into one single WAV file
app.post('/api/concatenate-wavs', (req: Request, res: Response): void => {
  try {
    const { wavBase64List, pauseMs = 1000 } = req.body;

    if (!Array.isArray(wavBase64List) || wavBase64List.length === 0) {
      res.status(400).json({ error: 'wavBase64List must be a non-empty array' });
      return;
    }

    const silence = createSilenceBuffer(pauseMs, 24000, 1, 16);
    const pcmChunks: Buffer[] = [];

    for (let i = 0; i < wavBase64List.length; i++) {
      const b64 = wavBase64List[i];
      if (!b64) continue;
      const buf = Buffer.from(b64, 'base64');
      // If valid WAV, skip 44-byte RIFF header to isolate raw 16-bit PCM
      let pcm = buf;
      if (buf.length > 44 && buf.toString('ascii', 0, 4) === 'RIFF') {
        pcm = buf.subarray(44);
      }
      pcmChunks.push(pcm);

      // Add silence between items except after the last one
      if (i < wavBase64List.length - 1 && pauseMs > 0) {
        pcmChunks.push(silence);
      }
    }

    const totalPcm = Buffer.concat(pcmChunks);
    const wavHeader = createWavHeader(totalPcm.length, 24000, 1, 16);
    const singleCombinedWav = Buffer.concat([wavHeader, totalPcm]);

    res.json({
      audioBase64: singleCombinedWav.toString('base64'),
      mimeType: 'audio/wav',
      totalBytes: singleCombinedWav.length,
      itemCount: wavBase64List.length,
    });
  } catch (err: any) {
    console.error('Concatenation error:', err);
    res.status(500).json({ error: 'CONCATENATION_FAILED', message: err?.message });
  }
});

// Single-call batch audio compilation endpoint
app.post('/api/export-single-track', async (req: Request, res: Response): Promise<void> => {
  try {
    const { items, pauseMs = 1000, voice = 'Kore', readMode = 'full' } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'items array is required' });
      return;
    }

    console.log(`Export single track: compiling ${items.length} items...`);
    const ai = getGeminiClient();
    let isGeminiQuotaExhausted = Date.now() < geminiQuotaExhaustedUntil;

    // Helper to get audio buffer for one text
    async function getAudioForItem(text: string): Promise<{ buffer: Buffer; isWav: boolean }> {
      const wavCacheKey = `wav_${voice}_${readMode}_${text}`;
      const mp3CacheKey = `mp3_${text}`;

      // Try Gemini TTS first if available and quota not exceeded
      if (ai && !isGeminiQuotaExhausted) {
        if (audioCache.has(wavCacheKey)) {
          const b64 = audioCache.get(wavCacheKey)!;
          const buf = Buffer.from(b64, 'base64');
          return { buffer: buf, isWav: true };
        }

        try {
          const resp = await ai.models.generateContent({
            model: 'gemini-3.8-flash-lite-tts',
            contents: [{ role: 'user', parts: [{ text }] }],
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
            },
          });
          const b64 = resp.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (b64) {
            audioCache.set(wavCacheKey, b64);
            const buf = Buffer.from(b64, 'base64');
            return { buffer: buf, isWav: true };
          }
        } catch (gemErr: any) {
          geminiQuotaExhaustedUntil = Date.now() + 30 * 60 * 1000;
          isGeminiQuotaExhausted = true;
          console.warn('Gemini TTS quota exceeded or failed during batch export, switching to native German audio:', gemErr?.message || gemErr);
        }
      }

      // Native German TTS fallback
      if (audioCache.has(mp3CacheKey)) {
        const b64 = audioCache.get(mp3CacheKey)!;
        return { buffer: Buffer.from(b64, 'base64'), isWav: false };
      }

      try {
        const fallback = await fetchFallbackAudio(text);
        audioCache.set(mp3CacheKey, fallback.base64);
        return { buffer: Buffer.from(fallback.base64, 'base64'), isWav: false };
      } catch (fbErr) {
        console.warn('Fallback audio failed for text:', text, fbErr);
        // Fallback safety: return silent buffer so the whole batch does not fail
        return { buffer: Buffer.alloc(1000, 0), isWav: false };
      }
    }

    // Process in parallel batches of 8 for high speed and resilience
    const BATCH_SIZE = 8;
    const audioResults: { buffer: Buffer; isWav: boolean }[] = [];

    for (let i = 0; i < items.length; i += BATCH_SIZE) {
      const batch = items.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(
        batch.map((it: { text: string }) => getAudioForItem(it.text))
      );
      audioResults.push(...batchResults);
    }

    // Determine format: all WAV or all MP3
    const allWav = !isGeminiQuotaExhausted && audioResults.every((r) => r.isWav);

    if (allWav) {
      const silence = createSilenceBuffer(pauseMs, 24000, 1, 16);
      const pcmChunks: Buffer[] = [];
      for (let i = 0; i < audioResults.length; i++) {
        const buf = audioResults[i].buffer;
        const pcm = buf.length > 44 && buf.toString('ascii', 0, 4) === 'RIFF' ? buf.subarray(44) : buf;
        pcmChunks.push(pcm);
        if (i < audioResults.length - 1 && pauseMs > 0) {
          pcmChunks.push(silence);
        }
      }
      const totalPcm = Buffer.concat(pcmChunks);
      const wavHeader = createWavHeader(totalPcm.length, 24000, 1, 16);
      const finalWav = Buffer.concat([wavHeader, totalPcm]);

      res.json({
        audioBase64: finalWav.toString('base64'),
        mimeType: 'audio/wav',
        fileExtension: 'wav',
        totalItems: items.length,
        sizeBytes: finalWav.length,
      });
      return;
    } else {
      // Ensure all items are MP3 (fetch MP3 if any earlier item was WAV)
      for (let i = 0; i < audioResults.length; i++) {
        if (audioResults[i].isWav) {
          const itemText = items[i].text;
          const mp3Key = `mp3_${itemText}`;
          if (audioCache.has(mp3Key)) {
            audioResults[i] = { buffer: Buffer.from(audioCache.get(mp3Key)!, 'base64'), isWav: false };
          } else {
            try {
              const fb = await fetchFallbackAudio(itemText);
              audioCache.set(mp3Key, fb.base64);
              audioResults[i] = { buffer: Buffer.from(fb.base64, 'base64'), isWav: false };
            } catch {
              // keep existing
            }
          }
        }
      }

      // Concatenate MP3 frames
      const finalMp3 = Buffer.concat(audioResults.map((r) => r.buffer));
      res.json({
        audioBase64: finalMp3.toString('base64'),
        mimeType: 'audio/mpeg',
        fileExtension: 'mp3',
        totalItems: items.length,
        sizeBytes: finalMp3.length,
      });
      return;
    }
  } catch (err: any) {
    console.error('Export single track error:', err);
    res.status(500).json({ error: 'EXPORT_FAILED', message: err?.message });
  }
});

// Health / status endpoint to check Gemini TTS availability
app.get('/api/status', (_req: Request, res: Response) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    hasGeminiKey: hasKey,
    cacheCount: audioCache.size,
  });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  const httpServer = http.createServer(app);

  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
