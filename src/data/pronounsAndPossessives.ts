export interface PersonalPronounRow {
  person: string;
  nominativ: string;
  akkusativ: string;
  dativ: string;
  reflexiv: string;
  possessiv: string;
  exampleSentence: string;
  englishSentence: string;
}

export const PERSONAL_PRONOUNS_DATA: PersonalPronounRow[] = [
  {
    person: "1st Person Sg (I)",
    nominativ: "ich",
    akkusativ: "mich",
    dativ: "mir",
    reflexiv: "mich – mir",
    possessiv: "mein",
    exampleSentence: "Ich sehe mich im Spiegel, aber du hilfst mir.",
    englishSentence: "I see myself in the mirror, but you are helping me.",
  },
  {
    person: "2nd Person Sg (you informal)",
    nominativ: "du",
    akkusativ: "dich",
    dativ: "dir",
    reflexiv: "dich – dir",
    possessiv: "dein",
    exampleSentence: "Ich liebe dich und ich gebe dir das Buch.",
    englishSentence: "I love you and I give you the book.",
  },
  {
    person: "3rd Person Sg Masc (he)",
    nominativ: "er",
    akkusativ: "ihn",
    dativ: "ihm",
    reflexiv: "sich",
    possessiv: "sein",
    exampleSentence: "Ich kenne ihn gut und antworte ihm sofort.",
    englishSentence: "I know him well and reply to him immediately.",
  },
  {
    person: "3rd Person Sg Fem (she)",
    nominativ: "sie",
    akkusativ: "sie",
    dativ: "ihr",
    reflexiv: "sich",
    possessiv: "ihr",
    exampleSentence: "Ich rufe sie an und schenke ihr Blumen.",
    englishSentence: "I call her and give her flowers.",
  },
  {
    person: "3rd Person Sg Neut (it)",
    nominativ: "es",
    akkusativ: "es",
    dativ: "ihm",
    reflexiv: "sich",
    possessiv: "sein",
    exampleSentence: "Das Kind weint; die Mutter tröstet es und gibt ihm Milch.",
    englishSentence: "The child cries; the mother comforts it and gives it milk.",
  },
  {
    person: "1st Person Pl (we)",
    nominativ: "wir",
    akkusativ: "uns",
    dativ: "uns",
    reflexiv: "uns",
    possessiv: "unser",
    exampleSentence: "Wir freuen uns, und der Lehrer erklärt uns die Grammatik.",
    englishSentence: "We are pleased, and the teacher explains the grammar to us.",
  },
  {
    person: "2nd Person Pl (you plural informal)",
    nominativ: "ihr",
    akkusativ: "euch",
    dativ: "euch",
    reflexiv: "euch",
    possessiv: "euer",
    exampleSentence: "Ich besuche euch morgen und helfe euch gern.",
    englishSentence: "I will visit you tomorrow and gladly help you.",
  },
  {
    person: "3rd Person Pl (they)",
    nominativ: "sie",
    akkusativ: "sie",
    dativ: "ihnen",
    reflexiv: "sich",
    possessiv: "ihr",
    exampleSentence: "Sie waschen sich, und ich danke ihnen herzlich.",
    englishSentence: "They wash themselves, and I thank them warmly.",
  },
  {
    person: "Formal (you formal)",
    nominativ: "Sie",
    akkusativ: "Sie",
    dativ: "Ihnen",
    reflexiv: "sich",
    possessiv: "Ihr",
    exampleSentence: "Darf ich Sie etwas fragen? Ich helfe Ihnen gern.",
    englishSentence: "May I ask you something? I would gladly help you.",
  },
  {
    person: "Impersonal (one / people)",
    nominativ: "man",
    akkusativ: "einen",
    dativ: "einem",
    reflexiv: "sich",
    possessiv: "sein",
    exampleSentence: "Das macht einen müde, wenn einem niemand hilft.",
    englishSentence: "That makes one tired when nobody helps one.",
  },
];

export interface PossessiveStemItem {
  personalPronoun: string;
  possessiveStem: string;
  english: string;
}

export const POSSESSIVE_STEMS_DATA: PossessiveStemItem[] = [
  { personalPronoun: "ich", possessiveStem: "mein", english: "My" },
  { personalPronoun: "du", possessiveStem: "dein", english: "Your (informal, singular)" },
  { personalPronoun: "er", possessiveStem: "sein", english: "His" },
  { personalPronoun: "es", possessiveStem: "sein", english: "Its" },
  { personalPronoun: "sie", possessiveStem: "ihr", english: "Her" },
  { personalPronoun: "wir", possessiveStem: "unser", english: "Our" },
  { personalPronoun: "ihr", possessiveStem: "euer", english: "Your (informal, plural)" },
  { personalPronoun: "sie", possessiveStem: "ihr", english: "Their" },
  { personalPronoun: "Sie", possessiveStem: "Ihr", english: "Your (formal)" },
];

export interface PossessiveCaseRow {
  possessive: string;
  masculine: string;
  feminine: string;
  neuter: string;
  plural: string;
  label?: string;
}

export const POSSESSIVE_NOMINATIV_TABLE: PossessiveCaseRow[] = [
  { possessive: "mein", masculine: "mein", feminine: "meine", neuter: "mein", plural: "meine" },
  { possessive: "dein", masculine: "dein", feminine: "deine", neuter: "dein", plural: "deine" },
  { possessive: "sein", masculine: "sein", feminine: "seine", neuter: "sein", plural: "seine" },
  { possessive: "ihr (her)", masculine: "ihr", feminine: "ihre", neuter: "ihr", plural: "ihre" },
  { possessive: "unser", masculine: "unser", feminine: "unsere", neuter: "unser", plural: "unsere" },
  { possessive: "euer", masculine: "euer", feminine: "eure", neuter: "euer", plural: "eure" },
  { possessive: "ihr (their)", masculine: "ihr", feminine: "ihre", neuter: "ihr", plural: "ihre" },
  { possessive: "Ihr (formal)", masculine: "Ihr", feminine: "Ihre", neuter: "Ihr", plural: "Ihre" },
];

export const POSSESSIVE_AKKUSATIV_TABLE: PossessiveCaseRow[] = [
  { possessive: "mein", masculine: "meinen", feminine: "meine", neuter: "mein", plural: "meine" },
  { possessive: "dein", masculine: "deinen", feminine: "deine", neuter: "dein", plural: "deine" },
  { possessive: "sein", masculine: "seinen", feminine: "seine", neuter: "sein", plural: "seine" },
  { possessive: "ihr (her)", masculine: "ihren", feminine: "ihre", neuter: "ihr", plural: "ihre" },
  { possessive: "unser", masculine: "unseren", feminine: "unsere", neuter: "unser", plural: "unsere" },
  { possessive: "euer", masculine: "euren", feminine: "eure", neuter: "euer", plural: "eure" },
  { possessive: "ihr (their)", masculine: "ihren", feminine: "ihre", neuter: "ihr", plural: "ihre" },
  { possessive: "Ihr (formal)", masculine: "Ihren", feminine: "Ihre", neuter: "Ihr", plural: "Ihre" },
];

export const POSSESSIVE_DATIV_TABLE: PossessiveCaseRow[] = [
  { possessive: "mein", masculine: "meinem", feminine: "meiner", neuter: "meinem", plural: "meinen" },
  { possessive: "dein", masculine: "deinem", feminine: "deiner", neuter: "deinem", plural: "deinen" },
  { possessive: "sein", masculine: "seinem", feminine: "seiner", neuter: "seinem", plural: "seinen" },
  { possessive: "ihr (her)", masculine: "ihrem", feminine: "ihrer", neuter: "ihrem", plural: "ihren" },
  { possessive: "unser", masculine: "unserem", feminine: "unserer", neuter: "unserem", plural: "unseren" },
  { possessive: "euer", masculine: "eurem", feminine: "eurer", neuter: "eurem", plural: "euren" },
  { possessive: "ihr (their)", masculine: "ihrem", feminine: "ihrer", neuter: "ihrem", plural: "ihren" },
  { possessive: "Ihr (formal)", masculine: "Ihrem", feminine: "Ihrer", neuter: "Ihrem", plural: "Ihren" },
];

export const POSSESSIVE_GENITIV_TABLE: PossessiveCaseRow[] = [
  { possessive: "mein", masculine: "meines", feminine: "meiner", neuter: "meines", plural: "meiner" },
  { possessive: "dein", masculine: "deines", feminine: "deiner", neuter: "deines", plural: "deiner" },
  { possessive: "sein", masculine: "seines", feminine: "seiner", neuter: "seines", plural: "seiner" },
  { possessive: "ihr (her)", masculine: "ihres", feminine: "ihrer", neuter: "ihres", plural: "ihrer" },
  { possessive: "unser", masculine: "unseres", feminine: "unserer", neuter: "unseres", plural: "unserer" },
  { possessive: "euer", masculine: "eures", feminine: "eurer", neuter: "eures", plural: "eurer" },
  { possessive: "ihr (their)", masculine: "ihres", feminine: "ihrer", neuter: "ihres", plural: "ihrer" },
  { possessive: "Ihr (formal)", masculine: "Ihres", feminine: "Ihrer", neuter: "Ihres", plural: "Ihrer" },
];

export interface EndingsMatrixRow {
  caseName: string;
  masculine: string;
  feminine: string;
  neuter: string;
  plural: string;
  mnemonic: string;
}

export const POSSESSIVE_ENDINGS_MATRIX: EndingsMatrixRow[] = [
  { caseName: "Nominativ", masculine: "–", feminine: "-e", neuter: "–", plural: "-e", mnemonic: "Subject: mein Vater, meine Mutter, mein Kind, meine Kinder" },
  { caseName: "Akkusativ", masculine: "-en", feminine: "-e", neuter: "–", plural: "-e", mnemonic: "Direct Object: meinen Vater (only masc changes to -en!)" },
  { caseName: "Dativ", masculine: "-em", feminine: "-er", neuter: "-em", plural: "-en", mnemonic: "Indirect / Prep: mit meinem Vater, mit meiner Mutter, mit meinen Kindern (+n)" },
  { caseName: "Genitiv", masculine: "-es", feminine: "-er", neuter: "-es", plural: "-er", mnemonic: "Possession: des Hauses meines Vaters, wegen meiner Mutter" },
];

// Unified expression list for table search, bookmarking, and audio playback
export interface PronounMasterItem {
  id: number;
  title: string;
  subtitle: string;
  tableType: 'Personalpronomen' | 'Possessivstamm' | 'Nominativ' | 'Akkusativ' | 'Dativ' | 'Genitiv' | 'Endungen-Regel';
  details: string;
  germanSentence: string;
  englishSentence: string;
  note?: string;
  category: string;
  level: string;
}

export const PRONOUNS_MASTER_LIST: PronounMasterItem[] = [
  // 1. Personal Pronouns (Personalpronomen)
  {
    id: 1,
    title: "ich (mich, mir, mein)",
    subtitle: "1st Person Singular (I)",
    tableType: "Personalpronomen",
    details: "Nom: ich | Akk: mich | Dat: mir | Refl: mich – mir | Poss: mein",
    germanSentence: "Ich sehe mich im Spiegel, aber du hilfst mir.",
    englishSentence: "I see myself in the mirror, but you are helping me.",
    note: "Dativ 'mir' with verbs like helfen, antworten, danken, gefallen",
    category: "1. Personalpronomen",
    level: "A1"
  },
  {
    id: 2,
    title: "du (dich, dir, dein)",
    subtitle: "2nd Person Singular (you informal)",
    tableType: "Personalpronomen",
    details: "Nom: du | Akk: dich | Dat: dir | Refl: dich – dir | Poss: dein",
    germanSentence: "Ich liebe dich und ich gebe dir das Buch.",
    englishSentence: "I love you and I give you the book.",
    note: "Akkusativ 'dich' (direct object); Dativ 'dir' (recipient)",
    category: "1. Personalpronomen",
    level: "A1"
  },
  {
    id: 3,
    title: "er (ihn, ihm, sein)",
    subtitle: "3rd Person Sg Masculine (he/him/his)",
    tableType: "Personalpronomen",
    details: "Nom: er | Akk: ihn | Dat: ihm | Refl: sich | Poss: sein",
    germanSentence: "Ich kenne ihn gut und antworte ihm sofort.",
    englishSentence: "I know him well and reply to him immediately.",
    note: "Reflexive pronoun for er is 'sich'",
    category: "1. Personalpronomen",
    level: "A1"
  },
  {
    id: 4,
    title: "sie (sie, ihr, ihr)",
    subtitle: "3rd Person Sg Feminine (she/her)",
    tableType: "Personalpronomen",
    details: "Nom: sie | Akk: sie | Dat: ihr | Refl: sich | Poss: ihr",
    germanSentence: "Ich rufe sie an und schenke ihr Blumen.",
    englishSentence: "I call her and give her flowers.",
    note: "Notice Dativ is 'ihr' (to her) while Nominativ/Akkusativ are 'sie'",
    category: "1. Personalpronomen",
    level: "A1"
  },
  {
    id: 5,
    title: "es (es, ihm, sein)",
    subtitle: "3rd Person Sg Neuter (it/its)",
    tableType: "Personalpronomen",
    details: "Nom: es | Akk: es | Dat: ihm | Refl: sich | Poss: sein",
    germanSentence: "Das Kind weint; die Mutter tröstet es und gibt ihm Milch.",
    englishSentence: "The child cries; the mother comforts it and gives it milk.",
    note: "Dativ for neuter is 'ihm' (identical to masculine)",
    category: "1. Personalpronomen",
    level: "A1"
  },
  {
    id: 6,
    title: "wir (uns, uns, unser)",
    subtitle: "1st Person Plural (we/us/our)",
    tableType: "Personalpronomen",
    details: "Nom: wir | Akk: uns | Dat: uns | Refl: uns | Poss: unser",
    germanSentence: "Wir freuen uns, und der Lehrer erklärt uns die Grammatik.",
    englishSentence: "We are pleased, and the teacher explains the grammar to us.",
    note: "Both Akkusativ and Dativ are 'uns'",
    category: "1. Personalpronomen",
    level: "A1"
  },
  {
    id: 7,
    title: "ihr (euch, euch, euer)",
    subtitle: "2nd Person Plural (you all/your)",
    tableType: "Personalpronomen",
    details: "Nom: ihr | Akk: euch | Dat: euch | Refl: euch | Poss: euer",
    germanSentence: "Ich besuche euch morgen und helfe euch gern.",
    englishSentence: "I will visit you tomorrow and gladly help you.",
    note: "Both Akkusativ and Dativ are 'euch'",
    category: "1. Personalpronomen",
    level: "A1"
  },
  {
    id: 8,
    title: "sie (sie, ihnen, ihr)",
    subtitle: "3rd Person Plural (they/them/their)",
    tableType: "Personalpronomen",
    details: "Nom: sie | Akk: sie | Dat: ihnen | Refl: sich | Poss: ihr",
    germanSentence: "Sie waschen sich, und ich danke ihnen herzlich.",
    englishSentence: "They wash themselves, and I thank them warmly.",
    note: "Dativ plural is 'ihnen' with lowercase 'i'",
    category: "1. Personalpronomen",
    level: "A1"
  },
  {
    id: 9,
    title: "Sie (Sie, Ihnen, Ihr)",
    subtitle: "Formal polite address (you/your)",
    tableType: "Personalpronomen",
    details: "Nom: Sie | Akk: Sie | Dat: Ihnen | Refl: sich | Poss: Ihr",
    germanSentence: "Darf ich Sie etwas fragen? Ich helfe Ihnen gern.",
    englishSentence: "May I ask you something? I would gladly help you.",
    note: "Always capitalized: Sie, Ihnen, Ihr, Ihres, etc.",
    category: "1. Personalpronomen",
    level: "A1"
  },
  {
    id: 10,
    title: "man (einen, einem, sein)",
    subtitle: "Impersonal pronoun (one / people)",
    tableType: "Personalpronomen",
    details: "Nom: man | Akk: einen | Dat: einem | Refl: sich | Poss: sein",
    germanSentence: "Das macht einen müde, wenn einem niemand hilft.",
    englishSentence: "That makes one tired when nobody helps one.",
    note: "Notice declension: man (Nom) → einen (Akk) → einem (Dat)",
    category: "1. Personalpronomen",
    level: "A2–B1"
  },

  // 2. Possessive Stems
  {
    id: 11,
    title: "Possessivstämme Übersicht",
    subtitle: "The 9 Core Possessive Stems",
    tableType: "Possessivstamm",
    details: "ich→mein | du→dein | er/es→sein | sie→ihr | wir→unser | ihr→euer | sie→ihr | Sie→Ihr",
    germanSentence: "Das ist mein Buch, dein Stift, sein Handy und ihr Auto.",
    englishSentence: "That is my book, your pen, his mobile phone and her car.",
    note: "These base stems take regular case endings like 'ein/kein'",
    category: "2. Possessivstämme",
    level: "A1"
  },

  // 3. Nominativ Table Highlights
  {
    id: 12,
    title: "Nominativ: mein / meine / mein / meine",
    subtitle: "Subject / Predicate Nominative",
    tableType: "Nominativ",
    details: "Masc: mein Vater | Fem: meine Mutter | Neut: mein Kind | Plural: meine Eltern",
    germanSentence: "Mein Vater ist nett, meine Mutter ist klug und mein Kind spielt.",
    englishSentence: "My father is kind, my mother is smart and my child is playing.",
    note: "Endings in Nominativ: Masc: – | Fem: -e | Neut: – | Plural: -e",
    category: "3. Nominativ Endungen",
    level: "A1"
  },
  {
    id: 13,
    title: "Nominativ: euer / eure / euer / eure",
    subtitle: "Special spelling shift with euer!",
    tableType: "Nominativ",
    details: "Masc: euer Hund | Fem: eure Katze | Neut: euer Haus | Plural: eure Freunde",
    germanSentence: "Ist das euer Hund? Nein, das ist unsere Katze.",
    englishSentence: "Is that your dog? No, that is our cat.",
    note: "Attention: euer drops the middle 'e' before -e: eu-re (not euere)!",
    category: "3. Nominativ Endungen",
    level: "A1–A2"
  },

  // 4. Akkusativ Table Highlights
  {
    id: 14,
    title: "Akkusativ: meinen / meine / mein / meine",
    subtitle: "Direct Object / Akkusativ Preposition",
    tableType: "Akkusativ",
    details: "Masc: meinen Vater (-en) | Fem: meine Mutter (-e) | Neut: mein Kind (–) | Plural: meine Bücher (-e)",
    germanSentence: "Ich suche meinen Schlüssel, meine Tasche und mein Ticket.",
    englishSentence: "I am looking for my key, my bag and my ticket.",
    note: "CRITICAL: Only masculine changes in Akkusativ: mein → meinen (-en)!",
    category: "4. Akkusativ Endungen",
    level: "A1"
  },
  {
    id: 15,
    title: "Akkusativ: ihren / ihre / ihr / ihre",
    subtitle: "Possessive for 'sie' (her/their) in Akkusativ",
    tableType: "Akkusativ",
    details: "Masc: ihren Bruder | Fem: ihre Schwester | Neut: ihr Auto | Plural: ihre Eltern",
    germanSentence: "Sie besucht ihren Bruder und ihre Schwester in München.",
    englishSentence: "She visits her brother and her sister in Munich.",
    note: "Masculine takes -en: ihren Bruder",
    category: "4. Akkusativ Endungen",
    level: "A1–A2"
  },

  // 5. Dativ Table Highlights
  {
    id: 16,
    title: "Dativ: meinem / meiner / meinem / meinen (+n)",
    subtitle: "Indirect Object / Dative Preposition",
    tableType: "Dativ",
    details: "Masc: mit meinem Vater (-em) | Fem: mit meiner Mutter (-er) | Neut: mit meinem Kind (-em) | Pl: mit meinen Freunden (-en +n)",
    germanSentence: "Ich helfe meinem Vater, meiner Mutter und meinen Freunden.",
    englishSentence: "I help my father, my mother and my friends.",
    note: "Remember: Masc/Neut = -em, Fem = -er, Plural = -en (noun also gets +n: Freunden)!",
    category: "5. Dativ Endungen",
    level: "A1–A2"
  },
  {
    id: 17,
    title: "Dativ: eurem / eurer / eurem / euren",
    subtitle: "Possessive for 'ihr' (euer) in Dativ",
    tableType: "Dativ",
    details: "Masc: mit eurem Vater | Fem: mit eurer Mutter | Neut: mit eurem Kind | Pl: mit euren Freunden",
    germanSentence: "Wir gratulieren eurem Vater und eurer Mutter herzlich.",
    englishSentence: "We congratulate your father and your mother warmly.",
    note: "Drops the inner 'e': eurem, eurer, eurem, euren",
    category: "5. Dativ Endungen",
    level: "A2"
  },

  // 6. Genitiv Table Highlights
  {
    id: 18,
    title: "Genitiv: meines / meiner / meines / meiner",
    subtitle: "Possession / Genitive Preposition",
    tableType: "Genitiv",
    details: "Masc: das Auto meines Vaters (-es +s) | Fem: der Hut meiner Mutter (-er) | Neut: das Spielzeug meines Kindes (-es +s) | Pl: das Haus meiner Eltern (-er)",
    germanSentence: "Wegen meines Termins kann ich nicht kommen.",
    englishSentence: "Because of my appointment, I cannot come.",
    note: "Masculine and Neuter take -es on the possessive, and +s/+es on the noun!",
    category: "6. Genitiv Endungen",
    level: "B1"
  },
  {
    id: 19,
    title: "Genitiv: unseres / unserer / unseres / unserer",
    subtitle: "Possessive for 'wir' (unser) in Genitiv",
    tableType: "Genitiv",
    details: "Masc: unseres Hauses | Fem: unserer Stadt | Neut: unseres Autos | Pl: unserer Nachbarn",
    germanSentence: "Die Lage unserer Wohnung ist sehr ruhig.",
    englishSentence: "The location of our apartment is very quiet.",
    note: "Genitiv endings: -es (Masc/Neut) | -er (Fem/Plural)",
    category: "6. Genitiv Endungen",
    level: "B1"
  },

  // 7. Quick Revision Table
  {
    id: 20,
    title: "Endungen-Regel: – / -e / – / -e (Nominativ)",
    subtitle: "Nominativ Endings Mnemonic",
    tableType: "Endungen-Regel",
    details: "Masculine: – (no ending) | Feminine: -e | Neuter: – (no ending) | Plural: -e",
    germanSentence: "Ein guter Trick: Nur die feminine und plurale Form bekommt ein -e im Nominativ!",
    englishSentence: "A great trick: Only the feminine and plural forms get an -e in Nominativ!",
    note: "Masc and Neut possessives look identical to the stem: mein, dein, sein, etc.",
    category: "7. Revision Endungen",
    level: "A1"
  },
  {
    id: 21,
    title: "Endungen-Regel: -en / -e / – / -e (Akkusativ)",
    subtitle: "Akkusativ Endings Mnemonic",
    tableType: "Endungen-Regel",
    details: "Masculine: -en | Feminine: -e | Neuter: – (no ending) | Plural: -e",
    germanSentence: "Im Akkusativ ändert sich NUR der maskuline Artikel zu -en: meinen, deinen, seinen!",
    englishSentence: "In Akkusativ, ONLY the masculine article changes to -en: meinen, deinen, seinen!",
    note: "Feminine (-e), Neuter (–), and Plural (-e) stay identical to Nominativ!",
    category: "7. Revision Endungen",
    level: "A1"
  },
  {
    id: 22,
    title: "Endungen-Regel: -em / -er / -em / -en (Dativ)",
    subtitle: "Dativ Endings Mnemonic (Mr. M-R-M-N)",
    tableType: "Endungen-Regel",
    details: "Masculine: -em | Feminine: -er | Neuter: -em | Plural: -en (+n on noun)",
    germanSentence: "Merksatz für Dativ-Endungen: M - R - M - N (meinem, meiner, meinem, meinen)!",
    englishSentence: "Mnemonic for Dative endings: M - R - M - N (meinem, meiner, meinem, meinen)!",
    note: "Plural nouns also add +n in Dativ if possible: mit den Kindern, mit meinen Freunden",
    category: "7. Revision Endungen",
    level: "A1–A2"
  },
  {
    id: 23,
    title: "Endungen-Regel: -es / -er / -es / -er (Genitiv)",
    subtitle: "Genitiv Endings Mnemonic (S - R - S - R)",
    tableType: "Endungen-Regel",
    details: "Masculine: -es (+s) | Feminine: -er | Neuter: -es (+s) | Plural: -er",
    germanSentence: "Merksatz für Genitiv-Endungen: S - R - S - R (meines, meiner, meines, meiner)!",
    englishSentence: "Mnemonic for Genitive endings: S - R - S - R (meines, meiner, meines, meiner)!",
    note: "Masculine & Neuter nouns add -(e)s: des Vaters, des Kindes",
    category: "7. Revision Endungen",
    level: "B1"
  }
];

const uniquePronounCats = Array.from(
  new Set(PRONOUNS_MASTER_LIST.map((item) => item.category))
) as string[];

export const PRONOUNS_CATEGORIES = [
  `All (${PRONOUNS_MASTER_LIST.length})`,
  ...uniquePronounCats.sort()
];
