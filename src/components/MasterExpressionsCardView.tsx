import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Bookmark,
  Sparkles,
  ArrowRight,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  LayoutGrid,
  CreditCard,
  CheckCircle2,
  ArrowLeftRight,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { GenericExpressionRow } from './MasterExpressionsTableView';

interface MasterExpressionsCardViewProps {
  title: string;
  themeColor: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose' | 'indigo' | 'sky';
  items: GenericExpressionRow[];
  currentPlayingId: number | null;
  isPlaying: boolean;
  bookmarkedIds: Set<number>;
  onPlaySentence: (text: string, id: number) => void;
  onPlaySnippet: (text: string) => void;
  onToggleBookmark: (id: number) => void;
}

export function MasterExpressionsCardView({
  title,
  themeColor,
  items,
  currentPlayingId,
  isPlaying,
  bookmarkedIds,
  onPlaySentence,
  onPlaySnippet,
  onToggleBookmark,
}: MasterExpressionsCardViewProps) {
  const [cardDisplayMode, setCardDisplayMode] = useState<'grid' | 'flashcard'>('grid');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [autoPlayOnNext, setAutoPlayOnNext] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Keep index within bounds when items change
  useEffect(() => {
    if (currentFlashcardIndex >= items.length) {
      setCurrentFlashcardIndex(0);
    }
    setIsFlipped(false);
  }, [items.length]);

  const currentFlashcard = items[currentFlashcardIndex] || items[0];

  useEffect(() => {
    setIsFlipped(false);
    if (autoPlayOnNext && currentFlashcard) {
      onPlaySnippet(currentFlashcard.mainText);
    }
  }, [currentFlashcardIndex]);

  // Keyboard navigation for flashcard mode & Escape to exit full screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Escape' && isFullScreen) {
        e.preventDefault();
        setIsFullScreen(false);
        return;
      }

      if (cardDisplayMode !== 'flashcard') return;

      if (e.key === 'ArrowRight' || e.key === 'j') {
        e.preventDefault();
        handleNextFlashcard();
      } else if (e.key === 'ArrowLeft' || e.key === 'k') {
        e.preventDefault();
        handlePrevFlashcard();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cardDisplayMode, currentFlashcardIndex, items.length, isFullScreen]);

  const handleNextFlashcard = () => {
    if (items.length === 0) return;
    setCurrentFlashcardIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrevFlashcard = () => {
    if (items.length === 0) return;
    setCurrentFlashcardIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleShuffle = () => {
    if (items.length <= 1) return;
    let nextIdx = Math.floor(Math.random() * items.length);
    if (nextIdx === currentFlashcardIndex) {
      nextIdx = (nextIdx + 1) % items.length;
    }
    setCurrentFlashcardIndex(nextIdx);
  };

  const getThemeStyles = () => {
    switch (themeColor) {
      case 'emerald':
        return {
          accent: 'emerald',
          badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          borderActive: 'border-emerald-500/60 ring-1 ring-emerald-500/40',
          buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20',
        };
      case 'violet':
        return {
          accent: 'violet',
          badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
          borderActive: 'border-violet-500/60 ring-1 ring-violet-500/40',
          buttonBg: 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-500/20',
        };
      case 'amber':
        return {
          accent: 'amber',
          badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          borderActive: 'border-amber-500/60 ring-1 ring-amber-500/40',
          buttonBg: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/20',
        };
      case 'rose':
        return {
          accent: 'rose',
          badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
          borderActive: 'border-rose-500/60 ring-1 ring-rose-500/40',
          buttonBg: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-500/20',
        };
      case 'indigo':
        return {
          accent: 'indigo',
          badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
          borderActive: 'border-indigo-500/60 ring-1 ring-indigo-500/40',
          buttonBg: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20',
        };
      case 'sky':
        return {
          accent: 'sky',
          badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
          borderActive: 'border-sky-500/60 ring-1 ring-sky-500/40',
          buttonBg: 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-500/20',
        };
      default:
        return {
          accent: 'cyan',
          badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
          borderActive: 'border-cyan-500/60 ring-1 ring-cyan-500/40',
          buttonBg: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/20',
        };
    }
  };

  const theme = getThemeStyles();

  if (items.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center">
        <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-1">No items match your filters</h3>
        <p className="text-sm text-slate-400">
          Try clearing your search query or switching category filters.
        </p>
      </div>
    );
  }

  // Pure distraction-free Full Screen View (no headers and no footers)
  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 overflow-y-auto">
        {/* Minimal floating Exit Full Screen control */}
        <button
          type="button"
          onClick={() => setIsFullScreen(false)}
          className="fixed top-4 right-4 z-[120] flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-bold shadow-lg backdrop-blur-md transition-all cursor-pointer opacity-75 hover:opacity-100"
          title="Exit Full Screen (Esc)"
        >
          <Minimize2 className="w-4 h-4" />
          <span className="hidden sm:inline">Exit Full Screen (Esc)</span>
        </button>

        {cardDisplayMode === 'grid' ? (
          <div className="p-4 sm:p-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {items.map((item) => {
                const isCurrentlyPlaying = currentPlayingId === item.id && isPlaying;
                const cardAccentClass = item.badgeVariant
                  ? item.badgeVariant === 'emerald'
                    ? 'border-emerald-500/40 hover:border-emerald-500/70 bg-gradient-to-b from-emerald-950/20 to-slate-900/90'
                    : item.badgeVariant === 'amber'
                    ? 'border-amber-500/40 hover:border-amber-500/70 bg-gradient-to-b from-amber-950/20 to-slate-900/90'
                    : item.badgeVariant === 'violet'
                    ? 'border-violet-500/40 hover:border-violet-500/70 bg-gradient-to-b from-violet-950/20 to-slate-900/90'
                    : item.badgeVariant === 'cyan'
                    ? 'border-cyan-500/40 hover:border-cyan-500/70 bg-gradient-to-b from-cyan-950/20 to-slate-900/90'
                    : item.badgeVariant === 'rose'
                    ? 'border-rose-500/40 hover:border-rose-500/70 bg-gradient-to-b from-rose-950/20 to-slate-900/90'
                    : item.badgeVariant === 'indigo'
                    ? 'border-indigo-500/40 hover:border-indigo-500/70 bg-gradient-to-b from-indigo-950/20 to-slate-900/90'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/90'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-900/90';

                return (
                  <div
                    key={item.id}
                    className={`border rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-200 ${cardAccentClass}`}
                  >
                    <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 mb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xl font-black text-white tracking-tight">
                            {item.mainText}
                          </div>
                          {item.mainSubtext && (
                            <div className="text-xs text-slate-400 font-medium mt-0.5">
                              {item.mainSubtext}
                            </div>
                          )}
                          <div className="text-sm font-semibold text-cyan-300 mt-1">
                            {item.english}
                          </div>
                        </div>
                        <button
                          onClick={() => onPlaySnippet(item.mainText)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-600 text-cyan-400 hover:text-white transition-all cursor-pointer shrink-0"
                          title="Listen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.contrastText && (
                        <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Opposite / Contrast
                            </div>
                            <div className="text-base font-bold text-amber-300 mt-0.5">
                              {item.contrastText}
                            </div>
                            {item.contrastSubtext && (
                              <div className="text-xs text-slate-300 font-medium">
                                {item.contrastSubtext}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => onPlaySnippet(item.contrastText!)}
                            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-amber-600 text-amber-400 hover:text-white transition-all cursor-pointer shrink-0"
                            title="Listen to opposite"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div
                      className={`rounded-xl p-3.5 border transition-all ${
                        isCurrentlyPlaying
                          ? 'bg-emerald-950/40 border-emerald-500/80'
                          : 'bg-slate-950/40 border-slate-800/70'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-slate-200 leading-relaxed italic">
                          "{item.germanSentence}"
                        </p>
                        <button
                          onClick={() => onPlaySentence(item.germanSentence, item.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 transition-colors shrink-0 cursor-pointer"
                          title="Play sentence"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        {item.englishSentence}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Single Flashcard Full Screen: Zero headers & zero footers */
          currentFlashcard && (
            <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-10 relative">
              {/* Side Floating Prev Arrow */}
              <button
                type="button"
                onClick={handlePrevFlashcard}
                className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[110] p-3 sm:p-4 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/70 shadow-xl backdrop-blur-md transition-all cursor-pointer active:scale-95"
                title="Previous Card (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Pure Card Surface without header or footer */}
              <div
                onClick={() => setIsFlipped((prev) => !prev)}
                className={`w-full max-w-4xl min-h-[70vh] rounded-3xl border-2 p-8 sm:p-14 shadow-2xl flex flex-col justify-center cursor-pointer select-none transition-all duration-300 ${
                  isFlipped
                    ? 'border-cyan-500/60 bg-gradient-to-b from-cyan-950/20 to-slate-900'
                    : 'border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950'
                }`}
              >
                <div className="text-center">
                  {!isFlipped ? (
                    currentFlashcard.contrastText ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                          <div className="bg-slate-950/75 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 text-center">
                            <div className="text-xs uppercase tracking-wider font-bold text-cyan-400 mb-2">
                              Expression 1
                            </div>
                            <div className="flex items-center justify-center gap-3">
                              <h4 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                                {currentFlashcard.mainText}
                              </h4>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onPlaySnippet(currentFlashcard.mainText);
                                }}
                                className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 transition-colors cursor-pointer"
                                title={`Listen to ${currentFlashcard.mainText}`}
                              >
                                <Volume2 className="w-5 h-5" />
                              </button>
                            </div>
                            <p className="text-lg sm:text-xl font-semibold text-cyan-200 mt-3">
                              {currentFlashcard.english}
                            </p>
                            {currentFlashcard.mainSubtext && (
                              <p className="text-sm text-slate-400 mt-1">{currentFlashcard.mainSubtext}</p>
                            )}
                          </div>

                          <div className="bg-slate-950/75 border border-amber-500/30 rounded-2xl p-6 sm:p-8 text-center">
                            <div className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-2">
                              Opposite (Gegenteil)
                            </div>
                            <div className="flex items-center justify-center gap-3">
                              <h4 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                                {currentFlashcard.contrastText}
                              </h4>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onPlaySnippet(currentFlashcard.contrastText!);
                                }}
                                className="p-2 rounded-xl bg-slate-800 hover:bg-amber-500 text-amber-300 hover:text-slate-950 transition-colors cursor-pointer"
                                title={`Listen to ${currentFlashcard.contrastText}`}
                              >
                                <Volume2 className="w-5 h-5" />
                              </button>
                            </div>
                            <p className="text-lg sm:text-xl font-semibold text-amber-200 mt-3">
                              {currentFlashcard.contrastSubtext || 'Opposite meaning'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        <div className="flex items-center justify-center gap-3">
                          <h3 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                            {currentFlashcard.mainText}
                          </h3>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlaySnippet(currentFlashcard.mainText);
                            }}
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 transition-colors cursor-pointer"
                            title="Listen to German"
                          >
                            <Volume2 className="w-6 h-6" />
                          </button>
                        </div>
                        {currentFlashcard.mainSubtext && (
                          <p className="text-base text-slate-400">{currentFlashcard.mainSubtext}</p>
                        )}
                        <p className="text-2xl sm:text-3xl font-semibold text-cyan-300">
                          {currentFlashcard.english}
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="space-y-6 max-w-2xl mx-auto">
                      <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-2xl sm:text-3xl text-white font-bold leading-relaxed">
                            "{currentFlashcard.germanSentence}"
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlaySentence(currentFlashcard.germanSentence, currentFlashcard.id);
                            }}
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 transition-colors shrink-0 cursor-pointer"
                            title="Play German sentence"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-lg sm:text-xl text-slate-300 italic pt-3 border-t border-slate-800/80">
                          "{currentFlashcard.englishSentence}"
                        </p>
                      </div>

                      {currentFlashcard.contrastText && (
                        <div className="text-sm text-slate-400">
                          Opposites: <strong className="text-cyan-300">{currentFlashcard.mainText}</strong> ({currentFlashcard.english}) ↔ <strong className="text-amber-300">{currentFlashcard.contrastText}</strong> ({currentFlashcard.contrastSubtext || 'Opposite'})
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Side Floating Next Arrow */}
              <button
                type="button"
                onClick={handleNextFlashcard}
                className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[110] p-3 sm:p-4 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/70 shadow-xl backdrop-blur-md transition-all cursor-pointer active:scale-95"
                title="Next Card (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sub-header with display style switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/70 border border-slate-800/80 px-4 py-3 rounded-2xl">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-300">Card View Mode:</span>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setCardDisplayMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                cardDisplayMode === 'grid'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All Cards Grid ({items.length})</span>
            </button>
            <button
              onClick={() => setCardDisplayMode('flashcard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                cardDisplayMode === 'flashcard'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Single Flashcard Deck</span>
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-3 flex-wrap">
          <span>
            Showing <strong className="text-white font-mono">{items.length}</strong> cards
          </span>
          {cardDisplayMode === 'flashcard' && (
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-300">
              <input
                type="checkbox"
                checked={autoPlayOnNext}
                onChange={(e) => setAutoPlayOnNext(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-700 text-cyan-500 focus:ring-0 bg-slate-800 cursor-pointer"
              />
              <span>Auto-play audio</span>
            </label>
          )}
          <button
            type="button"
            onClick={() => setIsFullScreen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white font-bold border border-slate-700 transition-colors cursor-pointer"
            title="View cards in Full Screen without headers or footer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Full Screen</span>
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* MODE 1: ALL CARDS GRID VIEW */}
      {/* ---------------------------------------------------- */}
      {cardDisplayMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((item) => {
            const isCurrentlyPlaying = currentPlayingId === item.id && isPlaying;
            const isBookmarked = bookmarkedIds.has(item.id);

            // Card highlight colors based on item.badgeVariant or theme
            const cardAccentClass = item.badgeVariant
              ? item.badgeVariant === 'emerald'
                ? 'border-emerald-500/40 hover:border-emerald-500/70 bg-gradient-to-b from-emerald-950/20 to-slate-900/90'
                : item.badgeVariant === 'amber'
                ? 'border-amber-500/40 hover:border-amber-500/70 bg-gradient-to-b from-amber-950/20 to-slate-900/90'
                : item.badgeVariant === 'violet'
                ? 'border-violet-500/40 hover:border-violet-500/70 bg-gradient-to-b from-violet-950/20 to-slate-900/90'
                : item.badgeVariant === 'cyan'
                ? 'border-cyan-500/40 hover:border-cyan-500/70 bg-gradient-to-b from-cyan-950/20 to-slate-900/90'
                : item.badgeVariant === 'rose'
                ? 'border-rose-500/40 hover:border-rose-500/70 bg-gradient-to-b from-rose-950/20 to-slate-900/90'
                : item.badgeVariant === 'indigo'
                ? 'border-indigo-500/40 hover:border-indigo-500/70 bg-gradient-to-b from-indigo-950/20 to-slate-900/90'
                : 'border-slate-800 hover:border-slate-700 bg-slate-900/90'
              : 'border-slate-800 hover:border-slate-700 bg-slate-900/90';

            return (
              <div
                key={item.id}
                className={`border rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-200 relative group ${cardAccentClass}`}
              >
                {/* Card Top Metadata & Bookmark */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-slate-500 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                        #{item.id}
                      </span>
                      {item.badge && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full border bg-slate-950/90 text-slate-300 border-slate-700/80">
                          {item.badge}
                        </span>
                      )}
                      {item.category && (
                        <span className="text-[11px] text-slate-400 font-medium">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleBookmark(item.id)}
                      className="p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer border border-slate-800"
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark item'}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isBookmarked ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Main German Expression with Audio */}
                  <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80 mb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                          <span>{item.mainText}</span>
                        </div>
                        {item.mainSubtext && (
                          <div className="text-xs text-slate-400 font-medium mt-0.5">
                            {item.mainSubtext}
                          </div>
                        )}
                        <div className="text-sm font-semibold text-cyan-300 mt-1">
                          {item.english}
                        </div>
                      </div>

                      <button
                        onClick={() => onPlaySnippet(item.mainText)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-600 text-cyan-400 hover:text-white transition-all cursor-pointer shadow-sm shrink-0 active:scale-95"
                        title="Listen to German pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Contrast / Nuance Section (Opposites or Special forms) */}
                    {item.contrastText && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-start justify-between gap-2">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Opposite / Contrast
                          </div>
                          <div className="text-sm font-bold text-amber-300 mt-0.5">
                            {item.contrastText}
                          </div>
                          {item.contrastSubtext && (
                            <div className="text-xs text-slate-300 font-medium">
                              {item.contrastSubtext}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => onPlaySnippet(item.contrastText!)}
                          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-amber-600 text-amber-400 hover:text-white transition-all cursor-pointer shadow-sm shrink-0"
                          title="Listen to contrast pronunciation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Example Sentence Card Section */}
                <div
                  className={`rounded-xl p-3 border transition-all ${
                    isCurrentlyPlaying
                      ? 'bg-emerald-950/40 border-emerald-500/80 ring-1 ring-emerald-500/40'
                      : 'bg-slate-950/40 border-slate-800/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Context Sentence
                    </span>
                    <button
                      onClick={() => onPlaySentence(item.germanSentence, item.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm ${
                        isCurrentlyPlaying
                          ? 'bg-emerald-500 text-slate-950 font-black animate-pulse'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white'
                      }`}
                      title="Play German example sentence"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isCurrentlyPlaying ? 'Playing' : 'Listen'}</span>
                    </button>
                  </div>

                  <p className="text-xs font-medium text-slate-200 leading-relaxed italic">
                    "{item.germanSentence}"
                  </p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.englishSentence}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODE 2: SINGLE FLASHCARD FLIP DECK */}
      {/* ---------------------------------------------------- */}
      {cardDisplayMode === 'flashcard' && currentFlashcard && (
        <div className="max-w-2xl mx-auto space-y-5">
          {/* Deck Progress Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-semibold">
              Card <strong className="text-white font-mono">{currentFlashcardIndex + 1}</strong> of{' '}
              <strong className="text-white font-mono">{items.length}</strong>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">
                {Math.round(((currentFlashcardIndex + 1) / items.length) * 100)}% complete
              </span>
              <button
                onClick={handleShuffle}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer border border-slate-700"
                title="Shuffle cards randomly"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>
            </div>
          </div>

          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentFlashcardIndex + 1) / items.length) * 100}%`,
              }}
            />
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => setIsFlipped((prev) => !prev)}
            className={`min-h-[380px] bg-slate-900 border-2 rounded-3xl p-7 shadow-2xl flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden select-none hover:border-slate-600 ${
              isFlipped
                ? 'border-cyan-500/60 bg-gradient-to-b from-cyan-950/20 to-slate-900'
                : 'border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950'
            }`}
          >
            {/* Top Bar on Card */}
            <div className="flex items-center justify-between gap-2 relative z-10">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  #{currentFlashcard.id}
                </span>
                {currentFlashcard.badge && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-slate-950 text-cyan-300 border-cyan-800/50">
                    {currentFlashcard.badge}
                  </span>
                )}
                {currentFlashcard.category && (
                  <span className="text-xs text-slate-400 font-medium">
                    {currentFlashcard.category}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(currentFlashcard.id);
                  }}
                  className="p-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer border border-slate-800"
                  title="Bookmark flashcard"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      bookmarkedIds.has(currentFlashcard.id) ? 'fill-amber-400 text-amber-400' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Card Body: Flip between German front (with both opposites & meanings) and Example sentence back */}
            <div className="py-6 text-center relative z-10">
              {!isFlipped ? (
                /* FRONT OF CARD: BOTH OPPOSITES & THEIR MEANINGS */
                currentFlashcard.contrastText ? (
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      <span>Opposite Pair • Gegenteile</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      {/* Opposite 1 */}
                      <div className="bg-slate-950/70 border border-cyan-500/30 rounded-2xl p-4 text-center">
                        <div className="text-[10px] uppercase tracking-wider font-bold text-cyan-400 mb-1">
                          Expression 1
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            {currentFlashcard.mainText}
                          </h4>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlaySnippet(currentFlashcard.mainText);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 transition-colors cursor-pointer"
                            title={`Listen to ${currentFlashcard.mainText}`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-cyan-200 mt-1">
                          {currentFlashcard.english}
                        </p>
                        {currentFlashcard.mainSubtext && (
                          <p className="text-xs text-slate-400 mt-0.5">{currentFlashcard.mainSubtext}</p>
                        )}
                      </div>

                      {/* Opposite 2 */}
                      <div className="bg-slate-950/70 border border-amber-500/30 rounded-2xl p-4 text-center">
                        <div className="text-[10px] uppercase tracking-wider font-bold text-amber-400 mb-1">
                          Opposite (Gegenteil)
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            {currentFlashcard.contrastText}
                          </h4>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlaySnippet(currentFlashcard.contrastText!);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 text-amber-300 hover:text-slate-950 transition-colors cursor-pointer"
                            title={`Listen to ${currentFlashcard.contrastText}`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-amber-200 mt-1">
                          {currentFlashcard.contrastSubtext || 'Opposite meaning'}
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 pt-2 flex items-center justify-center gap-1.5">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Click card or press Spacebar to see example sentence on opposite side</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      German Expression & Meaning
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {currentFlashcard.mainText}
                    </h3>
                    {currentFlashcard.mainSubtext && (
                      <p className="text-sm text-slate-400">{currentFlashcard.mainSubtext}</p>
                    )}
                    <p className="text-lg font-semibold text-cyan-300">
                      {currentFlashcard.english}
                    </p>

                    <div className="pt-1 flex justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlaySnippet(currentFlashcard.mainText);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 font-bold text-xs transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Listen to German</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 pt-2 flex items-center justify-center gap-1.5">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Click card to reveal example sentence on the opposite side</span>
                    </div>
                  </div>
                )
              ) : (
                /* BACK OF CARD: EXAMPLE CONTEXT SENTENCE IN GERMAN AND ENGLISH */
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    Context Example Sentence • Beispielsatz
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-lg sm:text-xl text-white font-bold leading-relaxed">
                        "{currentFlashcard.germanSentence}"
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlaySentence(currentFlashcard.germanSentence, currentFlashcard.id);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 transition-colors shrink-0 cursor-pointer"
                        title="Play German sentence"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-slate-300 italic pt-2 border-t border-slate-800/80">
                      "{currentFlashcard.englishSentence}"
                    </p>
                  </div>

                  {currentFlashcard.contrastText && (
                    <div className="text-xs text-slate-400">
                      Opposites: <strong className="text-cyan-300">{currentFlashcard.mainText}</strong> ({currentFlashcard.english}) ↔ <strong className="text-amber-300">{currentFlashcard.contrastText}</strong> ({currentFlashcard.contrastSubtext || 'Opposite'})
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Click card to flip back to opposites</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls on Card */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 relative z-10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlaySnippet(currentFlashcard.mainText);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold cursor-pointer"
                >
                  <Volume2 className="w-3 h-3 inline mr-1" />
                  {currentFlashcard.mainText}
                </button>
                {currentFlashcard.contrastText && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaySnippet(currentFlashcard.contrastText!);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3 inline mr-1" />
                    {currentFlashcard.contrastText}
                  </button>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlaySentence(currentFlashcard.germanSentence, currentFlashcard.id);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-semibold cursor-pointer"
                >
                  <Volume2 className="w-3 h-3 inline mr-1" />
                  Sentence
                </button>
              </div>

              <span className="font-medium hidden sm:inline">Spacebar / Click to flip</span>
            </div>
          </div>

          {/* Flashcard Deck Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevFlashcard}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-800 transition-all cursor-pointer active:scale-95 shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setIsFlipped((prev) => !prev)}
              className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-sm border border-slate-700 transition-all cursor-pointer flex items-center gap-2 active:scale-95 shadow-md"
            >
              <RotateCw className="w-4 h-4" />
              <span>Flip Card</span>
            </button>

            <button
              onClick={handleNextFlashcard}
              className={`flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all cursor-pointer active:scale-95 shadow-md ${theme.buttonBg}`}
            >
              <span>Next Card</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
