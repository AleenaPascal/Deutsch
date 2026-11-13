import React, { useState, useMemo } from 'react';
import {
  Clock,
  Compass,
  MessageSquare,
  GitMerge,
  Sparkles,
  Layers,
  ArrowUpRight,
  Bookmark,
  FileImage,
  Search,
  BookOpen,
  ArrowLeftRight,
  SlidersHorizontal,
  MapPin,
  GraduationCap,
  Info,
  CheckCircle2,
  Zap,
  Filter,
  ArrowRight,
  BookMarked,
  Table,
  LayoutGrid,
} from 'lucide-react';

import { ADJECTIVES_LIST, ADJECTIVE_CATEGORIES } from '../data/adjectives';
import { DEGREE_AMOUNT_LIST, DEGREE_AMOUNT_CATEGORIES } from '../data/degreeAndAmount';
import { TIME_FREQUENCY_LIST, TIME_FREQUENCY_CATEGORIES } from '../data/timeAndFrequency';
import { PEOPLE_THINGS_PLACES_LIST, PEOPLE_THINGS_PLACES_CATEGORIES } from '../data/peopleThingsPlaces';
import { MANNER_OPINIONS_LIST, MANNER_OPINIONS_CATEGORIES } from '../data/mannerOpinions';
import { CONNECTORS_LIST, CONNECTORS_CATEGORIES } from '../data/connectors';
import { EVERYDAY_PARTICLES_LIST, EVERYDAY_PARTICLES_CATEGORIES } from '../data/everydayParticles';
import { PREPOSITIONS_A1_B1_LIST, PREPOSITIONS_CATEGORIES } from '../data/prepositionsA1B1';
import { GRAMMAR_PREPOSITIONS_LIST, GRAMMAR_PREPOSITIONS_CATEGORIES } from '../data/grammarPrepositions';
import { VOCAB_UPGRADES_LIST, VOCAB_UPGRADES_CATEGORIES } from '../data/vocabUpgrades';
import { DESCRIPTIVE_PHRASES_LIST, DESCRIPTIVE_PHRASES_CATEGORIES } from '../data/descriptivePhrases';
import { MODAL_GRAMMAR_LIST, MODAL_GRAMMAR_CATEGORIES } from '../data/modalVerbsKonjunktiv';
import { PRONOUNS_MASTER_LIST, PRONOUNS_CATEGORIES } from '../data/pronounsAndPossessives';

import { MasterExpressionsTableView, GenericExpressionRow } from './MasterExpressionsTableView';
import { MasterExpressionsCardView } from './MasterExpressionsCardView';
import { PronounTablesDeck } from './PronounTablesDeck';

export type MasterChapterId =
  | 'adjectives'
  | 'degree-amount'
  | 'time'
  | 'people-places'
  | 'manner-opinions'
  | 'connectors'
  | 'particles'
  | 'prepositions'
  | 'grammar-prep'
  | 'vocab-upgrades'
  | 'descriptive'
  | 'modal-grammar'
  | 'pronouns';

export type ConnectorVerbFilter = 'all' | 'pos-0' | 'verb-end' | 'inversion' | 'two-part';

interface MasterReferenceViewProps {
  onPlaySnippet: (text: string) => void;
  onOpenOriginalSheet: (sheetIndex: number) => void;
}

export function MasterReferenceView({
  onPlaySnippet,
  onOpenOriginalSheet,
}: MasterReferenceViewProps) {
  const [activeChapter, setActiveChapter] = useState<MasterChapterId>('adjectives');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterStarredOnly, setFilterStarredOnly] = useState(false);
  const [connectorVerbFilter, setConnectorVerbFilter] = useState<ConnectorVerbFilter>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
  const [isPlayingSentence, setIsPlayingSentence] = useState(false);

  // Bookmarking storage per chapter
  const [bookmarks, setBookmarks] = useState<Record<string, Set<number>>>(() => {
    try {
      const saved = localStorage.getItem('master_ref_bookmarks');
      if (saved) {
        const parsed = JSON.parse(saved);
        const map: Record<string, Set<number>> = {};
        for (const k in parsed) {
          map[k] = new Set(parsed[k]);
        }
        return map;
      }
    } catch {}
    return {};
  });

  const toggleBookmark = (id: number) => {
    setBookmarks((prev) => {
      const currentSet = new Set(prev[activeChapter] || []);
      if (currentSet.has(id)) {
        currentSet.delete(id);
      } else {
        currentSet.add(id);
      }
      const updated = { ...prev, [activeChapter]: currentSet };
      try {
        const serializable: Record<string, number[]> = {};
        for (const k in updated) {
          serializable[k] = [...updated[k]];
        }
        localStorage.setItem('master_ref_bookmarks', JSON.stringify(serializable));
      } catch {}
      return updated;
    });
  };

  const handlePlaySentence = (sentence: string, id: number) => {
    setCurrentPlayingId(id);
    setIsPlayingSentence(true);
    onPlaySnippet(sentence);
    setTimeout(() => {
      setIsPlayingSentence(false);
      setCurrentPlayingId(null);
    }, 4500);
  };

  // Chapter configuration metadata for all 12 chapters
  const CHAPTERS = [
    {
      id: 'adjectives' as MasterChapterId,
      number: '1',
      title: 'Adjectives & Opposites',
      subtitle: 'Gegenteile & Eigenschaften',
      icon: ArrowLeftRight,
      count: ADJECTIVES_LIST.length,
      color: 'cyan' as const,
      sheetIndex: 25,
      categories: ADJECTIVE_CATEGORIES,
    },
    {
      id: 'degree-amount' as MasterChapterId,
      number: '2',
      title: 'Degree & Quantity',
      subtitle: 'Grad, Menge & Schätzung',
      icon: SlidersHorizontal,
      count: DEGREE_AMOUNT_LIST.length,
      color: 'violet' as const,
      sheetIndex: 26,
      categories: DEGREE_AMOUNT_CATEGORIES,
    },
    {
      id: 'time' as MasterChapterId,
      number: '3',
      title: 'Time & Frequency',
      subtitle: 'Zeit und Häufigkeit',
      icon: Clock,
      count: TIME_FREQUENCY_LIST.length,
      color: 'emerald' as const,
      sheetIndex: 27,
      categories: TIME_FREQUENCY_CATEGORIES,
    },
    {
      id: 'people-places' as MasterChapterId,
      number: '4',
      title: 'People, Things & Places',
      subtitle: 'Personen, Sachen, Orte',
      icon: Compass,
      count: PEOPLE_THINGS_PLACES_LIST.length,
      color: 'cyan' as const,
      sheetIndex: 28,
      categories: PEOPLE_THINGS_PLACES_CATEGORIES,
    },
    {
      id: 'manner-opinions' as MasterChapterId,
      number: '5',
      title: 'Manner & Opinions',
      subtitle: 'Wie? Meinungen & Gespräch',
      icon: MessageSquare,
      count: MANNER_OPINIONS_LIST.length,
      color: 'violet' as const,
      sheetIndex: 29,
      categories: MANNER_OPINIONS_CATEGORIES,
    },
    {
      id: 'connectors' as MasterChapterId,
      number: '6',
      title: 'Connectors & Linking',
      subtitle: 'Konnektoren & Verbstellung',
      icon: GitMerge,
      count: CONNECTORS_LIST.length,
      color: 'amber' as const,
      sheetIndex: 30,
      categories: CONNECTORS_CATEGORIES,
    },
    {
      id: 'particles' as MasterChapterId,
      number: '7',
      title: 'Everyday Particles',
      subtitle: 'Partikeln & kleine Wörter',
      icon: Sparkles,
      count: EVERYDAY_PARTICLES_LIST.length,
      color: 'rose' as const,
      sheetIndex: 31,
      categories: EVERYDAY_PARTICLES_CATEGORIES,
    },
    {
      id: 'prepositions' as MasterChapterId,
      number: '8',
      title: 'Prepositions (A1–B1)',
      subtitle: 'Akk, Dat, Wechsel & Genitiv',
      icon: MapPin,
      count: PREPOSITIONS_A1_B1_LIST.length,
      color: 'indigo' as const,
      sheetIndex: 35,
      categories: PREPOSITIONS_CATEGORIES,
    },
    {
      id: 'grammar-prep' as MasterChapterId,
      number: '9',
      title: 'Grammar & Prepositions',
      subtitle: 'Adjektiv/Verb + Präposition',
      icon: Layers,
      count: GRAMMAR_PREPOSITIONS_LIST.length,
      color: 'indigo' as const,
      sheetIndex: 32,
      categories: GRAMMAR_PREPOSITIONS_CATEGORIES,
    },
    {
      id: 'vocab-upgrades' as MasterChapterId,
      number: '10',
      title: 'Vocab Upgrades',
      subtitle: 'A1/A2 → B1/B2 Wortschatz',
      icon: ArrowUpRight,
      count: VOCAB_UPGRADES_LIST.length,
      color: 'emerald' as const,
      sheetIndex: 33,
      categories: VOCAB_UPGRADES_CATEGORIES,
    },
    {
      id: 'descriptive' as MasterChapterId,
      number: '11',
      title: 'Descriptive Collocations',
      subtitle: 'Wortverbindungen & B1/B2',
      icon: BookOpen,
      count: DESCRIPTIVE_PHRASES_LIST.length,
      color: 'sky' as const,
      sheetIndex: 34,
      categories: DESCRIPTIVE_PHRASES_CATEGORIES,
    },
    {
      id: 'modal-grammar' as MasterChapterId,
      number: '12',
      title: 'Modal Verbs & Konjunktiv II',
      subtitle: 'Präteritum, Werden & Höflichkeit',
      icon: GraduationCap,
      count: MODAL_GRAMMAR_LIST.length,
      color: 'rose' as const,
      sheetIndex: 36,
      categories: MODAL_GRAMMAR_CATEGORIES,
    },
    {
      id: 'pronouns' as MasterChapterId,
      number: '13',
      title: 'Pronouns & Possessives',
      subtitle: 'Personal- & Possessivartikel (4 Fälle)',
      icon: BookMarked,
      count: PRONOUNS_MASTER_LIST.length,
      color: 'sky' as const,
      sheetIndex: 37,
      categories: PRONOUNS_CATEGORIES,
    },
  ];

  const currentConfig = CHAPTERS.find((c) => c.id === activeChapter) || CHAPTERS[0];

  // Convert raw dataset to unified GenericExpressionRow
  const genericRows = useMemo<GenericExpressionRow[]>(() => {
    switch (activeChapter) {
      case 'adjectives':
        return ADJECTIVES_LIST.map((item) => ({
          id: item.id,
          mainText: item.word1,
          english: `${item.english1} ↔ ${item.english2}`,
          contrastText: item.word2,
          contrastSubtext: item.english2,
          germanSentence: item.germanSentence,
          englishSentence: item.englishSentence,
          category: item.category,
          level: 'A1/A2',
        }));

      case 'degree-amount':
        return DEGREE_AMOUNT_LIST.map((item) => ({
          id: item.id,
          mainText: item.expression,
          english: item.oppositeEnglish ? `${item.english} ↔ ${item.oppositeEnglish}` : item.english,
          contrastText: item.opposite,
          contrastSubtext: item.oppositeEnglish,
          germanSentence: item.germanSentence,
          englishSentence: item.englishSentence,
          category: item.category,
          level: 'A2/B1',
        }));

      case 'time':
        return TIME_FREQUENCY_LIST.map((item) => ({
          id: item.id,
          mainText: item.expression,
          english: item.english,
          contrastText: item.oppositeOrContrast,
          germanSentence: item.germanSentence,
          englishSentence: item.englishSentence,
          category: item.category,
          level: item.level,
        }));

      case 'people-places':
        return PEOPLE_THINGS_PLACES_LIST.map((item) => ({
          id: item.id,
          mainText: item.german,
          english: item.english,
          contrastText: item.oppositeOrContrast,
          germanSentence: item.germanSentence,
          englishSentence: item.englishSentence,
          category: item.category,
          level: item.level,
        }));

      case 'manner-opinions':
        return MANNER_OPINIONS_LIST.map((item) => ({
          id: item.id,
          mainText: item.expression,
          english: item.english,
          germanSentence: item.germanSentence,
          englishSentence: item.englishSentence,
          category: item.category,
          level: item.level,
        }));

      case 'connectors':
        return CONNECTORS_LIST.map((item) => {
          let badgeVariant: 'emerald' | 'amber' | 'violet' | 'cyan' = 'emerald';
          let verbOrderLabel = '';
          let verbOrderNote = '';

          if (item.wordOrderType === 'Type 1 (Pos 0 - Coordinating)') {
            badgeVariant = 'emerald';
            verbOrderLabel = '🟢 Pos 0 • Verb in Pos 2';
            verbOrderNote = 'ADUSO rule: Connector is Position 0. The conjugated verb remains in standard Position 2 (Connector + Subject + Verb).';
          } else if (item.wordOrderType === 'Type 2 (Verb at end - Subordinating)') {
            badgeVariant = 'amber';
            verbOrderLabel = '🏁 Nebensatz • Verb at END';
            verbOrderNote = 'Subordinating rule: Kicks the conjugated verb to the very end of the subordinate clause (Connector + Subject + ... + VERB 🏁).';
          } else if (item.wordOrderType === 'Type 3 (Pos 2 - Sentence Adverb)') {
            badgeVariant = 'violet';
            verbOrderLabel = '⚡ Inversion • Verb Next (Pos 2)';
            verbOrderNote = 'Adverbial rule (Position 1): The connector occupies Pos 1 → the conjugated verb MUST follow immediately in Pos 2 (Connector + VERB ⚡ + Subject).';
          } else {
            badgeVariant = 'cyan';
            verbOrderLabel = '🔄 Two-Part • Doppelkonnektor';
            verbOrderNote = 'Correlative pair: Connects two clauses or elements with paired syntax (z.B. sowohl... als auch, nicht nur... sondern auch).';
          }

          return {
            id: item.id,
            mainText: item.connector,
            english: item.english,
            badge: verbOrderLabel,
            badgeVariant,
            contrastText: item.wordOrderType.replace('Type ', 'Typ '),
            contrastSubtext: item.section,
            germanSentence: item.germanSentence,
            englishSentence: item.englishSentence,
            category: item.category,
            level: item.level,
            note: verbOrderNote,
          };
        });

      case 'particles':
        return EVERYDAY_PARTICLES_LIST.map((item) => ({
          id: item.id,
          mainText: item.particle,
          english: item.english,
          germanSentence: item.germanSentence,
          englishSentence: item.englishSentence,
          category: item.category,
          level: item.level,
        }));

      case 'prepositions':
        return PREPOSITIONS_A1_B1_LIST.map((item) => ({
          id: item.id,
          mainText: item.preposition,
          english: item.english,
          contrastText: item.contrastGerman,
          contrastSubtext: item.contrastEnglish,
          badge: item.caseType,
          badgeVariant:
            item.caseType === 'Akkusativ'
              ? 'rose'
              : item.caseType === 'Dativ'
              ? 'indigo'
              : item.caseType === 'Wechsel (Two-Way)'
              ? 'cyan'
              : item.caseType === 'Genitiv'
              ? 'amber'
              : item.caseType === 'Time Expression'
              ? 'emerald'
              : 'violet',
          germanSentence: item.germanSentence,
          englishSentence: item.englishSentence,
          category: item.category,
          level: item.level,
          note: item.note,
        }));

      case 'grammar-prep':
        return GRAMMAR_PREPOSITIONS_LIST.map((item) => ({
          id: item.id,
          mainText: item.pattern,
          english: item.english,
          badge: item.prepCase,
          badgeVariant: 'indigo',
          germanSentence: item.germanSentence,
          englishSentence: item.englishSentence,
          category: item.category,
          level: item.level,
        }));

      case 'vocab-upgrades':
        return VOCAB_UPGRADES_LIST.map((item) => ({
          id: item.id,
          mainText: item.basicWord,
          badge: `${item.basicLevel} Basic`,
          badgeVariant: 'emerald',
          english: item.english,
          contrastText: item.upgradedWord,
          contrastSubtext: `${item.upgradedLevel} Upgrade`,
          germanSentence: item.germanSentence,
          englishSentence: item.englishSentence,
          category: item.category,
        }));

      case 'descriptive':
        return DESCRIPTIVE_PHRASES_LIST.map((item) => ({
          id: item.id,
          mainText: item.phrase,
          english: item.english,
          badgeVariant: 'sky',
          germanSentence: item.germanSentence,
          englishSentence: item.englishSentence,
          category: item.category,
          level: item.level,
        }));

      case 'modal-grammar':
        return MODAL_GRAMMAR_LIST.map((item) => ({
          id: item.id,
          mainText: item.verbOrPattern,
          english: item.english,
          contrastText: item.contrastGerman,
          contrastSubtext: item.contrastEnglish,
          badge: item.grammarForm,
          badgeVariant:
            item.grammarForm.includes('Präsens')
              ? 'emerald'
              : item.grammarForm.includes('Präteritum')
              ? 'violet'
              : item.grammarForm.includes('Konjunktiv')
              ? 'rose'
              : 'amber',
          mainSubtext: item.conjugationSummary,
          germanSentence: item.germanSentence,
          englishSentence: item.englishSentence,
          category: item.category,
          level: item.level,
          note: item.note,
        }));

      case 'pronouns':
        return PRONOUNS_MASTER_LIST.map((item) => ({
          id: item.id,
          mainText: item.title,
          english: item.subtitle,
          contrastText: item.tableType,
          contrastSubtext: item.details,
          badge: item.tableType,
          badgeVariant:
            item.tableType === 'Personalpronomen'
              ? 'indigo'
              : item.tableType === 'Nominativ'
              ? 'cyan'
              : item.tableType === 'Akkusativ'
              ? 'emerald'
              : item.tableType === 'Dativ'
              ? 'violet'
              : item.tableType === 'Genitiv'
              ? 'amber'
              : 'rose',
          germanSentence: item.germanSentence,
          englishSentence: item.englishSentence,
          category: item.category,
          level: item.level,
          note: item.note,
        }));

      default:
        return [];
    }
  }, [activeChapter]);

  // Connectors count summary for quick pill badges
  const connectorCounts = useMemo(() => {
    if (activeChapter !== 'connectors') return null;
    return {
      all: CONNECTORS_LIST.length,
      pos0: CONNECTORS_LIST.filter((i) => i.wordOrderType === 'Type 1 (Pos 0 - Coordinating)').length,
      verbEnd: CONNECTORS_LIST.filter((i) => i.wordOrderType === 'Type 2 (Verb at end - Subordinating)').length,
      inversion: CONNECTORS_LIST.filter((i) => i.wordOrderType === 'Type 3 (Pos 2 - Sentence Adverb)').length,
      twoPart: CONNECTORS_LIST.filter((i) => i.wordOrderType === 'Type 4 (Two-Part Structure)').length,
    };
  }, [activeChapter]);

  // Filter rows based on query, category, star filter, and connector verb filter
  const filteredRows = useMemo(() => {
    const chapterBookmarks = bookmarks[activeChapter] || new Set();

    return genericRows.filter((row) => {
      if (filterStarredOnly && !chapterBookmarks.has(row.id)) return false;

      // Special Verb Position filtering for Chapter 6 Connectors
      if (activeChapter === 'connectors' && connectorVerbFilter !== 'all') {
        if (connectorVerbFilter === 'pos-0' && !row.badge?.includes('Pos 0')) return false;
        if (connectorVerbFilter === 'verb-end' && !row.badge?.includes('Verb at END')) return false;
        if (connectorVerbFilter === 'inversion' && !row.badge?.includes('Inversion')) return false;
        if (connectorVerbFilter === 'two-part' && !row.badge?.includes('Two-Part')) return false;
      }

      if (selectedCategory !== 'All' && !selectedCategory.startsWith('All (')) {
        if (row.category !== selectedCategory) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const m1 = row.mainText.toLowerCase().includes(q);
        const m2 = row.english.toLowerCase().includes(q);
        const m3 = row.contrastText?.toLowerCase().includes(q);
        const m4 = row.germanSentence.toLowerCase().includes(q);
        const m5 = row.englishSentence.toLowerCase().includes(q);
        const m6 = row.note?.toLowerCase().includes(q);
        return m1 || m2 || m3 || m4 || m5 || m6;
      }

      return true;
    });
  }, [
    genericRows,
    searchQuery,
    selectedCategory,
    filterStarredOnly,
    connectorVerbFilter,
    bookmarks,
    activeChapter,
  ]);

  return (
    <div className="space-y-6">
      {/* Chapter Selection Bar with all 13 chapters */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between gap-4 mb-3 px-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
              Master German Grammar & Expression Reference Decks (14 Cheat Sheets Complete: Ch 1–13)
            </span>
          </div>

          <button
            onClick={() => onOpenOriginalSheet(currentConfig.sheetIndex)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-all cursor-pointer shadow-sm"
            title="Inspect authentic scanned cheat sheet in full zoom"
          >
            <FileImage className="w-3.5 h-3.5" />
            <span>View Ch {currentConfig.number} Original Sheet</span>
          </button>
        </div>

        {/* 13 Chapters Grid / Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-13 gap-2">
          {CHAPTERS.map((chap) => {
            const Icon = chap.icon;
            const isActive = activeChapter === chap.id;

            return (
              <button
                key={chap.id}
                onClick={() => {
                  setActiveChapter(chap.id);
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setConnectorVerbFilter('all');
                }}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl text-center border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center mb-1 ${
                    isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="font-bold text-[11px] truncate max-w-full">
                  Ch {chap.number}
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-full font-medium">
                  {chap.title.split(' ')[0]}
                </div>
                <div className="text-[9px] text-slate-500 mt-0.5">
                  {chap.count} Items
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Verb Order Study Guide for Chapter 6 Connectors */}
      {activeChapter === 'connectors' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
                <GitMerge className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  German Verb Position Rules (Where Does the Conjugated Verb Go?)
                </h3>
                <p className="text-xs text-slate-400">
                  German connectors fall into 4 strict word order types. Click any card below to study that group exclusively:
                </p>
              </div>
            </div>

            {connectorVerbFilter !== 'all' && (
              <button
                onClick={() => setConnectorVerbFilter('all')}
                className="self-start sm:self-auto text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer border border-slate-700"
              >
                Reset Filter (Show All 57)
              </button>
            )}
          </div>

          {/* 4 Interactive Verb Order Cards with Distinct Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Card 1: Position 0 (Emerald) */}
            <button
              onClick={() => setConnectorVerbFilter(connectorVerbFilter === 'pos-0' ? 'all' : 'pos-0')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                connectorVerbFilter === 'pos-0'
                  ? 'bg-emerald-950/40 border-emerald-400 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400'
                  : 'bg-emerald-950/15 border-emerald-500/30 hover:border-emerald-500/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Type 1 • Pos 0
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {connectorCounts?.pos0 || 4} words
                </span>
              </div>
              <div className="font-bold text-xs text-white">
                Normal S + V (Verb Pos 2) 🟢
              </div>
              <div className="text-[11px] font-mono text-emerald-300/90 mt-1 bg-emerald-950/40 px-1.5 py-0.5 rounded w-fit border border-emerald-800/40">
                [Konnektor] + Subjekt + VERB (2)
              </div>
              <div className="text-[11px] text-slate-300 mt-1.5">
                <span className="font-semibold text-emerald-400">ADUSO:</span> aber, denn, und, sondern, oder, sowie
              </div>
              <div className="text-[10px] text-slate-400 italic mt-1">
                "Ich bleibe da, <span className="text-emerald-300 font-bold">denn</span> ich <span className="underline decoration-emerald-400 font-bold">bin</span> krank."
              </div>
            </button>

            {/* Card 2: Verb at End (Amber) */}
            <button
              onClick={() => setConnectorVerbFilter(connectorVerbFilter === 'verb-end' ? 'all' : 'verb-end')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                connectorVerbFilter === 'verb-end'
                  ? 'bg-amber-950/40 border-amber-400 shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                  : 'bg-amber-950/15 border-amber-500/30 hover:border-amber-500/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Type 2 • Nebensatz
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {connectorCounts?.verbEnd || 21} words
                </span>
              </div>
              <div className="font-bold text-xs text-white">
                Verb at the END 🏁
              </div>
              <div className="text-[11px] font-mono text-amber-300/90 mt-1 bg-amber-950/40 px-1.5 py-0.5 rounded w-fit border border-amber-800/40">
                [Konnektor] + Subjekt + ... + VERB 🏁
              </div>
              <div className="text-[11px] text-slate-300 mt-1.5">
                <span className="font-semibold text-amber-400">Subordinators:</span> weil, dass, wenn, obwohl, da, damit...
              </div>
              <div className="text-[10px] text-slate-400 italic mt-1">
                "Ich lerne, <span className="text-amber-300 font-bold">weil</span> ich die Prüfung <span className="underline decoration-amber-400 font-bold">bestehe</span>."
              </div>
            </button>

            {/* Card 3: Inversion (Violet) */}
            <button
              onClick={() => setConnectorVerbFilter(connectorVerbFilter === 'inversion' ? 'all' : 'inversion')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                connectorVerbFilter === 'inversion'
                  ? 'bg-violet-950/40 border-violet-400 shadow-md shadow-violet-500/20 ring-1 ring-violet-400'
                  : 'bg-violet-950/15 border-violet-500/30 hover:border-violet-500/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-500/40">
                  Type 3 • Inversion
                </span>
                <span className="text-xs font-mono font-bold text-violet-400">
                  {connectorCounts?.inversion || 25} words
                </span>
              </div>
              <div className="font-bold text-xs text-white">
                Verb Immediately Next ⚡
              </div>
              <div className="text-[11px] font-mono text-violet-300/90 mt-1 bg-violet-950/40 px-1.5 py-0.5 rounded w-fit border border-violet-800/40">
                [Konnektor (1)] + VERB (2) + Subjekt
              </div>
              <div className="text-[11px] text-slate-300 mt-1.5">
                <span className="font-semibold text-violet-400">Adverbs:</span> deshalb, darum, trotzdem, sonst, außerdem...
              </div>
              <div className="text-[10px] text-slate-400 italic mt-1">
                "Es regnet, <span className="text-violet-300 font-bold">trotzdem</span> <span className="underline decoration-violet-400 font-bold">gehe</span> ich raus."
              </div>
            </button>

            {/* Card 4: Two-Part (Cyan) */}
            <button
              onClick={() => setConnectorVerbFilter(connectorVerbFilter === 'two-part' ? 'all' : 'two-part')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                connectorVerbFilter === 'two-part'
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400'
                  : 'bg-cyan-950/15 border-cyan-500/30 hover:border-cyan-500/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Type 4 • Doppel
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {connectorCounts?.twoPart || 7} words
                </span>
              </div>
              <div className="font-bold text-xs text-white">
                Two-Part Structure 🔄
              </div>
              <div className="text-[11px] font-mono text-cyan-300/90 mt-1 bg-cyan-950/40 px-1.5 py-0.5 rounded w-fit border border-cyan-800/40">
                [Teil 1 ...] + [Teil 2 ...]
              </div>
              <div className="text-[11px] text-slate-300 mt-1.5">
                <span className="font-semibold text-cyan-400">Pairs:</span> sowohl... als auch, nicht nur... sondern auch
              </div>
              <div className="text-[10px] text-slate-400 italic mt-1">
                "<span className="text-cyan-300 font-bold">Sowohl</span> Kinder <span className="text-cyan-300 font-bold">als auch</span> Erwachsene."
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Interactive Pronoun & Possessive Tables Deck for Chapter 13 */}
      {activeChapter === 'pronouns' && (
        <PronounTablesDeck
          onPlaySnippet={onPlaySnippet}
          onOpenOriginalSheet={onOpenOriginalSheet}
        />
      )}

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${currentConfig.title} (German, English, rules, sentences)...`}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Category Pills / Dropdown */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Verb Position Filter buttons if in Connectors mode */}
          {activeChapter === 'connectors' && (
            <div className="hidden md:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setConnectorVerbFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  connectorVerbFilter === 'all'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All (57)
              </button>
              <button
                onClick={() => setConnectorVerbFilter('pos-0')}
                className={`px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  connectorVerbFilter === 'pos-0'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-emerald-400 hover:bg-emerald-950/40'
                }`}
              >
                🟢 Pos 0 (4)
              </button>
              <button
                onClick={() => setConnectorVerbFilter('verb-end')}
                className={`px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  connectorVerbFilter === 'verb-end'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-amber-400 hover:bg-amber-950/40'
                }`}
              >
                🏁 Verb End (21)
              </button>
              <button
                onClick={() => setConnectorVerbFilter('inversion')}
                className={`px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  connectorVerbFilter === 'inversion'
                    ? 'bg-violet-500 text-slate-950'
                    : 'text-violet-400 hover:bg-violet-950/40'
                }`}
              >
                ⚡ Inversion (25)
              </button>
              <button
                onClick={() => setConnectorVerbFilter('two-part')}
                className={`px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  connectorVerbFilter === 'two-part'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-cyan-400 hover:bg-cyan-950/40'
                }`}
              >
                🔄 Two-Part (7)
              </button>
            </div>
          )}

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="All">All Topics ({genericRows.length})</option>
            {currentConfig.categories
              .filter((c) => !c.startsWith('All ('))
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>

          {/* Bookmarked toggle */}
          <button
            onClick={() => setFilterStarredOnly(!filterStarredOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              filterStarredOnly
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${filterStarredOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>Starred ({(bookmarks[activeChapter] || new Set()).size})</span>
          </button>

          {/* Table / Card View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Display as comprehensive table"
            >
              <Table className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Display as interactive cards"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Content: Table View vs Card View */}
      {viewMode === 'table' ? (
        <MasterExpressionsTableView
          title={`Chapter ${currentConfig.number}: ${currentConfig.title}`}
          themeColor={currentConfig.color}
          items={filteredRows}
          currentPlayingId={currentPlayingId}
          isPlaying={isPlayingSentence}
          bookmarkedIds={bookmarks[activeChapter] || new Set()}
          onPlaySentence={handlePlaySentence}
          onPlaySnippet={onPlaySnippet}
          onToggleBookmark={toggleBookmark}
        />
      ) : (
        <MasterExpressionsCardView
          title={`Chapter ${currentConfig.number}: ${currentConfig.title}`}
          themeColor={currentConfig.color}
          items={filteredRows}
          currentPlayingId={currentPlayingId}
          isPlaying={isPlayingSentence}
          bookmarkedIds={bookmarks[activeChapter] || new Set()}
          onPlaySentence={handlePlaySentence}
          onPlaySnippet={onPlaySnippet}
          onToggleBookmark={toggleBookmark}
        />
      )}
    </div>
  );
}
