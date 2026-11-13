import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle, ArrowRight, RefreshCw, Trophy, Sparkles } from 'lucide-react';
import { VocabItem } from '../data/vocabulary';
import { AudioOptions, playItemAudio, playSnippet } from '../services/audioService';

interface Props {
  items: VocabItem[];
  options: AudioOptions;
}

export const QuizView: React.FC<Props> = ({ items, options }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentItem = items[questionIndex] || items[0];

  // Generate 4 randomized options
  useEffect(() => {
    if (!currentItem) return;

    const correct = currentItem.english;
    const others = items
      .filter((i) => i.id !== currentItem.id)
      .map((i) => i.english);

    // Shuffle and pick 3 random distractors
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const combined = [correct, ...shuffledOthers].sort(() => 0.5 - Math.random());

    setChoices(combined);
    setSelectedAnswer(null);
    setIsAnswered(false);

    // Auto-play question audio
    playSnippet(currentItem.verb, 'de', options);
  }, [questionIndex, items]);

  const handleSelect = (choice: string) => {
    if (isAnswered) return;
    setSelectedAnswer(choice);
    setIsAnswered(true);

    if (choice === currentItem.english) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (questionIndex + 1 < Math.min(items.length, 20)) {
      setQuestionIndex((q) => q + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const totalQ = Math.min(items.length, 20);
    const percent = Math.round((score / totalQ) * 100);

    return (
      <div className="max-w-xl mx-auto my-8 p-8 bg-slate-900 border border-slate-700 rounded-3xl text-center shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Trophy className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
        <p className="text-sm text-slate-400 mb-6">
          Great job practicing listening comprehension for the 100 verbs list.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">Score</span>
            <span className="text-3xl font-black text-amber-400">
              {score} / {totalQ}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">Accuracy</span>
            <span className="text-3xl font-black text-emerald-400">
              {percent}%
            </span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Practice Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto my-4 flex flex-col gap-6">
      {/* Quiz Progress & Stats */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-400">
        <span>Question {questionIndex + 1} of {Math.min(items.length, 20)}</span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-amber-400 font-bold">Score: {score}</span>
          {streak > 1 && (
            <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold">
              🔥 {streak} Streak
            </span>
          )}
        </div>
      </div>

      {/* Spoken Word Audio Card */}
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl text-center">
        <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
          Listen & Identify Meaning
        </span>

        {/* Big Replay Audio Button */}
        <div className="my-6">
          <button
            onClick={() => playSnippet(currentItem.verb, 'de', options)}
            className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/25 active:scale-95 transition-transform"
            title="Listen to German verb again"
          >
            <Volume2 className="w-9 h-9 fill-current" />
          </button>
          <p className="text-xs text-slate-400 mt-2">
            Click to replay pronunciation
          </p>
        </div>

        {/* When answered, show the German verb and example sentence */}
        {isAnswered && (
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 text-left mb-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg text-white">
                {currentItem.verb}
              </span>
              <span className="text-xs font-mono text-amber-400 px-2 py-0.5 rounded bg-slate-900">
                Perfekt: {currentItem.perfekt}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {currentItem.germanSentence}
            </p>
          </div>
        )}

        {/* 4 Choices */}
        <div className="grid grid-cols-1 gap-2.5">
          {choices.map((choice, i) => {
            const isCorrect = choice === currentItem.english;
            const isSelected = selectedAnswer === choice;

            let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold';
              } else if (isSelected) {
                btnStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-300';
              } else {
                btnStyle = 'bg-slate-800/40 border-slate-800 text-slate-500';
              }
            }

            return (
              <button
                key={i}
                disabled={isAnswered}
                onClick={() => handleSelect(choice)}
                className={`w-full p-4 rounded-xl border text-left font-medium text-sm flex items-center justify-between transition-all ${btnStyle}`}
              >
                <span>{choice}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
              </button>
            );
          })}
        </div>

        {/* Next Question Button */}
        {isAnswered && (
          <button
            onClick={handleNext}
            className="w-full mt-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Next Question</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
