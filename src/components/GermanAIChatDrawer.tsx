import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Loader2,
  Maximize2,
  Trash2,
  AlertCircle,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface GermanAIChatDrawerProps {
  isOpen: boolean;
  hasBottomPlayerBar: boolean;
  onToggleOpen: () => void;
  onOpenFullChecker: () => void;
}

const STARTER_PROMPTS = [
  'Gestern ich habe nach Berlin gefahren mit meine Freunde.',
  'Ich bleibe zu Hause, weil ich bin sehr müde.',
  'When do I use Dativ vs Akkusativ with Wechselpräpositionen?',
];

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const cleaned = text
    .replace(/\$\\rightarrow\$/g, '→')
    .replace(/\$\\leftrightarrow\$/g, '↔')
    .replace(/\\rightarrow/g, '→');
  const tokens: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*\n]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIdx = 0;

  while ((match = regex.exec(cleaned)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(cleaned.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('`') && token.endsWith('`')) {
      tokens.push(
        <code
          key={`c-${keyIdx++}`}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-800 border border-slate-700/80 text-amber-300 font-mono text-[11px]"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('**') && token.endsWith('**')) {
      tokens.push(
        <strong key={`b-${keyIdx++}`} className="font-bold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      tokens.push(
        <em key={`i-${keyIdx++}`} className="italic text-slate-300">
          {token.slice(1, -1)}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < cleaned.length) {
    tokens.push(cleaned.slice(lastIndex));
  }

  return tokens;
}

function FormattedChatMessage({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Horizontal divider (--- or ***)
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      elements.push(<hr key={`hr-${i}`} className="border-slate-800 my-2" />);
      i++;
      continue;
    }

    // Headings (#, ##, ###, ####)
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = headingMatch[2];
      elements.push(
        <div
          key={`h-${i}`}
          className={
            level <= 2
              ? 'text-sm font-black text-emerald-300 pt-1.5 pb-0.5'
              : 'text-xs font-bold uppercase tracking-wider text-amber-300 pt-1.5 pb-0.5'
          }
        >
          {renderInlineMarkdown(content)}
        </div>
      );
      i++;
      continue;
    }

    // Blockquotes (> ...)
    if (trimmed.startsWith('>')) {
      const quoteContent = trimmed.replace(/^>\s*/, '');
      elements.push(
        <div
          key={`bq-${i}`}
          className="border-l-2 border-violet-400 bg-violet-950/30 rounded-r-xl px-3 py-2 my-1 text-slate-100"
        >
          {renderInlineMarkdown(quoteContent)}
        </div>
      );
      i++;
      continue;
    }

    // Bullet / Numbered list blocks
    if (/^(\s*)([-*•]|\d+\.)\s+/.test(rawLine)) {
      const listItems: { indent: number; marker: string; content: string; key: number }[] = [];
      while (i < lines.length && /^(\s*)([-*•]|\d+\.)\s+/.test(lines[i])) {
        const line = lines[i];
        const m = line.match(/^(\s*)([-*•]|\d+\.)\s+(.*)$/);
        if (m) {
          listItems.push({
            indent: m[1].length >= 2 ? 1 : 0,
            marker: m[2],
            content: m[3],
            key: i,
          });
        }
        i++;
      }

      elements.push(
        <ul key={`ul-${listItems[0].key}`} className="space-y-1.5 my-1">
          {listItems.map((item) => {
            const isNumbered = /^\d+\.$/.test(item.marker);
            return (
              <li
                key={`li-${item.key}`}
                className={`flex items-start gap-2 ${item.indent > 0 ? 'pl-4 text-slate-300' : ''}`}
              >
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5 text-[11px]">
                  {isNumbered ? item.marker : item.indent > 0 ? '◦' : '•'}
                </span>
                <span className="leading-relaxed">{renderInlineMarkdown(item.content)}</span>
              </li>
            );
          })}
        </ul>
      );
      continue;
    }

    // Regular paragraph line
    elements.push(
      <p key={`p-${i}`} className="leading-relaxed">
        {renderInlineMarkdown(trimmed)}
      </p>
    );
    i++;
  }

  return <div className="space-y-1.5">{elements}</div>;
}

export function GermanAIChatDrawer({
  isOpen,
  hasBottomPlayerBar,
  onToggleOpen,
  onOpenFullChecker,
}: GermanAIChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text:
        'Hallo! Send any German sentence to get a correction, an explanation of where it went wrong, other ways to write it, plus a higher-level English sentence (at your same German level) with German vocabulary to practice writing next.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const scrollEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (textOverride?: string) => {
    const trimmed = (textOverride ?? input).trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    if (!textOverride) setInput('');
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/german-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages
            .filter((m) => m.id !== 'welcome')
            .map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.message || 'Could not get a reply. Please try again.');
        setIsLoading(false);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          role: 'model',
          text: String(data.reply || ''),
        },
      ]);
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text:
          'Hallo! Send any German sentence to get a correction, an explanation of where it went wrong, other ways to write it, plus a higher-level English sentence (at your same German level) with German vocabulary to practice writing next.',
      },
    ]);
    setErrorMsg(null);
  };

  const bottomOffsetClass = hasBottomPlayerBar ? 'bottom-24 sm:bottom-24' : 'bottom-5';

  return (
    <>
      {/* Always-visible Floating AI Chat Icon */}
      {!isOpen && (
        <button
          type="button"
          onClick={onToggleOpen}
          className={`fixed right-5 ${bottomOffsetClass} z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs shadow-2xl shadow-emerald-500/30 border border-emerald-300/50 transition-all hover:scale-105 active:scale-95 cursor-pointer`}
          title="Open German AI Tutor & Sentence Checker Chat"
          aria-label="Open German AI Chat"
        >
          <MessageCircle className="w-5 h-5 fill-slate-950/15" />
          <span>AI Chat</span>
        </button>
      )}

      {/* Slide-up Floating AI Chat Panel */}
      {isOpen && (
        <div
          className={`fixed right-4 ${bottomOffsetClass} z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[520px] max-h-[75vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden`}
        >
          {/* Chat Header */}
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-black text-white truncate">German AI Chat</h3>
                <p className="text-[11px] text-slate-400 truncate">
                  Sentence checker & grammar tutor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onOpenFullChecker();
                  onToggleOpen();
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 text-[11px] font-bold transition-colors cursor-pointer"
                title="Open Full Sentence Checker Page"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full View</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onToggleOpen}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-semibold rounded-br-sm whitespace-pre-wrap'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-sm'
                  }`}
                >
                  {msg.role === 'user' ? msg.text : <FormattedChatMessage text={msg.text} />}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                  Try asking or checking:
                </span>
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="w-full text-left px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl px-3.5 py-2.5 text-xs text-slate-400 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
            <div ref={scrollEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-end gap-2">
            <textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a German sentence or ask a question..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500/70 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none"
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 transition-colors cursor-pointer shrink-0"
              title="Send (Enter)"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
