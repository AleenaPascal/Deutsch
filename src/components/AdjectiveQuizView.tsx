import React, { useState, useEffect, useMemo } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowRight,
  Flame,
  ArrowLeftRight,
} from 'lucide-react';
import { AdjectiveOppositeItem } from '../data/adjectives';

interface AdjectiveQuizViewProps {
  items: AdjectiveOppositeItem[];
  onPlayItem: (item: AdjectiveOppositeItem) => void;
  onPlaySnippet: (text: string) => void;
}

export function AdjectiveQuizView({
  items,
  onPlayItem,
  onPlaySnippet,
}: AdjectiveQuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  useEffect(() => {
    if (items.length > 0) {
      const indices = items.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setShuffledIndices(indices);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setScore(0);
      setStreak(0);
    }
  }, [items]);

  const currentItem = useMemo(() => {
    if (shuffledIndices.length === 0 || items.length === 0) return null;
    const realIndex = shuffledIndices[currentIndex % shuffledIndices.length];
    return items[realIndex] || items[0];
  }, [shuffledIndices, currentIndex, items]);

  // Options: 1 correct opposite (word2) + 3 random distractor opposites from items
  const options = useMemo(() => {
    if (!currentItem) return [];
    const correct = currentItem.word2;
    const distractors = items
      .filter((it) => it.id !== currentItem.id && it.word2 !== correct)
      .map((it) => ({ word: it.word2, english: it.english2 }))
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const all = [
      { word: correct, english: currentItem.english2, isCorrect: true },
      ...distractors.map((d) => ({ word: d.word, english: d.english, isCorrect: false })),
    ].sort(() => 0.5 - Math.random());

    return all;
  }, [currentItem, items]);

  if (!currentItem) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <Sparkles className="w-12 h-12 mx-auto text-slate-600 mb-3" />
        <p className="text-lg font-medium text-slate-300">No adjective pairs for quiz</p>
      </div>
    );
  }

  const handleSelectOption = (optionWord: string, isCorrect: boolean) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionWord);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      onPlaySnippet(currentItem.word2);
    } else {
      setStreak(0);
      onPlaySnippet(optionWord);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setCurrentIndex((prev) => (prev + 1) % shuffledIndices.length);
  };

  const handleRestart = () => {
    if (items.length > 0) {
      const indices = items.map((_, i) => i).sort(() => 0.5 - Math.random());
      setShuffledIndices(indices);
    }
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setStreak(0);
  };

  const answered = selectedAnswer !== null;
  const isSelectedCorrect = selectedAnswer === currentItem.word2;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Score Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Score: <strong className="text-white text-sm">{score}</strong> / {currentIndex + (answered ? 1 : 0)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-400 font-semibold">
            <Flame className="w-4 h-4" />
            <span>Streak: {streak}</span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="flex items-center gap-1 text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Restart
        </button>
      </div>

      {/* Quiz Question Card */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          <ArrowLeftRight className="w-3.5 h-3.5" /> What is the German Opposite of:
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              {currentItem.word1}
            </h2>
            <button
              onClick={() => onPlaySnippet(currentItem.word1)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors cursor-pointer"
              title="Hear word"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-lg text-slate-300 font-medium">
            "{currentItem.english1}"
          </p>
        </div>

        {/* 4 Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {options.map((opt) => {
            const isChosen = selectedAnswer === opt.word;
            const isRight = opt.word === currentItem.word2;

            let btnStyle = 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600';
            if (answered) {
              if (isRight) {
                btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
              } else if (isChosen) {
                btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
              } else {
                btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={opt.word}
                disabled={answered}
                onClick={() => handleSelectOption(opt.word, opt.isCorrect)}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
              >
                <div>
                  <div className="text-lg font-bold">{opt.word}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{opt.english}</div>
                </div>
                {answered && isRight && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                )}
                {answered && isChosen && !isRight && (
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Example Sentence */}
        {answered && (
          <div className="pt-4 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200">
            <div className={`p-4 rounded-2xl ${isSelectedCorrect ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-200' : 'bg-rose-950/40 border border-rose-500/30 text-rose-200'} text-sm`}>
              <div className="font-bold flex items-center justify-center gap-2">
                {isSelectedCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Correct! <span className="text-cyan-300 font-mono">{currentItem.word1}</span> ↔ <span className="text-rose-300 font-mono">{currentItem.word2}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    Incorrect! The opposite of <span className="text-cyan-300">{currentItem.word1}</span> is <strong className="text-emerald-300">{currentItem.word2}</strong> ({currentItem.english2}).
                  </>
                )}
              </div>

              {/* Contrasting sentence */}
              <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-left">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-slate-200 font-medium">"{currentItem.germanSentence}"</p>
                    <p className="text-xs text-slate-400 italic mt-0.5">"{currentItem.englishSentence}"</p>
                  </div>
                  <button
                    onClick={() => onPlaySnippet(currentItem.germanSentence)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors flex-shrink-0"
                    title="Hear sentence"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3.5 px-6 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/25 transition-all cursor-pointer text-base"
            >
              Next Question <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
