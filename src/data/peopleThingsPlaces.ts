export interface PeopleThingsPlacesItem {
  id: number;
  german: string;
  english: string;
  oppositeOrContrast?: string;
  germanSentence: string;
  englishSentence: string;
  category: string; // "People (Personen)", "Things (Sachen)", "Places & Directions", "Reciprocity (Gegenseitigkeit)"
  section: string;  // "4.1", "4.2", "4.3", "4.4"
  level: string;
}

export const PEOPLE_THINGS_PLACES_LIST: PeopleThingsPlacesItem[] = [
  // 4.1 People – Personen
  {
    id: 1,
    german: "jemand",
    english: "someone / somebody",
    oppositeOrContrast: "niemand (nobody)",
    germanSentence: "Jemand hat nach dir gefragt.",
    englishSentence: "Someone asked for you.",
    category: "People (Personen)",
    section: "4.1 Personen",
    level: "A1"
  },
  {
    id: 2,
    german: "irgendjemand",
    english: "anyone at all",
    oppositeOrContrast: "niemand",
    germanSentence: "Hat irgendjemand meinen Schlüssel gesehen?",
    englishSentence: "Has anyone seen my key?",
    category: "People (Personen)",
    section: "4.1 Personen",
    level: "A2"
  },
  {
    id: 3,
    german: "irgendwer",
    english: "somebody or other",
    oppositeOrContrast: "niemand",
    germanSentence: "Irgendwer hat das Fenster geöffnet.",
    englishSentence: "Somebody has opened the window.",
    category: "People (Personen)",
    section: "4.1 Personen",
    level: "A2"
  },
  {
    id: 4,
    german: "niemand",
    english: "nobody / no one",
    oppositeOrContrast: "jemand",
    germanSentence: "Niemand wusste die richtige Antwort.",
    englishSentence: "Nobody knew the correct answer.",
    category: "People (Personen)",
    section: "4.1 Personen",
    level: "A1"
  },
  {
    id: 5,
    german: "niemanden",
    english: "anyone (accusative in negative)",
    oppositeOrContrast: "jemanden",
    germanSentence: "Ich kenne hier niemanden.",
    englishSentence: "I don't know anyone here.",
    category: "People (Personen)",
    section: "4.1 Personen",
    level: "A1–A2"
  },
  {
    id: 6,
    german: "jeder / jede / jedes",
    english: "everyone / each person individually",
    oppositeOrContrast: "niemand",
    germanSentence: "Jeder bekommt am Eingang ein Programm.",
    englishSentence: "Everyone gets a programme at the entrance.",
    category: "People (Personen)",
    section: "4.1 Personen",
    level: "A1"
  },
  {
    id: 7,
    german: "alle",
    english: "everyone / all people as a group",
    oppositeOrContrast: "niemand",
    germanSentence: "Alle warten vor dem Kino.",
    englishSentence: "Everyone is waiting outside the cinema.",
    category: "People (Personen)",
    section: "4.1 Personen",
    level: "A1"
  },
  {
    id: 8,
    german: "jeder von uns",
    english: "each one of us",
    oppositeOrContrast: "keiner von uns",
    germanSentence: "Jeder von uns hat eine Aufgabe.",
    englishSentence: "Each one of us has a task.",
    category: "People (Personen)",
    section: "4.1 Personen",
    level: "A2"
  },
  {
    id: 9,
    german: "jeder Einzelne",
    english: "everyone individually",
    oppositeOrContrast: "niemand",
    germanSentence: "Jeder Einzelne kann etwas beitragen.",
    englishSentence: "Everyone can contribute something.",
    category: "People (Personen)",
    section: "4.1 Personen",
    level: "B1"
  },
  {
    id: 10,
    german: "die anderen",
    english: "the others",
    germanSentence: "Die anderen kommen später.",
    englishSentence: "The others are coming later.",
    category: "People (Personen)",
    section: "4.1 Personen",
    level: "A1–A2"
  },
  {
    id: 11,
    german: "jemand anderes",
    english: "somebody else",
    oppositeOrContrast: "niemand anderes",
    germanSentence: "Kann jemand anderes die Tür öffnen?",
    englishSentence: "Can somebody else open the door?",
    category: "People (Personen)",
    section: "4.1 Personen",
    level: "A2"
  },
  {
    id: 12,
    german: "niemand sonst",
    english: "nobody else",
    oppositeOrContrast: "jemand anderes",
    germanSentence: "Niemand sonst hatte Zeit.",
    englishSentence: "Nobody else had time.",
    category: "People (Personen)",
    section: "4.1 Personen",
    level: "A2"
  },
  {
    id: 13,
    german: "alle anderen",
    english: "everyone else",
    oppositeOrContrast: "niemand sonst",
    germanSentence: "Alle anderen sind schon gegangen.",
    englishSentence: "Everyone else has already left.",
    category: "People (Personen)",
    section: "4.1 Personen",
    level: "A2"
  },
  {
    id: 14,
    german: "wer auch immer",
    english: "whoever",
    germanSentence: "Wer auch immer anruft, ich bin gerade nicht da.",
    englishSentence: "Whoever calls, I am not available right now.",
    category: "People (Personen)",
    section: "4.1 Personen",
    level: "B1"
  },

  // 4.2 Things – Sachen und Dinge
  {
    id: 15,
    german: "alles",
    english: "everything",
    oppositeOrContrast: "nichts",
    germanSentence: "Alles ist für die Reise vorbereitet.",
    englishSentence: "Everything is ready for the trip.",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "A1"
  },
  {
    id: 16,
    german: "etwas",
    english: "something / anything",
    oppositeOrContrast: "nichts",
    germanSentence: "Möchtest du etwas essen?",
    englishSentence: "Would you like something to eat?",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "A1"
  },
  {
    id: 17,
    german: "irgendetwas",
    english: "anything at all",
    oppositeOrContrast: "nichts",
    germanSentence: "Hast du irgendetwas Verdächtiges bemerkt?",
    englishSentence: "Did you notice anything suspicious?",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "A2"
  },
  {
    id: 18,
    german: "irgendwas",
    english: "something or other",
    oppositeOrContrast: "nichts",
    germanSentence: "Ich möchte dir irgendwas zeigen.",
    englishSentence: "I want to show you something.",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "A2"
  },
  {
    id: 19,
    german: "nichts",
    english: "nothing",
    oppositeOrContrast: "etwas",
    germanSentence: "Ich habe heute noch nichts gegessen.",
    englishSentence: "I haven't eaten anything today.",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "A1"
  },
  {
    id: 20,
    german: "etwas anderes",
    english: "something else",
    oppositeOrContrast: "nichts anderes",
    germanSentence: "Ich würde lieber etwas anderes bestellen.",
    englishSentence: "I would rather order something else.",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "A2"
  },
  {
    id: 21,
    german: "nichts anderes",
    english: "nothing else",
    oppositeOrContrast: "etwas anderes",
    germanSentence: "Ich brauche nichts anderes, danke.",
    englishSentence: "I don't need anything else, thanks.",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "A2"
  },
  {
    id: 22,
    german: "alles andere",
    english: "everything else",
    germanSentence: "Alles andere können wir morgen erledigen.",
    englishSentence: "We can take care of everything else tomorrow.",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "A2"
  },
  {
    id: 23,
    german: "dasselbe",
    english: "the same thing (identical)",
    oppositeOrContrast: "etwas anderes",
    germanSentence: "Wir haben dasselbe Buch gelesen.",
    englishSentence: "We read the same book.",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "A2"
  },
  {
    id: 24,
    german: "das Gleiche",
    english: "the same thing (similar / equivalent)",
    oppositeOrContrast: "etwas anderes",
    germanSentence: "Wir haben das Gleiche bestellt.",
    englishSentence: "We ordered the same thing.",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "A2"
  },
  {
    id: 25,
    german: "etwas Besonderes",
    english: "something special",
    oppositeOrContrast: "etwas Gewöhnliches",
    germanSentence: "Zum Geburtstag machen wir etwas Besonderes.",
    englishSentence: "We are doing something special for the birthday.",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "A2"
  },
  {
    id: 26,
    german: "alles Mögliche",
    english: "everything possible",
    oppositeOrContrast: "nichts",
    germanSentence: "Wir haben alles Mögliche ausprobiert.",
    englishSentence: "We tried everything possible.",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "A2"
  },
  {
    id: 27,
    german: "so etwas",
    english: "something like that",
    oppositeOrContrast: "etwas ganz anderes",
    germanSentence: "So etwas habe ich noch nie erlebt.",
    englishSentence: "I have never experienced anything like that.",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "A2"
  },
  {
    id: 28,
    german: "was auch immer",
    english: "whatever",
    germanSentence: "Du kannst bestellen, was auch immer du möchtest.",
    englishSentence: "You can order whatever you like.",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "B1"
  },
  {
    id: 29,
    german: "was du willst",
    english: "whatever you want",
    germanSentence: "Nimm, was du willst.",
    englishSentence: "Take whatever you want.",
    category: "Things (Sachen)",
    section: "4.2 Sachen und Dinge",
    level: "A1–A2"
  },

  // 4.3 Places and directions – Orte und Richtungen
  {
    id: 30,
    german: "irgendwo",
    english: "somewhere; at some place",
    oppositeOrContrast: "nirgendwo",
    germanSentence: "Ich habe meine Brille irgendwo liegen lassen.",
    englishSentence: "I left my glasses somewhere.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A1–A2"
  },
  {
    id: 31,
    german: "irgendwohin",
    english: "somewhere (destination)",
    oppositeOrContrast: "nirgendwohin",
    germanSentence: "Wir möchten am Wochenende irgendwohin reisen.",
    englishSentence: "We would like to travel somewhere at the weekend.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A2"
  },
  {
    id: 32,
    german: "irgendwoher",
    english: "from somewhere (origin)",
    germanSentence: "Ich kenne diese Person irgendwoher.",
    englishSentence: "I know this person from somewhere.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A2"
  },
  {
    id: 33,
    german: "nirgendwo",
    english: "nowhere / anywhere (negative)",
    oppositeOrContrast: "irgendwo",
    germanSentence: "Ich kann meine Schlüssel nirgendwo finden.",
    englishSentence: "I cannot find my keys anywhere.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A2"
  },
  {
    id: 34,
    german: "nirgendwohin",
    english: "nowhere (destination)",
    oppositeOrContrast: "irgendwohin",
    germanSentence: "Heute möchte ich nirgendwohin gehen.",
    englishSentence: "I don't want to go anywhere today.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A2"
  },
  {
    id: 35,
    german: "überall",
    english: "everywhere",
    oppositeOrContrast: "nirgendwo",
    germanSentence: "Überall gibt es viele Menschen.",
    englishSentence: "There are many people everywhere.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A1–A2"
  },
  {
    id: 36,
    german: "woanders",
    english: "somewhere else",
    oppositeOrContrast: "hier / dort",
    germanSentence: "Wir können woanders essen.",
    englishSentence: "We can eat somewhere else.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A2"
  },
  {
    id: 37,
    german: "woandershin",
    english: "somewhere else (destination)",
    oppositeOrContrast: "hierhin / dorthin",
    germanSentence: "Lass uns woandershin fahren.",
    englishSentence: "Let's go somewhere else.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A2"
  },
  {
    id: 38,
    german: "drinnen",
    english: "inside; indoors",
    oppositeOrContrast: "draußen",
    germanSentence: "Draußen ist es kalt, aber drinnen ist es warm.",
    englishSentence: "It is cold outside, but warm inside.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A1–A2"
  },
  {
    id: 39,
    german: "innen",
    english: "inside; on the inner side",
    oppositeOrContrast: "außen",
    germanSentence: "Die Tasche ist innen mit Stoff gefüttert.",
    englishSentence: "The bag is lined with fabric inside.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A2"
  },
  {
    id: 40,
    german: "draußen",
    english: "outside; outdoors",
    oppositeOrContrast: "drinnen",
    germanSentence: "Die Kinder spielen draußen im Garten.",
    englishSentence: "The children are playing outside in the garden.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A1–A2"
  },
  {
    id: 41,
    german: "außen",
    english: "outside; on the outer side",
    oppositeOrContrast: "innen",
    germanSentence: "Das Haus ist außen weiß gestrichen.",
    englishSentence: "The house is painted white on the outside.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A2"
  },
  {
    id: 42,
    german: "oben",
    english: "upstairs; above",
    oppositeOrContrast: "unten",
    germanSentence: "Ich warte oben am Eingang.",
    englishSentence: "I am waiting upstairs by the entrance.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A1"
  },
  {
    id: 43,
    german: "unten",
    english: "downstairs; below",
    oppositeOrContrast: "oben",
    germanSentence: "Die Toiletten sind unten.",
    englishSentence: "The toilets are downstairs.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A1"
  },
  {
    id: 44,
    german: "in der Nähe",
    english: "nearby; in the vicinity",
    oppositeOrContrast: "weit weg",
    germanSentence: "Gibt es hier in der Nähe eine Bäckerei?",
    englishSentence: "Is there a bakery nearby?",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A1–A2"
  },
  {
    id: 45,
    german: "nah",
    english: "near; close",
    oppositeOrContrast: "weit",
    germanSentence: "Der Bahnhof ist ganz nah.",
    englishSentence: "The station is very close.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A1–A2"
  },
  {
    id: 46,
    german: "weit weg",
    english: "far away",
    oppositeOrContrast: "nah",
    germanSentence: "Der Supermarkt ist ziemlich weit weg.",
    englishSentence: "The supermarket is quite far away.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A1–A2"
  },
  {
    id: 47,
    german: "gegenüber",
    english: "opposite; across from",
    oppositeOrContrast: "neben",
    germanSentence: "Die Bushaltestelle ist direkt gegenüber.",
    englishSentence: "The bus stop is directly opposite.",
    category: "Places & Directions",
    section: "4.3 Orte und Richtungen",
    level: "A2"
  },

  // 4.4 Expressions with one another – Gegenseitigkeit
  {
    id: 48,
    german: "einander",
    english: "each other",
    oppositeOrContrast: "allein",
    germanSentence: "Wir helfen einander.",
    englishSentence: "We help each other.",
    category: "Reciprocity (Gegenseitigkeit)",
    section: "4.4 Gegenseitigkeit",
    level: "A2–B1"
  },
  {
    id: 49,
    german: "sich gegenseitig",
    english: "each other; mutually",
    germanSentence: "Wir unterstützen uns gegenseitig.",
    englishSentence: "We support each other.",
    category: "Reciprocity (Gegenseitigkeit)",
    section: "4.4 Gegenseitigkeit",
    level: "A2–B1"
  },
  {
    id: 50,
    german: "miteinander",
    english: "with one another",
    oppositeOrContrast: "allein",
    germanSentence: "Die Kinder spielen freundlich miteinander.",
    englishSentence: "The children play nicely with one another.",
    category: "Reciprocity (Gegenseitigkeit)",
    section: "4.4 Gegenseitigkeit",
    level: "A2"
  },
  {
    id: 51,
    german: "füreinander",
    english: "for one another",
    oppositeOrContrast: "gegeneinander",
    germanSentence: "Gute Freunde sind immer füreinander da.",
    englishSentence: "Good friends are always there for each other.",
    category: "Reciprocity (Gegenseitigkeit)",
    section: "4.4 Gegenseitigkeit",
    level: "A2"
  },
  {
    id: 52,
    german: "gegeneinander",
    english: "against each other",
    oppositeOrContrast: "füreinander",
    germanSentence: "Die beiden Mannschaften spielen gegeneinander.",
    englishSentence: "The two teams play against each other.",
    category: "Reciprocity (Gegenseitigkeit)",
    section: "4.4 Gegenseitigkeit",
    level: "A2"
  },
  {
    id: 53,
    german: "übereinander",
    english: "about one another",
    germanSentence: "Wir sollten nicht schlecht übereinander sprechen.",
    englishSentence: "We shouldn't speak badly about one another.",
    category: "Reciprocity (Gegenseitigkeit)",
    section: "4.4 Gegenseitigkeit",
    level: "A2–B1"
  },
  {
    id: 54,
    german: "voneinander",
    english: "from one another",
    germanSentence: "Wir lernen viel voneinander.",
    englishSentence: "We learn a lot from each other.",
    category: "Reciprocity (Gegenseitigkeit)",
    section: "4.4 Gegenseitigkeit",
    level: "A2–B1"
  },
  {
    id: 55,
    german: "ohne einander",
    english: "without one another",
    oppositeOrContrast: "miteinander",
    germanSentence: "Sie können sich ein Leben ohne einander kaum vorstellen.",
    englishSentence: "They can hardly imagine life without each other.",
    category: "Reciprocity (Gegenseitigkeit)",
    section: "4.4 Gegenseitigkeit",
    level: "B1"
  },
  {
    id: 56,
    german: "einer nach dem anderen",
    english: "one by one",
    oppositeOrContrast: "alle gleichzeitig",
    germanSentence: "Die Gäste kamen einer nach dem anderen an.",
    englishSentence: "The guests arrived one by one.",
    category: "Reciprocity (Gegenseitigkeit)",
    section: "4.4 Gegenseitigkeit",
    level: "A2–B1"
  },
  {
    id: 57,
    german: "zusammen",
    english: "together",
    oppositeOrContrast: "getrennt",
    germanSentence: "Wir bereiten das Abendessen zusammen vor.",
    englishSentence: "We prepare dinner together.",
    category: "Reciprocity (Gegenseitigkeit)",
    section: "4.4 Gegenseitigkeit",
    level: "A1"
  },
  {
    id: 58,
    german: "allein",
    english: "alone; on one's own",
    oppositeOrContrast: "zusammen",
    germanSentence: "Sie lebt allein.",
    englishSentence: "She lives alone.",
    category: "Reciprocity (Gegenseitigkeit)",
    section: "4.4 Gegenseitigkeit",
    level: "A1"
  },
  {
    id: 59,
    german: "getrennt",
    english: "separately",
    oppositeOrContrast: "zusammen",
    germanSentence: "Wir reisen getrennt.",
    englishSentence: "We are travelling separately.",
    category: "Reciprocity (Gegenseitigkeit)",
    section: "4.4 Gegenseitigkeit",
    level: "A2"
  }
];

const uniquePeopleCats = Array.from(
  new Set(PEOPLE_THINGS_PLACES_LIST.map((item) => item.category))
) as string[];

export const PEOPLE_THINGS_PLACES_CATEGORIES = [
  `All (${PEOPLE_THINGS_PLACES_LIST.length})`,
  ...uniquePeopleCats.sort()
];
