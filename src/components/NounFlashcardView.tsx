import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Mic,
  Star,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Shuffle,
  Sparkles,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { NounItem, GENDER_CONFIG } from '../data/nouns';

interface NounFlashcardViewProps {
  items: NounItem[];
  bookmarkedIds: Set<number>;
  onToggleBookmark: (id: number) => void;
  onPlayItem: (item: NounItem) => void;
  onRecordItem: (item: NounItem) => void;
  onPlaySnippet: (text: string) => void;
}

export function NounFlashcardView({
  items,
  bookmarkedIds,
  onToggleBookmark,
  onPlayItem,
  onRecordItem,
  onPlaySnippet,
}: NounFlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [items]);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (!isFullScreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsFullScreen(false);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen, items.length]);

  if (items.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <Sparkles className="w-12 h-12 mx-auto text-slate-600 mb-3 animate-pulse" />
        <p className="text-lg font-medium text-slate-300">No nouns match your filters</p>
      </div>
    );
  }

  const currentItem = items[currentIndex] || items[0];
  const isBookmarked = bookmarkedIds.has(currentItem.id);
  const config = GENDER_CONFIG[currentItem.gender];

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * items.length);
    setCurrentIndex(randomIndex);
  };

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
          className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[110] p-3 sm:p-4 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/70 shadow-xl backdrop-blur-md transition-all cursor-pointer active:scale-95"
          title="Previous Noun (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Pure Card without header or footer */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full max-w-4xl min-h-[70vh] rounded-3xl border-2 p-8 sm:p-14 flex flex-col justify-center cursor-pointer select-none transition-all duration-300 shadow-2xl ${
            currentItem.gender === 'feminine'
              ? 'bg-gradient-to-br from-pink-950/40 via-slate-900 to-slate-950 border-pink-500/40 shadow-pink-500/10'
              : currentItem.gender === 'masculine'
                ? 'bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-950 border-blue-500/40 shadow-blue-500/10'
                : 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500/40 shadow-emerald-500/10'
          }`}
        >
          {!isFlipped ? (
            <div className="space-y-6 text-center">
              <div
                className="inline-block px-4 py-1.5 rounded-lg text-base font-bold uppercase tracking-wider border shadow-sm"
                style={{
                  backgroundColor: currentItem.gender === 'feminine' ? 'rgba(236,72,153,0.15)' : currentItem.gender === 'masculine' ? 'rgba(59,130,246,0.15)' : 'rgba(16,185,129,0.15)',
                  color: currentItem.gender === 'feminine' ? '#f472b6' : currentItem.gender === 'masculine' ? '#60a5fa' : '#34d399',
                  borderColor: currentItem.gender === 'feminine' ? 'rgba(236,72,153,0.4)' : currentItem.gender === 'masculine' ? 'rgba(59,130,246,0.4)' : 'rgba(16,185,129,0.4)'
                }}
              >
                {currentItem.article}
              </div>
              <div className="flex items-center justify-center gap-4">
                <h2 className={`text-4xl sm:text-6xl font-black tracking-tight ${config.textClass}`}>
                  {currentItem.noun}
                </h2>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayItem(currentItem);
                  }}
                  className="p-3 rounded-2xl bg-slate-800 hover:bg-amber-500 text-amber-400 hover:text-slate-950 transition-all cursor-pointer"
                  title="Listen audio"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-left max-w-2xl mx-auto w-full">
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-white">
                  {currentItem.english}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <p className="text-xl sm:text-2xl font-mono font-semibold text-amber-300">
                  {currentItem.plural}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xl sm:text-2xl text-slate-200 font-medium leading-relaxed">
                    {currentItem.germanSentence}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaySnippet(currentItem.germanSentence);
                    }}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 text-amber-400 hover:text-slate-950 transition-colors shrink-0 cursor-pointer"
                    title="Listen to sentence"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-base sm:text-lg text-slate-400 italic mt-2">
                  {currentItem.englishSentence}
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[110] p-3 sm:p-4 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/70 shadow-xl backdrop-blur-md transition-all cursor-pointer active:scale-95"
          title="Next Noun (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Controls & Counter */}
      <div className="flex items-center justify-between text-sm text-slate-400 px-2 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-slate-400">
            Card {currentIndex + 1} of {items.length}
          </span>
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" /> Shuffle
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Gender Badge indicator */}
          <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider border ${config.badgeClass}`}>
            {currentItem.article} ({config.label} • {config.colorName})
          </span>
          <button
            onClick={() => onToggleBookmark(currentItem.id)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
            }`}
            title="Bookmark"
          >
            <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() => setIsFullScreen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            title="View Card in Full Screen without headers or footer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Full Screen</span>
          </button>
        </div>
      </div>

      {/* Main Flashcard Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className={`relative min-h-[380px] rounded-3xl border-2 p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-2xl backdrop-blur-xl ${
          currentItem.gender === 'feminine'
            ? 'bg-gradient-to-br from-pink-950/40 via-slate-900 to-slate-950 border-pink-500/40 shadow-pink-500/10'
            : currentItem.gender === 'masculine'
              ? 'bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-950 border-blue-500/40 shadow-blue-500/10'
              : 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500/40 shadow-emerald-500/10'
        }`}
      >
        {/* Top Header inside card */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            #{currentItem.id} • {currentItem.category || 'German B1 Noun'}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
            <RotateCw className="w-3.5 h-3.5 text-slate-400" />
            {isFlipped ? 'Showing Back (Click to flip)' : 'Showing Front (Click to flip)'}
          </span>
        </div>

        {/* Card Body */}
        <div className="my-auto py-6 text-center">
          {!isFlipped ? (
            /* FRONT: Big Noun + Colored Article */
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-md text-sm font-bold uppercase tracking-wider border shadow-sm mb-2"
                style={{
                  backgroundColor: currentItem.gender === 'feminine' ? 'rgba(236,72,153,0.15)' : currentItem.gender === 'masculine' ? 'rgba(59,130,246,0.15)' : 'rgba(16,185,129,0.15)',
                  color: currentItem.gender === 'feminine' ? '#f472b6' : currentItem.gender === 'masculine' ? '#60a5fa' : '#34d399',
                  borderColor: currentItem.gender === 'feminine' ? 'rgba(236,72,153,0.4)' : currentItem.gender === 'masculine' ? 'rgba(59,130,246,0.4)' : 'rgba(16,185,129,0.4)'
                }}
              >
                {currentItem.article}
              </div>
              <h2
                className={`text-4xl md:text-5xl font-extrabold tracking-tight ${config.textClass}`}
              >
                {currentItem.noun}
              </h2>
              <p className="text-sm text-slate-400 pt-2">
                Click anywhere to flip and see English meaning, plural & sentence
              </p>
            </div>
          ) : (
            /* BACK: Meaning, Plural, Example sentence */
            <div className="space-y-5 text-left max-w-lg mx-auto">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  English Meaning
                </span>
                <p className="text-2xl font-bold text-white">
                  {currentItem.english}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Plural Form
                </span>
                <p className="text-lg font-mono font-medium text-amber-300">
                  {currentItem.plural}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Beispielsatz (Example Sentence)
                </span>
                <p className="text-base text-slate-200 font-medium leading-relaxed">
                  {currentItem.germanSentence}
                </p>
                <p className="text-sm text-slate-400 italic mt-1">
                  {currentItem.englishSentence}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Card Footer Action Buttons */}
        <div
          className="pt-4 border-t border-slate-800/80 flex items-center justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPlayItem(currentItem)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-medium transition-all cursor-pointer shadow-md"
            >
              <Volume2 className="w-4 h-4" /> Listen Audio
            </button>
            <button
              onClick={() => onRecordItem(currentItem)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-300 text-xs font-medium transition-all cursor-pointer shadow-md"
            >
              <Mic className="w-4 h-4" /> Practice Voice
            </button>
          </div>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="text-xs font-medium text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 transition-colors cursor-pointer"
          >
            Flip Card ⮂
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={handlePrev}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-medium transition-all cursor-pointer shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" /> Previous Noun
        </button>
        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-medium transition-all cursor-pointer shadow-lg"
        >
          Next Noun <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
