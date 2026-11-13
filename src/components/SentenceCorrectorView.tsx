import React, { useState, useEffect } from 'react';
import {
  SpellCheck,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
  History,
  Trash2,
  Loader2,
  TrendingUp,
  X,
} from 'lucide-react';

interface SentenceMistake {
  wrongPart: string;
  correction: string;
  ruleCategory: string;
  explanation: string;
}

interface SentenceAlternative {
  style: string;
  german: string;
  english: string;
  whenToUse: string;
}

interface ChallengeVocabItem {
  german: string;
  english: string;
  partOfSpeech?: string;
}

interface NextPracticeChallenge {
  detectedLevel: string;
  nextLevel: string;
  englishPrompt: string;
  grammarFocus: string;
  hint: string;
  vocabulary?: ChallengeVocabItem[];
}

export interface SentenceCheckResult {
  isCorrect: boolean;
  correctedSentence: string;
  englishTranslation: string;
  overallFeedback: string;
  mistakes: SentenceMistake[];
  alternatives: SentenceAlternative[];
  nextPracticeChallenge?: NextPracticeChallenge;
}

interface HistoryEntry {
  id: string;
  timestamp: number;
  original: string;
  targetLevel: TargetLevel;
  result: SentenceCheckResult;
}

type TargetLevel = 'natural' | 'a1-a2' | 'b1-b2';

interface SentenceCorrectorViewProps {
  onPlaySnippet: (text: string) => void;
}

const HISTORY_STORAGE_KEY = 'german_sentence_check_history';
const MAX_HISTORY_ITEMS = 8;

const SAMPLE_SENTENCES: { label: string; text: string }[] = [
  {
    label: 'Word order + auxiliary',
    text: 'Gestern ich habe nach Berlin gefahren mit meine Freunde.',
  },
  {
    label: 'Dative / Akkusativ',
    text: 'Ich gebe das Buch zu mein Bruder morgen.',
  },
  {
    label: 'Weil subordinate clause',
    text: 'Ich bleibe zu Hause, weil ich bin sehr müde heute.',
  },
  {
    label: 'Separable verb',
    text: 'Der Zug ankommt um acht Uhr am Hauptbahnhof.',
  },
  {
    label: 'Already correct check',
    text: 'Obwohl es stark geregnet hat, sind wir spazieren gegangen.',
  },
];

const LEVEL_OPTIONS: { id: TargetLevel; label: string; hint: string }[] = [
  { id: 'natural', label: 'Natural Mix', hint: 'Everyday + Polite + B1–B2' },
  { id: 'a1-a2', label: 'A1–A2 Simple', hint: 'Clear elementary phrasing' },
  { id: 'b1-b2', label: 'B1–B2 Exam Ready', hint: 'Polished & expressive' },
];

export function SentenceCorrectorView({ onPlaySnippet }: SentenceCorrectorViewProps) {
  const [inputSentence, setInputSentence] = useState('');
  const [targetLevel, setTargetLevel] = useState<TargetLevel>('natural');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [checkedOriginal, setCheckedOriginal] = useState<string>('');
  const [result, setResult] = useState<SentenceCheckResult | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<NextPracticeChallenge | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch {}
  }, [history]);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev));
      }, 1800);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const runCheck = async (sentenceOverride?: string) => {
    const textToCheck = (sentenceOverride ?? inputSentence).trim();
    if (!textToCheck) {
      setErrorMsg('Please enter a German sentence or short paragraph to check.');
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);
    setCheckedOriginal(textToCheck);

    try {
      const response = await fetch('/api/check-german-sentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sentence: textToCheck,
          targetLevel,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data?.message || 'Could not analyze the sentence. Please try again.');
        setIsLoading(false);
        return;
      }

      const normalized: SentenceCheckResult = {
        isCorrect: Boolean(data.isCorrect),
        correctedSentence: String(data.correctedSentence || textToCheck),
        englishTranslation: String(data.englishTranslation || ''),
        overallFeedback: String(data.overallFeedback || ''),
        mistakes: Array.isArray(data.mistakes) ? data.mistakes : [],
        alternatives: Array.isArray(data.alternatives) ? data.alternatives : [],
        nextPracticeChallenge: data.nextPracticeChallenge?.englishPrompt
          ? {
              detectedLevel: String(data.nextPracticeChallenge.detectedLevel || 'A2'),
              nextLevel: String(data.nextPracticeChallenge.nextLevel || 'B1'),
              englishPrompt: String(data.nextPracticeChallenge.englishPrompt),
              grammarFocus: String(data.nextPracticeChallenge.grammarFocus || ''),
              hint: String(data.nextPracticeChallenge.hint || ''),
              vocabulary: Array.isArray(data.nextPracticeChallenge.vocabulary)
                ? data.nextPracticeChallenge.vocabulary
                : [],
            }
          : undefined,
      };

      setResult(normalized);

      const newEntry: HistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: Date.now(),
        original: textToCheck,
        targetLevel,
        result: normalized,
      };

      setHistory((prev) => {
        const filtered = prev.filter(
          (item) => !(item.original === textToCheck && item.targetLevel === targetLevel)
        );
        return [newEntry, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      });
    } catch {
      setErrorMsg('Network error while checking sentence. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isLoading) {
        runCheck();
      }
    }
  };

  const handleLoadSample = (sampleText: string) => {
    setInputSentence(sampleText);
    setErrorMsg(null);
  };

  const handleLoadHistoryItem = (entry: HistoryEntry) => {
    setInputSentence(entry.original);
    setTargetLevel(entry.targetLevel);
    setCheckedOriginal(entry.original);
    setResult(entry.result);
    setErrorMsg(null);
  };

  const handleClear = () => {
    setInputSentence('');
    setResult(null);
    setCheckedOriginal('');
    setErrorMsg(null);
  };

  return (
    <div className="space-y-6">
      {/* Hero / Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
              <SpellCheck className="w-4 h-4" />
              <span>German Grammar & Writing Coach</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">A1 – B2</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Sentence Checker & Alternatives
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Write any German sentence below. Get an instant grammar correction, a clear breakdown of where it went wrong, and 3–4 natural alternative ways to express the same thought.
            </p>
          </div>

          {/* Target Level Selector */}
          <div className="flex flex-col items-start lg:items-end gap-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Alternative Phrasing Style
            </span>
            <div className="flex items-center bg-slate-950/90 p-1 rounded-xl border border-slate-800 flex-wrap gap-1">
              {LEVEL_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTargetLevel(opt.id)}
                  title={opt.hint}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    targetLevel === opt.id
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="german-sentence-input" className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Your German Sentence(s)</span>
          </label>
          <span className="text-xs font-mono text-slate-500">
            {inputSentence.trim().length} / 2000 chars · Ctrl/Cmd + Enter to check
          </span>
        </div>

        {activeChallenge && (
          <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-500/40 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>
                  Practice Challenge · Same German ({activeChallenge.nextLevel}) · Higher English
                  {activeChallenge.grammarFocus ? ` · ${activeChallenge.grammarFocus}` : ''}
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white">
                "{activeChallenge.englishPrompt}"
              </p>
              {activeChallenge.hint && (
                <p className="text-xs text-slate-400">
                  <span className="text-violet-300 font-semibold">Hint:</span> {activeChallenge.hint}
                </p>
              )}
              {activeChallenge.vocabulary && activeChallenge.vocabulary.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {activeChallenge.vocabulary.map((v, idx) => (
                    <button
                      key={`${idx}-${v.german}`}
                      type="button"
                      onClick={() => onPlaySnippet(v.german)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs transition-colors cursor-pointer"
                      title="Click to hear German pronunciation"
                    >
                      <Volume2 className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="font-bold text-white">{v.german}</span>
                      <span className="text-slate-400">({v.english})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setActiveChallenge(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              title="Dismiss challenge prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <textarea
          ref={textareaRef}
          id="german-sentence-input"
          rows={4}
          maxLength={2000}
          value={inputSentence}
          onChange={(e) => setInputSentence(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            activeChallenge
              ? 'Write your German translation for the English challenge above...'
              : 'z.B. Gestern ich habe mit meine Freundin ins Kino gegangen, weil wir wollten ein neuen Film sehen...'
          }
          className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl p-4 text-base text-slate-100 placeholder-slate-500 focus:outline-none transition-all resize-y leading-relaxed"
        />

        {/* Quick Sample Sentences */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500 mr-1">Try an example:</span>
          {SAMPLE_SENTENCES.map((sample) => (
            <button
              key={sample.label}
              type="button"
              onClick={() => handleLoadSample(sample.text)}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              {sample.label}
            </button>
          ))}
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={handleClear}
            disabled={!inputSentence && !result}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            type="button"
            onClick={() => runCheck()}
            disabled={isLoading || !inputSentence.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 text-sm font-black shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing German...</span>
              </>
            ) : (
              <>
                <SpellCheck className="w-4 h-4" />
                <span>Check & Correct Sentence</span>
              </>
            )}
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
            <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Results Panel */}
      {result && (
        <div className="space-y-6">
          {/* 1. Correction Summary */}
          <div
            className={`rounded-3xl border p-6 shadow-xl space-y-5 ${
              result.isCorrect
                ? 'bg-emerald-950/20 border-emerald-500/30'
                : 'bg-slate-900 border-amber-500/30'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {result.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
                )}
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {result.isCorrect ? 'Your Sentence Is Correct!' : 'Corrected German Sentence'}
                  </h3>
                  <p className="text-xs text-slate-400">{result.overallFeedback}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onPlaySnippet(result.correctedSentence)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors cursor-pointer"
                  title="Listen to native German pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(result.correctedSentence, 'corrected')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedKey === 'corrected' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Original Input */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  Original Input
                </div>
                <p
                  className={`text-base leading-relaxed ${
                    result.isCorrect ? 'text-emerald-200 font-medium' : 'text-rose-200/90'
                  }`}
                >
                  {checkedOriginal}
                </p>
              </div>

              {/* Corrected Output */}
              <div className="bg-slate-950/90 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                  {result.isCorrect ? 'Verified Natural Form' : 'Corrected Form'}
                </div>
                <p className="text-lg font-bold text-white leading-relaxed">
                  {result.correctedSentence}
                </p>
                {result.englishTranslation && (
                  <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-2">
                    <span className="text-slate-500 font-semibold mr-1.5">English:</span>
                    {result.englishTranslation}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 2. Where It Went Wrong */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-black text-white">Where It Went Wrong</h3>
                <p className="text-xs text-slate-400">
                  {result.mistakes.length === 0
                    ? 'No grammar, word order, or spelling errors detected.'
                    : `${result.mistakes.length} ${result.mistakes.length === 1 ? 'issue' : 'issues'} identified and explained`}
                </p>
              </div>
            </div>

            {result.mistakes.length === 0 ? (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>
                  Clean grammar and word order! Check the alternative ways below to explore other registers and expressions.
                </span>
              </div>
            ) : (
              <div className="space-y-3">
                {result.mistakes.map((m, idx) => (
                  <div
                    key={`${idx}-${m.wrongPart}`}
                    className="bg-slate-950/80 border border-slate-800 border-l-4 border-l-rose-500 rounded-2xl p-4 space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                        {idx + 1}. {m.ruleCategory}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/25 text-rose-300 line-through font-medium">
                        {m.wrongPart}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                        {m.correction}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">{m.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Other Correct Ways to Write It */}
          {result.alternatives.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-black text-white">Other Correct Ways to Write It</h3>
                <p className="text-xs text-slate-400">
                  Natural alternatives across everyday spoken, formal, and intermediate styles
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.alternatives.map((alt, idx) => {
                  const copyKey = `alt-${idx}`;
                  return (
                    <div
                      key={`${idx}-${alt.style}`}
                      className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between gap-3 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400">
                            {alt.style}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => onPlaySnippet(alt.german)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-amber-400 transition-colors cursor-pointer"
                              title="Listen to this alternative"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopy(alt.german, copyKey)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                              title="Copy sentence"
                            >
                              {copiedKey === copyKey ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <p className="text-base font-bold text-white leading-snug">{alt.german}</p>
                        <p className="text-xs text-slate-400">{alt.english}</p>
                      </div>

                      <div className="text-xs text-slate-400 border-t border-slate-800/80 pt-2">
                        <span className="text-slate-500 font-semibold mr-1">When to use:</span>
                        {alt.whenToUse}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. One Level Harder English Challenge for German Writing Practice */}
          {result.nextPracticeChallenge && (
            <div className="bg-gradient-to-br from-violet-950/30 via-slate-900 to-slate-900 border border-violet-500/35 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-5 h-5 text-violet-400 shrink-0" />
                  <div>
                    <h3 className="text-base font-black text-white">
                      Practice Challenge (Same German Level · Higher English)
                    </h3>
                    <p className="text-xs text-slate-400">
                      German Level:{' '}
                      <strong className="text-violet-300">{result.nextPracticeChallenge.nextLevel}</strong>{' '}
                      (Same level) · Higher English phrasing
                      {result.nextPracticeChallenge.grammarFocus
                        ? ` · Focus: ${result.nextPracticeChallenge.grammarFocus}`
                        : ''}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveChallenge(result.nextPracticeChallenge!);
                    setInputSentence('');
                    setErrorMsg(null);
                    setTimeout(() => {
                      textareaRef.current?.focus();
                      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 50);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-500 hover:bg-violet-400 text-slate-950 text-xs font-black shadow-md shadow-violet-500/20 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Practice Writing This</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-violet-400">
                  Translate this English sentence into German
                </div>
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  "{result.nextPracticeChallenge.englishPrompt}"
                </p>

                {result.nextPracticeChallenge.vocabulary && result.nextPracticeChallenge.vocabulary.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                      German Vocabulary to Use
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {result.nextPracticeChallenge.vocabulary.map((v, idx) => (
                        <button
                          key={`${idx}-${v.german}`}
                          type="button"
                          onClick={() => onPlaySnippet(v.german)}
                          className="text-left p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 transition-colors cursor-pointer flex items-center justify-between gap-2"
                          title="Click to hear pronunciation"
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-white truncate">{v.german}</div>
                            <div className="text-xs text-slate-400 truncate">
                              {v.english}
                              {v.partOfSpeech ? ` · ${v.partOfSpeech}` : ''}
                            </div>
                          </div>
                          <Volume2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {result.nextPracticeChallenge.hint && (
                  <p className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <span className="text-violet-300 font-semibold mr-1">Hint:</span>
                    {result.nextPracticeChallenge.hint}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent Checks History */}
      {history.length > 0 && (
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <History className="w-3.5 h-3.5 text-amber-400" />
              <span>Recent Sentence Checks ({history.length})</span>
            </div>
            <button
              type="button"
              onClick={() => setHistory([])}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear history</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {history.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => handleLoadHistoryItem(entry)}
                className="text-left p-3 rounded-2xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 transition-colors cursor-pointer space-y-1"
              >
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                  <span className={entry.result.isCorrect ? 'text-emerald-400' : 'text-amber-400'}>
                    {entry.result.isCorrect
                      ? 'Correct'
                      : `${entry.result.mistakes.length} ${
                          entry.result.mistakes.length === 1 ? 'fix' : 'fixes'
                        }`}
                  </span>
                  <span className="text-slate-500 uppercase">{entry.targetLevel}</span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-1">{entry.original}</p>
                <p className="text-xs text-emerald-300/90 font-medium line-clamp-1">
                  → {entry.result.correctedSentence}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
