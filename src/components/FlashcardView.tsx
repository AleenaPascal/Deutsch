import React, { useState, useEffect } from 'react';
import {
  Volume2,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Star,
  Mic,
  Sparkles,
  CheckCircle,
  Clock,
  Layers,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { VocabItem } from '../data/vocabulary';
import { AudioOptions, playSnippet } from '../services/audioService';

interface Props {
  items: VocabItem[];
  currentIndex: number;
  options: AudioOptions;
  bookmarkedIds: Set<number>;
  onSelectIndex: (idx: number) => void;
  onPlayItem: (item: VocabItem) => void;
  onToggleBookmark: (id: number) => void;
  onOpenRecord: (item: VocabItem) => void;
}

export const FlashcardView: React.FC<Props> = ({
  items,
  currentIndex,
  options,
  bookmarkedIds,
  onSelectIndex,
  onPlayItem,
  onToggleBookmark,
  onOpenRecord,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const currentItem = items[currentIndex] || items[0];

  useEffect(() => {
    setIsFlipped(false);
    if (autoPlayAudio && currentItem) {
      onPlayItem(currentItem);
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      onSelectIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectIndex(currentIndex - 1);
    }
  };

  const handleShuffle = () => {
    const randomIdx = Math.floor(Math.random() * items.length);
    onSelectIndex(randomIdx);
  };

  // Keyboard navigation in Full Screen & card flip
  useEffect(() => {
    if (!isFullScreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsFullScreen(false);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentIndex < items.length - 1) onSelectIndex(currentIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) onSelectIndex(currentIndex - 1);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen, currentIndex, items.length]);

  if (!currentItem) {
    return (
      <div className="p-12 text-center text-slate-400">
        No vocabulary items found for this filter.
      </div>
    );
  }

  const isBookmarked = bookmarkedIds.has(currentItem.id);

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center p-4 sm:p-10">
        <button
          type="button"
          onClick={() => setIsFullScreen(false)}
          className="fixed top-4 right-4 z-[120] flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-bold shadow-lg backdrop-blur-md transition-all cursor-pointer opacity-75 hover:opacity-100"
          title="Exit Full Screen (Esc)"
        >
          <Minimize2 className="w-4 h-4" />
          <span className="hidden sm:inline">Exit Full Screen (Esc)</span>
        </button>

        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[110] p-3 sm:p-4 rounded-full bg-slate-900/80 hover:bg-slate-800 disabled:opacity-25 text-slate-300 hover:text-white border border-slate-700/70 shadow-xl backdrop-blur-md transition-all cursor-pointer active:scale-95"
          title="Previous Card (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Pure Card without header or footer */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full max-w-4xl min-h-[70vh] bg-gradient-to-br from-slate-900 to-slate-950 border-2 rounded-3xl p-8 sm:p-14 shadow-2xl relative cursor-pointer select-none transition-all duration-300 flex flex-col justify-center ${
            isBookmarked
              ? 'border-amber-400/70 ring-1 ring-amber-400/30'
              : 'border-slate-700/80 hover:border-amber-500/50'
          }`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(currentItem.id);
            }}
            className={`absolute top-5 right-5 p-2.5 rounded-xl border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border-slate-700/70'
            }`}
            title={isBookmarked ? 'Remove star' : 'Star verb'}
          >
            <Star className={`w-5 h-5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
          {!isFlipped ? (
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                  {currentItem.verb}
                </h2>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayItem(currentItem);
                  }}
                  className="p-3 rounded-2xl bg-slate-800 hover:bg-amber-500 text-amber-400 hover:text-slate-950 transition-all cursor-pointer"
                  title="Listen to audio"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-base sm:text-lg font-mono text-amber-300">
                <span className="text-slate-400 text-sm">Perfekt:</span>
                <span className="font-semibold">{currentItem.perfekt}</span>
              </div>
            </div>
          ) : (
            <div className="text-left max-w-2xl mx-auto w-full space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-3xl sm:text-4xl font-bold text-white">
                  {currentItem.english}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xl sm:text-2xl font-semibold text-amber-200 leading-relaxed">
                    {currentItem.germanSentence}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playSnippet(currentItem.germanSentence, 'de', options);
                    }}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 text-amber-400 hover:text-slate-950 transition-colors shrink-0 cursor-pointer"
                    title="Listen to sentence"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-lg text-slate-300 italic">
                  {currentItem.englishSentence}
                </p>

                {currentItem.note && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-sm text-amber-300/90 leading-relaxed">
                    <span className="font-bold text-amber-400">Grammar Tip: </span>
                    {currentItem.note}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex >= items.length - 1}
          className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[110] p-3 sm:p-4 rounded-full bg-slate-900/80 hover:bg-slate-800 disabled:opacity-25 text-slate-300 hover:text-white border border-slate-700/70 shadow-xl backdrop-blur-md transition-all cursor-pointer active:scale-95"
          title="Next Card (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 py-4">
      {/* Top Deck Stats & Controls */}
      <div className="w-full flex items-center justify-between px-2 text-xs text-slate-400 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-amber-400 font-bold text-sm">
            #{currentItem.id}
          </span>
          <span>Card {currentIndex + 1} of {items.length}</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {currentItem.category}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={autoPlayAudio}
              onChange={(e) => setAutoPlayAudio(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"
            />
            <span>Auto-speak on turn</span>
          </label>

          <button
            onClick={handleShuffle}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            title="Random Card"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Shuffle</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullScreen(true)}
            className="px-2.5 py-1.5 text-amber-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 font-semibold cursor-pointer"
            title="View Card in Full Screen without headers or footer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Full Screen</span>
          </button>
        </div>
      </div>

      {/* Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className={`w-full min-h-[380px] sm:min-h-[420px] bg-gradient-to-br from-slate-900 to-slate-950 border rounded-3xl p-8 sm:p-10 shadow-2xl relative cursor-pointer select-none transition-all duration-300 flex flex-col justify-between group ${
          isBookmarked
            ? 'border-amber-400/70 ring-1 ring-amber-400/30'
            : 'border-slate-700/80 hover:border-amber-500/50'
        }`}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentItem.auxiliary && (
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase border ${
                  currentItem.auxiliary.includes('sein')
                    ? 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                }`}
              >
                Aux: {currentItem.auxiliary}
              </span>
            )}
            {currentItem.isSeparable && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Separable Verb
              </span>
            )}
            {currentItem.isReflexive && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                Reflexive
              </span>
            )}
            {currentItem.preposition && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30">
                Prep: {currentItem.preposition}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onToggleBookmark(currentItem.id)}
              className={`p-2 rounded-xl transition-colors ${
                isBookmarked
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Star className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onOpenRecord(currentItem)}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors"
              title="Practice speaking"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card Main Body */}
        {!isFlipped ? (
          /* FRONT SIDE (German Focus) */
          <div className="my-auto text-center py-6">
            <span className="text-xs font-medium tracking-widest text-slate-500 uppercase">
              German Verb
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-2 mb-4 group-hover:text-amber-300 transition-colors">
              {currentItem.verb}
            </h2>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm font-mono text-amber-300">
              <span className="text-slate-400 text-xs">Perfekt:</span>
              <span className="font-semibold">{currentItem.perfekt}</span>
            </div>

            <p className="mt-8 text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5" />
              Click card or press Space to reveal English & Example sentence
            </p>
          </div>
        ) : (
          /* BACK SIDE (Translation & Sentence) */
          <div className="my-auto text-left py-4">
            <div className="border-b border-slate-800 pb-4 mb-4">
              <span className="text-xs font-medium tracking-widest text-amber-400 uppercase">
                Meaning
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {currentItem.english}
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">
                  German Sentence
                </span>
                <p className="text-lg sm:text-xl font-medium text-amber-200">
                  {currentItem.germanSentence}
                </p>
              </div>

              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">
                  English Translation
                </span>
                <p className="text-base text-slate-300 italic">
                  {currentItem.englishSentence}
                </p>
              </div>

              {currentItem.note && (
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300/90 leading-relaxed">
                  <span className="font-bold text-amber-400">Grammar Tip: </span>
                  {currentItem.note}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Card Footer Actions */}
        <div
          className="flex items-center justify-between pt-4 border-t border-slate-800/80"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPlayItem(currentItem)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all active:scale-95"
            >
              <Volume2 className="w-4 h-4 fill-current" />
              <span>Full Audio</span>
            </button>

            <button
              onClick={() => playSnippet(currentItem.verb, 'de', { ...options, rate: 0.7 })}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors"
              title="Play at 0.7x learner speed"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Slow (0.7x)</span>
            </button>
          </div>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isFlipped ? 'Show Front' : 'Flip'}</span>
          </button>
        </div>
      </div>

      {/* Prev / Next Deck Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-white font-medium text-sm transition-colors border border-slate-700"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span className="text-xs font-mono text-slate-400 px-3">
          {currentIndex + 1} / {items.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentIndex >= items.length - 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-white font-medium text-sm transition-colors border border-slate-700"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
