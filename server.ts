import express, { Request, Response } from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
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

// German sentence grammar checker, mistake explainer, and alternatives generator
app.post('/api/check-german-sentence', async (req: Request, res: Response): Promise<void> => {
  try {
    const { sentence, targetLevel = 'natural' } = req.body;

    if (!sentence || typeof sentence !== 'string' || !sentence.trim()) {
      res.status(400).json({ error: 'INVALID_INPUT', message: 'Please enter a German sentence to check.' });
      return;
    }

    const trimmed = sentence.trim();
    if (trimmed.length > 2000) {
      res.status(400).json({ error: 'INPUT_TOO_LONG', message: 'Please keep your text under 2000 characters.' });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: 'GEMINI_KEY_MISSING',
        message: 'Gemini API key is not configured on the server. Please check Settings > Secrets.',
      });
      return;
    }

    const levelInstruction =
      targetLevel === 'a1-a2'
        ? 'Focus alternatives on clear, everyday A1-A2 beginner/elementary phrasing.'
        : targetLevel === 'b1-b2'
        ? 'Focus alternatives on polished B1-B2 intermediate/exam-ready German including natural connectors.'
        : 'Provide a practical mix of everyday spoken, polite/formal, and natural B1-B2 alternatives.';

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: `Analyze and correct the following German text written by a learner:\n\n"${trimmed}"\n\n${levelInstruction}`,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        systemInstruction:
          'You are an expert, encouraging German language teacher (DaF A1–B2). Analyze the user\'s German sentence(s). ' +
          'Identify whether the input is already completely correct (`isCorrect`). ' +
          'Provide the natural, grammatically accurate `correctedSentence` preserving the user\'s intended meaning. ' +
          'For every grammar, word order, case, article/gender, auxiliary verb (haben/sein), preposition, spelling, or punctuation issue, add an entry in `mistakes` explaining clearly where it went wrong and why. If `isCorrect` is true, `mistakes` should be an empty array. ' +
          'Always provide 3 to 4 genuinely useful alternative correct ways to write the same idea in `alternatives` (spanning Everyday Spoken, Polite/Formal, Natural B1–B2 Upgrade, or Short & Direct). ' +
          'Always include `nextPracticeChallenge`: assess the CEFR level of the user\'s German sentence (A1, A2, B1, or B2) as `detectedLevel`, and keep `nextLevel` at that **EXACT SAME German CEFR level** (do NOT make the German grammar harder!). Instead, write `englishPrompt` at a **higher, richer, more expressive English level** (advanced/idiomatic English phrasing) that can still be expressed naturally at the user\'s **same German level**, related to the same topic or grammar point (do NOT give the German translation of the challenge sentence). Also include `vocabulary`: ONLY the main verb(s) (base infinitive) and the nouns (with der/die/das article) from that challenge sentence with their English meanings — do NOT list prepositions, conjunctions, adverbs, pronouns, or basic filler words.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: {
              type: Type.BOOLEAN,
              description: 'True if the original German sentence is grammatically and orthographically correct.',
            },
            correctedSentence: {
              type: Type.STRING,
              description: 'The clean, corrected German sentence preserving the original meaning.',
            },
            englishTranslation: {
              type: Type.STRING,
              description: 'Accurate English translation of the corrected sentence.',
            },
            overallFeedback: {
              type: Type.STRING,
              description: 'Brief 1-2 sentence encouraging feedback summarizing the result.',
            },
            mistakes: {
              type: Type.ARRAY,
              description: 'List of specific mistakes found in the original sentence, empty if correct.',
              items: {
                type: Type.OBJECT,
                properties: {
                  wrongPart: {
                    type: Type.STRING,
                    description: 'Exact word or phrase in the original sentence that was incorrect or missing.',
                  },
                  correction: {
                    type: Type.STRING,
                    description: 'What it should be changed to.',
                  },
                  ruleCategory: {
                    type: Type.STRING,
                    description: 'Grammar category, e.g., Word Order (Wortstellung), Case (Dativ/Akkusativ), Verb Auxiliary (haben/sein), Article/Gender, Preposition, Spelling/Capitalization.',
                  },
                  explanation: {
                    type: Type.STRING,
                    description: 'Clear, concise explanation of where it went wrong and the German grammar rule.',
                  },
                },
                required: ['wrongPart', 'correction', 'ruleCategory', 'explanation'],
              },
            },
            alternatives: {
              type: Type.ARRAY,
              description: '3 to 4 other natural and correct ways to express the same idea in German.',
              items: {
                type: Type.OBJECT,
                properties: {
                  style: {
                    type: Type.STRING,
                    description: 'Register or style label, e.g., Everyday Spoken, Polite / Formal (Sie), B1-B2 Upgrade, Short & Direct.',
                  },
                  german: {
                    type: Type.STRING,
                    description: 'The alternative German sentence.',
                  },
                  english: {
                    type: Type.STRING,
                    description: 'English translation or nuance of this alternative.',
                  },
                  whenToUse: {
                    type: Type.STRING,
                    description: 'Short note on when or why a speaker would choose this version.',
                  },
                },
                required: ['style', 'german', 'english', 'whenToUse'],
              },
            },
            nextPracticeChallenge: {
              type: Type.OBJECT,
              description: 'A same-German-level practice prompt written in higher, richer English for the user to translate into German.',
              properties: {
                detectedLevel: {
                  type: Type.STRING,
                  description: 'Detected German CEFR level of the user input, e.g., A1, A2, B1, or B2.',
                },
                nextLevel: {
                  type: Type.STRING,
                  description: 'Target German CEFR level — MUST be the SAME German CEFR level as detectedLevel (do NOT increase German difficulty).',
                },
                englishPrompt: {
                  type: Type.STRING,
                  description: 'An English sentence written in richer, higher-level English whose German translation stays at the same German CEFR level (do not include the German answer here).',
                },
                grammarFocus: {
                  type: Type.STRING,
                  description: 'The grammar structure or vocabulary skill practiced in this challenge.',
                },
                hint: {
                  type: Type.STRING,
                  description: 'A brief hint (e.g. key connector or verb/case tip) without giving away the full German sentence.',
                },
                vocabulary: {
                  type: Type.ARRAY,
                  description: 'ONLY the main verb(s) (infinitive) and the nouns (with der/die/das article) needed for the English challenge sentence. Do NOT include prepositions, adverbs, pronouns, conjunctions, or filler words.',
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      german: {
                        type: Type.STRING,
                        description: 'German noun with article (e.g. der Film, die Schwester) or main verb infinitive (e.g. gehen, einladen).',
                      },
                      english: {
                        type: Type.STRING,
                        description: 'English meaning of this noun or main verb.',
                      },
                      partOfSpeech: {
                        type: Type.STRING,
                        description: 'Either "Noun" or "Verb" only.',
                      },
                    },
                    required: ['german', 'english', 'partOfSpeech'],
                  },
                },
              },
              required: ['detectedLevel', 'nextLevel', 'englishPrompt', 'grammarFocus', 'hint', 'vocabulary'],
            },
          },
          required: ['isCorrect', 'correctedSentence', 'englishTranslation', 'overallFeedback', 'mistakes', 'alternatives', 'nextPracticeChallenge'],
        },
      },
    });

    const jsonText = (response.text ?? '').trim();
    if (!jsonText) {
      res.status(502).json({ error: 'EMPTY_RESPONSE', message: 'No response received from the grammar analyzer.' });
      return;
    }

    const parsed = JSON.parse(jsonText);
    res.json(parsed);
  } catch (err: any) {
    console.error('German sentence check error:', err);
    const errMsg = err?.message || String(err);
    const status = errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED')
      ? 429
      : errMsg.includes('403') || errMsg.includes('PERMISSION_DENIED') || errMsg.includes('API_KEY_INVALID')
      ? 403
      : 500;
    res.status(status).json({
      error: 'SENTENCE_CHECK_FAILED',
      message:
        status === 429
          ? 'API quota reached. Please wait a moment and try again.'
          : status === 403
          ? 'Please verify your Gemini API key in Settings > Secrets.'
          : 'Could not analyze sentence right now. Please try again.',
    });
  }
});

// Conversational German tutor endpoint (sentence correction + grammar Q&A + alternatives)
app.post('/api/german-chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'INVALID_INPUT', message: 'Messages array is required.' });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: 'GEMINI_KEY_MISSING',
        message: 'Gemini API key is not configured on the server. Please check Settings > Secrets.',
      });
      return;
    }

    const contents = messages.slice(-12).map((m: { role: string; text: string }) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: String(m.text || '').slice(0, 2000) }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        systemInstruction:
          'You are a friendly, clear, expert German language teacher (DaF A1–C1). ' +
          'Whenever the user sends German sentence(s): ' +
          '1) **Corrected Sentence**: State whether their sentence is already correct or show the clean corrected German sentence (with brief English translation); ' +
          '2) **Where It Went Wrong**: Explain each exact mistake -> correction and the simple grammar rule (if correct, praise why it works well); ' +
          '3) **Other Correct Ways to Write It**: Give 2–3 natural alternative German phrasings (e.g., everyday spoken, polite/formal, B1–B2 upgrade); ' +
          '4) **Practice Challenge (Same German Level · Higher English)**: ALWAYS finish with ONE English sentence written in **higher, richer, more expressive English** (stronger English vocabulary/phrasing), while keeping the German translation at the **SAME German CEFR level** as the sentence the user just wrote (do NOT increase the German grammar level—for example, if the user wrote A1 German, keep the target German at A1!). Right under that higher-level English sentence, ALWAYS include a **German Vocabulary (Main Verb & Nouns only)** list giving ONLY the main verb(s) (base infinitive) and the nouns (with `der/die/das` articles) and their English meanings — do NOT give meanings of prepositions, conjunctions, adverbs, pronouns, or other small words! Also include a tiny 1-line grammar hint without writing the full German translation of the challenge sentence for them. ' +
          'Never use LaTeX syntax like $\\rightarrow$; use a plain → arrow instead. ' +
          'If the user asks a general grammar or vocabulary question instead of sending a German sentence, answer clearly with examples and still offer a higher-level English sentence (translatable at their same German level) along with ONLY its main verb(s) and nouns.',
      },
    });

    const reply = (response.text ?? '').trim();
    if (!reply) {
      res.status(502).json({ error: 'EMPTY_RESPONSE', message: 'No response received from tutor.' });
      return;
    }

    res.json({ reply });
  } catch (err: any) {
    console.error('German chat error:', err);
    const errMsg = err?.message || String(err);
    const status = errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED')
      ? 429
      : errMsg.includes('403') || errMsg.includes('PERMISSION_DENIED') || errMsg.includes('API_KEY_INVALID')
      ? 403
      : 500;
    res.status(status).json({
      error: 'CHAT_FAILED',
      message:
        status === 429
          ? 'API quota reached. Please wait a moment and try again.'
          : status === 403
          ? 'Please verify your Gemini API key in Settings > Secrets.'
          : 'Could not reply right now. Please try again.',
    });
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
        ws: {
          server: httpServer,
        },
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
