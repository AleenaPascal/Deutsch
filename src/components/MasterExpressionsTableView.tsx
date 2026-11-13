import React from 'react';
import {
  Volume2,
  Mic,
  Star,
  Download,
  Sparkles,
  SlidersHorizontal,
  ArrowRight,
} from 'lucide-react';

export interface GenericExpressionRow {
  id: number;
  mainText: string;
  mainSubtext?: string;
  english: string;
  contrastText?: string;
  contrastSubtext?: string;
  badge?: string;
  badgeVariant?: 'emerald' | 'amber' | 'violet' | 'cyan' | 'rose' | 'indigo' | 'default';
  germanSentence: string;
  englishSentence: string;
  category: string;
  level?: string;
  note?: string;
}

interface MasterExpressionsTableViewProps {
  title: string;
  themeColor: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose' | 'indigo' | 'sky';
  items: GenericExpressionRow[];
  currentPlayingId: number | null;
  isPlaying: boolean;
  bookmarkedIds: Set<number>;
  onPlaySentence: (text: string, id: number) => void;
  onPlaySnippet: (text: string) => void;
  onRecordItem?: (item: GenericExpressionRow) => void;
  onToggleBookmark: (id: number) => void;
  onDownloadAudio?: (item: GenericExpressionRow) => void;
}

export function MasterExpressionsTableView({
  title,
  themeColor,
  items,
  currentPlayingId,
  isPlaying,
  bookmarkedIds,
  onPlaySentence,
  onPlaySnippet,
  onRecordItem,
  onToggleBookmark,
  onDownloadAudio,
}: MasterExpressionsTableViewProps) {
  if (items.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <Sparkles className="w-12 h-12 mx-auto text-slate-600 mb-3 animate-pulse" />
        <p className="text-lg font-medium text-slate-300">No expressions found</p>
        <p className="text-sm text-slate-500 mt-1">Try clearing your search query or category filter.</p>
      </div>
    );
  }

  const colorStyles = {
    emerald: {
      borderL: 'border-l-emerald-500',
      textAccent: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      dot: 'bg-emerald-400',
    },
    cyan: {
      borderL: 'border-l-cyan-500',
      textAccent: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      dot: 'bg-cyan-400',
    },
    violet: {
      borderL: 'border-l-violet-500',
      textAccent: 'text-violet-400',
      badgeBg: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
      dot: 'bg-violet-400',
    },
    amber: {
      borderL: 'border-l-amber-500',
      textAccent: 'text-amber-400',
      badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      dot: 'bg-amber-400',
    },
    rose: {
      borderL: 'border-l-rose-500',
      textAccent: 'text-rose-400',
      badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      dot: 'bg-rose-400',
    },
    indigo: {
      borderL: 'border-l-indigo-500',
      textAccent: 'text-indigo-400',
      badgeBg: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
      dot: 'bg-indigo-400',
    },
    sky: {
      borderL: 'border-l-sky-500',
      textAccent: 'text-sky-400',
      badgeBg: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
      dot: 'bg-sky-400',
    },
  }[themeColor];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md">
      {/* Header bar */}
      <div className="px-6 py-3.5 bg-slate-950/70 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <SlidersHorizontal className={`w-4 h-4 ${colorStyles.textAccent}`} />
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            {title} ({items.length} Expressions)
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-medium ${colorStyles.badgeBg}`}>
            <span className={`w-2 h-2 rounded-full ${colorStyles.dot}`}></span> German Phrase
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-medium">
            Natural Context Sentence
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-4 w-12 text-center">#</th>
              <th className="py-3 px-4 min-w-[200px]">German Expression</th>
              {items.some((i) => i.contrastText) && (
                <th className="py-3 px-4 min-w-[180px]">Contrast / Nuance</th>
              )}
              <th className="py-3 px-4 min-w-[340px]">German Context Sentence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {items.map((item) => {
              const isCurrentlyPlaying = currentPlayingId === item.id && isPlaying;
              const isBookmarked = bookmarkedIds.has(item.id);

              const rowBorder = item.badgeVariant
                ? item.badgeVariant === 'emerald'
                  ? 'border-l-emerald-400 bg-emerald-950/10'
                  : item.badgeVariant === 'amber'
                  ? 'border-l-amber-400 bg-amber-950/10'
                  : item.badgeVariant === 'violet'
                  ? 'border-l-violet-400 bg-violet-950/10'
                  : item.badgeVariant === 'cyan'
                  ? 'border-l-cyan-400 bg-cyan-950/10'
                  : item.badgeVariant === 'rose'
                  ? 'border-l-rose-400 bg-rose-950/10'
                  : item.badgeVariant === 'indigo'
                  ? 'border-l-indigo-400 bg-indigo-950/10'
                  : colorStyles.borderL
                : colorStyles.borderL;

              const badgeClass = item.badgeVariant
                ? item.badgeVariant === 'emerald'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : item.badgeVariant === 'amber'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : item.badgeVariant === 'violet'
                  ? 'bg-violet-500/20 text-violet-300 border-violet-500/40'
                  : item.badgeVariant === 'cyan'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : item.badgeVariant === 'rose'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : item.badgeVariant === 'indigo'
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700/80'
                : 'bg-slate-800 text-slate-300 border-slate-700/80';

              return (
                <tr
                  key={item.id}
                  className={`group transition-colors duration-150 border-l-4 ${rowBorder} ${
                    isCurrentlyPlaying
                      ? 'bg-amber-500/15'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  {/* ID & Bookmark */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-mono text-xs text-slate-500">
                        {item.id}
                      </span>
                      <button
                        onClick={() => onToggleBookmark(item.id)}
                        className="text-slate-600 hover:text-amber-400 transition-colors cursor-pointer"
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            isBookmarked
                              ? 'fill-amber-400 text-amber-400'
                              : 'opacity-40 hover:opacity-100'
                          }`}
                        />
                      </button>
                    </div>
                  </td>

                  {/* German expression */}
                  <td className="py-3 px-4">
                    <div className="flex items-start gap-2">
                      <button
                        onClick={() => onPlaySnippet(item.mainText)}
                        className="mt-0.5 p-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex-shrink-0 cursor-pointer"
                        title="Pronounce German expression"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <div>
                        <div className="font-semibold text-white tracking-wide flex items-center gap-1.5 flex-wrap">
                          <span>{item.mainText}</span>
                          {item.badge && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold shadow-sm ${badgeClass}`}>
                              {item.badge}
                            </span>
                          )}
                          {item.level && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-400 font-medium">
                              {item.level}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {item.english}
                        </div>
                        {item.mainSubtext && (
                          <div className="text-[11px] text-cyan-300/90 font-mono mt-1 bg-cyan-950/30 border border-cyan-800/40 rounded px-1.5 py-0.5 w-fit">
                            {item.mainSubtext}
                          </div>
                        )}
                        {item.note && (
                          <div className="text-[11px] text-amber-300/90 italic mt-1 flex items-center gap-1">
                            <span className="text-amber-400 font-bold">ℹ</span> {item.note}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Contrast / Upgrade column if present */}
                  {items.some((i) => i.contrastText) && (
                    <td className="py-3 px-4">
                      {item.contrastText ? (
                        <div className="flex items-start gap-2">
                          <button
                            onClick={() => onPlaySnippet(item.contrastText!)}
                            className="mt-0.5 p-1 rounded-md bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 transition-colors flex-shrink-0 cursor-pointer"
                            title="Pronounce contrast / upgrade"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <div>
                            <div className="font-medium text-amber-200">
                              {item.contrastText}
                            </div>
                            {item.contrastSubtext && (
                              <div className="text-xs text-slate-400 mt-0.5">
                                {item.contrastSubtext}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  )}

                  {/* German example sentence */}
                  <td className="py-3 px-4">
                    <div className="flex items-start gap-2">
                      <button
                        onClick={() => onPlaySentence(item.germanSentence, item.id)}
                        className={`mt-0.5 p-1.5 rounded-lg transition-colors flex-shrink-0 cursor-pointer ${
                          isCurrentlyPlaying
                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                        }`}
                        title="Listen to full German sentence"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div>
                        <div className="text-slate-200 leading-snug font-medium">
                          {item.germanSentence}
                        </div>
                        <div className="text-xs text-slate-400 italic mt-1 leading-relaxed">
                          {item.englishSentence}
                        </div>
                      </div>
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
