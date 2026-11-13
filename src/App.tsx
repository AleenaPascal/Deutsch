import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Volume2,
  Play,
  Pause,
  Layers,
  Table as TableIcon,
  HelpCircle,
  FileImage,
  Search,
  Filter,
  Sparkles,
  Star,
  CheckCircle2,
  Headphones,
  SlidersHorizontal,
  ChevronDown,
  Info,
  BookOpen,
  FileText,
  Download,
  FileAudio,
  Bookmark,
  Award,
  ArrowLeftRight,
  SpellCheck,
  MessageCircle,
} from 'lucide-react';
import { VOCABULARY_LIST, VocabItem, CATEGORIES } from './data/vocabulary';
import { A1_VERBS_LIST, A1VerbItem, A1_CATEGORIES } from './data/a1Verbs';
import { A2_VERBS_LIST, A2_CATEGORIES } from './data/a2Verbs';
import { NOUNS_LIST, NounItem, Gender, GENDER_CONFIG } from './data/nouns';
import { A1_NOUNS_LIST, A1_NOUN_CATEGORIES } from './data/a1Nouns';
import { A2_NOUNS_LIST, A2_NOUN_CATEGORIES } from './data/a2Nouns';
import { ADJECTIVES_LIST, AdjectiveOppositeItem, ADJECTIVE_CATEGORIES } from './data/adjectives';
import { DEGREE_AMOUNT_LIST, DegreeAmountItem, DEGREE_AMOUNT_CATEGORIES } from './data/degreeAndAmount';
import {
  AudioOptions,
  VoiceEngine,
  ReadMode,
  GeminiVoice,
  playItemAudio,
  playNounAudio,
  playAdjectiveAudio,
  playDegreeAmountAudio,
  stopAllAudio,
  buildAudioScript,
  buildNounAudioScript,
  playSnippet,
  downloadItemWav,
  downloadNounWav,
} from './services/audioService';
import { TableView } from './components/TableView';
import { FlashcardView } from './components/FlashcardView';
import { QuizView } from './components/QuizView';
import { NounTableView } from './components/NounTableView';
import { NounFlashcardView } from './components/NounFlashcardView';
import { NounGenderQuizView } from './components/NounGenderQuizView';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { OriginalImageModal } from './components/OriginalImageModal';
import { RecorderModal } from './components/RecorderModal';
import { AudioCompilerModal } from './components/AudioCompilerModal';
import { MasterReferenceView } from './components/MasterReferenceView';
import { SentenceCorrectorView } from './components/SentenceCorrectorView';
import { GermanAIChatDrawer } from './components/GermanAIChatDrawer';

type ContentSection =
  | 'a1-verbs'
  | 'a2-verbs'
  | 'verbs'
  | 'a1-nouns'
  | 'a2-nouns'
  | 'nouns'
  | 'adjectives'
  | 'degree-amount'
  | 'master-ref'
  | 'sentence-checker';
type ActiveTab = 'table' | 'flashcards' | 'quiz';

export default function App() {
  // Main Module Toggle: A1 Verbs (278), A2 Verbs (252), B1-B2 Verbs (309), A1 Nouns (648), A2 Nouns (599), B1 Nouns (460)
  const [contentSection, setContentSection] = useState<ContentSection>('a1-verbs');

  // Navigation & View state
  const [activeTab, setActiveTab] = useState<ActiveTab>('table');
  const [showOriginalImage, setShowOriginalImage] = useState(false);
  const [overrideSheetIndex, setOverrideSheetIndex] = useState<number | null>(null);
  const [showAudioCompiler, setShowAudioCompiler] = useState(false);
  const [recordingItem, setRecordingItem] = useState<VocabItem | NounItem | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);

  // -------------------------
  // A1 VERBS STATE (278)
  // -------------------------
  const [a1SearchQuery, setA1SearchQuery] = useState('');
  const [selectedA1Category, setSelectedA1Category] = useState('All (278)');
  const [selectedA1Range, setSelectedA1Range] = useState<string>('all');
  const [filterA1Auxiliary, setFilterA1Auxiliary] = useState<'all' | 'haben' | 'sein'>('all');
  const [filterA1SeparableOnly, setFilterA1SeparableOnly] = useState(false);
  const [filterA1BookmarkedOnly, setFilterA1BookmarkedOnly] = useState(false);
  const [a1BookmarkedIds, setA1BookmarkedIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('a1_verb_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleA1Bookmark = (id: number) => {
    setA1BookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('a1_verb_bookmarks', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  // -------------------------
  // A2 VERBS STATE (252)
  // -------------------------
  const [a2SearchQuery, setA2SearchQuery] = useState('');
  const [selectedA2Category, setSelectedA2Category] = useState(`All (${A2_VERBS_LIST.length})`);
  const [selectedA2Range, setSelectedA2Range] = useState<string>('all');
  const [filterA2Auxiliary, setFilterA2Auxiliary] = useState<'all' | 'haben' | 'sein'>('all');
  const [filterA2SeparableOnly, setFilterA2SeparableOnly] = useState(false);
  const [filterA2ReflexiveOnly, setFilterA2ReflexiveOnly] = useState(false);
  const [filterA2BookmarkedOnly, setFilterA2BookmarkedOnly] = useState(false);
  const [a2BookmarkedIds, setA2BookmarkedIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('a2_verb_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleA2Bookmark = (id: number) => {
    setA2BookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('a2_verb_bookmarks', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  // -------------------------
  // B1-B2 VERBS STATE (309)
  // -------------------------
  const [verbSearchQuery, setVerbSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All (309)');
  const [selectedRange, setSelectedRange] = useState<string>('all');
  const [filterSeparable, setFilterSeparable] = useState(false);
  const [filterReflexive, setFilterReflexive] = useState(false);
  const [filterPreposition, setFilterPreposition] = useState(false);
  const [filterVerbBookmarkedOnly, setFilterVerbBookmarkedOnly] = useState(false);
  const [verbBookmarkedIds, setVerbBookmarkedIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('vocab_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // -------------------------
  // A1 NOUNS STATE (648)
  // -------------------------
  const [a1NounSearchQuery, setA1NounSearchQuery] = useState('');
  const [selectedA1NounRange, setSelectedA1NounRange] = useState<string>('all');
  const [a1NounGenderFilter, setA1NounGenderFilter] = useState<'all' | 'masculine' | 'feminine' | 'neuter' | 'dual' | 'starred'>('all');
  const [selectedA1NounCategory, setSelectedA1NounCategory] = useState('All');
  const [a1NounBookmarkedIds, setA1NounBookmarkedIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('a1_noun_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleA1NounBookmark = (id: number) => {
    setA1NounBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('a1_noun_bookmarks', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  // -------------------------
  // A2 NOUNS STATE (599)
  // -------------------------
  const [a2NounSearchQuery, setA2NounSearchQuery] = useState('');
  const [selectedA2NounRange, setSelectedA2NounRange] = useState<string>('all');
  const [a2NounGenderFilter, setA2NounGenderFilter] = useState<'all' | 'masculine' | 'feminine' | 'neuter' | 'dual' | 'starred'>('all');
  const [selectedA2NounCategory, setSelectedA2NounCategory] = useState('All');
  const [a2NounBookmarkedIds, setA2NounBookmarkedIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('a2_noun_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleA2NounBookmark = (id: number) => {
    setA2NounBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('a2_noun_bookmarks', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  // -------------------------
  // B1 NOUNS STATE (460)
  // -------------------------
  const [nounSearchQuery, setNounSearchQuery] = useState('');
  const [selectedNounRange, setSelectedNounRange] = useState<string>('all');
  const [nounGenderFilter, setNounGenderFilter] = useState<'all' | 'masculine' | 'feminine' | 'neuter' | 'starred'>('all');
  const [nounBookmarkedIds, setNounBookmarkedIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('noun_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // -------------------------
  // ADJECTIVES & OPPOSITES STATE (52 Pairs)
  // -------------------------
  const [adjectiveSearchQuery, setAdjectiveSearchQuery] = useState('');
  const [selectedAdjectiveCategory, setSelectedAdjectiveCategory] = useState(`All (${ADJECTIVES_LIST.length})`);
  const [adjectiveBookmarkedIds, setAdjectiveBookmarkedIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('adj_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleAdjectiveBookmark = (id: number) => {
    setAdjectiveBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('adj_bookmarks', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  // -------------------------
  // DEGREE, AMOUNT & APPROXIMATION STATE (40)
  // -------------------------
  const [degreeSearchQuery, setDegreeSearchQuery] = useState('');
  const [selectedDegreeCategory, setSelectedDegreeCategory] = useState(`All (${DEGREE_AMOUNT_LIST.length})`);
  const [degreeBookmarkedIds, setDegreeBookmarkedIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('degree_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleDegreeBookmark = (id: number) => {
    setDegreeBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('degree_bookmarks', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  // -------------------------
  // AUDIO PLAYBACK STATE
  // -------------------------
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [pauseBetweenSec, setPauseBetweenSec] = useState<number>(1);
  const [repeatCount, setRepeatCount] = useState<number>(1);
  const [activeEngine, setActiveEngine] = useState<VoiceEngine>('gemini');

  const [audioOptions, setAudioOptions] = useState<AudioOptions>({
    engine: 'gemini',
    geminiVoice: 'Kore',
    rate: 1.0,
    readMode: 'full',
  });

  // Track repeat iteration for continuous auto-play
  const repeatStepRef = useRef<number>(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  isPlayingRef.current = isPlaying;

  // Filtered A1 Verbs dataset
  const filteredA1Verbs = useMemo(() => {
    return A1_VERBS_LIST.filter((item) => {
      // Range filter
      if (selectedA1Range === '1-100' && (item.id < 1 || item.id > 100)) return false;
      if (selectedA1Range === '101-200' && (item.id < 101 || item.id > 200)) return false;
      if (selectedA1Range === '201-278' && (item.id < 201 || item.id > 278)) return false;
      if (selectedA1Range === 'separable' && (!item.isSeparable || item.id < 236)) return false;

      // Category filter
      if (selectedA1Category !== 'All (278)' && item.category !== selectedA1Category) return false;

      // Auxiliary filter (haben vs sein)
      if (filterA1Auxiliary === 'haben' && !item.auxiliary.includes('haben')) return false;
      if (filterA1Auxiliary === 'sein' && !item.auxiliary.includes('sein')) return false;

      // Separable only filter
      if (filterA1SeparableOnly && !item.isSeparable) return false;

      // Bookmarked filter
      if (filterA1BookmarkedOnly && !a1BookmarkedIds.has(item.id)) return false;

      // Search query
      if (a1SearchQuery.trim()) {
        const q = a1SearchQuery.toLowerCase();
        const matchesVerb = item.verb.toLowerCase().includes(q);
        const matchesEnglish = item.english.toLowerCase().includes(q);
        const matchesPerfekt = item.perfekt.toLowerCase().includes(q);
        const matchesAux = item.auxiliary.toLowerCase().includes(q);
        const matchesSentence =
          item.germanSentence.toLowerCase().includes(q) || item.englishSentence.toLowerCase().includes(q);
        return matchesVerb || matchesEnglish || matchesPerfekt || matchesAux || matchesSentence;
      }

      return true;
    });
  }, [
    a1SearchQuery,
    selectedA1Category,
    selectedA1Range,
    filterA1Auxiliary,
    filterA1SeparableOnly,
    filterA1BookmarkedOnly,
    a1BookmarkedIds,
  ]);

  // Filtered A2 Verbs dataset (252)
  const filteredA2Verbs = useMemo(() => {
    return A2_VERBS_LIST.filter((item) => {
      if (selectedA2Range === '1-100' && (item.id < 1 || item.id > 100)) return false;
      if (selectedA2Range === '101-200' && (item.id < 101 || item.id > 200)) return false;
      if (selectedA2Range === '201-252' && (item.id < 201 || item.id > 260)) return false;

      if (selectedA2Category !== `All (${A2_VERBS_LIST.length})`) {
        if (selectedA2Category === 'Reflexive Verbs') {
          if (!item.isReflexive) return false;
        } else if (selectedA2Category === 'Separable Verbs') {
          if (!item.isSeparable) return false;
        } else if (item.category !== selectedA2Category) {
          return false;
        }
      }

      if (filterA2Auxiliary === 'haben' && !item.auxiliary.includes('haben')) return false;
      if (filterA2Auxiliary === 'sein' && !item.auxiliary.includes('sein')) return false;
      if (filterA2SeparableOnly && !item.isSeparable) return false;
      if (filterA2ReflexiveOnly && !item.isReflexive) return false;
      if (filterA2BookmarkedOnly && !a2BookmarkedIds.has(item.id)) return false;

      if (a2SearchQuery.trim()) {
        const q = a2SearchQuery.toLowerCase();
        const matchesVerb = item.verb.toLowerCase().includes(q);
        const matchesEnglish = item.english.toLowerCase().includes(q);
        const matchesPerfekt = item.perfekt.toLowerCase().includes(q);
        const matchesAux = item.auxiliary.toLowerCase().includes(q);
        const matchesSentence =
          item.germanSentence.toLowerCase().includes(q) || item.englishSentence.toLowerCase().includes(q);
        return matchesVerb || matchesEnglish || matchesPerfekt || matchesAux || matchesSentence;
      }

      return true;
    });
  }, [
    a2SearchQuery,
    selectedA2Category,
    selectedA2Range,
    filterA2Auxiliary,
    filterA2SeparableOnly,
    filterA2ReflexiveOnly,
    filterA2BookmarkedOnly,
    a2BookmarkedIds,
  ]);

  // Filtered Verbs dataset (B1-B2, 309)
  const filteredVerbs = useMemo(() => {
    return VOCABULARY_LIST.filter((item) => {
      // Range filter
      if (selectedRange === 'sheet-1' && (item.id < 1 || item.id > 100)) return false;
      if (selectedRange === 'sheet-2' && (item.id < 101 || item.id > 200)) return false;
      if (selectedRange === 'sheet-3' && (item.id < 201 || item.id > 309)) return false;

      if (selectedRange === '1-50' && (item.id < 1 || item.id > 50)) return false;
      if (selectedRange === '51-100' && (item.id < 51 || item.id > 100)) return false;
      if (selectedRange === '101-150' && (item.id < 101 || item.id > 150)) return false;
      if (selectedRange === '151-200' && (item.id < 151 || item.id > 200)) return false;
      if (selectedRange === '201-250' && (item.id < 201 || item.id > 250)) return false;
      if (selectedRange === '251-309' && (item.id < 251 || item.id > 309)) return false;

      // Category filter
      if (selectedCategory !== 'All (309)' && item.category !== selectedCategory) return false;

      // Grammar tags
      if (filterSeparable && !item.isSeparable) return false;
      if (filterReflexive && !item.isReflexive) return false;
      if (filterPreposition && !item.preposition) return false;
      if (filterVerbBookmarkedOnly && !verbBookmarkedIds.has(item.id)) return false;

      // Search query
      if (verbSearchQuery.trim()) {
        const q = verbSearchQuery.toLowerCase();
        const matchesVerb = item.verb.toLowerCase().includes(q);
        const matchesEnglish = item.english.toLowerCase().includes(q);
        const matchesPerfekt = item.perfekt.toLowerCase().includes(q);
        const matchesSentence = item.germanSentence.toLowerCase().includes(q) || item.englishSentence.toLowerCase().includes(q);
        return matchesVerb || matchesEnglish || matchesPerfekt || matchesSentence;
      }

      return true;
    });
  }, [
    verbSearchQuery,
    selectedCategory,
    selectedRange,
    filterSeparable,
    filterReflexive,
    filterPreposition,
    filterVerbBookmarkedOnly,
    verbBookmarkedIds,
  ]);

  // Filtered A1 Nouns dataset (648)
  const filteredA1Nouns = useMemo(() => {
    return A1_NOUNS_LIST.filter((item) => {
      if (selectedA1NounRange === 'sheet-1' && (item.id < 1 || item.id > 216)) return false;
      if (selectedA1NounRange === 'sheet-2' && (item.id < 217 || item.id > 396)) return false;
      if (selectedA1NounRange === 'sheet-3' && (item.id < 397 || item.id > 648)) return false;

      if (selectedA1NounCategory !== 'All' && item.category !== selectedA1NounCategory) return false;

      if (a1NounGenderFilter === 'masculine' && item.gender !== 'masculine') return false;
      if (a1NounGenderFilter === 'feminine' && item.gender !== 'feminine') return false;
      if (a1NounGenderFilter === 'neuter' && item.gender !== 'neuter') return false;
      if (a1NounGenderFilter === 'dual' && item.gender !== 'dual') return false;
      if (a1NounGenderFilter === 'starred' && !a1NounBookmarkedIds.has(item.id)) return false;

      if (a1NounSearchQuery.trim()) {
        const q = a1NounSearchQuery.toLowerCase();
        const matchesNoun = item.noun.toLowerCase().includes(q);
        const matchesArticle = item.article.toLowerCase().includes(q);
        const matchesEnglish = item.english.toLowerCase().includes(q);
        const matchesPlural = item.plural.toLowerCase().includes(q);
        const matchesSentence =
          item.germanSentence.toLowerCase().includes(q) || item.englishSentence.toLowerCase().includes(q);
        return matchesNoun || matchesArticle || matchesEnglish || matchesPlural || matchesSentence;
      }

      return true;
    });
  }, [
    a1NounSearchQuery,
    selectedA1NounRange,
    selectedA1NounCategory,
    a1NounGenderFilter,
    a1NounBookmarkedIds,
  ]);

  // Filtered A2 Nouns dataset (599)
  const filteredA2Nouns = useMemo(() => {
    return A2_NOUNS_LIST.filter((item) => {
      if (selectedA2NounRange === 'sheet-1' && (item.id < 1 || item.id > 100)) return false;
      if (selectedA2NounRange === 'sheet-2' && (item.id < 101 || item.id > 200)) return false;
      if (selectedA2NounRange === 'sheet-3' && (item.id < 201 || item.id > 300)) return false;
      if (selectedA2NounRange === 'sheet-4' && (item.id < 301 || item.id > 400)) return false;
      if (selectedA2NounRange === 'sheet-5' && (item.id < 401 || item.id > 500)) return false;
      if (selectedA2NounRange === 'sheet-6' && (item.id < 501 || item.id > 608)) return false;

      if (selectedA2NounCategory !== 'All' && item.category !== selectedA2NounCategory) return false;

      if (a2NounGenderFilter === 'masculine' && item.gender !== 'masculine') return false;
      if (a2NounGenderFilter === 'feminine' && item.gender !== 'feminine') return false;
      if (a2NounGenderFilter === 'neuter' && item.gender !== 'neuter') return false;
      if (a2NounGenderFilter === 'dual' && item.gender !== 'dual') return false;
      if (a2NounGenderFilter === 'starred' && !a2NounBookmarkedIds.has(item.id)) return false;

      if (a2NounSearchQuery.trim()) {
        const q = a2NounSearchQuery.toLowerCase();
        const matchesNoun = item.noun.toLowerCase().includes(q);
        const matchesArticle = item.article.toLowerCase().includes(q);
        const matchesEnglish = item.english.toLowerCase().includes(q);
        const matchesPlural = item.plural.toLowerCase().includes(q);
        const matchesSentence =
          item.germanSentence.toLowerCase().includes(q) || item.englishSentence.toLowerCase().includes(q);
        return matchesNoun || matchesArticle || matchesEnglish || matchesPlural || matchesSentence;
      }

      return true;
    });
  }, [
    a2NounSearchQuery,
    selectedA2NounRange,
    selectedA2NounCategory,
    a2NounGenderFilter,
    a2NounBookmarkedIds,
  ]);

  // Filtered B1 Nouns dataset (460)
  const filteredNouns = useMemo(() => {
    return NOUNS_LIST.filter((item) => {
      // Range filter
      if (selectedNounRange === '1-100' && (item.id < 1 || item.id > 100)) return false;
      if (selectedNounRange === '201-300' && (item.id < 201 || item.id > 300)) return false;
      if (selectedNounRange === '301-400' && (item.id < 301 || item.id > 400)) return false;
      if (selectedNounRange === '401-500' && (item.id < 401 || item.id > 500)) return false;
      if (selectedNounRange === '501-560' && (item.id < 501 || item.id > 560)) return false;

      // Gender filter
      if (nounGenderFilter === 'masculine' && item.gender !== 'masculine') return false;
      if (nounGenderFilter === 'feminine' && item.gender !== 'feminine') return false;
      if (nounGenderFilter === 'neuter' && item.gender !== 'neuter') return false;
      if (nounGenderFilter === 'starred' && !nounBookmarkedIds.has(item.id)) return false;

      // Search query
      if (nounSearchQuery.trim()) {
        const q = nounSearchQuery.toLowerCase();
        const matchesNoun = item.noun.toLowerCase().includes(q);
        const matchesArticle = item.article.toLowerCase().includes(q);
        const matchesEnglish = item.english.toLowerCase().includes(q);
        const matchesPlural = item.plural.toLowerCase().includes(q);
        const matchesSentence = item.germanSentence.toLowerCase().includes(q) || item.englishSentence.toLowerCase().includes(q);
        return matchesNoun || matchesArticle || matchesEnglish || matchesPlural || matchesSentence;
      }

      return true;
    });
  }, [nounSearchQuery, selectedNounRange, nounGenderFilter, nounBookmarkedIds]);

  // Filtered Adjectives & Opposites dataset (52)
  const filteredAdjectives = useMemo(() => {
    return ADJECTIVES_LIST.filter((item) => {
      if (
        selectedAdjectiveCategory !== `All (${ADJECTIVES_LIST.length})` &&
        item.category !== selectedAdjectiveCategory
      ) {
        return false;
      }

      if (adjectiveSearchQuery.trim()) {
        const q = adjectiveSearchQuery.toLowerCase();
        return (
          item.word1.toLowerCase().includes(q) ||
          item.word2.toLowerCase().includes(q) ||
          item.english1.toLowerCase().includes(q) ||
          item.english2.toLowerCase().includes(q) ||
          item.germanSentence.toLowerCase().includes(q) ||
          item.englishSentence.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [adjectiveSearchQuery, selectedAdjectiveCategory]);

  // Filtered Degree, Amount & Approximation dataset (40)
  const filteredDegreeAmount = useMemo(() => {
    return DEGREE_AMOUNT_LIST.filter((item) => {
      if (
        selectedDegreeCategory !== `All (${DEGREE_AMOUNT_LIST.length})` &&
        item.category !== selectedDegreeCategory
      ) {
        return false;
      }

      if (degreeSearchQuery.trim()) {
        const q = degreeSearchQuery.toLowerCase();
        return (
          item.expression.toLowerCase().includes(q) ||
          item.opposite.toLowerCase().includes(q) ||
          item.english.toLowerCase().includes(q) ||
          item.oppositeEnglish.toLowerCase().includes(q) ||
          item.germanSentence.toLowerCase().includes(q) ||
          item.englishSentence.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [degreeSearchQuery, selectedDegreeCategory]);

  // Determine current active list and current item based on contentSection
  const activeItems =
    contentSection === 'a1-verbs'
      ? filteredA1Verbs
      : contentSection === 'a2-verbs'
      ? filteredA2Verbs
      : contentSection === 'verbs'
      ? filteredVerbs
      : contentSection === 'a1-nouns'
      ? filteredA1Nouns
      : contentSection === 'a2-nouns'
      ? filteredA2Nouns
      : contentSection === 'adjectives'
      ? filteredAdjectives
      : contentSection === 'degree-amount'
      ? filteredDegreeAmount
      : contentSection === 'master-ref'
      ? []
      : filteredNouns;
  const currentItem = activeItems[currentIndex] || activeItems[0] || null;

  // Save verb bookmarks
  const toggleVerbBookmark = (id: number) => {
    setVerbBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('vocab_bookmarks', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  // Save noun bookmarks
  const toggleNounBookmark = (id: number) => {
    setNounBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('noun_bookmarks', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  // Determine which original sheet to show in modal
  const currentSheetIndex = useMemo(() => {
    if (contentSection === 'a1-nouns') {
      if (!currentItem) return 0;
      if (currentItem.id > 396) return 2; // A1 Nouns 3 (#397–648)
      if (currentItem.id > 216) return 1; // A1 Nouns 2 (#217–396)
      return 0; // A1 Nouns 1 (#1–216)
    }
    if (contentSection === 'a2-nouns') {
      if (!currentItem) return 3;
      if (currentItem.id >= 600) return 9; // A2 Nouns 6 Appx (#600–608)
      if (currentItem.id > 500) return 8; // A2 Nouns 6 (#501–608)
      if (currentItem.id > 400) return 7; // A2 Nouns 5 (#401–500)
      if (currentItem.id > 300) return 6; // A2 Nouns 4 (#301–400)
      if (currentItem.id > 200) return 5; // A2 Nouns 3 (#201–300)
      if (currentItem.id > 100) return 4; // A2 Nouns 2 (#101–200)
      return 3; // A2 Nouns 1 (#1–100)
    }
    if (contentSection === 'a1-verbs') {
      if (!currentItem) return 10;
      if (currentItem.id > 200) return 12; // A1 Verbs 3 (#201–278)
      if (currentItem.id > 100) return 11; // A1 Verbs 2 (#101–200)
      return 10; // A1 Verbs 1 (#1–100)
    }
    if (contentSection === 'a2-verbs') {
      if (!currentItem) return 13;
      if (currentItem.id > 200) return 15; // A2 Verbs 3 (#201–252)
      if (currentItem.id > 100) return 14; // A2 Verbs 2 (#101–200)
      return 13; // A2 Verbs 1 (#1–100)
    }
    if (contentSection === 'verbs') {
      if (!currentItem || !('verb' in currentItem)) return 16;
      if (currentItem.id === 309) return 19; // #309 correction tab
      if (currentItem.id > 200) return 18; // B1–B2 Sheet 3 (#201–309)
      if (currentItem.id > 100) return 17; // B1–B2 Sheet 2 (#101–200)
      return 16; // B1–B2 Sheet 1 (#1–100)
    }
    if (contentSection === 'adjectives') return 25;
    if (contentSection === 'degree-amount') return 26;
    if (contentSection === 'nouns') {
      if (!currentItem) return 20;
      if (currentItem.id > 500) return 24; // Nouns 501–560
      if (currentItem.id > 400) return 23; // Nouns 401–500
      if (currentItem.id > 300) return 22; // Nouns 301–400
      if (currentItem.id > 200) return 21; // Nouns 201–300
      return 20; // Nouns 1–100
    }
    return 0;
  }, [contentSection, currentItem]);

  // Stop pending timers
  const clearAudioTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Play a specific item with options
  const playCurrentTrack = async (targetIndex: number) => {
    clearAudioTimer();
    const item = activeItems[targetIndex];
    if (!item) {
      setIsPlaying(false);
      return;
    }

    setIsBuffering(true);
    try {
      if ('word1' in item) {
        // Playing an adjective pair
        const res = await playAdjectiveAudio(
          item as AdjectiveOppositeItem,
          audioOptions,
          () => {
            setIsBuffering(false);
            setIsPlaying(true);
          },
          () => {
            handleTrackEnded(targetIndex);
          },
          (err) => {
            console.error('Audio playback error:', err);
            setIsBuffering(false);
            handleTrackEnded(targetIndex);
          }
        );
        if (res.usedEngine) {
          setActiveEngine(res.usedEngine);
        }
      } else if ('expression' in item) {
        // Playing a degree & amount expression
        const res = await playDegreeAmountAudio(
          item as DegreeAmountItem,
          audioOptions,
          () => {
            setIsBuffering(false);
            setIsPlaying(true);
          },
          () => {
            handleTrackEnded(targetIndex);
          },
          (err) => {
            console.error('Audio playback error:', err);
            setIsBuffering(false);
            handleTrackEnded(targetIndex);
          }
        );
        if (res.usedEngine) {
          setActiveEngine(res.usedEngine);
        }
      } else if ('verb' in item) {
        // Playing a verb
        const res = await playItemAudio(
          item,
          audioOptions,
          () => {
            setIsBuffering(false);
            setIsPlaying(true);
          },
          () => {
            handleTrackEnded(targetIndex);
          },
          (err) => {
            console.error('Audio playback error:', err);
            setIsBuffering(false);
            handleTrackEnded(targetIndex);
          }
        );
        if (res.usedEngine) {
          setActiveEngine(res.usedEngine);
        }
      } else {
        // Playing a noun
        const res = await playNounAudio(
          item,
          audioOptions,
          () => {
            setIsBuffering(false);
            setIsPlaying(true);
          },
          () => {
            handleTrackEnded(targetIndex);
          },
          (err) => {
            console.error('Audio playback error:', err);
            setIsBuffering(false);
            handleTrackEnded(targetIndex);
          }
        );
        if (res.usedEngine) {
          setActiveEngine(res.usedEngine);
        }
      }
    } catch (err) {
      console.error(err);
      setIsBuffering(false);
    }
  };

  const handleTrackEnded = (endedIndex: number) => {
    if (!isPlayingRef.current) return;

    // Check repeat
    if (repeatStepRef.current < repeatCount) {
      repeatStepRef.current += 1;
      timeoutRef.current = setTimeout(() => {
        if (isPlayingRef.current) {
          playCurrentTrack(endedIndex);
        }
      }, pauseBetweenSec * 1000);
      return;
    }

    repeatStepRef.current = 1;

    // Move to next item
    if (endedIndex < activeItems.length - 1) {
      const nextIdx = endedIndex + 1;
      setCurrentIndex(nextIdx);

      timeoutRef.current = setTimeout(() => {
        if (isPlayingRef.current) {
          playCurrentTrack(nextIdx);
        }
      }, pauseBetweenSec * 1000);
    } else {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      clearAudioTimer();
      stopAllAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      repeatStepRef.current = 1;
      playCurrentTrack(currentIndex);
    }
  };

  const handleNext = () => {
    clearAudioTimer();
    stopAllAudio();
    if (currentIndex < activeItems.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      repeatStepRef.current = 1;
      if (isPlaying) {
        playCurrentTrack(nextIdx);
      }
    }
  };

  const handlePrev = () => {
    clearAudioTimer();
    stopAllAudio();
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      repeatStepRef.current = 1;
      if (isPlaying) {
        playCurrentTrack(prevIdx);
      }
    }
  };

  const handlePlayDirectVerb = (item: VocabItem) => {
    clearAudioTimer();
    stopAllAudio();
    const list =
      contentSection === 'a1-verbs'
        ? filteredA1Verbs
        : contentSection === 'a2-verbs'
        ? filteredA2Verbs
        : filteredVerbs;
    const idx = list.findIndex((i) => i.id === item.id);
    if (idx !== -1) {
      setCurrentIndex(idx);
      repeatStepRef.current = 1;
      setIsPlaying(true);
      playCurrentTrack(idx);
    }
  };

  const handlePlayDirectNoun = (item: NounItem) => {
    clearAudioTimer();
    stopAllAudio();
    const list =
      contentSection === 'a1-nouns'
        ? filteredA1Nouns
        : contentSection === 'a2-nouns'
        ? filteredA2Nouns
        : filteredNouns;
    const idx = list.findIndex((i) => i.id === item.id);
    if (idx !== -1) {
      setCurrentIndex(idx);
      repeatStepRef.current = 1;
      setIsPlaying(true);
      playCurrentTrack(idx);
    }
  };

  const handlePlayDirectAdjective = (item: AdjectiveOppositeItem) => {
    clearAudioTimer();
    stopAllAudio();
    const idx = filteredAdjectives.findIndex((i) => i.id === item.id);
    if (idx !== -1) {
      setCurrentIndex(idx);
      repeatStepRef.current = 1;
      setIsPlaying(true);
      playCurrentTrack(idx);
    }
  };

  const handlePlayDirectDegree = (item: DegreeAmountItem) => {
    clearAudioTimer();
    stopAllAudio();
    const idx = filteredDegreeAmount.findIndex((i) => i.id === item.id);
    if (idx !== -1) {
      setCurrentIndex(idx);
      repeatStepRef.current = 1;
      setIsPlaying(true);
      playCurrentTrack(idx);
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (contentSection === 'sentence-checker' || contentSection === 'master-ref') {
        return;
      }
      if (['input', 'textarea'].includes((e.target as HTMLElement).tagName.toLowerCase())) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isPlaying, activeItems, contentSection]);

  // Handle section switch cleanly
  const switchSection = (section: ContentSection) => {
    if (section === contentSection) return;
    clearAudioTimer();
    stopAllAudio();
    setIsPlaying(false);
    setContentSection(section);
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header Banner */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Section Tabs */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 flex-shrink-0">
                <Headphones className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                    German Vocabulary Studio
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    A1 • B1 • B2 Audio
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Native audio pronunciations, auxiliary badges & gender color-coding
                </p>
              </div>
            </div>

            {/* Main Section Toggle: 5 Decks */}
            <div className="flex items-center bg-slate-950/80 p-1 rounded-2xl border border-slate-800 shadow-inner flex-wrap gap-1">
              <button
                onClick={() => switchSection('a1-verbs')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  contentSection === 'a1-verbs'
                    ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 shadow-md shadow-amber-500/25 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>A1 Verbs ({A1_VERBS_LIST.length})</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  contentSection === 'a1-verbs' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-400'
                }`}>
                  haben/sein
                </span>
              </button>

              <button
                onClick={() => switchSection('a2-verbs')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  contentSection === 'a2-verbs'
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 shadow-md shadow-teal-500/25 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>A2 Verbs ({A2_VERBS_LIST.length})</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  contentSection === 'a2-verbs' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-teal-400'
                }`}>
                  haben/sein
                </span>
              </button>

              <button
                onClick={() => switchSection('verbs')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  contentSection === 'verbs'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>B1–B2 Verbs ({VOCABULARY_LIST.length})</span>
              </button>

              <button
                onClick={() => switchSection('a1-nouns')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  contentSection === 'a1-nouns'
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/25 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>A1 Nouns ({A1_NOUNS_LIST.length})</span>
                <span className="flex items-center gap-1 ml-0.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" title="der (blue)" />
                  <span className="w-2 h-2 rounded-full bg-pink-400" title="die (pink)" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="das (green)" />
                </span>
              </button>

              <button
                onClick={() => switchSection('a2-nouns')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  contentSection === 'a2-nouns'
                    ? 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-md shadow-fuchsia-500/25 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>A2 Nouns ({A2_NOUNS_LIST.length})</span>
                <span className="flex items-center gap-1 ml-0.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" title="der (blue)" />
                  <span className="w-2 h-2 rounded-full bg-pink-400" title="die (pink)" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="das (green)" />
                  <span className="w-2 h-2 rounded-full bg-purple-400" title="der/die (purple)" />
                </span>
              </button>

              <button
                onClick={() => switchSection('nouns')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  contentSection === 'nouns'
                    ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-md shadow-pink-500/20 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>B1 Nouns ({NOUNS_LIST.length})</span>
                <span className="flex items-center gap-1 ml-0.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" title="der (blue)" />
                  <span className="w-2 h-2 rounded-full bg-pink-400" title="die (pink)" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="das (green)" />
                </span>
              </button>

              <button
                onClick={() => switchSection('master-ref')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  contentSection === 'master-ref'
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 shadow-md shadow-amber-500/25 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Master Reference (Ch 1–13)</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  contentSection === 'master-ref' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-400'
                }`}>
                  14 Sheets
                </span>
              </button>

              <button
                onClick={() => switchSection('sentence-checker')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  contentSection === 'sentence-checker'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/25 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <SpellCheck className="w-3.5 h-3.5" />
                <span>Sentence Checker</span>
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* AI Chat Button */}
            <button
              type="button"
              onClick={() => setShowAIChat((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all active:scale-95 cursor-pointer ${
                showAIChat
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/25'
                  : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/35'
              }`}
              title="Open German AI Chat & Sentence Checker"
            >
              <MessageCircle className="w-4 h-4" />
              <span>AI Chat</span>
            </button>

            {/* Download ALL Audio Button */}
            <button
              onClick={() => setShowAudioCompiler(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/15 transition-transform active:scale-95 cursor-pointer"
              title="Download all verbs/vocabulary as a single combined audio file"
            >
              <FileAudio className="w-4 h-4 fill-current" />
              <span>Download Audio Track</span>
            </button>

            {/* Inspect Original Sheets */}
            <button
              onClick={() => setShowOriginalImage(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
              title="Inspect the original sheets and corrections you uploaded"
            >
              <FileImage className="w-4 h-4 text-amber-400" />
              <span>Original Sheets</span>
            </button>

            {/* View Mode Tabs */}
            {contentSection !== 'sentence-checker' && (
            <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setActiveTab('table')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'table'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
              <button
                onClick={() => setActiveTab('flashcards')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'flashcards'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {contentSection === 'adjectives' ? (
                  <>
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    <span>Opposites Quiz</span>
                  </>
                ) : contentSection === 'nouns' || contentSection === 'a1-nouns' || contentSection === 'a2-nouns' ? (
                  <>
                    <Award className="w-3.5 h-3.5" />
                    <span>Gender Quiz</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Listening Quiz</span>
                  </>
                )}
              </button>
            </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-6">
        {/* ======================================================== */}
        {/* SECTION 0: A1 VERBS (278 VERBS FROM ORIGINAL SHEETS)     */}
        {/* ======================================================== */}
        {contentSection === 'a1-verbs' && (
          <div className="space-y-6">
            {/* A1 Verbs Hero Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {A1_VERBS_LIST.length} A1 German Verbs
                    </span>
                    <span className="text-xs text-slate-400">
                      {filteredA1Verbs.length} of {A1_VERBS_LIST.length} verbs showing
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Complete A1 German Verbs with Auxiliary & Audio
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Master the essential 278 A1 German verbs across all 3 original sheets: Daily & Routine (#1–100), Movement & Activities (#101–200), and Advanced A1 & Separable Verbs (#201–278). Features explicit <span className="font-semibold text-amber-400">haben</span> vs <span className="font-semibold text-sky-400">sein</span> auxiliary marking, Perfekt forms, and example sentences.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 fill-current" />
                        <span>Pause Continuous Audio</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                        <span>Play Audio Playlist</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowAudioCompiler(true)}
                    className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition-colors cursor-pointer"
                  >
                    <FileAudio className="w-4 h-4 text-amber-400" />
                    <span>Download Audio Track</span>
                  </button>

                  <button
                    onClick={() => setShowOriginalImage(true)}
                    className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition-colors cursor-pointer"
                  >
                    <FileImage className="w-4 h-4 text-amber-400" />
                    <span>Original Sheets</span>
                  </button>
                </div>
              </div>

              {/* Presets & Filter Row */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col gap-3.5 text-xs">
                {/* Study Sheets / Sets */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-400 font-semibold mr-1">Study Sets:</span>
                  {[
                    { id: 'all', label: 'All 278 Verbs' },
                    { id: '1-100', label: '📄 Sheet 1 (#1–100)' },
                    { id: '101-200', label: '📄 Sheet 2 (#101–200)' },
                    { id: '201-278', label: '📄 Sheet 3 (#201–278)' },
                    { id: 'separable', label: '⚡ Trennbare Verben (#236–278)' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setSelectedA1Range(r.id);
                        setCurrentIndex(0);
                      }}
                      className={`px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                        selectedA1Range === r.id
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-sm'
                          : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      setFilterA1BookmarkedOnly(!filterA1BookmarkedOnly);
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border font-semibold transition-all ml-auto cursor-pointer ${
                      filterA1BookmarkedOnly
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${filterA1BookmarkedOnly ? 'fill-current' : ''}`} />
                    <span>Starred ({a1BookmarkedIds.size})</span>
                  </button>
                </div>

                {/* Auxiliary Filter & Separable toggles */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-slate-400 font-medium">Auxiliary Verb:</span>
                  <button
                    onClick={() => {
                      setFilterA1Auxiliary('all');
                      setCurrentIndex(0);
                    }}
                    className={`px-3 py-1 rounded-lg border font-medium text-xs transition-colors cursor-pointer ${
                      filterA1Auxiliary === 'all'
                        ? 'bg-slate-200 text-slate-950 font-bold border-white'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
                    }`}
                  >
                    All Auxiliaries
                  </button>
                  <button
                    onClick={() => {
                      setFilterA1Auxiliary(filterA1Auxiliary === 'haben' ? 'all' : 'haben');
                      setCurrentIndex(0);
                    }}
                    className={`px-3 py-1 rounded-lg border font-medium text-xs transition-colors cursor-pointer ${
                      filterA1Auxiliary === 'haben'
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                    }`}
                  >
                    haben
                  </button>
                  <button
                    onClick={() => {
                      setFilterA1Auxiliary(filterA1Auxiliary === 'sein' ? 'all' : 'sein');
                      setCurrentIndex(0);
                    }}
                    className={`px-3 py-1 rounded-lg border font-medium text-xs transition-colors cursor-pointer ${
                      filterA1Auxiliary === 'sein'
                        ? 'bg-sky-500 text-slate-950 font-bold border-sky-500'
                        : 'bg-sky-500/10 text-sky-400 border-sky-500/30 hover:bg-sky-500/20'
                    }`}
                  >
                    sein (Motion / Change)
                  </button>

                  <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

                  <button
                    onClick={() => {
                      setFilterA1SeparableOnly(!filterA1SeparableOnly);
                      setCurrentIndex(0);
                    }}
                    className={`px-3 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      filterA1SeparableOnly
                        ? 'bg-purple-500 text-white font-bold border-purple-500'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
                    }`}
                  >
                    Separable Verbs only
                  </button>
                </div>
              </div>
            </div>

            {/* Search & Category Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search across 278 A1 verbs, meanings, Perfekt (e.g. machen, fahren, zuordnen, sein, haben)..."
                  value={a1SearchQuery}
                  onChange={(e) => {
                    setA1SearchQuery(e.target.value);
                    setCurrentIndex(0);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/60 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
                />
                {a1SearchQuery && (
                  <button
                    onClick={() => setA1SearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedA1Category}
                  onChange={(e) => {
                    setSelectedA1Category(e.target.value);
                    setCurrentIndex(0);
                  }}
                  className="w-full sm:w-auto bg-slate-900 border border-slate-800 text-xs text-slate-300 py-2.5 px-3.5 rounded-2xl focus:border-amber-500/60 focus:outline-none cursor-pointer"
                >
                  {A1_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Content */}
            {activeTab === 'table' && (
              <TableView
                items={filteredA1Verbs}
                currentItemId={currentItem && 'verb' in currentItem ? currentItem.id : null}
                isPlaying={isPlaying}
                bookmarkedIds={a1BookmarkedIds}
                options={audioOptions}
                onPlayItem={handlePlayDirectVerb}
                onToggleBookmark={toggleA1Bookmark}
                onOpenRecord={(item) => setRecordingItem(item)}
              />
            )}

            {activeTab === 'flashcards' && (
              <FlashcardView
                items={filteredA1Verbs}
                currentIndex={currentIndex}
                options={audioOptions}
                bookmarkedIds={a1BookmarkedIds}
                onSelectIndex={(idx) => {
                  setCurrentIndex(idx);
                  if (isPlaying) playCurrentTrack(idx);
                }}
                onPlayItem={handlePlayDirectVerb}
                onToggleBookmark={toggleA1Bookmark}
                onOpenRecord={(item) => setRecordingItem(item)}
              />
            )}

            {activeTab === 'quiz' && (
              <QuizView items={filteredA1Verbs} options={audioOptions} />
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: A2 VERBS (252 VERBS FROM ORIGINAL SHEETS)       */}
        {/* ======================================================== */}
        {contentSection === 'a2-verbs' && (
          <div className="space-y-6">
            {/* A2 Verbs Hero Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-400/10 px-2.5 py-0.5 rounded-full border border-teal-400/20 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {A2_VERBS_LIST.length} A2 German Verbs
                    </span>
                    <span className="text-xs text-slate-400">
                      {filteredA2Verbs.length} of {A2_VERBS_LIST.length} verbs showing
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Complete A2 German Verbs with Auxiliary & Audio
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Master all 252 A2 German verbs from the original sheets: Sheet 1 (#1–100), Sheet 2 (#101–200), and Sheet 3 (#201–252). Complete with explicit <span className="font-semibold text-amber-400">haben</span> vs <span className="font-semibold text-sky-400">sein</span> auxiliary marking, Perfekt forms, reflexive pronouns, and full German & English sentences.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-teal-500/25 active:scale-95 transition-all cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 fill-current" />
                        <span>Pause Continuous Audio</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                        <span>Play Audio Playlist</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowAudioCompiler(true)}
                    className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition-colors cursor-pointer"
                  >
                    <FileAudio className="w-4 h-4 text-teal-400" />
                    <span>Download Audio Track</span>
                  </button>

                  <button
                    onClick={() => setShowOriginalImage(true)}
                    className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition-colors cursor-pointer"
                  >
                    <FileImage className="w-4 h-4 text-teal-400" />
                    <span>Original Sheets</span>
                  </button>
                </div>
              </div>

              {/* Presets & Filter Row */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col gap-3.5 text-xs">
                {/* Study Sheets / Sets */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-400 font-semibold mr-1">Study Sets:</span>
                  {[
                    { id: 'all', label: `All ${A2_VERBS_LIST.length}` },
                    { id: '1-100', label: '📄 Sheet 1 (#1–100)' },
                    { id: '101-200', label: '📄 Sheet 2 (#101–200)' },
                    { id: '201-252', label: '📄 Sheet 3 (#201–260)' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedA2Range(preset.id);
                        setCurrentIndex(0);
                      }}
                      className={`px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                        selectedA2Range === preset.id
                          ? 'bg-teal-500 text-slate-950 font-bold border-teal-500 shadow-sm'
                          : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}

                  {/* Starred */}
                  <button
                    onClick={() => {
                      setFilterA2BookmarkedOnly(!filterA2BookmarkedOnly);
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border font-medium transition-colors ml-auto cursor-pointer ${
                      filterA2BookmarkedOnly
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${filterA2BookmarkedOnly ? 'fill-current' : ''}`} />
                    <span>Starred ({a2BookmarkedIds.size})</span>
                  </button>
                </div>

                {/* Auxiliary & Grammar Filters */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-slate-400 font-medium">Auxiliary & Forms:</span>

                  <button
                    onClick={() => {
                      setFilterA2Auxiliary('all');
                      setCurrentIndex(0);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      filterA2Auxiliary === 'all'
                        ? 'bg-slate-200 text-slate-950 font-bold border-white'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
                    }`}
                  >
                    All Auxiliaries
                  </button>

                  <button
                    onClick={() => {
                      setFilterA2Auxiliary(filterA2Auxiliary === 'haben' ? 'all' : 'haben');
                      setCurrentIndex(0);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                      filterA2Auxiliary === 'haben'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/60'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
                    }`}
                  >
                    hat + Partizip II (haben)
                  </button>

                  <button
                    onClick={() => {
                      setFilterA2Auxiliary(filterA2Auxiliary === 'sein' ? 'all' : 'sein');
                      setCurrentIndex(0);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                      filterA2Auxiliary === 'sein'
                        ? 'bg-sky-500/20 text-sky-300 border-sky-500/60'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
                    }`}
                  >
                    ist + Partizip II (sein)
                  </button>

                  <button
                    onClick={() => {
                      setFilterA2SeparableOnly(!filterA2SeparableOnly);
                      setCurrentIndex(0);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      filterA2SeparableOnly
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/60'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
                    }`}
                  >
                    Separable (Trennbare)
                  </button>

                  <button
                    onClick={() => {
                      setFilterA2ReflexiveOnly(!filterA2ReflexiveOnly);
                      setCurrentIndex(0);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      filterA2ReflexiveOnly
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
                    }`}
                  >
                    Reflexive (sich)
                  </button>
                </div>
              </div>
            </div>

            {/* A2 Search Bar & Category Dropdown */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder={`Search across all ${A2_VERBS_LIST.length} A2 verbs, translations, sentences (e.g. vorschlagen, herunterladen, sich bewerben)...`}
                  value={a2SearchQuery}
                  onChange={(e) => {
                    setA2SearchQuery(e.target.value);
                    setCurrentIndex(0);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500/60 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
                />
                {a2SearchQuery && (
                  <button
                    onClick={() => setA2SearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedA2Category}
                  onChange={(e) => {
                    setSelectedA2Category(e.target.value);
                    setCurrentIndex(0);
                  }}
                  className="w-full sm:w-auto bg-slate-900 border border-slate-800 text-xs text-slate-300 py-2.5 px-3.5 rounded-2xl focus:border-teal-500/60 focus:outline-none cursor-pointer"
                >
                  {A2_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Content */}
            {activeTab === 'table' && (
              <TableView
                items={filteredA2Verbs}
                currentItemId={currentItem && 'verb' in currentItem ? currentItem.id : null}
                isPlaying={isPlaying}
                bookmarkedIds={a2BookmarkedIds}
                options={audioOptions}
                onPlayItem={handlePlayDirectVerb}
                onToggleBookmark={toggleA2Bookmark}
                onOpenRecord={(item) => setRecordingItem(item)}
              />
            )}

            {activeTab === 'flashcards' && (
              <FlashcardView
                items={filteredA2Verbs}
                currentIndex={currentIndex}
                options={audioOptions}
                bookmarkedIds={a2BookmarkedIds}
                onSelectIndex={(idx) => {
                  setCurrentIndex(idx);
                  if (isPlaying) playCurrentTrack(idx);
                }}
                onPlayItem={handlePlayDirectVerb}
                onToggleBookmark={toggleA2Bookmark}
                onOpenRecord={(item) => setRecordingItem(item)}
              />
            )}

            {activeTab === 'quiz' && (
              <QuizView items={filteredA2Verbs} options={audioOptions} />
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: A1 NOUNS (648 NOUNS WITH GENDER COLOR CODING)   */}
        {/* ======================================================== */}
        {contentSection === 'a1-nouns' && (
          <div className="space-y-6">
            {/* A1 Noun Hero Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-400/10 px-2.5 py-0.5 rounded-full border border-purple-400/20 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {A1_NOUNS_LIST.length} A1 German Nouns
                    </span>
                    <span className="text-xs text-slate-400">
                      {filteredA1Nouns.length} of {A1_NOUNS_LIST.length} nouns showing
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Complete A1 German Nouns with Color-Coded Genders
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Master noun articles and genders visually: feminine <span className="font-bold text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded border border-pink-500/20">die in pink</span>, masculine <span className="font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">der in blue</span>, neuter <span className="font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">das in green</span>, and dual <span className="font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">der/die in purple</span>. Includes plural forms, audio pronunciation, and real context sentences.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white font-black text-sm shadow-xl shadow-purple-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 fill-current" />
                        <span>Pause Audio</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                        <span>Play Noun Audio</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowOriginalImage(true)}
                    className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition-colors cursor-pointer"
                  >
                    <FileImage className="w-4 h-4 text-purple-400" />
                    <span>View Original Sheets</span>
                  </button>
                </div>
              </div>

              {/* Gender Filter Buttons Row */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col gap-3.5 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-slate-400 font-semibold mr-1">Filter by Gender:</span>

                  {/* All Nouns */}
                  <button
                    onClick={() => {
                      setA1NounGenderFilter('all');
                      setCurrentIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                      a1NounGenderFilter === 'all'
                        ? 'bg-slate-200 text-slate-950 font-bold border-white shadow-sm'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    All Genders
                  </button>

                  {/* DER (Masculine - Blue) */}
                  <button
                    onClick={() => {
                      setA1NounGenderFilter('masculine');
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                      a1NounGenderFilter === 'masculine'
                        ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-500/30 shadow-md shadow-blue-500/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    der Masculine (Blue)
                  </button>

                  {/* DIE (Feminine - Pink) */}
                  <button
                    onClick={() => {
                      setA1NounGenderFilter('feminine');
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                      a1NounGenderFilter === 'feminine'
                        ? 'bg-pink-600 text-white border-pink-400 ring-2 ring-pink-500/30 shadow-md shadow-pink-500/20'
                        : 'bg-pink-500/10 text-pink-400 border-pink-500/30 hover:bg-pink-500/20'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                    die Feminine (Pink)
                  </button>

                  {/* DAS (Neuter - Green) */}
                  <button
                    onClick={() => {
                      setA1NounGenderFilter('neuter');
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                      a1NounGenderFilter === 'neuter'
                        ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-500/30 shadow-md shadow-emerald-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    das Neuter (Green)
                  </button>

                  {/* DUAL (Purple) */}
                  <button
                    onClick={() => {
                      setA1NounGenderFilter('dual');
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                      a1NounGenderFilter === 'dual'
                        ? 'bg-purple-600 text-white border-purple-400 ring-2 ring-purple-500/30 shadow-md shadow-purple-500/20'
                        : 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    der/die Dual (Purple)
                  </button>

                  {/* Starred */}
                  <button
                    onClick={() => {
                      setA1NounGenderFilter(a1NounGenderFilter === 'starred' ? 'all' : 'starred');
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border font-medium transition-colors cursor-pointer ${
                      a1NounGenderFilter === 'starred'
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${a1NounGenderFilter === 'starred' ? 'fill-current' : ''}`} />
                    <span>Starred ({a1NounBookmarkedIds.size})</span>
                  </button>
                </div>

                {/* Sheet Range Filter Row */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2.5 border-t border-slate-800/60">
                  <span className="text-slate-400 font-semibold mr-1">Original Sheets:</span>
                  {[
                    { id: 'all', label: `All Sheets (${A1_NOUNS_LIST.length})` },
                    { id: 'sheet-1', label: '📄 Sheet 1 (#1–216)' },
                    { id: 'sheet-2', label: '📄 Sheet 2 (#217–396)' },
                    { id: 'sheet-3', label: '📄 Sheet 3 (#397–648)' },
                  ].map((range) => (
                    <button
                      key={range.id}
                      onClick={() => {
                        setSelectedA1NounRange(range.id);
                        setCurrentIndex(0);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedA1NounRange === range.id
                          ? 'bg-purple-500 text-white shadow-sm shadow-purple-500/30 font-bold'
                          : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* A1 Noun Search & Category Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search across all 648 A1 nouns, articles, plurals, sentences (e.g. Pass, Name, Zug, Gemüse, Arzt)..."
                  value={a1NounSearchQuery}
                  onChange={(e) => {
                    setA1NounSearchQuery(e.target.value);
                    setCurrentIndex(0);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-purple-500/60 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
                />
                {a1NounSearchQuery && (
                  <button
                    onClick={() => setA1NounSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedA1NounCategory}
                  onChange={(e) => {
                    setSelectedA1NounCategory(e.target.value);
                    setCurrentIndex(0);
                  }}
                  className="w-full sm:w-auto bg-slate-900 border border-slate-800 text-xs text-slate-300 py-2.5 px-3.5 rounded-2xl focus:border-purple-500/60 focus:outline-none cursor-pointer"
                >
                  {A1_NOUN_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active A1 Nouns Tab View */}
            {activeTab === 'table' && (
              <NounTableView
                items={filteredA1Nouns}
                currentPlayingId={currentItem?.id || null}
                isPlaying={isPlaying}
                bookmarkedIds={a1NounBookmarkedIds}
                onPlayItem={handlePlayDirectNoun}
                onRecordItem={(item) => setRecordingItem(item)}
                onToggleBookmark={toggleA1NounBookmark}
                onDownloadAudio={(item) => downloadNounWav(item, audioOptions)}
                onPlaySnippet={(txt) => playSnippet(txt, 'de', audioOptions)}
              />
            )}

            {activeTab === 'flashcards' && (
              <NounFlashcardView
                items={filteredA1Nouns}
                bookmarkedIds={a1NounBookmarkedIds}
                onToggleBookmark={toggleA1NounBookmark}
                onPlayItem={handlePlayDirectNoun}
                onRecordItem={(item) => setRecordingItem(item)}
                onPlaySnippet={(txt) => playSnippet(txt, 'de', audioOptions)}
              />
            )}

            {activeTab === 'quiz' && (
              <NounGenderQuizView
                items={filteredA1Nouns}
                onPlayItem={handlePlayDirectNoun}
                onPlaySnippet={(txt) => playSnippet(txt, 'de', audioOptions)}
              />
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION: A2 NOUNS (599 NOUNS WITH GENDER COLOR CODING)   */}
        {/* ======================================================== */}
        {contentSection === 'a2-nouns' && (
          <div className="space-y-6">
            {/* A2 Noun Hero Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400 bg-fuchsia-400/10 px-2.5 py-0.5 rounded-full border border-fuchsia-400/20 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {A2_NOUNS_LIST.length} A2 German Nouns
                    </span>
                    <span className="text-xs text-slate-400">
                      {filteredA2Nouns.length} of {A2_NOUNS_LIST.length} nouns showing
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Complete A2 German Nouns with Color-Coded Genders
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Master noun articles and genders visually: feminine <span className="font-bold text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded border border-pink-500/20">die in pink</span>, masculine <span className="font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">der in blue</span>, neuter <span className="font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">das in green</span>, and dual <span className="font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">der/die in purple</span>. Includes plural forms, audio pronunciation, and real context sentences.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-400 hover:to-pink-400 text-white font-black text-sm shadow-xl shadow-fuchsia-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 fill-current" />
                        <span>Pause Audio</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                        <span>Play Noun Audio</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowOriginalImage(true)}
                    className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition-colors cursor-pointer"
                  >
                    <FileImage className="w-4 h-4 text-fuchsia-400" />
                    <span>View Original Sheets</span>
                  </button>
                </div>
              </div>

              {/* Gender Filter Buttons Row */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col gap-3.5 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-slate-400 font-semibold mr-1">Filter by Gender:</span>

                  {/* All Nouns */}
                  <button
                    onClick={() => {
                      setA2NounGenderFilter('all');
                      setCurrentIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                      a2NounGenderFilter === 'all'
                        ? 'bg-slate-200 text-slate-950 font-bold border-white shadow-sm'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    All Genders
                  </button>

                  {/* DER (Masculine - Blue) */}
                  <button
                    onClick={() => {
                      setA2NounGenderFilter('masculine');
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                      a2NounGenderFilter === 'masculine'
                        ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-500/30 shadow-md shadow-blue-500/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    der Masculine (Blue)
                  </button>

                  {/* DIE (Feminine - Pink) */}
                  <button
                    onClick={() => {
                      setA2NounGenderFilter('feminine');
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                      a2NounGenderFilter === 'feminine'
                        ? 'bg-pink-600 text-white border-pink-400 ring-2 ring-pink-500/30 shadow-md shadow-pink-500/20'
                        : 'bg-pink-500/10 text-pink-400 border-pink-500/30 hover:bg-pink-500/20'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                    die Feminine (Pink)
                  </button>

                  {/* DAS (Neuter - Green) */}
                  <button
                    onClick={() => {
                      setA2NounGenderFilter('neuter');
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                      a2NounGenderFilter === 'neuter'
                        ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-500/30 shadow-md shadow-emerald-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    das Neuter (Green)
                  </button>

                  {/* DUAL (Purple) */}
                  <button
                    onClick={() => {
                      setA2NounGenderFilter('dual');
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                      a2NounGenderFilter === 'dual'
                        ? 'bg-purple-600 text-white border-purple-400 ring-2 ring-purple-500/30 shadow-md shadow-purple-500/20'
                        : 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    der/die Dual (Purple)
                  </button>

                  {/* Starred */}
                  <button
                    onClick={() => {
                      setA2NounGenderFilter(a2NounGenderFilter === 'starred' ? 'all' : 'starred');
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border font-medium transition-colors cursor-pointer ${
                      a2NounGenderFilter === 'starred'
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${a2NounGenderFilter === 'starred' ? 'fill-current' : ''}`} />
                    <span>Starred ({a2NounBookmarkedIds.size})</span>
                  </button>
                </div>

                {/* Sheet Range Filter Row */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2.5 border-t border-slate-800/60">
                  <span className="text-slate-400 font-semibold mr-1">Original Sheets:</span>
                  {[
                    { id: 'all', label: `All Sheets (${A2_NOUNS_LIST.length})` },
                    { id: 'sheet-1', label: '📄 Sheet 1 (#1–100)' },
                    { id: 'sheet-2', label: '📄 Sheet 2 (#101–200)' },
                    { id: 'sheet-3', label: '📄 Sheet 3 (#201–300)' },
                    { id: 'sheet-4', label: '📄 Sheet 4 (#301–400)' },
                    { id: 'sheet-5', label: '📄 Sheet 5 (#401–500)' },
                    { id: 'sheet-6', label: '📄 Sheet 6 (#501–608)' },
                  ].map((range) => (
                    <button
                      key={range.id}
                      onClick={() => {
                        setSelectedA2NounRange(range.id);
                        setCurrentIndex(0);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedA2NounRange === range.id
                          ? 'bg-fuchsia-500 text-white shadow-sm shadow-fuchsia-500/30 font-bold'
                          : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* A2 Noun Search & Category Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search across all 608 A2 nouns, articles, plurals, sentences (e.g. Angst, Betrag, Pkw, Vogel, abmalen)..."
                  value={a2NounSearchQuery}
                  onChange={(e) => {
                    setA2NounSearchQuery(e.target.value);
                    setCurrentIndex(0);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-fuchsia-500/60 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
                />
                {a2NounSearchQuery && (
                  <button
                    onClick={() => setA2NounSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedA2NounCategory}
                  onChange={(e) => {
                    setSelectedA2NounCategory(e.target.value);
                    setCurrentIndex(0);
                  }}
                  className="w-full sm:w-auto bg-slate-900 border border-slate-800 text-xs text-slate-300 py-2.5 px-3.5 rounded-2xl focus:border-fuchsia-500/60 focus:outline-none cursor-pointer"
                >
                  {A2_NOUN_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active A2 Nouns Tab View */}
            {activeTab === 'table' && (
              <NounTableView
                items={filteredA2Nouns}
                currentPlayingId={currentItem?.id || null}
                isPlaying={isPlaying}
                bookmarkedIds={a2NounBookmarkedIds}
                onPlayItem={handlePlayDirectNoun}
                onRecordItem={(item) => setRecordingItem(item)}
                onToggleBookmark={toggleA2NounBookmark}
                onDownloadAudio={(item) => downloadNounWav(item, audioOptions)}
                onPlaySnippet={(txt) => playSnippet(txt, 'de', audioOptions)}
              />
            )}

            {activeTab === 'flashcards' && (
              <NounFlashcardView
                items={filteredA2Nouns}
                bookmarkedIds={a2NounBookmarkedIds}
                onToggleBookmark={toggleA2NounBookmark}
                onPlayItem={handlePlayDirectNoun}
                onRecordItem={(item) => setRecordingItem(item)}
                onPlaySnippet={(txt) => playSnippet(txt, 'de', audioOptions)}
              />
            )}

            {activeTab === 'quiz' && (
              <NounGenderQuizView
                items={filteredA2Nouns}
                onPlayItem={handlePlayDirectNoun}
                onPlaySnippet={(txt) => playSnippet(txt, 'de', audioOptions)}
              />
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION 1: B1 NOUNS (WITH REQUESTED GENDER COLOR CODING) */}
        {/* ======================================================== */}
        {contentSection === 'nouns' && (
          <div className="space-y-6">
            {/* Noun Hero Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-400 bg-pink-400/10 px-2.5 py-0.5 rounded-full border border-pink-400/20 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {NOUNS_LIST.length} B1 German Nouns
                    </span>
                    <span className="text-xs text-slate-400">
                      {filteredNouns.length} of {NOUNS_LIST.length} nouns showing
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    German B1 Nouns with Color-Coded Genders
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Memorize noun genders with clear visual color coding: feminine <span className="font-bold text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded border border-pink-500/20">die in pink</span>, masculine <span className="font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">der in blue</span>, and neuter <span className="font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">das in green</span>. Includes plural forms, example sentences, and audio pronunciation.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-400 hover:to-blue-400 text-white font-black text-sm shadow-xl shadow-pink-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 fill-current" />
                        <span>Pause Audio</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                        <span>Play Noun Audio</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowOriginalImage(true)}
                    className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition-colors cursor-pointer"
                  >
                    <FileImage className="w-4 h-4 text-pink-400" />
                    <span>View Original Sheets</span>
                  </button>
                </div>
              </div>

              {/* Gender Filter Buttons Row */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col gap-3.5 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-slate-400 font-semibold mr-1">Filter by Gender:</span>

                  {/* All Nouns */}
                  <button
                    onClick={() => {
                      setNounGenderFilter('all');
                      setCurrentIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                      nounGenderFilter === 'all'
                        ? 'bg-slate-200 text-slate-950 font-bold border-white shadow-sm'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    All Genders
                  </button>

                  {/* DER (Masculine - Blue) */}
                  <button
                    onClick={() => {
                      setNounGenderFilter('masculine');
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                      nounGenderFilter === 'masculine'
                        ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-500/30 shadow-md shadow-blue-500/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    der Masculine (Blue)
                  </button>

                  {/* DIE (Feminine - Pink) */}
                  <button
                    onClick={() => {
                      setNounGenderFilter('feminine');
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                      nounGenderFilter === 'feminine'
                        ? 'bg-pink-600 text-white border-pink-400 ring-2 ring-pink-500/30 shadow-md shadow-pink-500/20'
                        : 'bg-pink-500/10 text-pink-400 border-pink-500/30 hover:bg-pink-500/20'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                    die Feminine (Pink)
                  </button>

                  {/* DAS (Neuter - Green) */}
                  <button
                    onClick={() => {
                      setNounGenderFilter('neuter');
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                      nounGenderFilter === 'neuter'
                        ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-500/30 shadow-md shadow-emerald-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    das Neuter (Green)
                  </button>

                  {/* Starred */}
                  <button
                    onClick={() => {
                      setNounGenderFilter(nounGenderFilter === 'starred' ? 'all' : 'starred');
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border font-medium transition-colors cursor-pointer ${
                      nounGenderFilter === 'starred'
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${nounGenderFilter === 'starred' ? 'fill-current' : ''}`} />
                    <span>Starred ({nounBookmarkedIds.size})</span>
                  </button>
                </div>

                {/* Sheet Range Filter Row */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2.5 border-t border-slate-800/60">
                  <span className="text-slate-400 font-semibold mr-1">Sheet Range:</span>
                  {[
                    { id: 'all', label: `All Sheets (${NOUNS_LIST.length})` },
                    { id: '1-100', label: '#1–100' },
                    { id: '201-300', label: '#201–300' },
                    { id: '301-400', label: '#301–400' },
                    { id: '401-500', label: '#401–500' },
                    { id: '501-560', label: '#501–560' },
                  ].map((range) => (
                    <button
                      key={range.id}
                      onClick={() => {
                        setSelectedNounRange(range.id);
                        setCurrentIndex(0);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedNounRange === range.id
                          ? 'bg-pink-500 text-white shadow-sm shadow-pink-500/30 font-bold'
                          : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Noun Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search across 460 B1 nouns, plurals, translations, or example sentences (e.g. Stern, Denkmal, Rose, Zitat, Termin)..."
                value={nounSearchQuery}
                onChange={(e) => {
                  setNounSearchQuery(e.target.value);
                  setCurrentIndex(0);
                }}
                className="w-full bg-slate-900 border border-slate-800 focus:border-pink-500/60 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
              />
              {nounSearchQuery && (
                <button
                  onClick={() => setNounSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Active Nouns Tab View */}
            {activeTab === 'table' && (
              <NounTableView
                items={filteredNouns}
                currentPlayingId={currentItem?.id || null}
                isPlaying={isPlaying}
                bookmarkedIds={nounBookmarkedIds}
                onPlayItem={handlePlayDirectNoun}
                onRecordItem={(item) => setRecordingItem(item)}
                onToggleBookmark={toggleNounBookmark}
                onDownloadAudio={(item) => downloadNounWav(item, audioOptions)}
                onPlaySnippet={(txt) => playSnippet(txt, 'de', audioOptions)}
              />
            )}

            {activeTab === 'flashcards' && (
              <NounFlashcardView
                items={filteredNouns}
                bookmarkedIds={nounBookmarkedIds}
                onToggleBookmark={toggleNounBookmark}
                onPlayItem={handlePlayDirectNoun}
                onRecordItem={(item) => setRecordingItem(item)}
                onPlaySnippet={(txt) => playSnippet(txt, 'de', audioOptions)}
              />
            )}

            {activeTab === 'quiz' && (
              <NounGenderQuizView
                items={filteredNouns}
                onPlayItem={handlePlayDirectNoun}
                onPlaySnippet={(txt) => playSnippet(txt, 'de', audioOptions)}
              />
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION 2: 309 VERBS (ALL 3 SHEETS + #309 CORRECTION)    */}
        {/* ======================================================== */}
        {contentSection === 'verbs' && (
          <div className="space-y-6">
            {/* Quick Audio Playback Hero Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Dual Engine Audio Reader
                    </span>
                    <span className="text-xs text-slate-400">
                      {filteredVerbs.length} of {VOCABULARY_LIST.length} verbs selected
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Audio Reader for All 309 German Verbs
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Includes all 3 study sheets: Travel & Tech (#1–100), Environment & Society (#101–200), and Medicine, Arts & Banking (#201–309). Press <span className="font-semibold text-amber-300">Play Audio</span> to listen continuously, or click <span className="font-semibold text-amber-300">Download Audio Track</span> to export as a single audio file.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 fill-current" />
                        <span>Pause Continuous Audio</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                        <span>Play Audio Playlist</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowAudioCompiler(true)}
                    className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Export Single Audio Track</span>
                  </button>
                </div>
              </div>

              {/* Quick presets row */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col gap-3 text-xs">
                {/* Sheet & Granular Range Presets */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-400 font-semibold mr-1">Study Sets:</span>
                  {[
                    { id: 'all', label: 'All 309' },
                    { id: 'sheet-1', label: '📄 Sheet 1 (#1–100)' },
                    { id: 'sheet-2', label: '📄 Sheet 2 (#101–200)' },
                    { id: 'sheet-3', label: '📄 Sheet 3 (#201–309)' },
                    { id: '1-50', label: '1–50' },
                    { id: '51-100', label: '51–100' },
                    { id: '101-150', label: '101–150' },
                    { id: '151-200', label: '151–200' },
                    { id: '201-250', label: '201–250' },
                    { id: '251-309', label: '251–309' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setSelectedRange(r.id);
                        setCurrentIndex(0);
                      }}
                      className={`px-2.5 py-1 rounded-lg border font-medium transition-colors cursor-pointer ${
                        selectedRange === r.id
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-sm'
                          : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      setFilterVerbBookmarkedOnly(!filterVerbBookmarkedOnly);
                      setCurrentIndex(0);
                    }}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg border font-medium transition-colors ml-auto cursor-pointer ${
                      filterVerbBookmarkedOnly
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${filterVerbBookmarkedOnly ? 'fill-current' : ''}`} />
                    <span>Starred ({verbBookmarkedIds.size})</span>
                  </button>
                </div>

                {/* Grammar Filters */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-slate-400 font-medium">Grammar Filters:</span>
                  <button
                    onClick={() => setFilterSeparable(!filterSeparable)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      filterSeparable
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
                    }`}
                  >
                    Separable (|)
                  </button>
                  <button
                    onClick={() => setFilterReflexive(!filterReflexive)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      filterReflexive
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
                    }`}
                  >
                    Reflexive (sich)
                  </button>
                  <button
                    onClick={() => setFilterPreposition(!filterPreposition)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      filterPreposition
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
                    }`}
                  >
                    With Preposition (+)
                  </button>
                </div>
              </div>
            </div>

            {/* Verb Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search across all 309 verbs, translations, or sentences (e.g. rumfahren, retten, Umwelt, Kredit)..."
                  value={verbSearchQuery}
                  onChange={(e) => {
                    setVerbSearchQuery(e.target.value);
                    setCurrentIndex(0);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/60 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
                />
                {verbSearchQuery && (
                  <button
                    onClick={() => setVerbSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentIndex(0);
                  }}
                  className="w-full sm:w-auto bg-slate-900 border border-slate-800 text-xs text-slate-300 py-2.5 px-3.5 rounded-2xl focus:border-amber-500/60 focus:outline-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Content */}
            {activeTab === 'table' && (
              <TableView
                items={filteredVerbs}
                currentItemId={currentItem?.id || null}
                isPlaying={isPlaying}
                bookmarkedIds={verbBookmarkedIds}
                options={audioOptions}
                onPlayItem={handlePlayDirectVerb}
                onToggleBookmark={toggleVerbBookmark}
                onOpenRecord={(item) => setRecordingItem(item)}
              />
            )}

            {activeTab === 'flashcards' && (
              <FlashcardView
                items={filteredVerbs}
                currentIndex={currentIndex}
                options={audioOptions}
                bookmarkedIds={verbBookmarkedIds}
                onSelectIndex={(idx) => {
                  setCurrentIndex(idx);
                  if (isPlaying) playCurrentTrack(idx);
                }}
                onPlayItem={(item) => handlePlayDirectVerb(item)}
                onToggleBookmark={toggleVerbBookmark}
                onOpenRecord={(item) => setRecordingItem(item)}
              />
            )}

            {activeTab === 'quiz' && (
              <QuizView items={filteredVerbs} options={audioOptions} />
            )}
          </div>
        )}



        {/* Master Reference Decks (Chapters 1–13) */}
        {contentSection === 'master-ref' && (
          <MasterReferenceView
            onPlaySnippet={(txt) => playSnippet(txt, 'de', audioOptions)}
            onOpenOriginalSheet={(idx) => {
              setOverrideSheetIndex(idx);
              setShowOriginalImage(true);
            }}
          />
        )}

        {/* German Sentence Checker & Alternatives */}
        {contentSection === 'sentence-checker' && (
          <SentenceCorrectorView
            onPlaySnippet={(txt) => playSnippet(txt, 'de', audioOptions)}
          />
        )}
      </main>

      {/* Floating Sticky Audio Player Controller Bar */}
      {contentSection !== 'master-ref' && contentSection !== 'sentence-checker' && (
        <AudioPlayerBar
          currentItem={currentItem}
          currentIndex={currentIndex}
          totalItems={activeItems.length}
          isPlaying={isPlaying}
          isBuffering={isBuffering}
          options={audioOptions}
          pauseBetweenSec={pauseBetweenSec}
          repeatCount={repeatCount}
          activeEngine={activeEngine}
          onTogglePlay={togglePlay}
          onNext={handleNext}
          onPrev={handlePrev}
          onSelectIndex={(idx) => {
            setCurrentIndex(idx);
            if (isPlaying) playCurrentTrack(idx);
          }}
          onOptionsChange={(newOpts) => {
            setAudioOptions((prev) => ({ ...prev, ...newOpts }));
            if (newOpts.engine) setActiveEngine(newOpts.engine);
          }}
          onPauseChange={setPauseBetweenSec}
          onRepeatChange={setRepeatCount}
          onOpenBatchDownload={() => setShowAudioCompiler(true)}
        />
      )}

      {/* Download All / Combined Audio Track Modal */}
      <AudioCompilerModal
        isOpen={showAudioCompiler}
        onClose={() => setShowAudioCompiler(false)}
        section={contentSection === 'sentence-checker' ? 'a1-verbs' : contentSection}
        filteredItems={activeItems}
        bookmarkedIds={
          contentSection === 'a1-verbs'
            ? a1BookmarkedIds
            : contentSection === 'a2-verbs'
            ? a2BookmarkedIds
            : contentSection === 'a1-nouns'
            ? a1NounBookmarkedIds
            : contentSection === 'a2-nouns'
            ? a2NounBookmarkedIds
            : contentSection === 'adjectives'
            ? adjectiveBookmarkedIds
            : contentSection === 'degree-amount'
            ? degreeBookmarkedIds
            : contentSection === 'nouns'
            ? nounBookmarkedIds
            : verbBookmarkedIds
        }
        defaultOptions={audioOptions}
      />

      {/* Original Image Modal with sheet switching */}
      <OriginalImageModal
        isOpen={showOriginalImage}
        initialSheetIndex={overrideSheetIndex !== null ? overrideSheetIndex : currentSheetIndex}
        onClose={() => {
          setShowOriginalImage(false);
          setOverrideSheetIndex(null);
        }}
      />

      {/* Pronunciation Recorder Modal */}
      {recordingItem && (
        <RecorderModal
          item={recordingItem}
          options={audioOptions}
          onClose={() => setRecordingItem(null)}
        />
      )}

      {/* Floating German AI Chat Icon & Drawer */}
      <GermanAIChatDrawer
        isOpen={showAIChat}
        hasBottomPlayerBar={contentSection !== 'master-ref' && contentSection !== 'sentence-checker'}
        onToggleOpen={() => setShowAIChat((prev) => !prev)}
        onOpenFullChecker={() => switchSection('sentence-checker')}
      />
    </div>
  );
}
