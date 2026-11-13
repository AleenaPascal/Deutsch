export interface GrammarPrepositionItem {
  id: number;
  pattern: string;           // e.g. "sich freuen auf + Akk.", "zufrieden mit + Dat.", "mir ist kalt"
  english: string;           // e.g. "to look forward to"
  prepCase?: string;         // "+ Akkusativ" | "+ Dativ" | "Dativ expression"
  germanSentence: string;
  englishSentence: string;
  category: 'Feelings with Dativ' | 'Adjective + Preposition' | 'Verb + Preposition (Akk)' | 'Verb + Preposition (Dat)';
  section: string;
  level: string;
}

export const GRAMMAR_PREPOSITIONS_LIST: GrammarPrepositionItem[] = [
  // 9.2 Expressing feelings with Dativ — Gefühle mit Dativ ausdrücken
  {
    id: 1,
    pattern: "mir ist kalt",
    english: "I am cold (feeling)",
    prepCase: "Dativ expression",
    germanSentence: "Mir ist kalt. Kannst du die Heizung anmachen?",
    englishSentence: "I am cold. Can you turn on the heating?",
    category: "Feelings with Dativ",
    section: "9.2 Gefühle mit Dativ",
    level: "A1–A2"
  },
  {
    id: 2,
    pattern: "mir ist heiß",
    english: "I am hot",
    prepCase: "Dativ expression",
    germanSentence: "Mir ist heiß. Machen wir das Fenster auf.",
    englishSentence: "I am hot. Let's open the window.",
    category: "Feelings with Dativ",
    section: "9.2 Gefühle mit Dativ",
    level: "A1–A2"
  },
  {
    id: 3,
    pattern: "mir ist schlecht",
    english: "I feel sick / nauseous",
    prepCase: "Dativ expression",
    germanSentence: "Mir ist heute schlecht.",
    englishSentence: "I feel sick today.",
    category: "Feelings with Dativ",
    section: "9.2 Gefühle mit Dativ",
    level: "A2"
  },
  {
    id: 4,
    pattern: "mir ist schwindelig",
    english: "I feel dizzy",
    prepCase: "Dativ expression",
    germanSentence: "Mir ist plötzlich schwindelig geworden.",
    englishSentence: "I suddenly felt dizzy.",
    category: "Feelings with Dativ",
    section: "9.2 Gefühle mit Dativ",
    level: "A2"
  },
  {
    id: 5,
    pattern: "mir ist langweilig",
    english: "I am bored",
    prepCase: "Dativ expression",
    germanSentence: "Mir ist zu Hause langweilig.",
    englishSentence: "I am bored at home.",
    category: "Feelings with Dativ",
    section: "9.2 Gefühle mit Dativ",
    level: "A1–A2"
  },
  {
    id: 6,
    pattern: "es gefällt mir",
    english: "I like it (it pleases me)",
    prepCase: "Dativ expression",
    germanSentence: "Das Kleid gefällt mir sehr gut.",
    englishSentence: "I like the dress very much.",
    category: "Feelings with Dativ",
    section: "9.2 Gefühle mit Dativ",
    level: "A1"
  },
  {
    id: 7,
    pattern: "ich habe Lust auf + Akk.",
    english: "I feel like having / doing",
    prepCase: "+ Akkusativ",
    germanSentence: "Ich habe Lust auf einen heißen Kaffee.",
    englishSentence: "I feel like having a hot coffee.",
    category: "Feelings with Dativ",
    section: "9.2 Gefühle mit Dativ",
    level: "A1–A2"
  },

  // 9.3 Adjective + preposition combinations — Adjektiv + Präposition
  {
    id: 8,
    pattern: "zufrieden mit + Dat.",
    english: "satisfied / pleased with",
    prepCase: "+ Dativ",
    germanSentence: "Ich bin mit dem Ergebnis sehr zufrieden.",
    englishSentence: "I am very satisfied with the result.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "A2–B1"
  },
  {
    id: 9,
    pattern: "unzufrieden mit + Dat.",
    english: "dissatisfied with",
    prepCase: "+ Dativ",
    germanSentence: "Viele Kunden sind mit dem Service unzufrieden.",
    englishSentence: "Many customers are dissatisfied with the service.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "A2–B1"
  },
  {
    id: 10,
    pattern: "stolz auf + Akk.",
    english: "proud of",
    prepCase: "+ Akkusativ",
    germanSentence: "Sie ist stolz auf ihren Sohn.",
    englishSentence: "She is proud of her son.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "A2–B1"
  },
  {
    id: 11,
    pattern: "interessiert an + Dat.",
    english: "interested in",
    prepCase: "+ Dativ",
    germanSentence: "Ich bin an deutscher Kultur interessiert.",
    englishSentence: "I am interested in German culture.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "A2–B1"
  },
  {
    id: 12,
    pattern: "abhängig von + Dat.",
    english: "dependent on",
    prepCase: "+ Dativ",
    germanSentence: "Das Ergebnis ist vom Wetter abhängig.",
    englishSentence: "The result depends on the weather.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "B1"
  },
  {
    id: 13,
    pattern: "verantwortlich für + Akk.",
    english: "responsible for",
    prepCase: "+ Akkusativ",
    germanSentence: "Er ist für das gesamte Projekt verantwortlich.",
    englishSentence: "He is responsible for the entire project.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "B1"
  },
  {
    id: 14,
    pattern: "Angst haben vor + Dat.",
    english: "afraid of",
    prepCase: "+ Dativ",
    germanSentence: "Das Kind hat Angst vor großen Hunden.",
    englishSentence: "The child is afraid of big dogs.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "A2"
  },
  {
    id: 15,
    pattern: "vertraut mit + Dat.",
    english: "familiar with",
    prepCase: "+ Dativ",
    germanSentence: "Ich bin mit dieser Situation vertraut.",
    englishSentence: "I am familiar with this situation.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "B1"
  },
  {
    id: 16,
    pattern: "froh über + Akk.",
    english: "glad / happy about",
    prepCase: "+ Akkusativ",
    germanSentence: "Ich bin froh über deine Hilfe.",
    englishSentence: "I am happy about your help.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "A2"
  },
  {
    id: 17,
    pattern: "enttäuscht von + Dat.",
    english: "disappointed by (a person or result)",
    prepCase: "+ Dativ",
    germanSentence: "Ich bin von dem Ergebnis enttäuscht.",
    englishSentence: "I am disappointed by the result.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "B1"
  },
  {
    id: 18,
    pattern: "geeignet für + Akk.",
    english: "suitable for",
    prepCase: "+ Akkusativ",
    germanSentence: "Dieses Buch ist für Anfänger geeignet.",
    englishSentence: "This book is suitable for beginners.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "B1"
  },
  {
    id: 19,
    pattern: "notwendig für + Akk.",
    english: "necessary for",
    prepCase: "+ Akkusativ",
    germanSentence: "Sport ist für die Gesundheit notwendig.",
    englishSentence: "Sport is necessary for health.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "B1"
  },
  {
    id: 20,
    pattern: "beliebt bei + Dat.",
    english: "popular with / among",
    prepCase: "+ Dativ",
    germanSentence: "Der Park ist bei Familien besonders beliebt.",
    englishSentence: "The park is especially popular with families.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "A2–B1"
  },
  {
    id: 21,
    pattern: "reich an + Dat.",
    english: "rich in",
    prepCase: "+ Dativ",
    germanSentence: "Die Region ist reich an Geschichte.",
    englishSentence: "The region is rich in history.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "B1"
  },
  {
    id: 22,
    pattern: "bekannt für + Akk.",
    english: "famous / renowned for",
    prepCase: "+ Akkusativ",
    germanSentence: "Die Stadt ist für ihre Architektur bekannt.",
    englishSentence: "The city is famous for its architecture.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "A2–B1"
  },
  {
    id: 23,
    pattern: "neugierig auf + Akk.",
    english: "curious about",
    prepCase: "+ Akkusativ",
    germanSentence: "Ich bin neugierig auf das Ergebnis.",
    englishSentence: "I am curious about the result.",
    category: "Adjective + Preposition",
    section: "9.3 Adjektiv + Präposition",
    level: "A2–B1"
  },

  // 9.4 Verb + preposition combinations — Verben mit Präpositionen (Akkusativ)
  {
    id: 24,
    pattern: "sich freuen auf + Akk.",
    english: "to look forward to (future)",
    prepCase: "+ Akkusativ",
    germanSentence: "Ich freue mich auf das Wochenende.",
    englishSentence: "I am looking forward to the weekend.",
    category: "Verb + Preposition (Akk)",
    section: "9.4 Verben + Präpositionen",
    level: "A2"
  },
  {
    id: 25,
    pattern: "sich freuen über + Akk.",
    english: "to be happy / glad about (present/past)",
    prepCase: "+ Akkusativ",
    germanSentence: "Ich freue mich über dein Geschenk.",
    englishSentence: "I am happy about your gift.",
    category: "Verb + Preposition (Akk)",
    section: "9.4 Verben + Präpositionen",
    level: "A2"
  },
  {
    id: 26,
    pattern: "sich entscheiden für + Akk.",
    english: "to decide on",
    prepCase: "+ Akkusativ",
    germanSentence: "Ich habe mich für diesen Kurs entschieden.",
    englishSentence: "I decided on this course.",
    category: "Verb + Preposition (Akk)",
    section: "9.4 Verben + Präpositionen",
    level: "B1"
  },
  {
    id: 27,
    pattern: "sich erinnern an + Akk.",
    english: "to remember",
    prepCase: "+ Akkusativ",
    germanSentence: "Ich erinnere mich an meine Schulzeit.",
    englishSentence: "I remember my school days.",
    category: "Verb + Preposition (Akk)",
    section: "9.4 Verben + Präpositionen",
    level: "A2–B1"
  },
  {
    id: 28,
    pattern: "sich gewöhnen an + Akk.",
    english: "to get used to",
    prepCase: "+ Akkusativ",
    germanSentence: "Ich muss mich an das neue Leben gewöhnen.",
    englishSentence: "I have to get used to the new life.",
    category: "Verb + Preposition (Akk)",
    section: "9.4 Verben + Präpositionen",
    level: "B1"
  },
  {
    id: 29,
    pattern: "sich konzentrieren auf + Akk.",
    english: "to concentrate on",
    prepCase: "+ Akkusativ",
    germanSentence: "Ich konzentriere mich auf meine Prüfung.",
    englishSentence: "I concentrate on my exam.",
    category: "Verb + Preposition (Akk)",
    section: "9.4 Verben + Präpositionen",
    level: "B1"
  },
  {
    id: 30,
    pattern: "sich Sorgen machen um + Akk.",
    english: "to worry about",
    prepCase: "+ Akkusativ",
    germanSentence: "Meine Eltern machen sich Sorgen um mich.",
    englishSentence: "My parents worry about me.",
    category: "Verb + Preposition (Akk)",
    section: "9.4 Verben + Präpositionen",
    level: "A2–B1"
  },
  {
    id: 31,
    pattern: "sich entschuldigen für + Akk.",
    english: "to apologise for (a reason)",
    prepCase: "+ Akkusativ",
    germanSentence: "Ich möchte mich für meinen Fehler entschuldigen.",
    englishSentence: "I want to apologise for my mistake.",
    category: "Verb + Preposition (Akk)",
    section: "9.4 Verben + Präpositionen",
    level: "A2–B1"
  },
  {
    id: 32,
    pattern: "sich bedanken für + Akk.",
    english: "to thank someone for (something)",
    prepCase: "+ Akkusativ",
    germanSentence: "Ich bedanke mich für deine Hilfe.",
    englishSentence: "I thank you for your help.",
    category: "Verb + Preposition (Akk)",
    section: "9.4 Verben + Präpositionen",
    level: "A2–B1"
  },

  // 9.4 Verb + preposition combinations — Verben mit Dativ
  {
    id: 33,
    pattern: "suchen nach + Dat.",
    english: "to search / look for",
    prepCase: "+ Dativ",
    germanSentence: "Ich suche nach einer neuen Wohnung.",
    englishSentence: "I am looking for a new apartment.",
    category: "Verb + Preposition (Dat)",
    section: "9.4 Verben + Präpositionen",
    level: "A2"
  },
  {
    id: 34,
    pattern: "abhängen von + Dat.",
    english: "to depend on",
    prepCase: "+ Dativ",
    germanSentence: "Das hängt vom Wetter ab.",
    englishSentence: "That depends on the weather.",
    category: "Verb + Preposition (Dat)",
    section: "9.4 Verben + Präpositionen",
    level: "B1"
  },
  {
    id: 35,
    pattern: "umgehen mit + Dat.",
    english: "to deal with / handle",
    prepCase: "+ Dativ",
    germanSentence: "Man muss lernen, mit Stress umzugehen.",
    englishSentence: "One must learn to deal with stress.",
    category: "Verb + Preposition (Dat)",
    section: "9.4 Verben + Präpositionen",
    level: "B1–B2"
  },
  {
    id: 36,
    pattern: "sich verstehen mit + Dat.",
    english: "to get along with",
    prepCase: "+ Dativ",
    germanSentence: "Ich verstehe mich gut mit meinen Kollegen.",
    englishSentence: "I get along well with my colleagues.",
    category: "Verb + Preposition (Dat)",
    section: "9.4 Verben + Präpositionen",
    level: "A2–B1"
  },
  {
    id: 37,
    pattern: "sich entschuldigen bei + Dat.",
    english: "to apologise to (a person)",
    prepCase: "+ Dativ",
    germanSentence: "Ich möchte mich bei dir entschuldigen.",
    englishSentence: "I want to apologise to you.",
    category: "Verb + Preposition (Dat)",
    section: "9.4 Verben + Präpositionen",
    level: "A2–B1"
  },
  {
    id: 38,
    pattern: "sich bedanken bei + Dat.",
    english: "to thank (a person)",
    prepCase: "+ Dativ",
    germanSentence: "Ich möchte mich bei dir bedanken.",
    englishSentence: "I want to thank you.",
    category: "Verb + Preposition (Dat)",
    section: "9.4 Verben + Präpositionen",
    level: "A2–B1"
  }
];

const uniqueGrammarCats = Array.from(
  new Set(GRAMMAR_PREPOSITIONS_LIST.map((item) => item.category))
) as string[];

export const GRAMMAR_PREPOSITIONS_CATEGORIES = [
  `All (${GRAMMAR_PREPOSITIONS_LIST.length})`,
  ...uniqueGrammarCats.sort()
];
