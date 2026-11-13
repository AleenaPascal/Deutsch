import React from 'react';
import {
  Volume2,
  Mic,
  Star,
  Download,
  ArrowLeftRight,
  Sparkles,
} from 'lucide-react';
import { AdjectiveOppositeItem } from '../data/adjectives';

interface AdjectiveTableViewProps {
  items: AdjectiveOppositeItem[];
  currentPlayingId: number | null;
  isPlaying: boolean;
  bookmarkedIds: Set<number>;
  onPlayItem: (item: AdjectiveOppositeItem) => void;
  onRecordItem: (item: AdjectiveOppositeItem) => void;
  onToggleBookmark: (id: number) => void;
  onDownloadAudio: (item: AdjectiveOppositeItem) => void;
  onPlaySnippet: (text: string) => void;
}

export function AdjectiveTableView({
  items,
  currentPlayingId,
  isPlaying,
  bookmarkedIds,
  onPlayItem,
  onRecordItem,
  onToggleBookmark,
  onDownloadAudio,
  onPlaySnippet,
}: AdjectiveTableViewProps) {
  if (items.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <Sparkles className="w-12 h-12 mx-auto text-slate-600 mb-3 animate-pulse" />
        <p className="text-lg font-medium text-slate-300">No adjective pairs found</p>
        <p className="text-sm text-slate-500 mt-1">Try clearing your search query or category filter.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md">
      {/* Legend & Summary Bar */}
      <div className="px-6 py-3.5 bg-slate-950/70 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <ArrowLeftRight className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            Everyday Adjectives & Opposites ({items.length} Pairs / {items.length * 2} Words)
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-medium">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Primary Adjective
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/30 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span> Opposite Adjective
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-4 w-12 text-center">#</th>
              <th className="py-3 px-2 w-10 text-center" title="Starred">
                <Star className="w-3.5 h-3.5 mx-auto text-slate-500" />
              </th>
              <th className="py-3 px-4 min-w-[200px]">Adjective 1</th>
              <th className="py-3 px-4 w-10 text-center"></th>
              <th className="py-3 px-4 min-w-[200px]">Adjective 2 (Opposite)</th>
              <th className="py-3 px-4 min-w-[340px]">Contrasting Example Sentence</th>
              <th className="py-3 px-4 w-24 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {items.map((item) => {
              const isCurrentlyPlaying = currentPlayingId === item.id && isPlaying;
              const isBookmarked = bookmarkedIds.has(item.id);

              return (
                <tr
                  key={item.id}
                  className={`group transition-colors duration-150 border-l-4 ${
                    isCurrentlyPlaying
                      ? 'bg-amber-500/20 border-l-amber-400'
                      : isBookmarked
                      ? 'bg-amber-500/10 hover:bg-amber-500/15 border-l-amber-400'
                      : 'border-l-cyan-500/70 hover:bg-slate-800/50'
                  }`}
                >
                  {/* ID */}
                  <td className={`py-3.5 px-4 text-center font-mono text-xs group-hover:text-slate-300 ${
                    isBookmarked ? 'text-amber-300 font-bold' : 'text-slate-500'
                  }`}>
                    {item.id}
                  </td>

                  {/* Star column between numbering and word */}
                  <td className="py-3.5 px-2 text-center">
                    <button
                      onClick={() => onToggleBookmark(item.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'text-amber-400 bg-amber-400/15'
                          : 'text-slate-500 hover:text-amber-300 hover:bg-slate-800'
                      }`}
                      title={isBookmarked ? 'Remove star' : 'Star pair'}
                    >
                      <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </td>

                  {/* Adjective 1 */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPlaySnippet(item.word1)}
                        className="font-bold text-base text-cyan-300 hover:text-cyan-200 hover:underline text-left cursor-pointer transition-colors"
                        title="Click to hear pronunciation"
                      >
                        {item.word1}
                      </button>
                      <button
                        onClick={() => onPlaySnippet(item.word1)}
                        className="text-cyan-500/60 hover:text-cyan-400 p-1 rounded-md transition-colors"
                        title="Pronounce word 1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 font-medium">
                      {item.english1}
                    </div>
                    {item.category && (
                      <span className="inline-block mt-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                        {item.category}
                      </span>
                    )}
                  </td>

                  {/* Opposite Indicator */}
                  <td className="py-3.5 px-2 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400">
                      <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />
                    </span>
                  </td>

                  {/* Adjective 2 (Opposite) */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPlaySnippet(item.word2)}
                        className="font-bold text-base text-rose-300 hover:text-rose-200 hover:underline text-left cursor-pointer transition-colors"
                        title="Click to hear pronunciation"
                      >
                        {item.word2}
                      </button>
                      <button
                        onClick={() => onPlaySnippet(item.word2)}
                        className="text-rose-500/60 hover:text-rose-400 p-1 rounded-md transition-colors"
                        title="Pronounce opposite"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 font-medium">
                      {item.english2}
                    </div>
                  </td>

                  {/* Contrasting Example Sentence */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-start gap-2">
                      <button
                        onClick={() => onPlaySnippet(item.germanSentence)}
                        className="mt-0.5 text-slate-500 hover:text-amber-400 transition-colors flex-shrink-0 cursor-pointer"
                        title="Click to hear full contrasting sentence"
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
                      {/* Play All Track */}
                      <button
                        onClick={() => onPlayItem(item)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isCurrentlyPlaying
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                        title="Play pair & sentence"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Record Pronunciation */}
                      <button
                        onClick={() => onRecordItem(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Record & Compare Pronunciation"
                      >
                        <Mic className="w-4 h-4" />
                      </button>

                      {/* Download WAV */}
                      <button
                        onClick={() => onDownloadAudio(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Download audio clip"
                      >
                        <Download className="w-4 h-4" />
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
