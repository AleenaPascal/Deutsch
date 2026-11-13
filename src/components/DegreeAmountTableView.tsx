import React from 'react';
import {
  Volume2,
  Mic,
  Star,
  Download,
  Sparkles,
  SlidersHorizontal,
  ArrowLeftRight,
} from 'lucide-react';
import { DegreeAmountItem } from '../data/degreeAndAmount';

interface DegreeAmountTableViewProps {
  items: DegreeAmountItem[];
  currentPlayingId: number | null;
  isPlaying: boolean;
  bookmarkedIds: Set<number>;
  onPlayItem: (item: DegreeAmountItem) => void;
  onRecordItem: (item: DegreeAmountItem) => void;
  onToggleBookmark: (id: number) => void;
  onDownloadAudio: (item: DegreeAmountItem) => void;
  onPlaySnippet: (text: string) => void;
}

export function DegreeAmountTableView({
  items,
  currentPlayingId,
  isPlaying,
  bookmarkedIds,
  onPlayItem,
  onRecordItem,
  onToggleBookmark,
  onDownloadAudio,
  onPlaySnippet,
}: DegreeAmountTableViewProps) {
  if (items.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <Sparkles className="w-12 h-12 mx-auto text-slate-600 mb-3 animate-pulse" />
        <p className="text-lg font-medium text-slate-300">No expressions found</p>
        <p className="text-sm text-slate-500 mt-1">Try clearing your search query or category filter.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md">
      {/* Legend & Summary Bar */}
      <div className="px-6 py-3.5 bg-slate-950/70 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <SlidersHorizontal className="w-4 h-4 text-violet-400" />
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            Degree, Amount & Approximation ({items.length} Expressions)
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-500/15 text-violet-300 border border-violet-500/30 font-medium">
            <span className="w-2 h-2 rounded-full bg-violet-400"></span> Primary Expression
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span> Opposite / Contrast
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-4 w-12 text-center">#</th>
              <th className="py-3 px-4 min-w-[200px]">Word / Phrase</th>
              <th className="py-3 px-4 w-10 text-center"></th>
              <th className="py-3 px-4 min-w-[200px]">Contrasting Expression</th>
              <th className="py-3 px-4 min-w-[340px]">German Example Sentence</th>
              <th className="py-3 px-4 w-28 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {items.map((item) => {
              const isCurrentlyPlaying = currentPlayingId === item.id && isPlaying;
              const isBookmarked = bookmarkedIds.has(item.id);

              return (
                <tr
                  key={item.id}
                  className={`group transition-colors duration-150 border-l-4 border-l-violet-500/70 ${
                    isCurrentlyPlaying
                      ? 'bg-amber-500/10'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  {/* ID */}
                  <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-500 group-hover:text-slate-400">
                    {item.id}
                  </td>

                  {/* Word / Phrase */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPlaySnippet(item.expression)}
                        className="font-bold text-base text-violet-300 hover:text-violet-200 hover:underline text-left cursor-pointer transition-colors"
                        title="Click to hear pronunciation"
                      >
                        {item.expression}
                      </button>
                      <button
                        onClick={() => onPlaySnippet(item.expression)}
                        className="text-violet-500/60 hover:text-violet-400 p-1 rounded-md transition-colors"
                        title="Pronounce expression"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 font-medium">
                      {item.english}
                    </div>
                    {item.category && (
                      <span className="inline-block mt-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                        {item.category}
                      </span>
                    )}
                  </td>

                  {/* Contrast Arrow */}
                  <td className="py-3.5 px-2 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400">
                      <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />
                    </span>
                  </td>

                  {/* Opposite / Contrasting Expression */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPlaySnippet(item.opposite)}
                        className="font-bold text-base text-amber-300 hover:text-amber-200 hover:underline text-left cursor-pointer transition-colors"
                        title="Click to hear contrast"
                      >
                        {item.opposite}
                      </button>
                      <button
                        onClick={() => onPlaySnippet(item.opposite)}
                        className="text-amber-500/60 hover:text-amber-400 p-1 rounded-md transition-colors"
                        title="Pronounce contrast"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 font-medium">
                      {item.oppositeEnglish}
                    </div>
                  </td>

                  {/* German Example Sentence */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-start gap-2">
                      <button
                        onClick={() => onPlaySnippet(item.germanSentence)}
                        className="mt-0.5 text-slate-500 hover:text-amber-400 transition-colors flex-shrink-0 cursor-pointer"
                        title="Click to hear full sentence"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <div>
                        <div
                          onClick={() => onPlaySnippet(item.germanSentence)}
                          className="text-slate-200 hover:text-amber-300 font-medium cursor-pointer transition-colors leading-relaxed"
                          title="Click to hear full sentence"
                        >
                          {item.germanSentence}
                        </div>
                        <div className="text-xs text-slate-400 mt-1 italic leading-relaxed">
                          {item.englishSentence}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {/* Play Item */}
                      <button
                        onClick={() => onPlayItem(item)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isCurrentlyPlaying
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                        title="Play expression & sentence"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Record */}
                      <button
                        onClick={() => onRecordItem(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Record & Compare Pronunciation"
                      >
                        <Mic className="w-4 h-4" />
                      </button>

                      {/* Download */}
                      <button
                        onClick={() => onDownloadAudio(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Download audio clip"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      {/* Star Bookmark */}
                      <button
                        onClick={() => onToggleBookmark(item.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isBookmarked
                            ? 'text-amber-400 hover:text-amber-300'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark expression'}
                      >
                        <Star className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
