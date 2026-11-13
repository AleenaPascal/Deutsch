export interface AdjectiveOppositeItem {
  id: number;
  word1: string;          // e.g. "gut"
  english1: string;       // e.g. "Good"
  word2: string;          // e.g. "schlecht"
  english2: string;       // e.g. "Bad"
  pairLabel: string;      // "gut ↔ schlecht"
  germanSentence: string;
  englishSentence: string;
  category: string;
  level: string;
}

export const ADJECTIVES_LIST: AdjectiveOppositeItem[] = [
  {
    id: 1,
    word1: "gut",
    english1: "Good",
    word2: "schlecht",
    english2: "Bad",
    pairLabel: "gut ↔ schlecht",
    germanSentence: "Das Essen ist gut, aber der Service ist schlecht.",
    englishSentence: "The food is good, but the service is bad.",
    category: "Quality & Evaluation",
    level: "A1–A2"
  },
  {
    id: 2,
    word1: "schön",
    english1: "Beautiful",
    word2: "hässlich",
    english2: "Ugly",
    pairLabel: "schön ↔ hässlich",
    germanSentence: "Das Haus ist schön, aber das Gebäude daneben ist hässlich.",
    englishSentence: "The house is beautiful, but the building next to it is ugly.",
    category: "Appearance",
    level: "A1–A2"
  },
  {
    id: 3,
    word1: "groß",
    english1: "Big / Tall",
    word2: "klein",
    english2: "Small / Short",
    pairLabel: "groß ↔ klein",
    germanSentence: "Mein Zimmer ist groß, aber die Küche ist klein.",
    englishSentence: "My room is big, but the kitchen is small.",
    category: "Size & Dimensions",
    level: "A1"
  },
  {
    id: 4,
    word1: "lang",
    english1: "Long",
    word2: "kurz",
    english2: "Short",
    pairLabel: "lang ↔ kurz",
    germanSentence: "Der Film ist lang, aber die Pause ist kurz.",
    englishSentence: "The film is long, but the break is short.",
    category: "Size & Dimensions",
    level: "A1"
  },
  {
    id: 5,
    word1: "hoch",
    english1: "High",
    word2: "niedrig",
    english2: "Low",
    pairLabel: "hoch ↔ niedrig",
    germanSentence: "Der Berg ist hoch, aber der Hügel ist niedrig.",
    englishSentence: "The mountain is high, but the hill is low.",
    category: "Size & Dimensions",
    level: "A1–A2"
  },
  {
    id: 6,
    word1: "alt",
    english1: "Old (people)",
    word2: "jung",
    english2: "Young",
    pairLabel: "alt ↔ jung",
    germanSentence: "Mein Großvater ist alt, aber mein Bruder ist jung.",
    englishSentence: "My grandfather is old, but my brother is young.",
    category: "Age & Time",
    level: "A1"
  },
  {
    id: 7,
    word1: "neu",
    english1: "New",
    word2: "alt",
    english2: "Old (objects)",
    pairLabel: "neu ↔ alt",
    germanSentence: "Mein Handy ist neu, aber mein Laptop ist alt.",
    englishSentence: "My phone is new, but my laptop is old.",
    category: "Age & Time",
    level: "A1"
  },
  {
    id: 8,
    word1: "richtig",
    english1: "Correct",
    word2: "falsch",
    english2: "Wrong",
    pairLabel: "richtig ↔ falsch",
    germanSentence: "Deine Antwort ist richtig, aber meine Antwort ist falsch.",
    englishSentence: "Your answer is correct, but my answer is wrong.",
    category: "Quality & Evaluation",
    level: "A1"
  },
  {
    id: 9,
    word1: "einfach",
    english1: "Easy",
    word2: "schwierig",
    english2: "Difficult",
    pairLabel: "einfach ↔ schwierig",
    germanSentence: "Die erste Frage ist einfach, aber die zweite ist schwierig.",
    englishSentence: "The first question is easy, but the second is difficult.",
    category: "Difficulty & Effort",
    level: "A1–A2"
  },
  {
    id: 10,
    word1: "leicht",
    english1: "Light (weight)",
    word2: "schwer",
    english2: "Heavy",
    pairLabel: "leicht ↔ schwer",
    germanSentence: "Mein Koffer ist leicht, aber deine Tasche ist schwer.",
    englishSentence: "My suitcase is light, but your bag is heavy.",
    category: "Physical Properties",
    level: "A1–A2"
  },
  {
    id: 11,
    word1: "wichtig",
    english1: "Important",
    word2: "unwichtig",
    english2: "Unimportant",
    pairLabel: "wichtig ↔ unwichtig",
    germanSentence: "Deutschlernen ist wichtig, aber diese Information ist unwichtig.",
    englishSentence: "Learning German is important, but this information is unimportant.",
    category: "Quality & Evaluation",
    level: "A1–A2"
  },
  {
    id: 12,
    word1: "interessant",
    english1: "Interesting",
    word2: "langweilig",
    english2: "Boring",
    pairLabel: "interessant ↔ langweilig",
    germanSentence: "Das Buch ist interessant, aber der Film ist langweilig.",
    englishSentence: "The book is interesting, but the film is boring.",
    category: "Quality & Evaluation",
    level: "A1–A2"
  },
  {
    id: 13,
    word1: "teuer",
    english1: "Expensive",
    word2: "günstig",
    english2: "Affordable",
    pairLabel: "teuer ↔ günstig",
    germanSentence: "Dieses Hotel ist teuer, aber das andere ist günstig.",
    englishSentence: "This hotel is expensive, but the other one is affordable.",
    category: "Price & Value",
    level: "A1–A2"
  },
  {
    id: 14,
    word1: "schnell",
    english1: "Fast",
    word2: "langsam",
    english2: "Slow",
    pairLabel: "schnell ↔ langsam",
    germanSentence: "Der Zug ist schnell, aber der Bus ist langsam.",
    englishSentence: "The train is fast, but the bus is slow.",
    category: "Speed & Motion",
    level: "A1"
  },
  {
    id: 15,
    word1: "stark",
    english1: "Strong",
    word2: "schwach",
    english2: "Weak",
    pairLabel: "stark ↔ schwach",
    germanSentence: "Mein Bruder ist stark, aber ich bin schwach.",
    englishSentence: "My brother is strong, but I am weak.",
    category: "Physical Properties",
    level: "A1–A2"
  },
  {
    id: 16,
    word1: "sauber",
    english1: "Clean",
    word2: "schmutzig",
    english2: "Dirty",
    pairLabel: "sauber ↔ schmutzig",
    germanSentence: "Das Wohnzimmer ist sauber, aber die Küche ist schmutzig.",
    englishSentence: "The living room is clean, but the kitchen is dirty.",
    category: "Condition & State",
    level: "A1"
  },
  {
    id: 17,
    word1: "breit",
    english1: "Wide",
    word2: "eng",
    english2: "Narrow",
    pairLabel: "breit ↔ eng",
    germanSentence: "Diese Straße ist breit, aber die andere ist eng.",
    englishSentence: "This road is wide, but the other one is narrow.",
    category: "Size & Dimensions",
    level: "A1–A2"
  },
  {
    id: 18,
    word1: "hell",
    english1: "Bright",
    word2: "dunkel",
    english2: "Dark",
    pairLabel: "hell ↔ dunkel",
    germanSentence: "Mein Zimmer ist hell, aber das Badezimmer ist dunkel.",
    englishSentence: "My room is bright, but the bathroom is dark.",
    category: "Light & Color",
    level: "A1"
  },
  {
    id: 19,
    word1: "laut",
    english1: "Loud",
    word2: "leise",
    english2: "Quiet",
    pairLabel: "laut ↔ leise",
    germanSentence: "Die Musik ist laut, aber das Radio ist leise.",
    englishSentence: "The music is loud, but the radio is quiet.",
    category: "Sound & Volume",
    level: "A1"
  },
  {
    id: 20,
    word1: "warm",
    english1: "Warm",
    word2: "kalt",
    english2: "Cold",
    pairLabel: "warm ↔ kalt",
    germanSentence: "Der Tee ist warm, aber das Wasser ist kalt.",
    englishSentence: "The tea is warm, but the water is cold.",
    category: "Temperature",
    level: "A1"
  },
  {
    id: 21,
    word1: "heiß",
    english1: "Hot",
    word2: "kalt",
    english2: "Cold",
    pairLabel: "heiß ↔ kalt",
    germanSentence: "Im Sommer ist es heiß, aber im Winter ist es kalt.",
    englishSentence: "It is hot in summer, but cold in winter.",
    category: "Temperature",
    level: "A1"
  },
  {
    id: 22,
    word1: "trocken",
    english1: "Dry",
    word2: "nass",
    english2: "Wet",
    pairLabel: "trocken ↔ nass",
    germanSentence: "Meine Kleidung ist trocken, aber deine Kleidung ist nass.",
    englishSentence: "My clothes are dry, but your clothes are wet.",
    category: "Condition & State",
    level: "A1–A2"
  },
  {
    id: 23,
    word1: "weich",
    english1: "Soft",
    word2: "hart",
    english2: "Hard",
    pairLabel: "weich ↔ hart",
    germanSentence: "Das Kissen ist weich, aber der Boden ist hart.",
    englishSentence: "The pillow is soft, but the floor is hard.",
    category: "Physical Properties",
    level: "A1–A2"
  },
  {
    id: 24,
    word1: "dick",
    english1: "Thick",
    word2: "dünn",
    english2: "Thin",
    pairLabel: "dick ↔ dünn",
    germanSentence: "Dieses Buch ist dick, aber das andere ist dünn.",
    englishSentence: "This book is thick, but the other one is thin.",
    category: "Size & Dimensions",
    level: "A1"
  },
  {
    id: 25,
    word1: "frisch",
    english1: "Fresh",
    word2: "abgestanden",
    english2: "Stale",
    pairLabel: "frisch ↔ abgestanden",
    germanSentence: "Das Brot ist frisch, aber die Kekse sind abgestanden.",
    englishSentence: "The bread is fresh, but the biscuits are stale.",
    category: "Food & Freshness",
    level: "A2"
  },
  {
    id: 26,
    word1: "süß",
    english1: "Sweet",
    word2: "bitter",
    english2: "Bitter",
    pairLabel: "süß ↔ bitter",
    germanSentence: "Der Kuchen ist süß, aber der Kaffee ist bitter.",
    englishSentence: "The cake is sweet, but the coffee is bitter.",
    category: "Food & Taste",
    level: "A1–A2"
  },
  {
    id: 27,
    word1: "berühmt",
    english1: "Famous",
    word2: "unbekannt",
    english2: "Unknown",
    pairLabel: "berühmt ↔ unbekannt",
    germanSentence: "Dieser Sänger ist berühmt, aber der andere ist unbekannt.",
    englishSentence: "This singer is famous, but the other one is unknown.",
    category: "Fame & Status",
    level: "A2"
  },
  {
    id: 28,
    word1: "beliebt",
    english1: "Popular",
    word2: "unbeliebt",
    english2: "Unpopular",
    pairLabel: "beliebt ↔ unbeliebt",
    germanSentence: "Dieser Lehrer ist beliebt, aber der andere ist unbeliebt.",
    englishSentence: "This teacher is popular, but the other one is unpopular.",
    category: "Social & Relations",
    level: "A2"
  },
  {
    id: 29,
    word1: "reich",
    english1: "Rich",
    word2: "arm",
    english2: "Poor",
    pairLabel: "reich ↔ arm",
    germanSentence: "Der Mann ist reich, aber sein Bruder ist arm.",
    englishSentence: "The man is rich, but his brother is poor.",
    category: "Wealth & Finance",
    level: "A1–A2"
  },
  {
    id: 30,
    word1: "gesund",
    english1: "Healthy",
    word2: "ungesund",
    english2: "Unhealthy",
    pairLabel: "gesund ↔ ungesund",
    germanSentence: "Obst ist gesund, aber zu viel Zucker ist ungesund.",
    englishSentence: "Fruit is healthy, but too much sugar is unhealthy.",
    category: "Health & Well-being",
    level: "A1–A2"
  },
  {
    id: 31,
    word1: "sicher",
    english1: "Safe",
    word2: "gefährlich",
    english2: "Dangerous",
    pairLabel: "sicher ↔ gefährlich",
    germanSentence: "Dieser Weg ist sicher, aber der andere ist gefährlich.",
    englishSentence: "This route is safe, but the other one is dangerous.",
    category: "Safety & Security",
    level: "A1–A2"
  },
  {
    id: 32,
    word1: "frei",
    english1: "Free / Available",
    word2: "besetzt",
    english2: "Occupied",
    pairLabel: "frei ↔ besetzt",
    germanSentence: "Dieser Platz ist frei, aber der andere ist besetzt.",
    englishSentence: "This seat is free, but the other one is occupied.",
    category: "Availability",
    level: "A1–A2"
  },
  {
    id: 33,
    word1: "voll",
    english1: "Full",
    word2: "leer",
    english2: "Empty",
    pairLabel: "voll ↔ leer",
    germanSentence: "Das Glas ist voll, aber die Flasche ist leer.",
    englishSentence: "The glass is full, but the bottle is empty.",
    category: "Condition & State",
    level: "A1"
  },
  {
    id: 34,
    word1: "offen",
    english1: "Open",
    word2: "geschlossen",
    english2: "Closed",
    pairLabel: "offen ↔ geschlossen",
    germanSentence: "Das Geschäft ist offen, aber die Bank ist geschlossen.",
    englishSentence: "The shop is open, but the bank is closed.",
    category: "Condition & State",
    level: "A1"
  },
  {
    id: 35,
    word1: "möglich",
    english1: "Possible",
    word2: "unmöglich",
    english2: "Impossible",
    pairLabel: "möglich ↔ unmöglich",
    germanSentence: "Die Aufgabe ist möglich, aber die andere ist unmöglich.",
    englishSentence: "The task is possible, but the other one is impossible.",
    category: "Possibility",
    level: "A2"
  },
  {
    id: 36,
    word1: "nützlich",
    english1: "Useful",
    word2: "nutzlos",
    english2: "Useless",
    pairLabel: "nützlich ↔ nutzlos",
    germanSentence: "Dieses Buch ist nützlich, aber das alte Buch ist nutzlos.",
    englishSentence: "This book is useful, but the old book is useless.",
    category: "Utility & Practicality",
    level: "A2"
  },
  {
    id: 37,
    word1: "angenehm",
    english1: "Pleasant",
    word2: "unangenehm",
    english2: "Unpleasant",
    pairLabel: "angenehm ↔ unangenehm",
    germanSentence: "Das Wetter ist angenehm, aber die Hitze ist unangenehm.",
    englishSentence: "The weather is pleasant, but the heat is unpleasant.",
    category: "Feelings & Sensations",
    level: "A2"
  },
  {
    id: 38,
    word1: "unabhängig",
    english1: "Independent",
    word2: "abhängig",
    english2: "Dependent",
    pairLabel: "unabhängig ↔ abhängig",
    germanSentence: "Sie ist unabhängig, aber ihr Bruder ist finanziell abhängig.",
    englishSentence: "She is independent, but her brother is financially dependent.",
    category: "Social & Relations",
    level: "A2–B1"
  },
  {
    id: 39,
    word1: "erfolgreich",
    english1: "Successful",
    word2: "erfolglos",
    english2: "Unsuccessful",
    pairLabel: "erfolgreich ↔ erfolglos",
    germanSentence: "Das erste Projekt war erfolgreich, aber das zweite war erfolglos.",
    englishSentence: "The first project was successful, but the second was unsuccessful.",
    category: "Work & Achievement",
    level: "A2"
  },
  {
    id: 40,
    word1: "geduldig",
    english1: "Patient",
    word2: "ungeduldig",
    english2: "Impatient",
    pairLabel: "geduldig ↔ ungeduldig",
    germanSentence: "Meine Lehrerin ist geduldig, aber mein Kollege ist ungeduldig.",
    englishSentence: "My teacher is patient, but my colleague is impatient.",
    category: "Personality & Character",
    level: "A2"
  },
  {
    id: 41,
    word1: "schüchtern",
    english1: "Shy",
    word2: "selbstbewusst",
    english2: "Confident",
    pairLabel: "schüchtern ↔ selbstbewusst",
    germanSentence: "Früher war ich schüchtern, aber jetzt bin ich selbstbewusst.",
    englishSentence: "I was shy before, but now I am confident.",
    category: "Personality & Character",
    level: "A2"
  },
  {
    id: 42,
    word1: "fleißig",
    english1: "Hardworking",
    word2: "faul",
    english2: "Lazy",
    pairLabel: "fleißig ↔ faul",
    germanSentence: "Meine Schwester ist fleißig, aber mein Bruder ist faul.",
    englishSentence: "My sister is hardworking, but my brother is lazy.",
    category: "Personality & Character",
    level: "A1–A2"
  },
  {
    id: 43,
    word1: "ehrlich",
    english1: "Honest",
    word2: "unehrlich",
    english2: "Dishonest",
    pairLabel: "ehrlich ↔ unehrlich",
    germanSentence: "Er ist ehrlich, aber sein Freund ist unehrlich.",
    englishSentence: "He is honest, but his friend is dishonest.",
    category: "Personality & Character",
    level: "A2"
  },
  {
    id: 44,
    word1: "höflich",
    english1: "Polite",
    word2: "unhöflich",
    english2: "Impolite",
    pairLabel: "höflich ↔ unhöflich",
    germanSentence: "Der Mitarbeiter ist höflich, aber der Kunde ist unhöflich.",
    englishSentence: "The employee is polite, but the customer is impolite.",
    category: "Social & Manners",
    level: "A2"
  },
  {
    id: 45,
    word1: "glücklich",
    english1: "Happy",
    word2: "unglücklich",
    english2: "Unhappy",
    pairLabel: "glücklich ↔ unglücklich",
    germanSentence: "Sie ist glücklich, aber ihre Freundin ist unglücklich.",
    englishSentence: "She is happy, but her friend is unhappy.",
    category: "Feelings & Emotions",
    level: "A1–A2"
  },
  {
    id: 46,
    word1: "traurig",
    english1: "Sad",
    word2: "fröhlich",
    english2: "Cheerful",
    pairLabel: "traurig ↔ fröhlich",
    germanSentence: "Heute bin ich traurig, aber gestern war ich fröhlich.",
    englishSentence: "Today I am sad, but yesterday I was cheerful.",
    category: "Feelings & Emotions",
    level: "A1–A2"
  },
  {
    id: 47,
    word1: "zufrieden",
    english1: "Satisfied",
    word2: "unzufrieden",
    english2: "Dissatisfied",
    pairLabel: "zufrieden ↔ unzufrieden",
    germanSentence: "Ich bin zufrieden, aber mein Kollege ist unzufrieden.",
    englishSentence: "I am satisfied, but my colleague is dissatisfied.",
    category: "Feelings & Emotions",
    level: "A2"
  },
  {
    id: 48,
    word1: "nervös",
    english1: "Nervous",
    word2: "ruhig",
    english2: "Calm",
    pairLabel: "nervös ↔ ruhig",
    germanSentence: "Vor der Prüfung bin ich nervös, aber danach bin ich ruhig.",
    englishSentence: "I am nervous before the exam, but calm afterwards.",
    category: "Feelings & Emotions",
    level: "A2"
  },
  {
    id: 49,
    word1: "müde",
    english1: "Tired",
    word2: "wach",
    english2: "Awake",
    pairLabel: "müde ↔ wach",
    germanSentence: "Ich bin müde, aber mein Bruder ist noch wach.",
    englishSentence: "I am tired, but my brother is still awake.",
    category: "Physical States",
    level: "A1"
  },
  {
    id: 50,
    word1: "gestresst",
    english1: "Stressed",
    word2: "entspannt",
    english2: "Relaxed",
    pairLabel: "gestresst ↔ entspannt",
    germanSentence: "Heute bin ich gestresst, aber am Wochenende bin ich entspannt.",
    englishSentence: "Today I am stressed, but at the weekend I am relaxed.",
    category: "Feelings & Emotions",
    level: "A2"
  },
  {
    id: 51,
    word1: "einsam",
    english1: "Lonely",
    word2: "gesellig",
    english2: "Sociable",
    pairLabel: "einsam ↔ gesellig",
    germanSentence: "Er ist einsam, aber sein Bruder ist sehr gesellig.",
    englishSentence: "He is lonely, but his brother is very sociable.",
    category: "Social & Relations",
    level: "A2"
  },
  {
    id: 52,
    word1: "erschöpft",
    english1: "Exhausted",
    word2: "fit",
    english2: "Fit / Energetic",
    pairLabel: "erschöpft ↔ fit",
    germanSentence: "Nach der Arbeit bin ich erschöpft, aber morgens bin ich fit.",
    englishSentence: "After work I am exhausted, but in the morning I am fit.",
    category: "Physical States",
    level: "A2"
  }
];

// Extract sorted unique categories
const uniqueCats = Array.from(
  new Set(ADJECTIVES_LIST.map((item) => item.category))
) as string[];

export const ADJECTIVE_CATEGORIES = [
  `All (${ADJECTIVES_LIST.length})`,
  ...uniqueCats.sort()
];
