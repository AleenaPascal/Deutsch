export interface VocabUpgradeItem {
  id: number;
  basicWord: string;         // e.g. "gut", "machen", "schnell"
  basicLevel: 'A1' | 'A2';
  upgradedWord: string;      // e.g. "ausgezeichnet", "erledigen", "zügig"
  upgradedLevel: 'A2' | 'B1' | 'B2';
  english: string;
  germanSentence: string;
  englishSentence: string;
  category: 'Adjectives' | 'Verbs' | 'Adverbs' | 'Everyday Expressions';
  section: string;
}

export const VOCAB_UPGRADES_LIST: VocabUpgradeItem[] = [
  // 10.1 Adjectives
  {
    id: 1,
    basicWord: "gut",
    basicLevel: "A1",
    upgradedWord: "ausgezeichnet",
    upgradedLevel: "B1",
    english: "good; very good → excellent",
    germanSentence: "Der Service im Hotel war ausgezeichnet.",
    englishSentence: "The service at the hotel was excellent.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 2,
    basicWord: "sehr gut",
    basicLevel: "A1",
    upgradedWord: "hervorragend",
    upgradedLevel: "B2",
    english: "very good; outstanding",
    germanSentence: "Ihre Leistungen waren hervorragend.",
    englishSentence: "Her performance was outstanding.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 3,
    basicWord: "wichtig",
    basicLevel: "A1",
    upgradedWord: "wesentlich / entscheidend",
    upgradedLevel: "B1",
    english: "important → crucial / decisive",
    germanSentence: "Gute Kommunikation ist für das Projekt entscheidend.",
    englishSentence: "Good communication is crucial for the project.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 4,
    basicWord: "schön",
    basicLevel: "A1",
    upgradedWord: "reizvoll / beeindruckend",
    upgradedLevel: "B1",
    english: "beautiful → charming / impressive",
    germanSentence: "Die Altstadt ist besonders reizvoll.",
    englishSentence: "The old town is especially appealing.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 5,
    basicWord: "interessant",
    basicLevel: "A1",
    upgradedWord: "faszinierend / aufschlussreich",
    upgradedLevel: "B2",
    english: "interesting → insightful / fascinating",
    germanSentence: "Der Bericht gibt einen aufschlussreichen Überblick über das Thema.",
    englishSentence: "The report gives an informative overview of the topic.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 6,
    basicWord: "schwierig",
    basicLevel: "A1",
    upgradedWord: "anspruchsvoll / herausfordernd",
    upgradedLevel: "B2",
    english: "difficult → demanding / challenging",
    germanSentence: "Die Fortbildung ist anspruchsvoll, aber sehr nützlich.",
    englishSentence: "The training course is demanding but very useful.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 7,
    basicWord: "einfach",
    basicLevel: "A1",
    upgradedWord: "unkompliziert",
    upgradedLevel: "B1",
    english: "easy; simple → straightforward",
    germanSentence: "Die Anmeldung ist unkompliziert und dauert nur wenige Minuten.",
    englishSentence: "Registration is straightforward and takes only a few minutes.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 8,
    basicWord: "teuer",
    basicLevel: "A1",
    upgradedWord: "kostspielig",
    upgradedLevel: "B2",
    english: "expensive → costly",
    germanSentence: "Eine umfassende Renovierung kann kostspielig sein.",
    englishSentence: "A full renovation can be costly.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 9,
    basicWord: "billig / günstig",
    basicLevel: "A1",
    upgradedWord: "preiswert",
    upgradedLevel: "A2",
    english: "cheap; good value → good value",
    germanSentence: "Das Restaurant ist preiswert und serviert regionale Gerichte.",
    englishSentence: "The restaurant offers good value and serves regional dishes.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 10,
    basicWord: "nett",
    basicLevel: "A1",
    upgradedWord: "sympathisch",
    upgradedLevel: "B1",
    english: "nice → likeable",
    germanSentence: "Die neue Kollegin wirkt sehr sympathisch.",
    englishSentence: "The new colleague seems very likeable.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 11,
    basicWord: "freundlich / hilfsbereit",
    basicLevel: "A1",
    upgradedWord: "zuvorkommend",
    upgradedLevel: "B2",
    english: "friendly; helpful → courteous",
    germanSentence: "Das Personal war freundlich und ausgesprochen zuvorkommend.",
    englishSentence: "The staff were friendly and exceptionally courteous.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 12,
    basicWord: "ruhig",
    basicLevel: "A1",
    upgradedWord: "gelassen",
    upgradedLevel: "B1",
    english: "calm → composed / relaxed",
    germanSentence: "Trotz der Verspätung blieb sie gelassen.",
    englishSentence: "Despite the delay, she remained composed.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 13,
    basicWord: "müde",
    basicLevel: "A1",
    upgradedWord: "erschöpft",
    upgradedLevel: "B1",
    english: "tired → exhausted",
    germanSentence: "Nach dem langen Arbeitstag war ich völlig erschöpft.",
    englishSentence: "After the long workday, I was completely exhausted.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 14,
    basicWord: "glücklich",
    basicLevel: "A1",
    upgradedWord: "erfreut / begeistert",
    upgradedLevel: "B1",
    english: "happy; pleased → delighted",
    germanSentence: "Wir sind erfreut über die positive Rückmeldung.",
    englishSentence: "We are pleased with the positive feedback.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 15,
    basicWord: "wütend",
    basicLevel: "A1",
    upgradedWord: "verärgert / empört",
    upgradedLevel: "B1",
    english: "angry → annoyed / outraged",
    germanSentence: "Die Anwohner sind über den nächtlichen Lärm verärgert.",
    englishSentence: "The residents are annoyed by the nighttime noise.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 16,
    basicWord: "traurig",
    basicLevel: "A1",
    upgradedWord: "niedergeschlagen",
    upgradedLevel: "B2",
    english: "sad → downcast / dejected",
    germanSentence: "Nach der Absage war er zunächst niedergeschlagen.",
    englishSentence: "After the rejection, he was initially downcast.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 17,
    basicWord: "berühmt",
    basicLevel: "A1",
    upgradedWord: "renommiert",
    upgradedLevel: "B2",
    english: "famous; well-known → prestigious",
    germanSentence: "Sie arbeitet an einer renommierten Universität.",
    englishSentence: "She works at a prestigious university.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 18,
    basicWord: "erfolgreich",
    basicLevel: "A1",
    upgradedWord: "gelungen",
    upgradedLevel: "B1",
    english: "successful → well-executed / successful",
    germanSentence: "Die Veranstaltung war sehr gelungen.",
    englishSentence: "The event was very successful.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 19,
    basicWord: "praktisch",
    basicLevel: "A1",
    upgradedWord: "zweckmäßig",
    upgradedLevel: "B2",
    english: "practical → functional / fit for purpose",
    germanSentence: "Für kleine Räume ist diese Lösung besonders zweckmäßig.",
    englishSentence: "This solution is particularly practical for small rooms.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 20,
    basicWord: "notwendig",
    basicLevel: "A1",
    upgradedWord: "erforderlich / unerlässlich",
    upgradedLevel: "B2",
    english: "necessary → required / indispensable",
    germanSentence: "Für die Bewerbung sind vollständige Unterlagen erforderlich.",
    englishSentence: "Complete documents are required for the application.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },
  {
    id: 21,
    basicWord: "möglich",
    basicLevel: "A1",
    upgradedWord: "machbar",
    upgradedLevel: "B1",
    english: "possible → feasible / doable",
    germanSentence: "Mit etwas Planung ist der Umzug am Wochenende machbar.",
    englishSentence: "With a little planning, the move is manageable at the weekend.",
    category: "Adjectives",
    section: "10.1 Adjektiv-Upgrades"
  },

  // 10.2 Verbs
  {
    id: 22,
    basicWord: "machen",
    basicLevel: "A1",
    upgradedWord: "erledigen",
    upgradedLevel: "B1",
    english: "to do / make → to complete / take care of",
    germanSentence: "Ich muss heute noch einige Aufgaben erledigen.",
    englishSentence: "I still have to complete some tasks today.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 23,
    basicWord: "machen",
    basicLevel: "A1",
    upgradedWord: "durchführen",
    upgradedLevel: "B2",
    english: "to do; carry out → to conduct",
    germanSentence: "Wir müssen eine Umfrage durchführen.",
    englishSentence: "We have to conduct a survey.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 24,
    basicWord: "sagen",
    basicLevel: "A1",
    upgradedWord: "äußern",
    upgradedLevel: "B2",
    english: "to say → to express",
    germanSentence: "Sie äußerte ihre Meinung offen.",
    englishSentence: "She expressed her opinion openly.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 25,
    basicWord: "erklären",
    basicLevel: "A1",
    upgradedWord: "erläutern",
    upgradedLevel: "B2",
    english: "to explain → to explain in detail",
    germanSentence: "Der Lehrer erläuterte das Problem ausführlich.",
    englishSentence: "The teacher explained the problem in detail.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 26,
    basicWord: "zeigen",
    basicLevel: "A1",
    upgradedWord: "präsentieren",
    upgradedLevel: "B1",
    english: "to show → to present",
    germanSentence: "Die Gruppe präsentierte ihre Ergebnisse.",
    englishSentence: "The group presented its results.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 27,
    basicWord: "bekommen",
    basicLevel: "A1",
    upgradedWord: "erhalten",
    upgradedLevel: "B1",
    english: "to get / receive → to receive",
    germanSentence: "Sie hat gestern eine Antwort erhalten.",
    englishSentence: "She received an answer yesterday.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 28,
    basicWord: "benutzen",
    basicLevel: "A1",
    upgradedWord: "verwenden",
    upgradedLevel: "B1",
    english: "to use → to utilize / use",
    germanSentence: "Wir verwenden eine neue Methode.",
    englishSentence: "We use a new method.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 29,
    basicWord: "helfen",
    basicLevel: "A1",
    upgradedWord: "unterstützen",
    upgradedLevel: "B1",
    english: "to help → to support",
    germanSentence: "Meine Familie unterstützt mich immer.",
    englishSentence: "My family always supports me.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 30,
    basicWord: "anfangen",
    basicLevel: "A1",
    upgradedWord: "beginnen",
    upgradedLevel: "A2",
    english: "to start → to begin / commence",
    germanSentence: "Der Kurs beginnt nächste Woche.",
    englishSentence: "The course begins next week.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 31,
    basicWord: "enden",
    basicLevel: "A1",
    upgradedWord: "abschließen",
    upgradedLevel: "B1",
    english: "to end → to conclude / finish",
    germanSentence: "Wir schließen das Projekt nächste Woche ab.",
    englishSentence: "We will complete the project next week.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 32,
    basicWord: "suchen",
    basicLevel: "A1",
    upgradedWord: "nach etwas suchen",
    upgradedLevel: "A2",
    english: "to look for → to seek a better solution",
    germanSentence: "Ich suche nach einer besseren Lösung.",
    englishSentence: "I am looking for a better solution.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 33,
    basicWord: "herausfinden",
    basicLevel: "A2",
    upgradedWord: "feststellen",
    upgradedLevel: "B2",
    english: "to find out → to ascertain / establish",
    germanSentence: "Wir müssen zuerst die Ursache feststellen.",
    englishSentence: "We must first establish the cause.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 34,
    basicWord: "denken",
    basicLevel: "A1",
    upgradedWord: "überlegen",
    upgradedLevel: "A2",
    english: "to think → to reflect upon / consider",
    germanSentence: "Ich muss mir diese Entscheidung gut überlegen.",
    englishSentence: "I have to think carefully about this decision.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 35,
    basicWord: "ändern",
    basicLevel: "A2",
    upgradedWord: "verändern",
    upgradedLevel: "B1",
    english: "to change → to transform",
    germanSentence: "Die neue Erfahrung hat mein Leben verändert.",
    englishSentence: "The new experience changed my life.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 36,
    basicWord: "besser machen",
    basicLevel: "A1",
    upgradedWord: "verbessern",
    upgradedLevel: "A2",
    english: "to make better → to improve",
    germanSentence: "Ich möchte meine Deutschkenntnisse verbessern.",
    englishSentence: "I want to improve my German skills.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 37,
    basicWord: "kleiner machen",
    basicLevel: "A1",
    upgradedWord: "verringern",
    upgradedLevel: "B2",
    english: "to reduce → to decrease / diminish",
    germanSentence: "Wir müssen unsere Ausgaben verringern.",
    englishSentence: "We have to reduce our expenses.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },
  {
    id: 38,
    basicWord: "größer machen",
    basicLevel: "A1",
    upgradedWord: "steigern",
    upgradedLevel: "B2",
    english: "to increase → to boost / escalate",
    germanSentence: "Das Unternehmen möchte seine Produktion steigern.",
    englishSentence: "The company wants to increase its production.",
    category: "Verbs",
    section: "10.2 Verb-Upgrades"
  },

  // 10.3 Adverbs
  {
    id: 39,
    basicWord: "schnell",
    basicLevel: "A1",
    upgradedWord: "zügig",
    upgradedLevel: "B2",
    english: "quickly; often → promptly / swiftly",
    germanSentence: "Wir müssen zügig arbeiten.",
    englishSentence: "We must work promptly.",
    category: "Adverbs",
    section: "10.3 Adverb-Upgrades"
  },
  {
    id: 40,
    basicWord: "oft",
    basicLevel: "A1",
    upgradedWord: "häufig",
    upgradedLevel: "A2",
    english: "often → frequently",
    germanSentence: "Diese Situation kommt häufig vor.",
    englishSentence: "This situation occurs frequently.",
    category: "Adverbs",
    section: "10.3 Adverb-Upgrades"
  },
  {
    id: 41,
    basicWord: "vielleicht",
    basicLevel: "A1",
    upgradedWord: "möglicherweise",
    upgradedLevel: "B1",
    english: "maybe; perhaps → possibly",
    germanSentence: "Möglicherweise kommt er später.",
    englishSentence: "He may come later.",
    category: "Adverbs",
    section: "10.3 Adverb-Upgrades"
  },
  {
    id: 42,
    basicWord: "normalerweise",
    basicLevel: "A1",
    upgradedWord: "in der Regel",
    upgradedLevel: "B1",
    english: "usually → as a rule",
    germanSentence: "In der Regel dauert die Fahrt zwanzig Minuten.",
    englishSentence: "The journey usually takes twenty minutes.",
    category: "Adverbs",
    section: "10.3 Adverb-Upgrades"
  },
  {
    id: 43,
    basicWord: "immer",
    basicLevel: "A1",
    upgradedWord: "stets",
    upgradedLevel: "B2",
    english: "always → constantly / always",
    germanSentence: "Sie ist stets freundlich zu den Kunden.",
    englishSentence: "She is always friendly to the customers.",
    category: "Adverbs",
    section: "10.3 Adverb-Upgrades"
  },
  {
    id: 44,
    basicWord: "wieder",
    basicLevel: "A1",
    upgradedWord: "erneut",
    upgradedLevel: "B2",
    english: "again → once more / anew",
    germanSentence: "Bitte versuchen Sie es später erneut.",
    englishSentence: "Please try again later.",
    category: "Adverbs",
    section: "10.3 Adverb-Upgrades"
  },
  {
    id: 45,
    basicWord: "bald",
    basicLevel: "A1",
    upgradedWord: "in Kürze",
    upgradedLevel: "B1",
    english: "soon → shortly",
    germanSentence: "Die neuen Öffnungszeiten werden in Kürze bekannt gegeben.",
    englishSentence: "The new opening hours will be announced soon.",
    category: "Adverbs",
    section: "10.3 Adverb-Upgrades"
  },
  {
    id: 46,
    basicWord: "nur",
    basicLevel: "A1",
    upgradedWord: "lediglich",
    upgradedLevel: "B2",
    english: "only → merely / solely",
    germanSentence: "Für die Anmeldung benötigen Sie lediglich einen Ausweis.",
    englishSentence: "You only need an ID to register.",
    category: "Adverbs",
    section: "10.3 Adverb-Upgrades"
  },
  {
    id: 47,
    basicWord: "erst",
    basicLevel: "A1",
    upgradedWord: "zunächst",
    upgradedLevel: "B1",
    english: "first; initially → initially",
    germanSentence: "Zunächst prüfen wir, ob alle Angaben stimmen.",
    englishSentence: "First, we will check whether all the details are correct.",
    category: "Adverbs",
    section: "10.3 Adverb-Upgrades"
  },
  {
    id: 48,
    basicWord: "zusammen",
    basicLevel: "A1",
    upgradedWord: "gemeinsam",
    upgradedLevel: "A2",
    english: "together → jointly",
    germanSentence: "Wir haben die Aufgabe gemeinsam gelöst.",
    englishSentence: "We solved the task together.",
    category: "Adverbs",
    section: "10.3 Adverb-Upgrades"
  }
];

const uniqueVocabCats = Array.from(
  new Set(VOCAB_UPGRADES_LIST.map((item) => item.category))
) as string[];

export const VOCAB_UPGRADES_CATEGORIES = [
  `All (${VOCAB_UPGRADES_LIST.length})`,
  ...uniqueVocabCats.sort()
];
