import React, { useState, useRef } from 'react';
import {
  X,
  Download,
  Sparkles,
  Layers,
  Clock,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  FileAudio,
  Sliders,
} from 'lucide-react';
import { VocabItem, VOCABULARY_LIST } from '../data/vocabulary';
import { A1_VERBS_LIST, A1VerbItem } from '../data/a1Verbs';
import { A2_VERBS_LIST } from '../data/a2Verbs';
import { NOUNS_LIST, NounItem } from '../data/nouns';
import { A1_NOUNS_LIST } from '../data/a1Nouns';
import { A2_NOUNS_LIST } from '../data/a2Nouns';
import { ADJECTIVES_LIST, AdjectiveOppositeItem } from '../data/adjectives';
import { DEGREE_AMOUNT_LIST, DegreeAmountItem } from '../data/degreeAndAmount';
import {
  AudioOptions,
  GeminiVoice,
  ReadMode,
  compileSingleAudioTrack,
  downloadAudioBlob,
} from '../services/audioService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  section?: 'a1-verbs' | 'a2-verbs' | 'a1-nouns' | 'a2-nouns' | 'verbs' | 'nouns' | 'adjectives' | 'degree-amount' | 'master-ref';
  filteredItems: (VocabItem | NounItem | AdjectiveOppositeItem | DegreeAmountItem)[];
  bookmarkedIds: Set<number>;
  defaultOptions: AudioOptions;
}

type ScopeType =
  | 'all'
  | 'sheet1'
  | 'sheet2'
  | 'sheet3'
  | 'sheet4'
  | 'sheet5'
  | 'sheet6'
  | 'separable'
  | 'current'
  | 'starred';

export const AudioCompilerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  section = 'a1-verbs',
  filteredItems,
  bookmarkedIds,
  defaultOptions,
}) => {
  const [selectedScope, setSelectedScope] = useState<ScopeType>('all');
  const [readMode, setReadMode] = useState<ReadMode>(defaultOptions.readMode);
  const [geminiVoice, setGeminiVoice] = useState<GeminiVoice>(defaultOptions.geminiVoice);
  const [pauseMs, setPauseMs] = useState<number>(1000);

  // Compilation state
  const [isCompiling, setIsCompiling] = useState(false);
  const [progressCount, setProgressCount] = useState(0);
  const [progressTotal, setProgressTotal] = useState(0);
  const [currentProcessingVerb, setCurrentProcessingVerb] = useState<string>('');
  const [compiledBlob, setCompiledBlob] = useState<Blob | null>(null);
  const [compiledFileExt, setCompiledFileExt] = useState<string>('wav');
  const [compiledUrl, setCompiledUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const cancelRef = useRef<boolean>(false);

  // Resolve items according to scope and active section
  const targetItems = React.useMemo(() => {
    if (section === 'a1-verbs') {
      switch (selectedScope) {
        case 'sheet1':
          return A1_VERBS_LIST.filter((i) => i.id >= 1 && i.id <= 100);
        case 'sheet2':
          return A1_VERBS_LIST.filter((i) => i.id >= 101 && i.id <= 200);
        case 'sheet3':
          return A1_VERBS_LIST.filter((i) => i.id >= 201 && i.id <= 278);
        case 'separable':
          return A1_VERBS_LIST.filter((i) => i.id >= 236 && i.id <= 278);
        case 'starred':
          return A1_VERBS_LIST.filter((i) => bookmarkedIds.has(i.id));
        case 'current':
          return filteredItems;
        case 'all':
        default:
          return A1_VERBS_LIST;
      }
    } else if (section === 'a2-verbs') {
      switch (selectedScope) {
        case 'sheet1':
          return A2_VERBS_LIST.filter((i) => i.id >= 1 && i.id <= 100);
        case 'sheet2':
          return A2_VERBS_LIST.filter((i) => i.id >= 101 && i.id <= 200);
        case 'sheet3':
          return A2_VERBS_LIST.filter((i) => i.id >= 201 && i.id <= 260);
        case 'starred':
          return A2_VERBS_LIST.filter((i) => bookmarkedIds.has(i.id));
        case 'current':
          return filteredItems;
        case 'all':
        default:
          return A2_VERBS_LIST;
      }
    } else if (section === 'a1-nouns') {
      switch (selectedScope) {
        case 'sheet1':
          return A1_NOUNS_LIST.filter((i) => i.id <= 216);
        case 'sheet2':
          return A1_NOUNS_LIST.filter((i) => i.id >= 217 && i.id <= 396);
        case 'sheet3':
          return A1_NOUNS_LIST.filter((i) => i.id >= 397 && i.id <= 648);
        case 'starred':
          return A1_NOUNS_LIST.filter((i) => bookmarkedIds.has(i.id));
        case 'current':
          return filteredItems;
        case 'all':
        default:
          return A1_NOUNS_LIST;
      }
    } else if (section === 'a2-nouns') {
      switch (selectedScope) {
        case 'sheet1':
          return A2_NOUNS_LIST.filter((i) => i.id >= 1 && i.id <= 100);
        case 'sheet2':
          return A2_NOUNS_LIST.filter((i) => i.id >= 101 && i.id <= 200);
        case 'sheet3':
          return A2_NOUNS_LIST.filter((i) => i.id >= 201 && i.id <= 300);
        case 'sheet4':
          return A2_NOUNS_LIST.filter((i) => i.id >= 301 && i.id <= 400);
        case 'sheet5':
          return A2_NOUNS_LIST.filter((i) => i.id >= 401 && i.id <= 500);
        case 'sheet6':
          return A2_NOUNS_LIST.filter((i) => i.id >= 501 && i.id <= 608);
        case 'starred':
          return A2_NOUNS_LIST.filter((i) => bookmarkedIds.has(i.id));
        case 'current':
          return filteredItems;
        case 'all':
        default:
          return A2_NOUNS_LIST;
      }
    } else if (section === 'nouns') {
      switch (selectedScope) {
        case 'sheet1':
          return NOUNS_LIST.filter((i) => i.id <= 100);
        case 'sheet2':
          return NOUNS_LIST.filter((i) => i.id >= 201 && i.id <= 300);
        case 'sheet3':
          return NOUNS_LIST.filter((i) => i.id >= 301 && i.id <= 400);
        case 'sheet4':
          return NOUNS_LIST.filter((i) => i.id >= 401 && i.id <= 500);
        case 'sheet5':
          return NOUNS_LIST.filter((i) => i.id >= 501 && i.id <= 560);
        case 'starred':
          return NOUNS_LIST.filter((i) => bookmarkedIds.has(i.id));
        case 'current':
          return filteredItems;
        case 'all':
        default:
          return NOUNS_LIST;
      }
    } else if (section === 'adjectives') {
      switch (selectedScope) {
        case 'starred':
          return ADJECTIVES_LIST.filter((i) => bookmarkedIds.has(i.id));
        case 'current':
          return filteredItems;
        case 'all':
        default:
          return ADJECTIVES_LIST;
      }
    } else if (section === 'degree-amount') {
      switch (selectedScope) {
        case 'starred':
          return DEGREE_AMOUNT_LIST.filter((i) => bookmarkedIds.has(i.id));
        case 'current':
          return filteredItems;
        case 'all':
        default:
          return DEGREE_AMOUNT_LIST;
      }
    } else {
      switch (selectedScope) {
        case 'sheet1':
          return VOCABULARY_LIST.filter((i) => i.id >= 1 && i.id <= 100);
        case 'sheet2':
          return VOCABULARY_LIST.filter((i) => i.id >= 101 && i.id <= 200);
        case 'sheet3':
          return VOCABULARY_LIST.filter((i) => i.id >= 201 && i.id <= 309);
        case 'starred':
          return VOCABULARY_LIST.filter((i) => bookmarkedIds.has(i.id));
        case 'current':
          return filteredItems;
        case 'all':
        default:
          return VOCABULARY_LIST;
      }
    }
  }, [section, selectedScope, filteredItems, bookmarkedIds]);

  const handleStartCompilation = async () => {
    if (targetItems.length === 0) {
      setErrorMessage('No vocabulary items found for this selection.');
      return;
    }

    setErrorMessage(null);
    setIsCompiling(true);
    setProgressCount(0);
    setProgressTotal(targetItems.length);
    setCompiledBlob(null);
    if (compiledUrl) {
      URL.revokeObjectURL(compiledUrl);
      setCompiledUrl(null);
    }
    cancelRef.current = false;

    const compileOpts: AudioOptions = {
      engine: 'gemini',
      geminiVoice,
      rate: 1.0,
      readMode,
    };

    try {
      const result = await compileSingleAudioTrack(
        targetItems,
        compileOpts,
        pauseMs,
        (current, total, currentItem) => {
          setProgressCount(current);
          setProgressTotal(total);
          if (currentItem) {
            if ('word1' in currentItem) {
              setCurrentProcessingVerb(`${currentItem.word1} ↔ ${currentItem.word2} (${currentItem.english1})`);
            } else if ('expression' in currentItem) {
              setCurrentProcessingVerb(`${currentItem.expression} ↔ ${currentItem.opposite} (${currentItem.english})`);
            } else if ('verb' in currentItem) {
              setCurrentProcessingVerb(`${currentItem.verb} (${currentItem.english})`);
            } else {
              setCurrentProcessingVerb(`${currentItem.article} ${currentItem.noun} (${currentItem.english})`);
            }
          }
        },
        () => cancelRef.current
      );

      setCompiledBlob(result.blob);
      setCompiledFileExt(result.fileExtension);
      const url = URL.createObjectURL(result.blob);
      setCompiledUrl(url);
    } catch (err: any) {
      if (!cancelRef.current) {
        setErrorMessage(err?.message || 'Compilation failed. Please try again.');
      }
    } finally {
      setIsCompiling(false);
    }
  };

  const handleCancel = () => {
    cancelRef.current = true;
    setIsCompiling(false);
  };

  const handleDownload = () => {
    if (!compiledBlob) return;
    const modeName = readMode === 'full' ? 'complete' : readMode;
    const ext = compiledFileExt || 'mp3';
    const deckPrefix =
      section === 'a1-verbs'
        ? 'german_a1_verbs'
        : section === 'a2-verbs'
        ? 'german_a2_verbs'
        : section === 'a1-nouns'
        ? 'german_a1_nouns'
        : section === 'a2-nouns'
        ? 'german_a2_nouns'
        : section === 'adjectives'
        ? 'german_adjectives_opposites'
        : section === 'degree-amount'
        ? 'german_degree_amount'
        : section === 'nouns'
        ? 'german_b1_nouns'
        : 'german_verbs_b1_b2';
    const filename = `${deckPrefix}_${selectedScope}_${targetItems.length}_items_${modeName}.${ext}`;
    downloadAudioBlob(compiledBlob, filename);
  };

  const handleTogglePreview = () => {
    if (!compiledUrl) return;

    if (!previewAudioRef.current) {
      previewAudioRef.current = new Audio(compiledUrl);
      previewAudioRef.current.onended = () => setIsPlayingPreview(false);
      previewAudioRef.current.onerror = () => setIsPlayingPreview(false);
    } else if (previewAudioRef.current.src !== compiledUrl) {
      previewAudioRef.current.src = compiledUrl;
    }

    if (isPlayingPreview) {
      previewAudioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      previewAudioRef.current.play();
      setIsPlayingPreview(true);
    }
  };

  // Clean up or pause audio preview if modal is closed
  React.useEffect(() => {
    if (!isOpen && previewAudioRef.current) {
      previewAudioRef.current.pause();
      setIsPlayingPreview(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const percent = progressTotal > 0 ? Math.round((progressCount / progressTotal) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative flex flex-col w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
              <FileAudio className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Download Combined Audio Track</span>
                <span className="text-xs font-normal text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  {compiledBlob ? `.${compiledFileExt.toUpperCase()}` : 'Master Track'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Stitches all items and sentences into one seamless master audio file.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (previewAudioRef.current) {
                previewAudioRef.current.pause();
              }
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Scope Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              1. Choose Items to Include ({targetItems.length} selected)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {(section === 'a1-verbs'
                ? [
                    { id: 'all', title: '🌟 All 278 A1 Verbs', subtitle: 'Full Complete Deck' },
                    { id: 'sheet1', title: '📄 Sheet 1 (#1–100)', subtitle: 'machen to husten' },
                    { id: 'sheet2', title: '📄 Sheet 2 (#101–200)', subtitle: 'bewegen to kommunizieren' },
                    { id: 'sheet3', title: '📄 Sheet 3 (#201–278)', subtitle: 'feiern to nachsprechen' },
                    { id: 'separable', title: '⚡ Separable Verbs', subtitle: '#236 to #278 (43 verbs)' },
                    { id: 'current', title: '🎯 Current Filtered', subtitle: `${filteredItems.length} items` },
                    { id: 'starred', title: '⭐ Starred Only', subtitle: `${bookmarkedIds.size} saved items` },
                  ]
                : section === 'a2-verbs'
                ? [
                    { id: 'all', title: `🌟 All ${A2_VERBS_LIST.length} A2 Verbs`, subtitle: 'Complete A2 Verbs Deck' },
                    { id: 'sheet1', title: '📄 Sheet 1 (#1–100)', subtitle: 'vorschlagen to überraschen' },
                    { id: 'sheet2', title: '📄 Sheet 2 (#101–200)', subtitle: 'ausschlafen to sich setzen' },
                    { id: 'sheet3', title: '📄 Sheet 3 (#201–260)', subtitle: 'sich überlegen to verschieben' },
                    { id: 'current', title: '🎯 Current Filtered', subtitle: `${filteredItems.length} items` },
                    { id: 'starred', title: '⭐ Starred Only', subtitle: `${bookmarkedIds.size} saved items` },
                  ]
                : section === 'a1-nouns'
                ? [
                    { id: 'all', title: `🌟 All ${A1_NOUNS_LIST.length} A1 Nouns`, subtitle: 'Complete A1 Nouns Deck' },
                    { id: 'sheet1', title: '📄 Sheet 1 (#1–216)', subtitle: 'Info, Time, City, Food, Shopping' },
                    { id: 'sheet2', title: '📄 Sheet 2 (#217–396)', subtitle: 'Meals, Family, Body, Hospital' },
                    { id: 'sheet3', title: '📄 Sheet 3 (#397–648)', subtitle: 'Housing, Clothing, Travel, Weather' },
                    { id: 'current', title: '🎯 Current Filtered', subtitle: `${filteredItems.length} items` },
                    { id: 'starred', title: '⭐ Starred Only', subtitle: `${bookmarkedIds.size} saved items` },
                  ]
                : section === 'a2-nouns'
                ? [
                    { id: 'all', title: `🌟 All ${A2_NOUNS_LIST.length} A2 Nouns`, subtitle: 'Complete A2 Nouns Deck' },
                    { id: 'sheet1', title: '📄 Sheet 1 (#1–100)', subtitle: 'die Angst to Mathe' },
                    { id: 'sheet2', title: '📄 Sheet 2 (#101–200)', subtitle: 'die Physik to die Grenze' },
                    { id: 'sheet3', title: '📄 Sheet 3 (#201–300)', subtitle: 'der Betrag to Kraftfahrzeug' },
                    { id: 'sheet4', title: '📄 Sheet 4 (#301–400)', subtitle: 'der Pkw to das Klettern' },
                    { id: 'sheet5', title: '📄 Sheet 5 (#401–500)', subtitle: 'der Langlauf to Kätzchen' },
                    { id: 'sheet6', title: '📄 Sheet 6 (#501–608)', subtitle: 'der Vogel to Künstlerin & Appx' },
                    { id: 'current', title: '🎯 Current Filtered', subtitle: `${filteredItems.length} items` },
                    { id: 'starred', title: '⭐ Starred Only', subtitle: `${bookmarkedIds.size} saved items` },
                  ]
                : section === 'nouns'
                ? [
                    { id: 'all', title: '🌟 All 460 B1 Nouns', subtitle: 'Complete Nouns Deck' },
                    { id: 'sheet1', title: '📄 Nouns 1–100', subtitle: 'Sheet 1 (Articles & Plurals)' },
                    { id: 'sheet2', title: '📄 Nouns 201–300', subtitle: 'der Stern to das Rätsel' },
                    { id: 'sheet3', title: '📄 Nouns 301–400', subtitle: 'das Arbeitsamt to Wahrzeichen' },
                    { id: 'sheet4', title: '📄 Nouns 401–500', subtitle: 'das Denkmal to Broschüre' },
                    { id: 'sheet5', title: '📄 Nouns 501–560', subtitle: 'das Büfett to Entscheidung' },
                    { id: 'current', title: '🎯 Current Filtered', subtitle: `${filteredItems.length} items` },
                    { id: 'starred', title: '⭐ Starred Only', subtitle: `${bookmarkedIds.size} saved items` },
                  ]
                : section === 'adjectives'
                ? [
                    { id: 'all', title: `🌟 All ${ADJECTIVES_LIST.length} Adjective Pairs`, subtitle: 'Everyday Opposites Deck' },
                    { id: 'current', title: '🎯 Current Filtered', subtitle: `${filteredItems.length} pairs` },
                    { id: 'starred', title: '⭐ Starred Only', subtitle: `${bookmarkedIds.size} saved pairs` },
                  ]
                : section === 'degree-amount'
                ? [
                    { id: 'all', title: `🌟 All ${DEGREE_AMOUNT_LIST.length} Expressions`, subtitle: 'Degree, Amount & Approx' },
                    { id: 'current', title: '🎯 Current Filtered', subtitle: `${filteredItems.length} items` },
                    { id: 'starred', title: '⭐ Starred Only', subtitle: `${bookmarkedIds.size} saved items` },
                  ]
                : [
                    { id: 'all', title: '🌟 All 309 B1–B2 Verbs', subtitle: 'Full Complete Deck' },
                    { id: 'sheet1', title: '📄 Sheet 1 (#1–100)', subtitle: 'Travel, Tech & Daily' },
                    { id: 'sheet2', title: '📄 Sheet 2 (#101–200)', subtitle: 'Environment & Work' },
                    { id: 'sheet3', title: '📄 Sheet 3 (#201–309)', subtitle: 'Medicine, Law, Motion' },
                    { id: 'current', title: '🎯 Current Filtered', subtitle: `${filteredItems.length} items` },
                    { id: 'starred', title: '⭐ Starred Only', subtitle: `${bookmarkedIds.size} saved items` },
                  ]
              ).map((opt) => (
                <button
                  key={opt.id}
                  disabled={isCompiling}
                  onClick={() => setSelectedScope(opt.id as ScopeType)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedScope === opt.id
                      ? 'bg-amber-500/15 border-amber-500/60 text-white font-bold ring-1 ring-amber-500/30'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-semibold">{opt.title}</div>
                  <div className="text-[10px] text-slate-400 font-normal mt-0.5">{opt.subtitle}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Reading Mode Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              2. Audio Reading Format
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                {
                  id: 'full',
                  label: 'Full Lesson Mode',
                  desc: 'Verb, English meaning, Perfekt, German & English sentences',
                },
                {
                  id: 'immersion',
                  label: 'German Immersion',
                  desc: 'German verb, Perfekt, and German example sentence only',
                },
                {
                  id: 'verb_perfekt',
                  label: 'Verb & Perfekt Drill',
                  desc: 'Rapid memorization drill: Infinitive ➔ Perfekt',
                },
                {
                  id: 'sentences',
                  label: 'Example Sentences',
                  desc: 'German sentence followed by English translation',
                },
              ].map((m) => (
                <button
                  key={m.id}
                  disabled={isCompiling}
                  onClick={() => setReadMode(m.id as ReadMode)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    readMode === m.id
                      ? 'bg-amber-500/15 border-amber-500/60 text-white font-semibold'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-semibold text-amber-300">{m.label}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Voice & Silence Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Voice persona */}
            <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700 text-xs space-y-1.5">
              <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Gemini Neural Voice
              </label>
              <div className="flex items-center gap-1.5">
                {(['Kore', 'Puck', 'Fenrir', 'Zephyr'] as GeminiVoice[]).map((v) => (
                  <button
                    key={v}
                    disabled={isCompiling}
                    onClick={() => setGeminiVoice(v)}
                    className={`flex-1 py-1.5 rounded-lg border text-center transition-colors ${
                      geminiVoice === v
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Pause between items */}
            <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700 text-xs space-y-1.5">
              <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Silence Gap Between Verbs
              </label>
              <div className="flex items-center gap-1.5">
                {[
                  { ms: 500, label: '0.5s' },
                  { ms: 1000, label: '1.0s' },
                  { ms: 1500, label: '1.5s' },
                  { ms: 2000, label: '2.0s' },
                ].map((p) => (
                  <button
                    key={p.ms}
                    disabled={isCompiling}
                    onClick={() => setPauseMs(p.ms)}
                    className={`flex-1 py-1.5 rounded-lg border text-center transition-colors ${
                      pauseMs === p.ms
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error notice */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Compilation Progress Card */}
          {isCompiling && (
            <div className="p-5 rounded-2xl bg-slate-800 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  Generating & Concatenating Audio...
                </span>
                <span className="font-mono text-slate-300">
                  {progressCount} / {progressTotal} ({percent}%)
                </span>
              </div>

              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 h-full transition-all duration-200"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate max-w-sm">
                  Current: {currentProcessingVerb || 'Preparing...'}
                </span>
                <button
                  onClick={handleCancel}
                  className="text-rose-400 hover:text-rose-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Ready to Download State */}
          {compiledBlob && (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Single Unified Audio File Ready!</span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {(compiledBlob.size / (1024 * 1024)).toFixed(1)} MB
                </span>
              </div>

              <p className="text-xs text-slate-300">
                All {targetItems.length} verbs successfully compiled into one continuous .{compiledFileExt.toUpperCase()} audio track with {pauseMs / 1000}s pauses.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleTogglePreview}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2"
                >
                  {isPlayingPreview ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause Preview</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                      <span>Listen to Preview</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownload}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .{compiledFileExt.toUpperCase()} Track</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <button
            onClick={() => {
              if (previewAudioRef.current) previewAudioRef.current.pause();
              onClose();
            }}
            className="px-4 py-2 text-xs text-slate-400 hover:text-white"
          >
            Close
          </button>

          {!compiledBlob && !isCompiling && (
            <button
              onClick={handleStartCompilation}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <FileAudio className="w-4 h-4 fill-current" />
              <span>Compile & Download ({targetItems.length} Verbs)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
