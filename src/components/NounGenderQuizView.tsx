import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCw,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import { NounItem, Article, GENDER_CONFIG } from '../data/nouns';

interface NounGenderQuizViewProps {
  items: NounItem[];
  onPlayItem: (item: NounItem) => void;
  onPlaySnippet: (text: string) => void;
}

export function NounGenderQuizView({
  items,
  onPlayItem,
  onPlaySnippet,
}: NounGenderQuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [streak, setStreak] = useState(0);

  // Shuffle items for the quiz
  const [shuffledItems, setShuffledItems] = useState<NounItem[]>([]);

  useEffect(() => {
    const list = [...items].sort(() => Math.random() - 0.5);
    setShuffledItems(list);
    setCurrentIndex(0);
    setIsAnswered(false);
    setSelectedArticle(null);
    setScore(0);
    setTotalAnswered(0);
    setStreak(0);
  }, [items]);

  if (shuffledItems.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <Sparkles className="w-12 h-12 mx-auto text-slate-600 mb-3 animate-pulse" />
        <p className="text-lg font-medium text-slate-300">No nouns available for quiz</p>
      </div>
    );
  }

  const currentItem = shuffledItems[currentIndex] || shuffledItems[0];
  const isCorrect =
    selectedArticle === currentItem.article ||
    currentItem.article.includes(selectedArticle || '') ||
    (currentItem.alternateArticle && selectedArticle === currentItem.alternateArticle);

  const handleSelectArticle = (article: Article) => {
    if (isAnswered) return;

    setSelectedArticle(article);
    setIsAnswered(true);
    setTotalAnswered((prev) => prev + 1);

    const correct =
      article === currentItem.article ||
      currentItem.article.includes(article) ||
      (currentItem.alternateArticle && article === currentItem.alternateArticle);

    if (correct) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      onPlaySnippet(`${article} ${currentItem.noun}`);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedArticle(null);
    if (currentIndex + 1 < shuffledItems.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Re-shuffle when finished
      setShuffledItems([...items].sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
    }
  };

  const handleRestart = () => {
    setShuffledItems([...items].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsAnswered(false);
    setSelectedArticle(null);
    setScore(0);
    setTotalAnswered(0);
    setStreak(0);
  };

  const accuracy = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Quiz Header Score Board */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Gender Master Score
            </div>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <span>{score} / {totalAnswered}</span>
              <span className="text-xs font-mono text-slate-400 font-normal">
                ({accuracy}% accuracy)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Current Streak
            </div>
            <div className="text-lg font-bold text-amber-400 font-mono">
              🔥 {streak}
            </div>
          </div>
          <button
            onClick={handleRestart}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Restart Quiz"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl space-y-8 text-center">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
            Question {currentIndex + 1} of {shuffledItems.length} • What is the grammatical gender?
          </span>
          <p className="text-sm text-slate-400">
            Select the correct definite article for this German noun:
          </p>
        </div>

        {/* Big Noun Display */}
        <div className="py-6 px-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 shadow-inner">
          <div className="text-slate-400 text-sm mb-1">
            English: <span className="text-white font-medium">{currentItem.english}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
            <span className="text-amber-400 mr-2 font-mono">?</span>
            {currentItem.noun}
          </h2>
        </div>

        {/* 3 Color-Coded Article Choices */}
        <div className="grid grid-cols-3 gap-4">
          {/* DER (Masculine - Blue) */}
          <button
            onClick={() => handleSelectArticle('der')}
            disabled={isAnswered}
            className={`py-5 px-4 rounded-2xl text-xl font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg border-2 ${
              isAnswered
                ? currentItem.article === 'der' || currentItem.alternateArticle === 'der'
                  ? 'bg-blue-600 text-white border-blue-400 ring-4 ring-blue-500/30 scale-105'
                  : selectedArticle === 'der'
                    ? 'bg-rose-950/80 text-rose-400 border-rose-500 opacity-60'
                    : 'bg-slate-900/60 text-slate-500 border-slate-800 opacity-40'
                : 'bg-blue-950/30 hover:bg-blue-600/30 text-blue-400 hover:text-white border-blue-500/40 hover:border-blue-400 hover:scale-102 active:scale-98'
            }`}
          >
            der
            <span className="block text-[11px] font-medium lowercase tracking-normal text-blue-300/80 mt-1">
              (masculine)
            </span>
          </button>

          {/* DIE (Feminine - Pink) */}
          <button
            onClick={() => handleSelectArticle('die')}
            disabled={isAnswered}
            className={`py-5 px-4 rounded-2xl text-xl font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg border-2 ${
              isAnswered
                ? currentItem.article === 'die' || currentItem.alternateArticle === 'die'
                  ? 'bg-pink-600 text-white border-pink-400 ring-4 ring-pink-500/30 scale-105'
                  : selectedArticle === 'die'
                    ? 'bg-rose-950/80 text-rose-400 border-rose-500 opacity-60'
                    : 'bg-slate-900/60 text-slate-500 border-slate-800 opacity-40'
                : 'bg-pink-950/30 hover:bg-pink-600/30 text-pink-400 hover:text-white border-pink-500/40 hover:border-pink-400 hover:scale-102 active:scale-98'
            }`}
          >
            die
            <span className="block text-[11px] font-medium lowercase tracking-normal text-pink-300/80 mt-1">
              (feminine)
            </span>
          </button>

          {/* DAS (Neuter - Green) */}
          <button
            onClick={() => handleSelectArticle('das')}
            disabled={isAnswered}
            className={`py-5 px-4 rounded-2xl text-xl font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg border-2 ${
              isAnswered
                ? currentItem.article === 'das' || currentItem.alternateArticle === 'das'
                  ? 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-500/30 scale-105'
                  : selectedArticle === 'das'
                    ? 'bg-rose-950/80 text-rose-400 border-rose-500 opacity-60'
                    : 'bg-slate-900/60 text-slate-500 border-slate-800 opacity-40'
                : 'bg-emerald-950/30 hover:bg-emerald-600/30 text-emerald-400 hover:text-white border-emerald-500/40 hover:border-emerald-400 hover:scale-102 active:scale-98'
            }`}
          >
            das
            <span className="block text-[11px] font-medium lowercase tracking-normal text-emerald-300/80 mt-1">
              (neuter)
            </span>
          </button>
        </div>

        {/* Answer Feedback Card */}
        {isAnswered && (
          <div
            className={`p-6 rounded-2xl border text-left space-y-4 animate-in fade-in zoom-in-95 duration-200 ${
              isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    <span className="font-bold text-emerald-300 text-lg">
                      Ausgezeichnet! Correct!
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-rose-400" />
                    <span className="font-bold text-rose-300 text-lg">
                      Nicht ganz! Incorrect
                    </span>
                  </>
                )}
              </div>
              <button
                onClick={() => onPlayItem(currentItem)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-400" /> Listen
              </button>
            </div>

            {/* Answer Explanation */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2 text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono text-xs">Full Noun:</span>
                <span className={`font-bold text-base ${GENDER_CONFIG[currentItem.gender].textClass}`}>
                  {currentItem.article} {currentItem.noun}
                </span>
                <span className="text-slate-400 text-xs">({GENDER_CONFIG[currentItem.gender].label})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono text-xs">Plural:</span>
                <span className="text-amber-300 font-mono font-medium">{currentItem.plural}</span>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <p className="text-slate-300 italic font-medium">"{currentItem.germanSentence}"</p>
                <p className="text-xs text-slate-400 mt-0.5">{currentItem.englishSentence}</p>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleNext}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              Continue to Next Noun <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
