import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
  Download,
  Sparkles,
  Settings,
  Repeat,
  Radio,
  Sliders,
  FileAudio,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { VocabItem } from '../data/vocabulary';
import { NounItem, GENDER_CONFIG } from '../data/nouns';
import { AdjectiveOppositeItem } from '../data/adjectives';
import { DegreeAmountItem } from '../data/degreeAndAmount';
import {
  AudioOptions,
  GeminiVoice,
  ReadMode,
  VoiceEngine,
  downloadItemWav,
  downloadNounWav,
  downloadAdjectiveWav,
  downloadDegreeAmountWav,
} from '../services/audioService';

interface Props {
  currentItem: (VocabItem | NounItem | AdjectiveOppositeItem | DegreeAmountItem) | null;
  currentIndex: number;
  totalItems: number;
  isPlaying: boolean;
  isBuffering: boolean;
  options: AudioOptions;
  pauseBetweenSec: number;
  repeatCount: number;
  activeEngine: VoiceEngine;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectIndex: (idx: number) => void;
  onOptionsChange: (newOpts: Partial<AudioOptions>) => void;
  onPauseChange: (sec: number) => void;
  onRepeatChange: (rep: number) => void;
  onOpenBatchDownload?: () => void;
}

export const AudioPlayerBar: React.FC<Props> = ({
  currentItem,
  currentIndex,
  totalItems,
  isPlaying,
  isBuffering,
  options,
  pauseBetweenSec,
  repeatCount,
  activeEngine,
  onTogglePlay,
  onNext,
  onPrev,
  onOptionsChange,
  onPauseChange,
  onRepeatChange,
  onOpenBatchDownload,
}) => {
  const [showConfig, setShowConfig] = useState(false);
  const [isDownloadingSingle, setIsDownloadingSingle] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  const progressPercent = totalItems > 0 ? ((currentIndex + 1) / totalItems) * 100 : 0;

  const handleDownloadSingle = async () => {
    if (!currentItem) return;
    try {
      setIsDownloadingSingle(true);
      setStatusFeedback(null);
      if ('word1' in currentItem) {
        await downloadAdjectiveWav(currentItem, options);
        setStatusFeedback(`Downloaded #${currentItem.id} ${currentItem.word1} ↔ ${currentItem.word2}.wav`);
      } else if ('expression' in currentItem) {
        await downloadDegreeAmountWav(currentItem, options);
        setStatusFeedback(`Downloaded #${currentItem.id} ${currentItem.expression} ↔ ${currentItem.opposite}.wav`);
      } else if ('verb' in currentItem) {
        await downloadItemWav(currentItem, options);
        setStatusFeedback(`Downloaded #${currentItem.id} ${currentItem.cleanVerb}.wav`);
      } else {
        await downloadNounWav(currentItem, options);
        setStatusFeedback(`Downloaded #${currentItem.id} ${currentItem.article} ${currentItem.noun}.wav`);
      }
      setTimeout(() => setStatusFeedback(null), 3500);
    } catch (err: any) {
      setStatusFeedback(`Download error: ${err.message || 'Check server connection'}`);
      setTimeout(() => setStatusFeedback(null), 4000);
    } finally {
      setIsDownloadingSingle(false);
    }
  };

  return (
    <div className="sticky bottom-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-700/80 text-white shadow-2xl">
      {/* Top progress strip */}
      <div className="w-full bg-slate-800 h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6">
        {/* Status Toast Notice */}
        {statusFeedback && (
          <div className="mb-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-amber-300 flex items-center justify-between">
            <span>{statusFeedback}</span>
            <button onClick={() => setStatusFeedback(null)} className="text-slate-400 hover:text-white ml-2">
              ×
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Current track info */}
          <div className="flex items-center gap-4 w-full lg:w-1/3 min-w-0">
            {currentItem ? (
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-sm flex-shrink-0">
                  #{currentItem.id}
                </div>
                <div className="min-w-0">
                  {'word1' in currentItem ? (
                    <>
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-bold text-base text-cyan-300 truncate">
                          {currentItem.word1}
                        </span>
                        <span className="text-slate-400 text-xs">↔</span>
                        <span className="font-bold text-base text-rose-300 truncate">
                          {currentItem.word2}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">
                        {currentItem.english1} ↔ {currentItem.english2}
                      </p>
                    </>
                  ) : 'expression' in currentItem ? (
                    <>
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-bold text-base text-violet-300 truncate">
                          {currentItem.expression}
                        </span>
                        <span className="text-slate-400 text-xs">↔</span>
                        <span className="font-bold text-base text-amber-300 truncate">
                          {currentItem.opposite}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">
                        {currentItem.english} ↔ {currentItem.oppositeEnglish}
                      </p>
                    </>
                  ) : 'verb' in currentItem ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-white truncate">
                          {currentItem.verb}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap">
                          {currentItem.perfekt}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">
                        {currentItem.english}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${
                            GENDER_CONFIG[currentItem.gender].badgeClass
                          }`}
                        >
                          {currentItem.article}
                        </span>
                        <span className={`font-bold text-base truncate ${GENDER_CONFIG[currentItem.gender].textClass}`}>
                          {currentItem.noun}
                        </span>
                        {currentItem.plural && currentItem.plural !== '—' && (
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap font-mono">
                            {currentItem.plural}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate">
                        {currentItem.english}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-400 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-slate-500" />
                <span>Select an item or press Play to start listening</span>
              </div>
            )}
          </div>

          {/* Master Transport Controls */}
          <div className="flex items-center gap-3 sm:gap-4 justify-center">
            <button
              onClick={onPrev}
              disabled={currentIndex <= 0}
              className="p-2 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
              title="Previous item (Left Arrow)"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={onTogglePlay}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 transition-transform active:scale-95 relative"
              title={isPlaying ? 'Pause (Space)' : 'Play continuous audio (Space)'}
            >
              {isBuffering ? (
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={onNext}
              disabled={currentIndex >= totalItems - 1}
              className="p-2 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
              title="Next item (Right Arrow)"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            {/* Visualizer wave indication when playing */}
            {isPlaying && (
              <div className="flex items-center gap-0.5 ml-2 h-4">
                <span className="w-1 bg-amber-400 rounded-full animate-pulse h-4" />
                <span className="w-1 bg-amber-400 rounded-full animate-pulse h-2 delay-75" />
                <span className="w-1 bg-amber-400 rounded-full animate-pulse h-5 delay-150" />
                <span className="w-1 bg-amber-400 rounded-full animate-pulse h-3 delay-100" />
              </div>
            )}
          </div>

          {/* Right Controls & Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5 w-full lg:w-1/3 justify-end flex-wrap">
            {/* Download ALL / Combined Audio Button */}
            {onOpenBatchDownload && (
              <button
                onClick={onOpenBatchDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/10 transition-transform active:scale-95"
                title="Download all verbs as a single combined audio file"
              >
                <FileAudio className="w-3.5 h-3.5 fill-current" />
                <span>Download All Audio</span>
              </button>
            )}

            {/* Engine badge */}
            <div
              className={`text-xs px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
                activeEngine === 'gemini'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              }`}
              title={
                activeEngine === 'gemini'
                  ? 'Gemini 3.8 Flash Lite Neural TTS'
                  : 'Browser Speech Synthesis'
              }
            >
              <Sparkles className="w-3 h-3" />
              <span className="hidden sm:inline">
                {activeEngine === 'gemini' ? `Gemini (${options.geminiVoice})` : 'Browser Audio'}
              </span>
              <span className="sm:hidden">{activeEngine === 'gemini' ? 'Gemini' : 'WebTTS'}</span>
            </div>

            {/* Read mode pill */}
            <div className="text-xs px-2 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hidden sm:block">
              {options.readMode === 'full' && 'Full'}
              {options.readMode === 'immersion' && 'Immersion'}
              {options.readMode === 'verb_perfekt' && 'V+P'}
              {options.readMode === 'sentences' && 'Sentences'}
            </div>

            {/* Download Single Audio */}
            {currentItem && (
              <button
                onClick={handleDownloadSingle}
                disabled={isDownloadingSingle}
                className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Download .wav audio for current item"
              >
                <Download className={`w-4 h-4 ${isDownloadingSingle ? 'animate-bounce text-amber-400' : ''}`} />
              </button>
            )}

            {/* Toggle Config Drawer */}
            <button
              onClick={() => setShowConfig(!showConfig)}
              className={`p-2 rounded-lg border transition-colors ${
                showConfig
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'text-slate-400 hover:text-white bg-slate-800/80 border-slate-700'
              }`}
              title="Audio Reading Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expandable Audio Settings Panel */}
        {showConfig && (
          <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Engine & Voice */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Voice Engine
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => onOptionsChange({ engine: 'gemini' })}
                  className={`px-2.5 py-1.5 rounded-lg border text-left font-medium transition-colors ${
                    options.engine === 'gemini'
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Gemini Studio
                </button>
                <button
                  onClick={() => onOptionsChange({ engine: 'browser' })}
                  className={`px-2.5 py-1.5 rounded-lg border text-left font-medium transition-colors ${
                    options.engine === 'browser'
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Browser WebTTS
                </button>
              </div>

              {options.engine === 'gemini' && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[10px] text-slate-400">Voice:</span>
                  {(['Kore', 'Puck', 'Fenrir', 'Zephyr'] as GeminiVoice[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => onOptionsChange({ geminiVoice: v })}
                      className={`px-1.5 py-0.5 text-[10px] rounded border ${
                        options.geminiVoice === v
                          ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reading Mode */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-medium">Read Aloud Mode</label>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { id: 'full', label: 'Full Lesson (DE+EN)' },
                  { id: 'immersion', label: 'German Only' },
                  { id: 'verb_perfekt', label: 'Verb + Perfekt' },
                  { id: 'sentences', label: 'Sentences' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onOptionsChange({ readMode: m.id as ReadMode })}
                    className={`px-2 py-1 rounded border text-left text-[11px] truncate transition-colors ${
                      options.readMode === m.id
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Multiplier */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-medium">Playback Speed</label>
              <div className="flex items-center gap-1.5">
                {[0.75, 0.9, 1.0, 1.25].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => onOptionsChange({ rate })}
                    className={`flex-1 py-1 rounded border font-mono text-center text-xs transition-colors ${
                      options.rate === rate
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            {/* Pause & Repeat */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-medium">Pause & Loop</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-1">
                  <span className="text-[10px] text-slate-400">Pause:</span>
                  {[1, 2, 3].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => onPauseChange(sec)}
                      className={`px-2 py-1 text-xs rounded border ${
                        pauseBetweenSec === sec
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-400">Repeat:</span>
                  {[1, 2].map((rep) => (
                    <button
                      key={rep}
                      onClick={() => onRepeatChange(rep)}
                      className={`px-2 py-1 text-xs rounded border ${
                        repeatCount === rep
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      {rep}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
