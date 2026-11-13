import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Mic,
  Star,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  Sparkles,
  ArrowLeftRight,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { AdjectiveOppositeItem } from '../data/adjectives';

interface AdjectiveFlashcardViewProps {
  items: AdjectiveOppositeItem[];
  bookmarkedIds: Set<number>;
  onToggleBookmark: (id: number) => void;
  onPlayItem: (item: AdjectiveOppositeItem) => void;
  onRecordItem: (item: AdjectiveOppositeItem) => void;
  onPlaySnippet: (text: string) => void;
}

export function AdjectiveFlashcardView({
  items,
  bookmarkedIds,
  onToggleBookmark,
  onPlayItem,
  onRecordItem,
  onPlaySnippet,
}: AdjectiveFlashcardViewProps) {
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Escape' && isFullScreen) {
        e.preventDefault();
        setIsFullScreen(false);
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length, isFullScreen]);

  if (items.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <Sparkles className="w-12 h-12 mx-auto text-slate-600 mb-3" />
        <p className="text-lg font-medium text-slate-300">No adjective pairs for flashcards</p>
        <p className="text-sm text-slate-500 mt-1">Try adjusting your filters.</p>
      </div>
    );
  }

  const currentItem = items[currentIndex];
  const isBookmarked = bookmarkedIds.has(currentItem.id);

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
          title="Previous Pair (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Pure Card without header or footer */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full max-w-4xl min-h-[70vh] rounded-3xl transition-all duration-300 shadow-2xl border-2 p-8 sm:p-14 flex flex-col justify-center cursor-pointer select-none ${
            isFlipped
              ? 'bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-900 border-rose-500/40'
              : 'bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-900 border-cyan-500/40'
          }`}
        >
          {!isFlipped ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="bg-slate-950/75 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 text-center">
                <div className="text-xs uppercase tracking-wider font-bold text-cyan-400 mb-2">
                  Adjective 1
                </div>
                <div className="flex items-center justify-center gap-3">
                  <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                    {currentItem.word1}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaySnippet(currentItem.word1);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 transition-colors cursor-pointer"
                    title={`Listen to ${currentItem.word1}`}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-lg sm:text-xl text-cyan-200 font-semibold mt-3">
                  {currentItem.english1}
                </p>
              </div>

              <div className="bg-slate-950/75 border border-rose-500/30 rounded-2xl p-6 sm:p-8 text-center">
                <div className="text-xs uppercase tracking-wider font-bold text-rose-400 mb-2">
                  Opposite (Gegenteil)
                </div>
                <div className="flex items-center justify-center gap-3">
                  <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                    {currentItem.word2}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaySnippet(currentItem.word2);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500 text-rose-300 hover:text-slate-950 transition-colors cursor-pointer"
                    title={`Listen to ${currentItem.word2}`}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-lg sm:text-xl text-rose-200 font-semibold mt-3">
                  {currentItem.english2}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-2xl mx-auto w-full">
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-2xl sm:text-3xl text-white font-bold leading-relaxed">
                    "{currentItem.germanSentence}"
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaySnippet(currentItem.germanSentence);
                    }}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 transition-colors shrink-0 cursor-pointer"
                    title="Listen to German sentence"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-lg sm:text-xl text-slate-300 italic pt-3 border-t border-slate-800/80">
                  "{currentItem.englishSentence}"
                </p>
              </div>
              <div className="text-sm text-slate-400 text-center">
                Contrast: <strong className="text-cyan-300">{currentItem.word1}</strong> ({currentItem.english1}) vs <strong className="text-rose-300">{currentItem.word2}</strong> ({currentItem.english2})
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[110] p-3 sm:p-4 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/70 shadow-xl backdrop-blur-md transition-all cursor-pointer active:scale-95"
          title="Next Pair (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Controls & Counter */}
      <div className="flex items-center justify-between text-sm text-slate-400 px-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-cyan-400 font-bold">{currentIndex + 1}</span>
          <span>/</span>
          <span>{items.length} pairs</span>
          {currentItem.category && (
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
              {currentItem.category}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            title="Random Card"
          >
            <Shuffle className="w-3.5 h-3.5" /> Shuffle
          </button>
          <button
            onClick={() => onToggleBookmark(currentItem.id)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
            }`}
            title={isBookmarked ? 'Starred' : 'Star this pair'}
          >
            <Star className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() => setIsFullScreen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
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
        className="group relative h-96 w-full cursor-pointer perspective-1000 select-none"
      >
        <div
          className={`relative h-full w-full rounded-3xl transition-transform duration-500 shadow-2xl border ${
            isFlipped
              ? 'bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-900 border-rose-500/30'
              : 'bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-900 border-cyan-500/30'
          } p-8 flex flex-col justify-between`}
        >
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest font-semibold text-slate-400 flex items-center gap-1.5">
              <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-400" />
              {isFlipped ? 'Example Context Sentence' : 'Opposite Pair • Gegenteile'}
            </span>
            <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
              Space / Click to Flip
            </span>
          </div>

          {/* Card Body */}
          <div className="text-center my-auto space-y-4">
            {!isFlipped ? (
              /* FRONT: BOTH OPPOSITES + MEANINGS */
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  {/* Opposite 1 */}
                  <div className="bg-slate-950/70 border border-cyan-500/30 rounded-2xl p-4 text-center relative group">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-cyan-400 mb-1">
                      Adjective 1
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                        {currentItem.word1}
                      </h3>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlaySnippet(currentItem.word1);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 transition-colors cursor-pointer"
                        title={`Listen to ${currentItem.word1}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-base text-cyan-200 font-semibold mt-1">
                      {currentItem.english1}
                    </p>
                  </div>

                  {/* Opposite 2 */}
                  <div className="bg-slate-950/70 border border-rose-500/30 rounded-2xl p-4 text-center relative group">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-rose-400 mb-1">
                      Opposite (Gegenteil)
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                        {currentItem.word2}
                      </h3>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlaySnippet(currentItem.word2);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500 text-rose-300 hover:text-slate-950 transition-colors cursor-pointer"
                        title={`Listen to ${currentItem.word2}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-base text-rose-200 font-semibold mt-1">
                      {currentItem.english2}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-400 italic pt-1">
                  Click card or press Spacebar to see the example sentence on the other side
                </div>
              </div>
            ) : (
              /* BACK: EXAMPLE CONTEXT SENTENCE */
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  Beispielsatz (In Context)
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-lg sm:text-xl text-white font-bold leading-relaxed">
                      "{currentItem.germanSentence}"
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlaySnippet(currentItem.germanSentence);
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 transition-colors shrink-0 cursor-pointer"
                      title="Listen to German sentence"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-slate-300 italic pt-1 border-t border-slate-800/80">
                    "{currentItem.englishSentence}"
                  </p>
                </div>

                <div className="text-xs text-slate-400">
                  Contrast: <strong className="text-cyan-300">{currentItem.word1}</strong> ({currentItem.english1}) vs <strong className="text-rose-300">{currentItem.word2}</strong> ({currentItem.english2})
                </div>
              </div>
            )}
          </div>

          {/* Card Footer Actions */}
          <div
            className="flex items-center justify-between pt-4 border-t border-slate-800/60"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPlaySnippet(currentItem.word1)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title={`Hear ${currentItem.word1}`}
              >
                <Volume2 className="w-3.5 h-3.5" /> {currentItem.word1}
              </button>
              <button
                onClick={() => onPlaySnippet(currentItem.word2)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title={`Hear ${currentItem.word2}`}
              >
                <Volume2 className="w-3.5 h-3.5" /> {currentItem.word2}
              </button>
              <button
                onClick={() => onPlaySnippet(currentItem.germanSentence)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Hear full sentence"
              >
                <Volume2 className="w-3.5 h-3.5" /> Sentence
              </button>
            </div>

            <button
              onClick={() => onRecordItem(currentItem)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Record yourself"
            >
              <Mic className="w-3.5 h-3.5" /> Practice
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" /> Previous Pair
        </button>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="py-3 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-colors cursor-pointer flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Flip
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-3 px-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 transition-all cursor-pointer"
        >
          Next Pair <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
