import React, { useState, useRef } from 'react';
import { X, Mic, Square, Play, Volume2, Sparkles, RotateCcw } from 'lucide-react';
import { VocabItem } from '../data/vocabulary';
import { NounItem } from '../data/nouns';
import { AudioOptions, playSnippet } from '../services/audioService';

type RecordableItem = VocabItem | NounItem;

interface Props {
  item: RecordableItem | null;
  options: AudioOptions;
  onClose: () => void;
}

export const RecorderModal: React.FC<Props> = ({ item, options, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordingError, setRecordingError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  if (!item) return null;

  const displayTitle = 'verb' in item ? item.verb : `${item.article} ${item.noun}`;
  const speakText = 'verb' in item ? (item.cleanVerb || item.verb) : `${item.article} ${item.noun}`;
  const displaySubtitle = 'perfekt' in item ? `Perfekt: ${item.perfekt}` : `Plural: ${item.plural}`;

  const handleStartRecording = async () => {
    try {
      setRecordingError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err: any) {
      console.error('Error accessing microphone:', err);
      setRecordingError('Microphone permission denied or not supported on this device.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handlePlayRecording = () => {
    if (recordedAudioUrl) {
      const audio = new Audio(recordedAudioUrl);
      audio.play();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
            MIC
          </span>
          <div>
            <h3 className="font-bold text-lg text-white">Pronunciation Trainer</h3>
            <p className="text-xs text-slate-400">Record and compare with native German audio</p>
          </div>
        </div>

        {/* Word Card */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 my-4 text-center">
          <span className="text-xs font-mono text-amber-400">#{item.id}</span>
          <h2 className="text-3xl font-extrabold text-white mt-1 mb-1">{displayTitle}</h2>
          <span className="text-xs text-amber-300 font-mono block mb-2">{displaySubtitle}</span>
          <p className="text-sm text-slate-300 font-medium mb-1">{item.germanSentence}</p>
          <p className="text-xs text-slate-400 italic">{item.englishSentence}</p>
        </div>

        {recordingError && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
            {recordingError}
          </div>
        )}

        {/* Two Audio Comparison Columns */}
        <div className="grid grid-cols-2 gap-4 my-6">
          {/* Native German Model Audio */}
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-amber-400 mb-2">Native Model</span>
            <button
              onClick={() => playSnippet(speakText, 'de', options)}
              className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
              title="Play Native German Audio"
            >
              <Volume2 className="w-6 h-6 fill-current" />
            </button>
            <span className="text-[11px] text-slate-400 mt-2">Listen</span>
          </div>

          {/* User Recording */}
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-rose-400 mb-2">Your Voice</span>
            {recordedAudioUrl ? (
              <button
                onClick={handlePlayRecording}
                className="w-12 h-12 rounded-full bg-rose-500 hover:bg-rose-400 text-white flex items-center justify-center shadow-lg shadow-rose-500/20 active:scale-95 transition-all"
                title="Play Your Voice Recording"
              >
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </button>
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-600">
                <Mic className="w-5 h-5" />
              </div>
            )}
            <span className="text-[11px] text-slate-400 mt-2">
              {recordedAudioUrl ? 'Playback' : 'Not recorded yet'}
            </span>
          </div>
        </div>

        {/* Record Control Bar */}
        <div className="pt-2 text-center">
          {!isRecording ? (
            <button
              onClick={handleStartRecording}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-bold text-sm shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Mic className="w-4 h-4" />
              <span>{recordedAudioUrl ? 'Record Again' : 'Start Recording'}</span>
            </button>
          ) : (
            <button
              onClick={handleStopRecording}
              className="w-full py-3.5 rounded-xl bg-red-600 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 animate-pulse"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Stop Recording</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
