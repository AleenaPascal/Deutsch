import React from 'react';
import {
  Volume2,
  Mic,
  Star,
  Download,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { NounItem, GENDER_CONFIG, Gender } from '../data/nouns';

interface NounTableViewProps {
  items: NounItem[];
  currentPlayingId: number | null;
  isPlaying: boolean;
  bookmarkedIds: Set<number>;
  onPlayItem: (item: NounItem) => void;
  onRecordItem: (item: NounItem) => void;
  onToggleBookmark: (id: number) => void;
  onDownloadAudio: (item: NounItem) => void;
  onPlaySnippet: (text: string) => void;
}

export function NounTableView({
  items,
  currentPlayingId,
  isPlaying,
  bookmarkedIds,
  onPlayItem,
  onRecordItem,
  onToggleBookmark,
  onDownloadAudio,
  onPlaySnippet,
}: NounTableViewProps) {
  if (items.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <Sparkles className="w-12 h-12 mx-auto text-slate-600 mb-3 animate-pulse" />
        <p className="text-lg font-medium text-slate-300">No nouns found</p>
        <p className="text-sm text-slate-500 mt-1">Try clearing your search query or gender filter.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md">
      {/* Legend Bar */}
      <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-slate-400">Gender Colors:</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/15 text-blue-400 border border-blue-500/30 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span> der (Masculine - Blue)
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-pink-500/15 text-pink-400 border border-pink-500/30 font-medium">
            <span className="w-2 h-2 rounded-full bg-pink-400"></span> die (Feminine - Pink)
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> das (Neuter - Green)
          </span>
        </div>
        <div className="text-slate-400 font-mono">
          Showing {items.length} nouns
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300 border-collapse">
          <thead>
            <tr className="bg-slate-950/80 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
              <th className="py-3.5 px-4 w-12 text-center font-mono">#</th>
              <th className="py-3.5 px-4 min-w-[200px]">Noun & Article</th>
              <th className="py-3.5 px-4 min-w-[170px]">English Meaning</th>
              <th className="py-3.5 px-4 min-w-[160px]">Plural Form</th>
              <th className="py-3.5 px-4 min-w-[340px]">Example Sentence (Beispielsatz)</th>
              <th className="py-3.5 px-4 w-36 text-center">Practice & Audio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {items.map((item) => {
              const isCurrentlyPlaying = currentPlayingId === item.id && isPlaying;
              const isBookmarked = bookmarkedIds.has(item.id);
              const config = GENDER_CONFIG[item.gender];

              // Row accent based on gender
              const borderLeftClass = 
                item.gender === 'feminine' 
                  ? 'border-l-4 border-l-pink-500' 
                  : item.gender === 'masculine' 
                    ? 'border-l-4 border-l-blue-500' 
                    : 'border-l-4 border-l-emerald-500';

              return (
                <tr
                  key={item.id}
                  className={`group transition-colors duration-150 ${borderLeftClass} ${
                    isCurrentlyPlaying
                      ? 'bg-amber-500/10'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  {/* ID */}
                  <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-500 group-hover:text-slate-400">
                    {item.id}
                  </td>

                  {/* Noun & Gender Badge */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      {/* Colored Article Badge */}
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-bold tracking-wide uppercase border ${config.badgeClass}`}
                        title={`${config.label} (${config.colorName})`}
                      >
                        {item.article}
                      </span>

                      {/* Noun with Gender Theming */}
                      <button
                        onClick={() => onPlaySnippet(`${item.article} ${item.noun}`)}
                        className={`font-semibold text-base tracking-tight hover:underline text-left cursor-pointer transition-colors ${config.textClass}`}
                        title="Click to hear noun"
                      >
                        {item.noun}
                      </button>
                    </div>
                    {item.category && (
                      <span className="block text-[11px] text-slate-500 mt-0.5">
                        {item.category}
                      </span>
                    )}
                  </td>

                  {/* English Meaning */}
                  <td className="py-3.5 px-4 text-slate-300 font-medium">
                    {item.english}
                  </td>

                  {/* Plural Form */}
                  <td className="py-3.5 px-4">
                    {item.plural === '—' || item.plural.includes('(Sg.)') ? (
                      <span className="text-slate-500 font-mono text-xs italic">
                        {item.plural}
                      </span>
                    ) : (
                      <span className="text-slate-200 font-medium font-mono text-xs bg-slate-800/80 px-2 py-1 rounded border border-slate-700/60">
                        {item.plural}
                      </span>
                    )}
                  </td>

                  {/* Example Sentence */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="text-slate-200 font-medium leading-relaxed">
                        <button
                          onClick={() => onPlaySnippet(item.germanSentence)}
                          className="hover:text-amber-300 text-left cursor-pointer transition-colors"
                          title="Click to hear example sentence"
                        >
                          {item.germanSentence}
                        </button>
                      </div>
                      <div className="text-xs text-slate-400 italic">
                        {item.englishSentence}
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Play Audio Button */}
                      <button
                        onClick={() => onPlayItem(item)}
                        className={`p-2 rounded-lg transition-all cursor-pointer ${
                          isCurrentlyPlaying
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 scale-105'
                            : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/50'
                        }`}
                        title={isCurrentlyPlaying ? 'Currently Playing' : 'Play Audio Pronunciation'}
                        aria-label="Play audio"
                      >
                        <Volume2 className={`w-4 h-4 ${isCurrentlyPlaying ? 'animate-bounce' : ''}`} />
                      </button>

                      {/* Pronunciation Recording Practice */}
                      <button
                        onClick={() => onRecordItem(item)}
                        className="p-2 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700/50 transition-colors cursor-pointer"
                        title="Record your voice & practice pronunciation"
                        aria-label="Record voice"
                      >
                        <Mic className="w-4 h-4" />
                      </button>

                      {/* Download Single Audio */}
                      <button
                        onClick={() => onDownloadAudio(item)}
                        className="p-2 rounded-lg bg-slate-800/80 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 border border-slate-700/50 transition-colors cursor-pointer"
                        title="Download audio file"
                        aria-label="Download audio"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      {/* Bookmark Star */}
                      <button
                        onClick={() => onToggleBookmark(item.id)}
                        className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                          isBookmarked
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                            : 'bg-slate-800/80 hover:bg-slate-700 text-slate-500 hover:text-slate-300 border-slate-700/50'
                        }`}
                        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this Noun'}
                        aria-label="Bookmark"
                      >
                        <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
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
