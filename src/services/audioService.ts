/**
 * Audio Service for German Vocabulary Player
 * Supports:
 * 1. Server-Side Gemini 3.8 Flash Lite TTS (/api/tts)
 * 2. Client-Side Browser Web Speech API fallback (SpeechSynthesis)
 * 3. Audio caching, playback state, and single unified audio compilation
 */

import { VocabItem } from '../data/vocabulary';
import { NounItem } from '../data/nouns';
import { AdjectiveOppositeItem } from '../data/adjectives';
import { DegreeAmountItem } from '../data/degreeAndAmount';

export type VoiceEngine = 'gemini' | 'browser';
export type ReadMode = 'full' | 'immersion' | 'verb_perfekt' | 'sentences';
export type GeminiVoice = 'Kore' | 'Puck' | 'Fenrir' | 'Zephyr' | 'Charon';

export interface AudioOptions {
  engine: VoiceEngine;
  geminiVoice: GeminiVoice;
  rate: number; // 0.75 - 1.5
  readMode: ReadMode;
}

// In-memory cache for base64 audio data
const clientAudioCache = new Map<string, string>();

let currentAudioElement: HTMLAudioElement | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;

export function stopAllAudio(): void {
  if (currentAudioElement) {
    currentAudioElement.pause();
    currentAudioElement.currentTime = 0;
    currentAudioElement = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}

export function buildAudioScript(item: VocabItem, mode: ReadMode): { textToSpeak: string; displayText: string } {
  // Replace separable markers like "auf | bauen" -> "aufbauen" for natural speech
  const cleanVerb = item.verb.replace(/\|/g, '').replace(/\s+/g, ' ').trim();

  switch (mode) {
    case 'immersion':
      return {
        textToSpeak: `${cleanVerb}. Perfekt: ${item.perfekt}. Beispielsatz: ${item.germanSentence}`,
        displayText: `${cleanVerb} • ${item.perfekt} • ${item.germanSentence}`,
      };
    case 'verb_perfekt':
      return {
        textToSpeak: `${cleanVerb}. Perfekt: ${item.perfekt}.`,
        displayText: `${cleanVerb} ➔ ${item.perfekt}`,
      };
    case 'sentences':
      return {
        textToSpeak: `${item.germanSentence}. ${item.englishSentence}`,
        displayText: `${item.germanSentence} (${item.englishSentence})`,
      };
    case 'full':
    default:
      return {
        textToSpeak: `${cleanVerb}. ${item.english}. Perfekt: ${item.perfekt}. Beispielsatz: ${item.germanSentence}. ${item.englishSentence}`,
        displayText: `${cleanVerb} (${item.english}) • ${item.perfekt} • ${item.germanSentence}`,
      };
  }
}

export function buildNounAudioScript(item: NounItem, mode: ReadMode): { textToSpeak: string; displayText: string } {
  const pluralText = item.plural && item.plural !== '—' && !item.plural.includes('(Sg.)') 
    ? `Plural: ${item.plural}.` 
    : '';

  switch (mode) {
    case 'immersion':
      return {
        textToSpeak: `${item.article} ${item.noun}. ${pluralText} Beispielsatz: ${item.germanSentence}`,
        displayText: `${item.article} ${item.noun} • ${item.plural} • ${item.germanSentence}`,
      };
    case 'verb_perfekt':
      return {
        textToSpeak: `${item.article} ${item.noun}. ${pluralText}`,
        displayText: `${item.article} ${item.noun} (${item.plural})`,
      };
    case 'sentences':
      return {
        textToSpeak: `${item.germanSentence}. ${item.englishSentence}`,
        displayText: `${item.germanSentence} (${item.englishSentence})`,
      };
    case 'full':
    default:
      return {
        textToSpeak: `${item.article} ${item.noun}. ${item.english}. ${pluralText} Beispielsatz: ${item.germanSentence}. ${item.englishSentence}`,
        displayText: `${item.article} ${item.noun} (${item.english}) • ${item.plural} • ${item.germanSentence}`,
      };
  }
}

export interface AudioDataResult {
  audioBase64: string;
  mimeType: string;
  source?: string;
}

/**
 * Fetch audio data for a single item from server or cache
 */
export async function fetchItemAudio(item: VocabItem, options: AudioOptions): Promise<AudioDataResult> {
  const { textToSpeak } = buildAudioScript(item, options.readMode);
  const cacheKey = `${options.geminiVoice}_${options.readMode}_${item.id}_${textToSpeak}`;

  if (clientAudioCache.has(cacheKey)) {
    const cachedB64 = clientAudioCache.get(cacheKey)!;
    const isWav = cachedB64.startsWith('UklGR');
    return {
      audioBase64: cachedB64,
      mimeType: isWav ? 'audio/wav' : 'audio/mpeg',
    };
  }

  const res = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: textToSpeak,
      voice: options.geminiVoice,
      style: 'Clear, natural native German language teacher pronunciation',
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `TTS failed with status ${res.status}`);
  }

  const data = await res.json();
  if (!data.audioBase64) {
    throw new Error('No audio returned from TTS service');
  }

  clientAudioCache.set(cacheKey, data.audioBase64);
  const isWav = data.mimeType === 'audio/wav' || data.audioBase64.startsWith('UklGR');
  return {
    audioBase64: data.audioBase64,
    mimeType: isWav ? 'audio/wav' : 'audio/mpeg',
    source: data.source,
  };
}

/**
 * Fetch base64 audio string for a single item
 */
export async function fetchItemAudioBase64(item: VocabItem, options: AudioOptions): Promise<string> {
  const result = await fetchItemAudio(item, options);
  return result.audioBase64;
}

/**
 * Play text using Gemini 3.8 Flash Lite TTS or native German audio fallback, with graceful Web Speech API backup
 */
export async function playItemAudio(
  item: VocabItem,
  options: AudioOptions,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): Promise<{ usedEngine: VoiceEngine }> {
  stopAllAudio();

  const { textToSpeak } = buildAudioScript(item, options.readMode);

  if (options.engine === 'gemini') {
    try {
      const audioData = await fetchItemAudio(item, options);
      const audioUrl = `data:${audioData.mimeType};base64,${audioData.audioBase64}`;
      const audio = new Audio(audioUrl);
      audio.playbackRate = options.rate;
      currentAudioElement = audio;

      audio.onplay = () => onStart?.();
      audio.onended = () => {
        currentAudioElement = null;
        onEnd?.();
      };
      audio.onerror = (e) => {
        console.warn('Audio playback error, falling back to Web Speech:', e);
        playWithWebSpeech(textToSpeak, options.rate, onStart, onEnd, onError);
      };

      await audio.play();
      return { usedEngine: 'gemini' };
    } catch (err) {
      console.warn('Audio API failed or unavailable, using Web Speech fallback:', err);
      playWithWebSpeech(textToSpeak, options.rate, onStart, onEnd, onError);
      return { usedEngine: 'browser' };
    }
  } else {
    playWithWebSpeech(textToSpeak, options.rate, onStart, onEnd, onError);
    return { usedEngine: 'browser' };
  }
}

/**
 * Play direct text snippet
 */
export async function playSnippet(
  text: string,
  lang: 'de' | 'en' = 'de',
  options?: Partial<AudioOptions>,
  onEnd?: () => void
): Promise<void> {
  stopAllAudio();
  const clean = text.replace(/\|/g, '').replace(/\s+/g, ' ').trim();

  if (options?.engine === 'gemini') {
    try {
      const cacheKey = `snippet_${options.geminiVoice || 'Kore'}_${clean}`;
      let base64 = clientAudioCache.get(cacheKey);

      if (!base64) {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: clean,
            voice: options.geminiVoice || 'Kore',
          }),
        });
        if (res.ok) {
          const data = await res.json();
          base64 = data.audioBase64;
          if (base64) clientAudioCache.set(cacheKey, base64);
        }
      }

      if (base64) {
        const mime = base64.startsWith('UklGR') ? 'audio/wav' : 'audio/mpeg';
        const audio = new Audio(`data:${mime};base64,${base64}`);
        audio.playbackRate = options.rate || 1.0;
        currentAudioElement = audio;
        audio.onended = () => {
          currentAudioElement = null;
          onEnd?.();
        };
        await audio.play();
        return;
      }
    } catch {
      // Fallback to Web Speech below
    }
  }

  // Web Speech fallback
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = lang === 'de' ? 'de-DE' : 'en-US';
    utterance.rate = options?.rate || 1.0;

    const voices = window.speechSynthesis.getVoices();
    const deVoice = voices.find((v) => v.lang.startsWith('de') && (v.name.includes('Google') || v.name.includes('Natural') || v.default));
    if (deVoice && lang === 'de') utterance.voice = deVoice;

    utterance.onend = () => {
      currentUtterance = null;
      onEnd?.();
    };
    utterance.onerror = () => {
      currentUtterance = null;
      onEnd?.();
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  } else {
    onEnd?.();
  }
}

function playWithWebSpeech(
  text: string,
  rate: number,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onError?.(new Error('Browser speech synthesis is not supported on this device.'));
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = rate;

  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find((v) => v.lang.startsWith('de') && (v.name.includes('Natural') || v.name.includes('Google') || v.default))
    || voices.find((v) => v.lang.startsWith('de'));
  if (preferredVoice) utterance.voice = preferredVoice;

  utterance.onstart = () => onStart?.();
  utterance.onend = () => {
    currentUtterance = null;
    onEnd?.();
  };
  utterance.onerror = (e) => {
    currentUtterance = null;
    onError?.(e);
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

/**
 * Pure client-side merger for base64 WAV chunks
 */
export function mergeWavBase64ListClientSide(wavBase64List: string[], pauseMs = 1000, sampleRate = 24000): Blob {
  const pcmArrays: Uint8Array[] = [];
  const silenceSamples = Math.floor((sampleRate * pauseMs) / 1000);
  const silenceBytes = silenceSamples * 2; // 16-bit mono = 2 bytes/sample
  const silence = new Uint8Array(silenceBytes); // zero-initialized

  for (let i = 0; i < wavBase64List.length; i++) {
    const raw = atob(wavBase64List[i]);
    const bytes = new Uint8Array(raw.length);
    for (let j = 0; j < raw.length; j++) {
      bytes[j] = raw.charCodeAt(j);
    }

    let pcm = bytes;
    // If standard WAV header (starts with "RIFF"), extract PCM after byte 44
    if (bytes.length > 44 && bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
      pcm = bytes.subarray(44);
    }
    pcmArrays.push(pcm);

    if (i < wavBase64List.length - 1 && silenceBytes > 0) {
      pcmArrays.push(silence);
    }
  }

  let totalLength = 0;
  for (const arr of pcmArrays) {
    totalLength += arr.length;
  }

  // 44-byte master WAV header
  const header = new ArrayBuffer(44);
  const view = new DataView(header);
  // "RIFF"
  view.setUint8(0, 0x52); view.setUint8(1, 0x49); view.setUint8(2, 0x46); view.setUint8(3, 0x46);
  view.setUint32(4, 36 + totalLength, true);
  // "WAVE"
  view.setUint8(8, 0x57); view.setUint8(9, 0x41); view.setUint8(10, 0x56); view.setUint8(11, 0x45);
  // "fmt "
  view.setUint8(12, 0x66); view.setUint8(13, 0x6d); view.setUint8(14, 0x74); view.setUint8(15, 0x20);
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // 1 Channel (Mono)
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // Byte rate (24000 * 1 * 2)
  view.setUint16(32, 2, true); // Block align
  view.setUint16(34, 16, true); // 16 bits per sample
  // "data"
  view.setUint8(36, 0x64); view.setUint8(37, 0x61); view.setUint8(38, 0x74); view.setUint8(39, 0x61);
  view.setUint32(40, totalLength, true);

  const combined = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of pcmArrays) {
    combined.set(arr, offset);
    offset += arr.length;
  }

  return new Blob([header, combined], { type: 'audio/wav' });
}

/**
 * Compile multiple vocabulary or noun items into one single unified audio track
 */
export async function compileSingleAudioTrack(
  items: (VocabItem | NounItem | AdjectiveOppositeItem | DegreeAmountItem)[],
  options: AudioOptions,
  pauseMs: number,
  onProgress?: (completed: number, total: number, currentItem: VocabItem | NounItem | AdjectiveOppositeItem | DegreeAmountItem) => void,
  shouldCancel?: () => boolean
): Promise<{ blob: Blob; mimeType: string; fileExtension: string }> {
  if (items.length === 0) {
    throw new Error('No items to compile');
  }

  // Process in chunks of 25 items so the user gets smooth progress updates
  const CHUNK_SIZE = 25;
  const chunkAudioBlobs: { buffer: ArrayBuffer; isWav: boolean }[] = [];
  let isOverallWav = true;

  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    if (shouldCancel?.()) {
      throw new Error('Compilation canceled by user');
    }

    const chunkItems = items.slice(i, i + CHUNK_SIZE);
    onProgress?.(i, items.length, chunkItems[0]);

    const payload = {
      items: chunkItems.map((item) => ({
        id: item.id,
        text: 'word1' in item
          ? buildAdjectiveAudioScript(item, options.readMode).textToSpeak
          : 'expression' in item
          ? buildDegreeAmountAudioScript(item, options.readMode).textToSpeak
          : 'verb' in item
          ? buildAudioScript(item, options.readMode).textToSpeak
          : buildNounAudioScript(item, options.readMode).textToSpeak,
      })),
      pauseMs,
      voice: options.geminiVoice,
      readMode: options.readMode,
    };

    const res = await fetch('/api/export-single-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Export failed with status ${res.status}`);
    }

    const data = await res.json();
    if (!data.audioBase64) {
      throw new Error('No audio returned from server');
    }

    const isWav = data.fileExtension === 'wav' || data.mimeType === 'audio/wav';
    if (!isWav) isOverallWav = false;

    const raw = atob(data.audioBase64);
    const u8 = new Uint8Array(raw.length);
    for (let k = 0; k < raw.length; k++) {
      u8[k] = raw.charCodeAt(k);
    }
    chunkAudioBlobs.push({ buffer: u8.buffer as ArrayBuffer, isWav });

    onProgress?.(Math.min(i + CHUNK_SIZE, items.length), items.length, chunkItems[chunkItems.length - 1]);
  }

  onProgress?.(items.length, items.length, items[items.length - 1]);

  // If all chunks are WAV, merge PCM
  if (isOverallWav) {
    const pcmChunks: Uint8Array[] = [];
    for (const chunk of chunkAudioBlobs) {
      const u8 = new Uint8Array(chunk.buffer);
      // Skip 44-byte RIFF header if present
      const pcm = u8.length > 44 && u8[0] === 0x52 && u8[1] === 0x49 ? u8.subarray(44) : u8;
      pcmChunks.push(pcm);
    }
    let totalLen = 0;
    for (const p of pcmChunks) totalLen += p.length;

    // Header (24000Hz, 16bit, mono)
    const header = new ArrayBuffer(44);
    const view = new DataView(header);
    view.setUint8(0, 0x52); view.setUint8(1, 0x49); view.setUint8(2, 0x46); view.setUint8(3, 0x46);
    view.setUint32(4, 36 + totalLen, true);
    view.setUint8(8, 0x57); view.setUint8(9, 0x41); view.setUint8(10, 0x56); view.setUint8(11, 0x45);
    view.setUint8(12, 0x66); view.setUint8(13, 0x6d); view.setUint8(14, 0x74); view.setUint8(15, 0x20);
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, 24000, true);
    view.setUint32(28, 48000, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    view.setUint8(36, 0x64); view.setUint8(37, 0x61); view.setUint8(38, 0x74); view.setUint8(39, 0x61);
    view.setUint32(40, totalLen, true);

    const combinedPcm = new Uint8Array(totalLen);
    let offset = 0;
    for (const p of pcmChunks) {
      combinedPcm.set(p, offset);
      offset += p.length;
    }

    const finalBlob = new Blob([header, combinedPcm], { type: 'audio/wav' });
    return { blob: finalBlob, mimeType: 'audio/wav', fileExtension: 'wav' };
  } else {
    // MP3 concatenation
    const finalBlob = new Blob(chunkAudioBlobs.map((c) => c.buffer), { type: 'audio/mpeg' });
    return { blob: finalBlob, mimeType: 'audio/mpeg', fileExtension: 'mp3' };
  }
}

/**
 * Trigger download of Blob
 */
export function downloadAudioBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Download audio for a single item (supports .wav and .mp3)
 */
export async function downloadItemWav(item: VocabItem, options: AudioOptions): Promise<void> {
  const result = await fetchItemAudio(item, options);
  const isWav = result.mimeType === 'audio/wav' || result.audioBase64.startsWith('UklGR');
  const ext = isWav ? 'wav' : 'mp3';
  const byteCharacters = atob(result.audioBase64);
  const uint8Array = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    uint8Array[i] = byteCharacters.charCodeAt(i);
  }
  const blob = new Blob([uint8Array], { type: isWav ? 'audio/wav' : 'audio/mpeg' });
  const cleanName = (item.cleanVerb || item.verb).replace(/[^a-zA-Z0-9]/g, '_');
  downloadAudioBlob(blob, `german_${item.id}_${cleanName}.${ext}`);
}

/**
 * Fetch audio for a noun item
 */
export async function fetchNounAudio(item: NounItem, options: AudioOptions): Promise<AudioDataResult> {
  const { textToSpeak } = buildNounAudioScript(item, options.readMode);
  const cacheKey = `noun_${options.geminiVoice}_${options.readMode}_${item.id}_${textToSpeak}`;

  if (clientAudioCache.has(cacheKey)) {
    const cachedB64 = clientAudioCache.get(cacheKey)!;
    const isWav = cachedB64.startsWith('UklGR');
    return {
      audioBase64: cachedB64,
      mimeType: isWav ? 'audio/wav' : 'audio/mpeg',
    };
  }

  const res = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: textToSpeak,
      voice: options.geminiVoice,
      style: 'Clear, natural native German language teacher pronunciation',
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `TTS failed with status ${res.status}`);
  }

  const data = await res.json();
  if (!data.audioBase64) {
    throw new Error('No audio returned from TTS service');
  }

  clientAudioCache.set(cacheKey, data.audioBase64);
  const isWav = data.mimeType === 'audio/wav' || data.audioBase64.startsWith('UklGR');
  return {
    audioBase64: data.audioBase64,
    mimeType: isWav ? 'audio/wav' : 'audio/mpeg',
    source: data.source,
  };
}

/**
 * Play noun audio using Gemini 3.8 Flash Lite TTS with Web Speech fallback
 */
export async function playNounAudio(
  item: NounItem,
  options: AudioOptions,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): Promise<{ usedEngine: VoiceEngine }> {
  stopAllAudio();
  const { textToSpeak } = buildNounAudioScript(item, options.readMode);

  if (options.engine === 'gemini') {
    try {
      const audioData = await fetchNounAudio(item, options);
      const audioUrl = `data:${audioData.mimeType};base64,${audioData.audioBase64}`;
      const audio = new Audio(audioUrl);
      audio.playbackRate = options.rate;
      currentAudioElement = audio;

      audio.onplay = () => onStart?.();
      audio.onended = () => {
        currentAudioElement = null;
        onEnd?.();
      };
      audio.onerror = (e) => {
        console.warn('Audio playback error, falling back to Web Speech:', e);
        playWithWebSpeech(textToSpeak, options.rate, onStart, onEnd, onError);
      };

      await audio.play();
      return { usedEngine: 'gemini' };
    } catch (err) {
      console.warn('Audio API failed or unavailable, using Web Speech fallback:', err);
      playWithWebSpeech(textToSpeak, options.rate, onStart, onEnd, onError);
      return { usedEngine: 'browser' };
    }
  } else {
    playWithWebSpeech(textToSpeak, options.rate, onStart, onEnd, onError);
    return { usedEngine: 'browser' };
  }
}

/**
 * Download audio for a single noun
 */
export async function downloadNounWav(item: NounItem, options: AudioOptions): Promise<void> {
  const result = await fetchNounAudio(item, options);
  const isWav = result.mimeType === 'audio/wav' || result.audioBase64.startsWith('UklGR');
  const ext = isWav ? 'wav' : 'mp3';
  const byteCharacters = atob(result.audioBase64);
  const uint8Array = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    uint8Array[i] = byteCharacters.charCodeAt(i);
  }
  const blob = new Blob([uint8Array], { type: isWav ? 'audio/wav' : 'audio/mpeg' });
  const cleanName = `${item.article}_${item.noun}`.replace(/[^a-zA-Z0-9]/g, '_');
  downloadAudioBlob(blob, `german_noun_${item.id}_${cleanName}.${ext}`);
}

/**
 * Build Audio Script for Adjectives & Opposites
 */
export function buildAdjectiveAudioScript(item: AdjectiveOppositeItem, mode: ReadMode): { textToSpeak: string; displayText: string } {
  switch (mode) {
    case 'verb_perfekt':
      return {
        textToSpeak: `${item.word1}. Das Gegenteil ist: ${item.word2}.`,
        displayText: `${item.word1} ↔ ${item.word2}`,
      };
    case 'sentences':
      return {
        textToSpeak: `${item.germanSentence}. ${item.englishSentence}`,
        displayText: `${item.germanSentence} (${item.englishSentence})`,
      };
    case 'immersion':
      return {
        textToSpeak: `${item.word1}. ${item.word2}. ${item.germanSentence}`,
        displayText: `${item.word1} ↔ ${item.word2} • ${item.germanSentence}`,
      };
    case 'full':
    default:
      return {
        textToSpeak: `${item.word1}. Auf Englisch: ${item.english1}. Das Gegenteil ist: ${item.word2}. Auf Englisch: ${item.english2}. Beispielsatz: ${item.germanSentence}.`,
        displayText: `${item.word1} (${item.english1}) ↔ ${item.word2} (${item.english2}) • ${item.germanSentence}`,
      };
  }
}

export async function fetchAdjectiveAudio(item: AdjectiveOppositeItem, options: AudioOptions): Promise<AudioDataResult> {
  const { textToSpeak } = buildAdjectiveAudioScript(item, options.readMode);
  const cacheKey = `adj_${options.geminiVoice}_${options.readMode}_${item.id}_${textToSpeak}`;

  if (clientAudioCache.has(cacheKey)) {
    const cachedB64 = clientAudioCache.get(cacheKey)!;
    const isWav = cachedB64.startsWith('UklGR');
    return {
      audioBase64: cachedB64,
      mimeType: isWav ? 'audio/wav' : 'audio/mpeg',
    };
  }

  const res = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: textToSpeak,
      voice: options.geminiVoice,
      style: 'Clear, natural native German language teacher pronunciation',
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `TTS failed with status ${res.status}`);
  }

  const data = await res.json();
  clientAudioCache.set(cacheKey, data.audioBase64);
  const isWav = data.mimeType === 'audio/wav' || data.audioBase64.startsWith('UklGR');
  return {
    audioBase64: data.audioBase64,
    mimeType: isWav ? 'audio/wav' : 'audio/mpeg',
    source: data.source,
  };
}

export async function playAdjectiveAudio(
  item: AdjectiveOppositeItem,
  options: AudioOptions,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): Promise<{ usedEngine: VoiceEngine }> {
  stopAllAudio();
  const { textToSpeak } = buildAdjectiveAudioScript(item, options.readMode);

  if (options.engine === 'gemini') {
    try {
      const audioData = await fetchAdjectiveAudio(item, options);
      const audioUrl = `data:${audioData.mimeType};base64,${audioData.audioBase64}`;
      const audio = new Audio(audioUrl);
      audio.playbackRate = options.rate;
      currentAudioElement = audio;

      audio.onplay = () => onStart?.();
      audio.onended = () => {
        currentAudioElement = null;
        onEnd?.();
      };
      audio.onerror = (e) => {
        console.warn('Audio playback error, falling back to Web Speech:', e);
        playWithWebSpeech(textToSpeak, options.rate, onStart, onEnd, onError);
      };

      await audio.play();
      return { usedEngine: 'gemini' };
    } catch (err) {
      console.warn('Audio API failed, using Web Speech fallback:', err);
      playWithWebSpeech(textToSpeak, options.rate, onStart, onEnd, onError);
      return { usedEngine: 'browser' };
    }
  } else {
    playWithWebSpeech(textToSpeak, options.rate, onStart, onEnd, onError);
    return { usedEngine: 'browser' };
  }
}

export async function downloadAdjectiveWav(item: AdjectiveOppositeItem, options: AudioOptions): Promise<void> {
  const result = await fetchAdjectiveAudio(item, options);
  const isWav = result.mimeType === 'audio/wav' || result.audioBase64.startsWith('UklGR');
  const ext = isWav ? 'wav' : 'mp3';
  const byteCharacters = atob(result.audioBase64);
  const uint8Array = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    uint8Array[i] = byteCharacters.charCodeAt(i);
  }
  const blob = new Blob([uint8Array], { type: isWav ? 'audio/wav' : 'audio/mpeg' });
  const cleanName = `${item.word1}_vs_${item.word2}`.replace(/[^a-zA-Z0-9]/g, '_');
  downloadAudioBlob(blob, `german_adjective_${item.id}_${cleanName}.${ext}`);
}

/**
 * Build Audio Script for Degree, Amount & Approximation
 */
export function buildDegreeAmountAudioScript(item: DegreeAmountItem, mode: ReadMode): { textToSpeak: string; displayText: string } {
  switch (mode) {
    case 'verb_perfekt':
      return {
        textToSpeak: `${item.expression}. Im Gegensatz dazu: ${item.opposite}.`,
        displayText: `${item.expression} ↔ ${item.opposite}`,
      };
    case 'sentences':
      return {
        textToSpeak: `${item.germanSentence}. ${item.englishSentence}`,
        displayText: `${item.germanSentence} (${item.englishSentence})`,
      };
    case 'immersion':
      return {
        textToSpeak: `${item.expression}. ${item.opposite}. ${item.germanSentence}`,
        displayText: `${item.expression} ↔ ${item.opposite} • ${item.germanSentence}`,
      };
    case 'full':
    default:
      return {
        textToSpeak: `${item.expression}. Auf Englisch: ${item.english}. Im Gegensatz dazu: ${item.opposite}. Auf Englisch: ${item.oppositeEnglish}. Beispielsatz: ${item.germanSentence}.`,
        displayText: `${item.expression} (${item.english}) ↔ ${item.opposite} (${item.oppositeEnglish}) • ${item.germanSentence}`,
      };
  }
}

export async function fetchDegreeAmountAudio(item: DegreeAmountItem, options: AudioOptions): Promise<AudioDataResult> {
  const { textToSpeak } = buildDegreeAmountAudioScript(item, options.readMode);
  const cacheKey = `degree_${options.geminiVoice}_${options.readMode}_${item.id}_${textToSpeak}`;

  if (clientAudioCache.has(cacheKey)) {
    const cachedB64 = clientAudioCache.get(cacheKey)!;
    const isWav = cachedB64.startsWith('UklGR');
    return {
      audioBase64: cachedB64,
      mimeType: isWav ? 'audio/wav' : 'audio/mpeg',
    };
  }

  const res = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: textToSpeak,
      voice: options.geminiVoice,
      style: 'Clear, natural native German language teacher pronunciation',
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `TTS failed with status ${res.status}`);
  }

  const data = await res.json();
  clientAudioCache.set(cacheKey, data.audioBase64);
  const isWav = data.mimeType === 'audio/wav' || data.audioBase64.startsWith('UklGR');
  return {
    audioBase64: data.audioBase64,
    mimeType: isWav ? 'audio/wav' : 'audio/mpeg',
    source: data.source,
  };
}

export async function playDegreeAmountAudio(
  item: DegreeAmountItem,
  options: AudioOptions,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): Promise<{ usedEngine: VoiceEngine }> {
  stopAllAudio();
  const { textToSpeak } = buildDegreeAmountAudioScript(item, options.readMode);

  if (options.engine === 'gemini') {
    try {
      const audioData = await fetchDegreeAmountAudio(item, options);
      const audioUrl = `data:${audioData.mimeType};base64,${audioData.audioBase64}`;
      const audio = new Audio(audioUrl);
      audio.playbackRate = options.rate;
      currentAudioElement = audio;

      audio.onplay = () => onStart?.();
      audio.onended = () => {
        currentAudioElement = null;
        onEnd?.();
      };
      audio.onerror = (e) => {
        console.warn('Audio playback error, falling back to Web Speech:', e);
        playWithWebSpeech(textToSpeak, options.rate, onStart, onEnd, onError);
      };

      await audio.play();
      return { usedEngine: 'gemini' };
    } catch (err) {
      console.warn('Audio API failed, using Web Speech fallback:', err);
      playWithWebSpeech(textToSpeak, options.rate, onStart, onEnd, onError);
      return { usedEngine: 'browser' };
    }
  } else {
    playWithWebSpeech(textToSpeak, options.rate, onStart, onEnd, onError);
    return { usedEngine: 'browser' };
  }
}

export async function downloadDegreeAmountWav(item: DegreeAmountItem, options: AudioOptions): Promise<void> {
  const result = await fetchDegreeAmountAudio(item, options);
  const isWav = result.mimeType === 'audio/wav' || result.audioBase64.startsWith('UklGR');
  const ext = isWav ? 'wav' : 'mp3';
  const byteCharacters = atob(result.audioBase64);
  const uint8Array = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    uint8Array[i] = byteCharacters.charCodeAt(i);
  }
  const blob = new Blob([uint8Array], { type: isWav ? 'audio/wav' : 'audio/mpeg' });
  const cleanName = `${item.expression}_vs_${item.opposite}`.replace(/[^a-zA-Z0-9]/g, '_');
  downloadAudioBlob(blob, `german_degree_${item.id}_${cleanName}.${ext}`);
}


