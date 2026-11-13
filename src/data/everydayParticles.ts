export interface EverydayParticleItem {
  id: number;
  particle: string;
  english: string;
  germanSentence: string;
  englishSentence: string;
  category: string; // "Time Status (schon/noch)", "Temporal (wieder/eben)", "Emphasis & Addition", "Attitude & Conversation", "Conversational 'mal'", "Meanings of 'eben'"
  section: string;
  level: string;
}

export const EVERYDAY_PARTICLES_LIST: EverydayParticleItem[] = [
  // 7.1 Already, still, yet and no longer
  {
    id: 1,
    particle: "schon",
    english: "already",
    germanSentence: "Ich habe schon gegessen.",
    englishSentence: "I have already eaten.",
    category: "Time Status (schon/noch)",
    section: "7.1 Already, Still & Yet",
    level: "A1"
  },
  {
    id: 2,
    particle: "noch",
    english: "still; yet; another",
    germanSentence: "Ich muss noch meine E-Mails beantworten.",
    englishSentence: "I still have to answer my emails.",
    category: "Time Status (schon/noch)",
    section: "7.1 Already, Still & Yet",
    level: "A1"
  },
  {
    id: 3,
    particle: "noch nicht",
    english: "not yet",
    germanSentence: "Der Zug ist noch nicht angekommen.",
    englishSentence: "The train has not arrived yet.",
    category: "Time Status (schon/noch)",
    section: "7.1 Already, Still & Yet",
    level: "A1"
  },
  {
    id: 4,
    particle: "nicht mehr",
    english: "no longer; not anymore",
    germanSentence: "Sie wohnt nicht mehr in Berlin.",
    englishSentence: "She no longer lives in Berlin.",
    category: "Time Status (schon/noch)",
    section: "7.1 Already, Still & Yet",
    level: "A1–A2"
  },
  {
    id: 5,
    particle: "bereits",
    english: "by now; already (more formal)",
    germanSentence: "Die Hälfte der Plätze ist bereits reserviert.",
    englishSentence: "Half of the seats are already reserved.",
    category: "Time Status (schon/noch)",
    section: "7.1 Already, Still & Yet",
    level: "B1"
  },
  {
    id: 6,
    particle: "längst nicht mehr",
    english: "no longer; not anymore (emphatic)",
    germanSentence: "Das ist längst nicht mehr modern.",
    englishSentence: "That is no longer modern.",
    category: "Time Status (schon/noch)",
    section: "7.1 Already, Still & Yet",
    level: "B1–B2"
  },
  {
    id: 7,
    particle: "erst",
    english: "only; not until; first",
    germanSentence: "Wir sind erst seit zwei Tagen hier.",
    englishSentence: "We have only been here for two days.",
    category: "Time Status (schon/noch)",
    section: "7.1 Already, Still & Yet",
    level: "A1–A2"
  },
  {
    id: 8,
    particle: "erst dann",
    english: "only then",
    germanSentence: "Erst dann habe ich das Problem verstanden.",
    englishSentence: "Only then did I understand the problem.",
    category: "Time Status (schon/noch)",
    section: "7.1 Already, Still & Yet",
    level: "A2–B1"
  },
  {
    id: 9,
    particle: "immer noch",
    english: "still; even now",
    germanSentence: "Er schläft immer noch.",
    englishSentence: "He is still sleeping.",
    category: "Time Status (schon/noch)",
    section: "7.1 Already, Still & Yet",
    level: "A2"
  },

  // 7.2 Again, just now and a moment ago
  {
    id: 10,
    particle: "wieder",
    english: "again",
    germanSentence: "Kannst du das bitte wiederholen?",
    englishSentence: "Could you repeat that, please?",
    category: "Temporal (wieder/eben)",
    section: "7.2 Again & Just Now",
    level: "A1"
  },
  {
    id: 11,
    particle: "noch einmal",
    english: "once again; one more time",
    germanSentence: "Könnten Sie das bitte noch einmal erklären?",
    englishSentence: "Could you explain that once again, please?",
    category: "Temporal (wieder/eben)",
    section: "7.2 Again & Just Now",
    level: "A1"
  },
  {
    id: 12,
    particle: "gerade",
    english: "right now; currently",
    germanSentence: "Ich kann gerade nicht sprechen.",
    englishSentence: "I cannot speak right now.",
    category: "Temporal (wieder/eben)",
    section: "7.2 Again & Just Now",
    level: "A1–A2"
  },
  {
    id: 13,
    particle: "eben",
    english: "just; a moment ago",
    germanSentence: "Sie ist eben nach Hause gegangen.",
    englishSentence: "She has just gone home.",
    category: "Temporal (wieder/eben)",
    section: "7.2 Again & Just Now",
    level: "A2"
  },
  {
    id: 14,
    particle: "gerade erst",
    english: "just now; recently",
    germanSentence: "Ich bin gerade erst angekommen.",
    englishSentence: "I have only just arrived.",
    category: "Temporal (wieder/eben)",
    section: "7.2 Again & Just Now",
    level: "A2"
  },

  // 7.3 Emphasis and addition
  {
    id: 15,
    particle: "auch",
    english: "also; too",
    germanSentence: "Meine Schwester kommt auch zum Essen.",
    englishSentence: "My sister is also coming for dinner.",
    category: "Emphasis & Addition",
    section: "7.3 Emphasis & Addition",
    level: "A1"
  },
  {
    id: 16,
    particle: "sogar",
    english: "even",
    germanSentence: "Sogar mein Vater hat die Nachricht gelesen.",
    englishSentence: "Even my father read the message.",
    category: "Emphasis & Addition",
    section: "7.3 Emphasis & Addition",
    level: "A2–B1"
  },
  {
    id: 17,
    particle: "nicht einmal",
    english: "not even",
    germanSentence: "Er hat nicht einmal angerufen.",
    englishSentence: "He did not even call.",
    category: "Emphasis & Addition",
    section: "7.3 Emphasis & Addition",
    level: "A2–B1"
  },
  {
    id: 18,
    particle: "wirklich",
    english: "really",
    germanSentence: "Das war wirklich eine gute Idee.",
    englishSentence: "That was really a good idea.",
    category: "Emphasis & Addition",
    section: "7.3 Emphasis & Addition",
    level: "A1–A2"
  },
  {
    id: 19,
    particle: "noch mehr",
    english: "even more",
    germanSentence: "Ich möchte noch mehr lernen.",
    englishSentence: "I want to learn even more.",
    category: "Emphasis & Addition",
    section: "7.3 Emphasis & Addition",
    level: "A1–A2"
  },
  {
    id: 20,
    particle: "überhaupt",
    english: "at all",
    germanSentence: "Hast du überhaupt Zeit?",
    englishSentence: "Do you have any time at all?",
    category: "Emphasis & Addition",
    section: "7.3 Emphasis & Addition",
    level: "A2"
  },

  // 7.4 Conversation and attitude
  {
    id: 21,
    particle: "recht",
    english: "quite; fairly",
    germanSentence: "Das Buch ist recht interessant.",
    englishSentence: "The book is quite interesting.",
    category: "Attitude & Conversation",
    section: "7.4 Conversation & Attitude",
    level: "A2"
  },
  {
    id: 22,
    particle: "einfach",
    english: "simply; just",
    germanSentence: "Mach dir einfach keine Sorgen.",
    englishSentence: "Just don't worry.",
    category: "Attitude & Conversation",
    section: "7.4 Conversation & Attitude",
    level: "A2"
  },
  {
    id: 23,
    particle: "gerade heute",
    english: "especially today",
    germanSentence: "Gerade heute habe ich keine Zeit.",
    englishSentence: "Especially today, I have no time.",
    category: "Attitude & Conversation",
    section: "7.4 Conversation & Attitude",
    level: "A2"
  },

  // 7.5 The conversational particle mal
  {
    id: 24,
    particle: "mal",
    english: "just; a moment (makes requests polite & natural)",
    germanSentence: "Kannst du mir mal kurz helfen?",
    englishSentence: "Could you give me a hand for a moment?",
    category: "Conversational 'mal'",
    section: "7.5 Particle 'mal'",
    level: "A1–A2"
  },
  {
    id: 25,
    particle: "mal schauen",
    english: "have a look / see",
    germanSentence: "Ich muss mal schauen.",
    englishSentence: "I need to have a look.",
    category: "Conversational 'mal'",
    section: "7.5 Particle 'mal'",
    level: "A2"
  },
  {
    id: 26,
    particle: "mal ausprobieren",
    english: "try it out",
    germanSentence: "Probier das mal aus!",
    englishSentence: "Try that out!",
    category: "Conversational 'mal'",
    section: "7.5 Particle 'mal'",
    level: "A2"
  },
  {
    id: 27,
    particle: "mal warten",
    english: "wait a moment",
    germanSentence: "Warte mal bitte!",
    englishSentence: "Just wait a moment, please!",
    category: "Conversational 'mal'",
    section: "7.5 Particle 'mal'",
    level: "A1–A2"
  },
  {
    id: 28,
    particle: "mal fragen",
    english: "ask someone",
    germanSentence: "Ich kann meinen Lehrer mal fragen.",
    englishSentence: "I can ask my teacher.",
    category: "Conversational 'mal'",
    section: "7.5 Particle 'mal'",
    level: "A2"
  },
  {
    id: 29,
    particle: "mal anrufen",
    english: "give someone a call",
    germanSentence: "Ich muss meine Mutter mal anrufen.",
    englishSentence: "I need to call my mother.",
    category: "Conversational 'mal'",
    section: "7.5 Particle 'mal'",
    level: "A2"
  },

  // 7.6 The different meanings of eben
  {
    id: 30,
    particle: "eben (just now)",
    english: "just now",
    germanSentence: "Ich habe eben angerufen.",
    englishSentence: "I just called.",
    category: "Meanings of 'eben'",
    section: "7.6 Meanings of 'eben'",
    level: "A2"
  },
  {
    id: 31,
    particle: "eben (simply / then)",
    english: "simply; then",
    germanSentence: "Dann warten wir eben noch ein bisschen.",
    englishSentence: "Then we'll simply wait a little longer.",
    category: "Meanings of 'eben'",
    section: "7.6 Meanings of 'eben'",
    level: "B1"
  },
  {
    id: 32,
    particle: "eben (that's how it is)",
    english: "exactly; that's just how it is",
    germanSentence: "Das ist eben so.",
    englishSentence: "That's just how it is.",
    category: "Meanings of 'eben'",
    section: "7.6 Meanings of 'eben'",
    level: "A2–B1"
  }
];

const uniquePartCats = Array.from(
  new Set(EVERYDAY_PARTICLES_LIST.map((item) => item.category))
) as string[];

export const EVERYDAY_PARTICLES_CATEGORIES = [
  `All (${EVERYDAY_PARTICLES_LIST.length})`,
  ...uniquePartCats.sort()
];
