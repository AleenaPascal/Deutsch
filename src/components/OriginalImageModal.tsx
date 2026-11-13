import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialSheetIndex?: number;
}

const SHEETS = [
  {
    title: 'A1 Nouns 1 (#1–216)',
    description: 'A1 Nouns: Personal Info, Time, Jobs, City, Transport, Food & Shopping (der blue, die pink, das green)',
    src: '/assets/aistudio/image_4c18bda2.png',
  },
  {
    title: 'A1 Nouns 2 (#217–396)',
    description: 'A1 Nouns: Meals, Family, Leisure, Table, Venues, Media, Bank, Body Parts & Hospital',
    src: '/assets/aistudio/image_b8bcec52.png',
  },
  {
    title: 'A1 Nouns 3 (#397–648)',
    description: 'A1 Nouns: Housing, Rooms, Furniture, Workplaces, Clothing, Vacation, Weather, Seasons & Everyday',
    src: '/assets/aistudio/image_ed709c40.png',
  },
  {
    title: 'A2 Nouns 1 (#1–100)',
    description: 'A2 Nouns: Angst to Mathe (der blue, die pink, das green, der/die purple)',
    src: '/assets/aistudio/image_9d90691f.png',
  },
  {
    title: 'A2 Nouns 2 (#101–200)',
    description: 'A2 Nouns: Physik to Grenze (Tech, Gadgets, Media, Feelings & Bureaucracy)',
    src: '/assets/aistudio/image_e3a58b77.png',
  },
  {
    title: 'A2 Nouns 3 (#201–300)',
    description: 'A2 Nouns: Betrag to Kraftfahrzeug (Banking, Politics, Work, Transit & City)',
    src: '/assets/aistudio/image_5b91e46b.png',
  },
  {
    title: 'A2 Nouns 4 (#301–400)',
    description: 'A2 Nouns: Pkw to Klettern (Cars, Studies, Jobs, Advice & Sports)',
    src: '/assets/aistudio/image_8b1e0d18.png',
  },
  {
    title: 'A2 Nouns 5 (#401–500)',
    description: 'A2 Nouns: Langlauf to Kätzchen (Sports, Weather, Housing & Pets)',
    src: '/assets/aistudio/image_aeec63a5.png',
  },
  {
    title: 'A2 Nouns 6 (#501–608)',
    description: 'A2 Nouns: Vogel to Künstlerin & Verbs Appendix (#501–608)',
    src: '/assets/aistudio/image_1422c253.png',
  },
  {
    title: 'A2 Nouns 6 Appx (#600–608)',
    description: 'A2 Sheet 6 Appendix: abmalen to verschieben with example sentences',
    src: '/assets/aistudio/image_785ead1c.png',
  },
  {
    title: 'A1 Verbs 1 (#1–100)',
    description: 'A1 Verbs: machen to husten with auxiliary (haben/sein) & example sentences',
    src: '/assets/aistudio/image_7c84b3f6.png',
  },
  {
    title: 'A1 Verbs 2 (#101–200)',
    description: 'A1 Verbs: bewegen to kommunizieren with movement auxiliary notes',
    src: '/assets/aistudio/image_d1ca2077.png',
  },
  {
    title: 'A1 Verbs 3 (#201–278)',
    description: 'A1 Verbs: feiern to missverstehen (#201–235) and Separable Verbs (#236–278)',
    src: '/assets/aistudio/image_b3cbebdf.png',
  },
  {
    title: 'A2 Verbs 1 (#1–100)',
    description: 'A2 Verbs: vorschlagen to überraschen with auxiliary & example sentences',
    src: '/assets/aistudio/image_3973f7bf.png',
  },
  {
    title: 'A2 Verbs 2 (#101–200)',
    description: 'A2 Verbs: ausschlafen to sich setzen with tech, daily & reflexive verbs',
    src: '/assets/aistudio/image_df26a41f.png',
  },
  {
    title: 'A2 Verbs 3 (#201–252)',
    description: 'A2 Verbs: sich überlegen to abmalen (#201–252)',
    src: '/assets/aistudio/image_2a41553d.png',
  },
  {
    title: 'B1–B2 Verbs 1 (#1–100)',
    description: 'Travel, Leisure, Tech Devices, Shopping & Daily Verbs',
    src: '/assets/aistudio/image_597169df.png',
  },
  {
    title: 'B1–B2 Verbs 2 (#101–200)',
    description: 'Environment, Future, Society, Work & Healthcare',
    src: '/assets/aistudio/image_8e8b35d2.png',
  },
  {
    title: 'B1–B2 Verbs 3 (#201–309)',
    description: 'Medicine, Arts & Culture, Banking, Law & Motion',
    src: '/assets/aistudio/image_ba1808a0.png',
  },
  {
    title: '#309 Correction',
    description: 'Correction for #309: rum|fahren • to drive/ride around • rumgefahren',
    src: '/assets/aistudio/image_6b87d29c.png',
  },
  {
    title: 'B1 Nouns 1–100',
    description: '100 German B1 Nouns: der (blue), die (pink), das (green), plurals & sentences',
    src: '/assets/aistudio/image_ff371006.png',
  },
  {
    title: 'B1 Nouns 201–300',
    description: '100 German B1 Nouns: der Stern (#201) to das Rätsel (#300)',
    src: '/assets/aistudio/image_641b1fdb.png',
  },
  {
    title: 'B1 Nouns 301–400',
    description: '100 German B1 Nouns: das Arbeitsamt (#301) to das Wahrzeichen (#400)',
    src: '/assets/aistudio/image_d60a489a.png',
  },
  {
    title: 'B1 Nouns 401–500',
    description: '100 German B1 Nouns: das Denkmal (#401) to die Broschüre (#500)',
    src: '/assets/aistudio/image_ded6528e.png',
  },
  {
    title: 'B1 Nouns 501–560',
    description: '60 German B1 Nouns: das Büfett (#501) to die Entscheidung (#560)',
    src: '/assets/aistudio/image_7f0a17d1.png',
  },
  {
    title: 'Adjectives & Opposites (52)',
    description: 'Everyday German Adjectives – 52 Opposites with contrasting example sentences',
    src: '/assets/aistudio/image_3d4be295.png',
  },
  {
    title: 'Degree, Amount & Approx (40)',
    description: 'Degree, Amount & Approximation: 40 expressions and contrasting sentences',
    src: '/assets/aistudio/image_f8df1d17.png',
  },
  {
    title: 'Ch 1: Adjectives & Opposites Master',
    description: '1. Adjectives — Gegenteile (1.1 Basic, 1.2 Size/Weight/Shape, 1.3 Personality, 1.4 Feelings, 1.5 Places, 1.6 Grammar)',
    src: '/assets/aistudio/image_6365100d.png',
  },
  {
    title: 'Ch 2: Degree, Quantity & Approx Master',
    description: '2. Degree, Quantity & Approximation (2.1 Degree/Intensity, 2.2 Quantity, 2.3 Limits, 2.4 Near-completion, 2.5 Frequency numbers)',
    src: '/assets/aistudio/image_a90df768.png',
  },
  {
    title: 'Ch 3: Time & Frequency Master',
    description: '3. Time and Frequency — Zeit und Häufigkeit (3.1 Regular, 3.2 Frequency, 3.3 Past/Present/Future, 3.4 Sequence, 3.5 Expressions)',
    src: '/assets/aistudio/image_922a4708.png',
  },
  {
    title: 'Ch 4: People, Things, Places & Directions',
    description: '4. People, Things, Places & Directions (4.1 Personen, 4.2 Sachen, 4.3 Orte/Richtungen, 4.4 Gegenseitigkeit, 4.5 Distinctions)',
    src: '/assets/aistudio/image_09fc05c1.png',
  },
  {
    title: 'Ch 5: Manner, Opinions & Conversation',
    description: '5. Manner, Opinions & Conversation (5.1 Manner, 5.2 Focus, 5.3 Opinions, 5.4 Feelings, 5.5 Probability, 5.6 Reactions, 5.7 Expressions)',
    src: '/assets/aistudio/image_24f3d73c.png',
  },
  {
    title: 'Ch 6: Connectors & Linking Expressions',
    description: '6. Connectors (6.1 Info, 6.2 Reasons, 6.3 Results, 6.4 Contrast, 6.5 Purpose, 6.6 Conditions, 6.7 Time, 6.8 Listing, 6.11 Two-part)',
    src: '/assets/aistudio/image_c430f004.png',
  },
  {
    title: 'Ch 7: Everyday Particles & Small Words',
    description: '7. Everyday Particles (7.1 schon/noch, 7.2 wieder/eben, 7.3 Emphasis, 7.4 Attitude, 7.5 mal, 7.6 eben, 7.7 Distinctions)',
    src: '/assets/aistudio/image_12aff2b3.png',
  },
  {
    title: 'Ch 9: Grammar Patterns & Prepositions',
    description: '9. Grammar Patterns & Prepositions (9.1 Meanings, 9.2 Dativ Feelings, 9.3 Adj + Prep, 9.4 Verb + Prep, 9.5 Patterns, 9.6 Comparisons)',
    src: '/assets/aistudio/image_f6ca4602.png',
  },
  {
    title: 'Ch 10: Vocabulary Upgrades (A1/A2 → B1/B2)',
    description: '10. Vocabulary Upgrades (10.1 Adjectives, 10.2 Verbs, 10.3 Adverbs, 10.4 Everyday Expressions, 10.5 Distinctions)',
    src: '/assets/aistudio/image_6b576720.png',
  },
  {
    title: 'Ch 11: Descriptive Phrases & Collocations',
    description: '11. Descriptive Phrases (11.1 Noun-Verb Combos, 11.2 Memories, 11.3 Places, 11.4 Situations, 11.5 Weather, 11.6 Expressive Verbs)',
    src: '/assets/aistudio/image_b6b33805.png',
  },
  {
    title: 'Ch 8: German Prepositions (A1–B1)',
    description: '8. German Prepositions: Akkusativ, Dativ, Wechselpräpositionen (Wo vs Wohin), Genitiv, Time expressions & Contractions',
    src: '/assets/aistudio/image_3382ead0.png',
  },
  {
    title: 'Ch 12: Modal Verbs, Past & Konjunktiv II',
    description: '12. Modalverben (Präsens & Präteritum), Werden/Wurden/Würden, War/Wäre, Hatte/Hätte, Lassen & Konjunktiv II B1 Revision',
    src: '/assets/aistudio/image_35222af3.png',
  },
  {
    title: 'Ch 13: Personal Pronouns (Personalpronomen)',
    description: '1. Personal Pronouns: Nominativ, Akkusativ, Dativ, Reflexiv & Possessive stems for all persons',
    src: '/assets/aistudio/image_59bbc233.png',
  },
  {
    title: 'Ch 13: Possessive Pronouns (All 4 Cases)',
    description: '3. Possessive Endings in all four cases (Nominativ, Akkusativ, Dativ, Genitiv) & Quick Revision Table',
    src: '/assets/aistudio/image_ba1f1219.png',
  },
];

export const OriginalImageModal: React.FC<Props> = ({ isOpen, onClose, initialSheetIndex = 0 }) => {
  const [selectedSheet, setSelectedSheet] = useState(initialSheetIndex);
  const [zoom, setZoom] = useState(1);

  if (!isOpen) return null;

  const currentSheet = SHEETS[selectedSheet] || SHEETS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative flex flex-col w-full max-w-5xl h-[92vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/95 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Original Vocabulary Sheets</span>
                <span className="text-xs font-normal text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  278 A1 Verbs • 252 A2 Verbs • 648 A1 Nouns • 309 B1–B2 Verbs • 460 B1 Nouns
                </span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentSheet.description}
            </p>
          </div>

          {/* Sheet Selector Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700 flex-wrap">
            {SHEETS.map((s, idx) => (
              <button
                key={s.title}
                onClick={() => {
                  setSelectedSheet(idx);
                  setZoom(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedSheet === idx
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Zoom and Close Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300 px-1.5">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <a
              href={currentSheet.src}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              title="Open full resolution in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors ml-1"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Content Container with scroll */}
        <div className="flex-1 overflow-auto p-4 bg-slate-950 flex justify-center items-start">
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out',
            }}
            className="shadow-2xl rounded-lg overflow-hidden max-w-full"
          >
            <img
              src={currentSheet.src}
              alt={currentSheet.title}
              className="max-w-2xl w-full h-auto object-contain block mx-auto border border-slate-700 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
