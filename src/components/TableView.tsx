import React from 'react';
import { Play, Volume2, Star, Mic, Sparkles, Check, Download } from 'lucide-react';
import { VocabItem } from '../data/vocabulary';
import { AudioOptions, playSnippet } from '../services/audioService';

interface Props {
  items: VocabItem[];
  currentItemId: number | null;
  isPlaying: boolean;
  bookmarkedIds: Set<number>;
  options: AudioOptions;
  onPlayItem: (item: VocabItem) => void;
  onToggleBookmark: (id: number) => void;
  onOpenRecord: (item: VocabItem) => void;
}

export const TableView: React.FC<Props> = ({
  items,
  currentItemId,
  isPlaying,
  bookmarkedIds,
  options,
  onPlayItem,
  onToggleBookmark,
  onOpenRecord,
}) => {
  const [playingSnippetText, setPlayingSnippetText] = React.useState<string | null>(null);

  const handlePlaySingle = (e: React.MouseEvent, text: string, lang: 'de' | 'en' = 'de') => {
    e.stopPropagation();
    setPlayingSnippetText(text);
    playSnippet(text, lang, options, () => {
      setPlayingSnippetText(null);
    });
  };

  return (
    <div className="w-full overflow-hidden border border-slate-700/80 rounded-2xl bg-slate-900/80 shadow-xl backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-200 divide-y divide-slate-800">
          <thead className="bg-slate-800/80 text-xs font-semibold uppercase tracking-wider text-slate-400 select-none">
            <tr>
              <th scope="col" className="py-3.5 px-3 w-14 text-center">#</th>
              <th scope="col" className="py-3.5 px-3 w-12 text-center">Audio</th>
              <th scope="col" className="py-3.5 px-4 min-w-[160px]">Verb / Phrase</th>
              <th scope="col" className="py-3.5 px-4 min-w-[150px]">English Meaning</th>
              <th scope="col" className="py-3.5 px-4 min-w-[130px]">Perfekt Form</th>
              <th scope="col" className="py-3.5 px-4 min-w-[240px]">German Example Sentence</th>
              <th scope="col" className="py-3.5 px-4 min-w-[220px]">English Sentence</th>
              <th scope="col" className="py-3.5 px-3 w-20 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {items.map((item) => {
              const isActive = currentItemId === item.id;
              const isBookmarked = bookmarkedIds.has(item.id);

              return (
                <tr
                  key={item.id}
                  id={`vocab-row-${item.id}`}
                  onClick={() => onPlayItem(item)}
                  className={`group cursor-pointer transition-colors duration-150 ${
                    isActive
                      ? 'bg-amber-500/15 border-l-4 border-l-amber-400'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  {/* Number */}
                  <td className="py-3.5 px-3 text-center font-mono font-bold text-xs text-slate-400 group-hover:text-amber-400">
                    {item.id}
                  </td>

                  {/* Play audio button */}
                  <td className="py-3.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onPlayItem(item)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isActive && isPlaying
                          ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-400/50 shadow-md animate-pulse'
                          : 'bg-slate-800 text-slate-300 hover:bg-amber-500 hover:text-slate-950'
                      }`}
                      title="Play this item"
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </button>
                  </td>

                  {/* German Verb */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base tracking-tight hover:text-amber-300 transition-colors">
                        {item.verb.includes('|') ? (
                          <span>
                            <span className="text-amber-400 bg-amber-400/10 px-1 py-0.5 rounded font-mono text-sm border border-amber-400/20 mr-1">
                              {item.verb.split('|')[0].trim()}
                            </span>
                            <span>{item.verb.split('|')[1]?.trim()}</span>
                          </span>
                        ) : (
                          item.verb
                        )}
                      </span>
                      {item.isReflexive && (
                        <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          Refl
                        </span>
                      )}
                      {item.preposition && (
                        <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          +{item.preposition}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* English Translation */}
                  <td className="py-3.5 px-4 text-slate-300 text-sm">
                    {item.english}
                  </td>

                  {/* Perfekt Form */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1 items-start">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.auxiliary && (
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                              item.auxiliary.includes('sein')
                                ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            }`}
                            title={`Auxiliary verb: ${item.auxiliary}`}
                          >
                            {item.auxiliary}
                          </span>
                        )}
                        <button
                          onClick={(e) => handlePlaySingle(e, item.perfekt, 'de')}
                          className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-500/20 text-amber-300 border border-slate-700/80 hover:border-amber-400/40 transition-colors"
                          title="Click to hear Perfekt form"
                        >
                          <Volume2 className="w-3 h-3 text-amber-400" />
                          <span>{item.perfekt}</span>
                        </button>
                      </div>
                      {item.note && (
                        <p className="text-[11px] text-amber-300/80 bg-slate-800/80 p-1.5 rounded-lg border border-slate-700/60 leading-tight mt-0.5 max-w-xs">
                          <span className="font-semibold text-amber-400">Note: </span>
                          {item.note}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* German Example Sentence */}
                  <td className="py-3.5 px-4">
                    <button
                      onClick={(e) => handlePlaySingle(e, item.germanSentence, 'de')}
                      className="group/btn text-left flex items-start gap-2 hover:text-amber-300 transition-colors"
                      title="Click to hear German sentence"
                    >
                      <Volume2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-500 group-hover/btn:text-amber-400 transition-colors" />
                      <span className="text-slate-100 font-medium">
                        {item.germanSentence}
                      </span>
                    </button>
                  </td>

                  {/* English Sentence */}
                  <td className="py-3.5 px-4 text-slate-400 text-sm italic">
                    {item.englishSentence}
                  </td>

                  {/* Action buttons (Bookmark & Mic) */}
                  <td className="py-3.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onToggleBookmark(item.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isBookmarked
                            ? 'text-amber-400 bg-amber-400/10'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark verb'}
                      >
                        <Star className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => onOpenRecord(item)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                        title="Practice speaking with microphone"
                      >
                        <Mic className="w-4 h-4" />
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
};
