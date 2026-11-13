import React, { useState } from 'react';
import {
  Volume2,
  Table as TableIcon,
  Sparkles,
  Info,
  CheckCircle2,
  FileImage,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';

import {
  PERSONAL_PRONOUNS_DATA,
  POSSESSIVE_STEMS_DATA,
  POSSESSIVE_NOMINATIV_TABLE,
  POSSESSIVE_AKKUSATIV_TABLE,
  POSSESSIVE_DATIV_TABLE,
  POSSESSIVE_GENITIV_TABLE,
  POSSESSIVE_ENDINGS_MATRIX,
  PossessiveCaseRow,
} from '../data/pronounsAndPossessives';

interface Props {
  onPlaySnippet: (text: string) => void;
  onOpenOriginalSheet: (sheetIndex: number) => void;
}

type PronounDeckTab = 'personal' | 'stems' | 'cases' | 'endings-matrix';
type ActiveCase = 'nominativ' | 'akkusativ' | 'dativ' | 'genitiv';

export const PronounTablesDeck: React.FC<Props> = ({
  onPlaySnippet,
  onOpenOriginalSheet,
}) => {
  const [deckTab, setDeckTab] = useState<PronounDeckTab>('personal');
  const [activeCase, setActiveCase] = useState<ActiveCase>('nominativ');

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-md space-y-5">
      {/* Deck Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-pink-500/20 text-pink-300 border border-pink-500/30">
              Grammar Master Deck
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Authentic Cheat Sheet Tables
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
            <span>Personal & Possessive Pronouns</span>
            <span className="text-pink-400 text-sm font-semibold">
              (Personalpronomen & Possessivartikel)
            </span>
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Master personal pronouns across cases, reflexive forms, possessive stems, and full 4-case declension endings. Click any pronoun to hear crystal-clear German audio!
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          <button
            onClick={() => onOpenOriginalSheet(37)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-all cursor-pointer shadow-sm"
            title="Inspect authentic Personal Pronouns cheat sheet in full zoom"
          >
            <FileImage className="w-3.5 h-3.5" />
            <span>Sheet 13A (Personal)</span>
          </button>
          <button
            onClick={() => onOpenOriginalSheet(38)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-pink-300 text-xs font-semibold border border-pink-500/30 transition-all cursor-pointer shadow-sm"
            title="Inspect authentic Possessive Pronouns 4-Cases cheat sheet in full zoom"
          >
            <FileImage className="w-3.5 h-3.5" />
            <span>Sheet 13B (Possessives)</span>
          </button>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <button
          onClick={() => setDeckTab('personal')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            deckTab === 'personal'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-400'
              : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>1. Personal Pronouns (Personalpronomen)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
            10 Rows
          </span>
        </button>

        <button
          onClick={() => setDeckTab('stems')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            deckTab === 'stems'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400'
              : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>2. Possessive Stems (Stämme)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
            9 Persons
          </span>
        </button>

        <button
          onClick={() => setDeckTab('cases')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            deckTab === 'cases'
              ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-500/20 ring-1 ring-pink-400'
              : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>3. All 4 Cases Declension Tables</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
            Nom / Akk / Dat / Gen
          </span>
        </button>

        <button
          onClick={() => setDeckTab('endings-matrix')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            deckTab === 'endings-matrix'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md shadow-amber-500/20 ring-1 ring-amber-400 font-black'
              : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>4. Quick Revision Endings Matrix</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: PERSONAL PRONOUNS (IMAGE 1)                       */}
      {/* ======================================================== */}
      {deckTab === 'personal' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">
              Table 1: Complete Personal Pronouns Matrix (Nominativ, Akkusativ, Dativ, Reflexiv, Possessiv)
            </span>
            <span className="text-slate-500 italic hidden sm:inline">
              Click any pronoun or sentence to pronounce
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 shadow-inner">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 font-bold uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4 w-32">Person</th>
                  <th className="py-3 px-4 text-sky-400 bg-sky-950/20 border-r border-slate-800">
                    Nominativ (Wer?)
                  </th>
                  <th className="py-3 px-4 text-emerald-400 bg-emerald-950/20 border-r border-slate-800">
                    Akkusativ (Wen?)
                  </th>
                  <th className="py-3 px-4 text-indigo-400 bg-indigo-950/20 border-r border-slate-800">
                    Dativ (Wem?)
                  </th>
                  <th className="py-3 px-4 text-pink-400 bg-pink-950/20 border-r border-slate-800">
                    Reflexiv (sich)
                  </th>
                  <th className="py-3 px-4 text-amber-400 bg-amber-950/20 border-r border-slate-800">
                    Possessiv
                  </th>
                  <th className="py-3 px-4 text-slate-400 min-w-[220px]">
                    Example Sentence
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {PERSONAL_PRONOUNS_DATA.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-2.5 px-4 font-sans text-xs font-semibold text-slate-400">
                      {row.person}
                    </td>

                    {/* Nominativ */}
                    <td className="py-2.5 px-4 bg-sky-950/10 border-r border-slate-800/60">
                      <button
                        onClick={() => onPlaySnippet(row.nominativ)}
                        className="font-bold text-sky-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group-hover:scale-105"
                      >
                        <Volume2 className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                        <span>{row.nominativ}</span>
                      </button>
                    </td>

                    {/* Akkusativ */}
                    <td className="py-2.5 px-4 bg-emerald-950/10 border-r border-slate-800/60">
                      <button
                        onClick={() => onPlaySnippet(row.akkusativ)}
                        className="font-bold text-emerald-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group-hover:scale-105"
                      >
                        <Volume2 className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                        <span>{row.akkusativ}</span>
                      </button>
                    </td>

                    {/* Dativ */}
                    <td className="py-2.5 px-4 bg-indigo-950/10 border-r border-slate-800/60">
                      <button
                        onClick={() => onPlaySnippet(row.dativ)}
                        className="font-bold text-indigo-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group-hover:scale-105"
                      >
                        <Volume2 className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                        <span>{row.dativ}</span>
                      </button>
                    </td>

                    {/* Reflexiv */}
                    <td className="py-2.5 px-4 bg-pink-950/10 border-r border-slate-800/60">
                      <button
                        onClick={() => onPlaySnippet(row.reflexiv)}
                        className="font-bold text-pink-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group-hover:scale-105"
                      >
                        <Volume2 className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                        <span>{row.reflexiv}</span>
                      </button>
                    </td>

                    {/* Possessiv */}
                    <td className="py-2.5 px-4 bg-amber-950/10 border-r border-slate-800/60">
                      <button
                        onClick={() => onPlaySnippet(row.possessiv)}
                        className="font-bold text-amber-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group-hover:scale-105"
                      >
                        <Volume2 className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                        <span>{row.possessiv}</span>
                      </button>
                    </td>

                    {/* Sentence */}
                    <td className="py-2.5 px-4 font-sans text-xs">
                      <div className="flex items-start gap-1.5">
                        <button
                          onClick={() => onPlaySnippet(row.exampleSentence)}
                          className="mt-0.5 p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                          title="Listen to sentence"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                        <div>
                          <div className="text-slate-200 leading-snug font-medium">
                            {row.exampleSentence}
                          </div>
                          <div className="text-[11px] text-slate-400 italic">
                            {row.englishSentence}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: POSSESSIVE STEMS (IMAGE 2, SECTION 1)             */}
      {/* ======================================================== */}
      {deckTab === 'stems' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">
              Table 2: Base Possessive Stems & English Meanings
            </span>
            <span className="text-slate-500 italic">
              First, learn the base stems before adding case endings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {POSSESSIVE_STEMS_DATA.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition-all flex items-center justify-between gap-3 shadow-md group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                      {item.personalPronoun}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                    <button
                      onClick={() => onPlaySnippet(item.possessiveStem)}
                      className="text-base font-black text-emerald-400 hover:text-emerald-300 font-mono cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{item.possessiveStem}</span>
                      <Volume2 className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                    </button>
                  </div>
                  <div className="text-xs text-slate-300 mt-1 font-medium">
                    {item.english}
                  </div>
                </div>

                <button
                  onClick={() => onPlaySnippet(item.possessiveStem)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                  title="Pronounce stem"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Educational Note */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Rule for Possessive Articles:</span>
              <span className="ml-1">
                These stems behave exactly like the indefinite article <span className="font-bold font-mono text-emerald-300">ein / kein</span>. They take the exact same endings based on the gender and case of the noun that follows!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: ALL 4 CASES DECLENSION (IMAGE 2, SECTION 3)       */}
      {/* ======================================================== */}
      {deckTab === 'cases' && (
        <div className="space-y-4">
          {/* Sub-Case Switcher (A. Nominativ, B. Akkusativ, C. Dativ, D. Genitiv) */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveCase('nominativ')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeCase === 'nominativ'
                    ? 'bg-sky-500 text-slate-950 font-black shadow-md shadow-sky-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                A. Nominativ (Subjekt)
              </button>
              <button
                onClick={() => setActiveCase('akkusativ')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeCase === 'akkusativ'
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                B. Akkusativ (Objekt)
              </button>
              <button
                onClick={() => setActiveCase('dativ')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeCase === 'dativ'
                    ? 'bg-indigo-500 text-white font-black shadow-md shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                C. Dativ (Wem / Präp)
              </button>
              <button
                onClick={() => setActiveCase('genitiv')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeCase === 'genitiv'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                D. Genitiv (Wessen?)
              </button>
            </div>

            <span className="text-xs text-slate-400 font-mono">
              {activeCase === 'nominativ' && 'Endings: Masc: – | Fem: -e | Neut: – | Pl: -e'}
              {activeCase === 'akkusativ' && 'Endings: Masc: -en | Fem: -e | Neut: – | Pl: -e'}
              {activeCase === 'dativ' && 'Endings: Masc: -em | Fem: -er | Neut: -em | Pl: -en (+n)'}
              {activeCase === 'genitiv' && 'Endings: Masc: -es (+s) | Fem: -er | Neut: -es (+s) | Pl: -er'}
            </span>
          </div>

          {/* Active Case Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 shadow-inner">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 font-bold uppercase text-[11px] tracking-wider font-sans">
                  <th className="py-3 px-4 w-36">Possessive Stem</th>
                  <th className="py-3 px-4 text-blue-400 bg-blue-950/20 border-r border-slate-800">
                    Masculine (der)
                  </th>
                  <th className="py-3 px-4 text-pink-400 bg-pink-950/20 border-r border-slate-800">
                    Feminine (die)
                  </th>
                  <th className="py-3 px-4 text-emerald-400 bg-emerald-950/20 border-r border-slate-800">
                    Neuter (das)
                  </th>
                  <th className="py-3 px-4 text-amber-400 bg-amber-950/20">
                    Plural (die)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {(activeCase === 'nominativ'
                  ? POSSESSIVE_NOMINATIV_TABLE
                  : activeCase === 'akkusativ'
                  ? POSSESSIVE_AKKUSATIV_TABLE
                  : activeCase === 'dativ'
                  ? POSSESSIVE_DATIV_TABLE
                  : POSSESSIVE_GENITIV_TABLE
                ).map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-2.5 px-4 font-sans font-bold text-slate-300">
                      {row.possessive}
                    </td>

                    {/* Masc */}
                    <td className="py-2.5 px-4 bg-blue-950/10 border-r border-slate-800/60 font-semibold text-blue-300">
                      <button
                        onClick={() => onPlaySnippet(row.masculine)}
                        className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group-hover:scale-105"
                      >
                        <Volume2 className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                        <span>{row.masculine}</span>
                      </button>
                    </td>

                    {/* Fem */}
                    <td className="py-2.5 px-4 bg-pink-950/10 border-r border-slate-800/60 font-semibold text-pink-300">
                      <button
                        onClick={() => onPlaySnippet(row.feminine)}
                        className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group-hover:scale-105"
                      >
                        <Volume2 className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                        <span>{row.feminine}</span>
                      </button>
                    </td>

                    {/* Neut */}
                    <td className="py-2.5 px-4 bg-emerald-950/10 border-r border-slate-800/60 font-semibold text-emerald-300">
                      <button
                        onClick={() => onPlaySnippet(row.neuter)}
                        className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group-hover:scale-105"
                      >
                        <Volume2 className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                        <span>{row.neuter}</span>
                      </button>
                    </td>

                    {/* Plural */}
                    <td className="py-2.5 px-4 bg-amber-950/10 font-semibold text-amber-300">
                      <button
                        onClick={() => onPlaySnippet(row.plural)}
                        className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group-hover:scale-105"
                      >
                        <Volume2 className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                        <span>{row.plural}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Case Mnemonic Tip */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              {activeCase === 'nominativ' && (
                <span>
                  <strong className="text-sky-300">Nominativ Rule:</strong> Masculine and Neuter take <strong>no ending (–)</strong>: <em>mein Vater, mein Kind</em>. Feminine and Plural take <strong>-e</strong>: <em>meine Mutter, meine Eltern</em>.
                </span>
              )}
              {activeCase === 'akkusativ' && (
                <span>
                  <strong className="text-emerald-300">Akkusativ Golden Rule:</strong> <em>Only</em> the masculine changes! It adds <strong>-en</strong>: <em>meinen Vater, seinen Hund, euren Tisch</em>. Feminine (-e), Neuter (–), and Plural (-e) stay identical to Nominativ!
                </span>
              )}
              {activeCase === 'dativ' && (
                <span>
                  <strong className="text-indigo-300">Dativ Mnemonic (M - R - M - N):</strong> Masculine takes <strong>-em</strong>, Feminine takes <strong>-er</strong>, Neuter takes <strong>-em</strong>, and Plural takes <strong>-en</strong> (plus +n on the noun itself: <em>mit meinen Kindern</em>)!
                </span>
              )}
              {activeCase === 'genitiv' && (
                <span>
                  <strong className="text-amber-300">Genitiv Mnemonic (S - R - S - R):</strong> Masculine takes <strong>-es</strong> (+s on noun), Feminine takes <strong>-er</strong>, Neuter takes <strong>-es</strong> (+s on noun), Plural takes <strong>-er</strong>!
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: QUICK REVISION ENDINGS TABLE (IMAGE 2, SECTION 4) */}
      {/* ======================================================== */}
      {deckTab === 'endings-matrix' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">
              Table 4: Possessive Endings – Quick Revision Table (Cheat Sheet Matrix)
            </span>
            <span className="text-amber-400 font-bold">
              Memorize this 4×4 grid for German exam success!
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 shadow-2xl">
            <table className="w-full text-center border-collapse text-sm">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 font-bold uppercase text-xs tracking-wider">
                  <th className="py-3.5 px-4 text-left w-36">Case</th>
                  <th className="py-3.5 px-4 text-blue-400 bg-blue-950/20 border-r border-slate-800">
                    Masculine
                  </th>
                  <th className="py-3.5 px-4 text-pink-400 bg-pink-950/20 border-r border-slate-800">
                    Feminine
                  </th>
                  <th className="py-3.5 px-4 text-emerald-400 bg-emerald-950/20 border-r border-slate-800">
                    Neuter
                  </th>
                  <th className="py-3.5 px-4 text-amber-400 bg-amber-950/20">
                    Plural
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-base font-mono font-black">
                {POSSESSIVE_ENDINGS_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 text-left font-sans text-xs sm:text-sm font-bold text-white">
                      {row.caseName}
                    </td>

                    {/* Masc */}
                    <td className="py-4 px-4 bg-blue-950/15 border-r border-slate-800/80 text-blue-300">
                      <span className="px-3 py-1.5 rounded-xl bg-blue-500/20 border border-blue-500/40 inline-block min-w-[50px]">
                        {row.masculine}
                      </span>
                    </td>

                    {/* Fem */}
                    <td className="py-4 px-4 bg-pink-950/15 border-r border-slate-800/80 text-pink-300">
                      <span className="px-3 py-1.5 rounded-xl bg-pink-500/20 border border-pink-500/40 inline-block min-w-[50px]">
                        {row.feminine}
                      </span>
                    </td>

                    {/* Neut */}
                    <td className="py-4 px-4 bg-emerald-950/15 border-r border-slate-800/80 text-emerald-300">
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 inline-block min-w-[50px]">
                        {row.neuter}
                      </span>
                    </td>

                    {/* Plural */}
                    <td className="py-4 px-4 bg-amber-950/15 text-amber-300">
                      <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 inline-block min-w-[50px]">
                        {row.plural}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mnemonics Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-blue-950/20 border border-blue-500/30 text-xs text-blue-200">
              <div className="font-bold text-blue-300 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Nominativ & Akkusativ Trick</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                In Nominativ, Masculine and Neuter have <strong>no ending</strong>. In Akkusativ, <em>only masculine</em> adds <strong>-en</strong>. Feminine and plural always get <strong>-e</strong>!
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 text-xs text-indigo-200">
              <div className="font-bold text-indigo-300 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Dativ (M-R-M-N) & Genitiv (S-R-S-R)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Say it out loud: <strong>M-R-M-N</strong> for Dative (meine<strong>m</strong>, meine<strong>r</strong>, meine<strong>m</strong>, meine<strong>n</strong>). <strong>S-R-S-R</strong> for Genitive (meine<strong>s</strong>, meine<strong>r</strong>, meine<strong>s</strong>, meine<strong>r</strong>)!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
