export interface DescriptivePhraseItem {
  id: number;
  phrase: string;
  english: string;
  germanSentence: string;
  englishSentence: string;
  category: string; // "Noun-Verb Collocations", "Memories & Experiences", "People & Relationships", "Places & Atmosphere", "Situations & Outcomes", "B1/B2 Expressive Verbs"
  section: string;
  level: string;
}

export const DESCRIPTIVE_PHRASES_LIST: DescriptivePhraseItem[] = [
  // 11.1 Common verb-noun combinations (Nomen-Verb-Verbindungen)
  {
    id: 1,
    phrase: "eine Entscheidung treffen",
    english: "to make a decision",
    germanSentence: "Wir müssen heute eine Entscheidung treffen.",
    englishSentence: "We have to make a decision today.",
    category: "Noun-Verb Collocations",
    section: "11.1 Nomen-Verb-Verbindungen",
    level: "B1"
  },
  {
    id: 2,
    phrase: "einen Termin vereinbaren",
    english: "to make an appointment",
    germanSentence: "Ich muss einen Termin beim Zahnarzt vereinbaren.",
    englishSentence: "I have to make an appointment with the dentist.",
    category: "Noun-Verb Collocations",
    section: "11.1 Nomen-Verb-Verbindungen",
    level: "A2–B1"
  },
  {
    id: 3,
    phrase: "einen Termin verschieben",
    english: "to postpone an appointment",
    germanSentence: "Können wir den Termin auf Montag verschieben?",
    englishSentence: "Can we postpone the appointment until Monday?",
    category: "Noun-Verb Collocations",
    section: "11.1 Nomen-Verb-Verbindungen",
    level: "A2–B1"
  },
  {
    id: 4,
    phrase: "einen Termin absagen",
    english: "to cancel an appointment",
    germanSentence: "Ich muss meinen Termin leider absagen.",
    englishSentence: "Unfortunately, I have to cancel my appointment.",
    category: "Noun-Verb Collocations",
    section: "11.1 Nomen-Verb-Verbindungen",
    level: "A2–B1"
  },
  {
    id: 5,
    phrase: "den Haushalt machen",
    english: "to do the housework",
    germanSentence: "Am Samstag machen wir zusammen den Haushalt.",
    englishSentence: "We do the housework together on Saturday.",
    category: "Noun-Verb Collocations",
    section: "11.1 Nomen-Verb-Verbindungen",
    level: "A1–A2"
  },
  {
    id: 6,
    phrase: "Besorgungen machen",
    english: "to run errands",
    germanSentence: "Ich muss nach der Arbeit noch ein paar Besorgungen machen.",
    englishSentence: "I still have to run a few errands after work.",
    category: "Noun-Verb Collocations",
    section: "11.1 Nomen-Verb-Verbindungen",
    level: "A2"
  },
  {
    id: 7,
    phrase: "eine Pause machen",
    english: "to take a break",
    germanSentence: "Nach zwei Stunden Arbeit mache ich eine Pause.",
    englishSentence: "I take a break after two hours of work.",
    category: "Noun-Verb Collocations",
    section: "11.1 Nomen-Verb-Verbindungen",
    level: "A1"
  },
  {
    id: 8,
    phrase: "Fortschritte machen",
    english: "to make progress",
    germanSentence: "Ich mache beim Deutschlernen gute Fortschritte.",
    englishSentence: "I am making good progress in learning German.",
    category: "Noun-Verb Collocations",
    section: "11.1 Nomen-Verb-Verbindungen",
    level: "A2–B1"
  },
  {
    id: 9,
    phrase: "Notizen machen",
    english: "to take notes",
    germanSentence: "Während des Unterrichts mache ich Notizen.",
    englishSentence: "I take notes during the lesson.",
    category: "Noun-Verb Collocations",
    section: "11.1 Nomen-Verb-Verbindungen",
    level: "A2"
  },
  {
    id: 10,
    phrase: "Hausaufgaben machen",
    english: "to do homework",
    germanSentence: "Die Kinder machen ihre Hausaufgaben.",
    englishSentence: "The children are doing their homework.",
    category: "Noun-Verb Collocations",
    section: "11.1 Nomen-Verb-Verbindungen",
    level: "A1"
  },
  {
    id: 11,
    phrase: "Spaß haben",
    english: "to have fun",
    germanSentence: "Wir hatten auf der Reise viel Spaß.",
    englishSentence: "We had a lot of fun on the trip.",
    category: "Noun-Verb Collocations",
    section: "11.1 Nomen-Verb-Verbindungen",
    level: "A1"
  },
  {
    id: 12,
    phrase: "Zeit verbringen",
    english: "to spend time",
    germanSentence: "Ich verbringe gern Zeit mit meiner Familie.",
    englishSentence: "I like spending time with my family.",
    category: "Noun-Verb Collocations",
    section: "11.1 Nomen-Verb-Verbindungen",
    level: "A2"
  },
  {
    id: 13,
    phrase: "Verantwortung übernehmen",
    english: "to take responsibility",
    germanSentence: "Jeder sollte Verantwortung für seine Aufgaben übernehmen.",
    englishSentence: "Everyone should take responsibility for their tasks.",
    category: "Noun-Verb Collocations",
    section: "11.1 Nomen-Verb-Verbindungen",
    level: "B1"
  },
  {
    id: 14,
    phrase: "eine Frage stellen",
    english: "to ask a question",
    germanSentence: "Darf ich Ihnen eine Frage stellen?",
    englishSentence: "May I ask you a question?",
    category: "Noun-Verb Collocations",
    section: "11.1 Nomen-Verb-Verbindungen",
    level: "A2"
  },

  // 11.2 Memories and experiences — Erinnerungen und Erfahrungen
  {
    id: 15,
    phrase: "eine unvergessliche Erinnerung",
    english: "an unforgettable memory",
    germanSentence: "Diese Reise bleibt für mich eine unvergessliche Erinnerung.",
    englishSentence: "This trip will remain an unforgettable memory for me.",
    category: "Memories & Experiences",
    section: "11.2 Erinnerungen",
    level: "B1"
  },
  {
    id: 16,
    phrase: "ein unvergessliches Erlebnis",
    english: "an unforgettable experience",
    germanSentence: "Der Schüleraustausch war für alle ein unvergessliches Erlebnis.",
    englishSentence: "The student exchange was an unforgettable experience for everyone.",
    category: "Memories & Experiences",
    section: "11.2 Erinnerungen",
    level: "B1"
  },
  {
    id: 17,
    phrase: "ein kostbarer Augenblick",
    english: "a precious moment",
    germanSentence: "Das Wiedersehen mit meiner Familie war ein kostbarer Augenblick.",
    englishSentence: "Reuniting with my family was a precious moment.",
    category: "Memories & Experiences",
    section: "11.2 Erinnerungen",
    level: "B1–B2"
  },
  {
    id: 18,
    phrase: "ein bleibender Eindruck",
    english: "a lasting impression",
    germanSentence: "Der Film hat bei mir einen bleibenden Eindruck hinterlassen.",
    englishSentence: "The film left a lasting impression on me.",
    category: "Memories & Experiences",
    section: "11.2 Erinnerungen",
    level: "B1–B2"
  },
  {
    id: 19,
    phrase: "eine wertvolle Erfahrung",
    english: "a valuable experience",
    germanSentence: "Das Praktikum im Ausland war eine wertvolle Erfahrung.",
    englishSentence: "The internship abroad was a valuable experience.",
    category: "Memories & Experiences",
    section: "11.2 Erinnerungen",
    level: "B1"
  },
  {
    id: 20,
    phrase: "ein lebenslanger Traum",
    english: "a lifelong dream",
    germanSentence: "Ein eigenes Café zu eröffnen ist ihr lebenslanger Traum.",
    englishSentence: "Opening her own café is her lifelong dream.",
    category: "Memories & Experiences",
    section: "11.2 Erinnerungen",
    level: "B1"
  },
  {
    id: 21,
    phrase: "eine großartige Gelegenheit",
    english: "a wonderful opportunity",
    germanSentence: "Der Kurs ist eine großartige Gelegenheit, neue Leute kennenzulernen.",
    englishSentence: "The course is a wonderful opportunity to meet new people.",
    category: "Memories & Experiences",
    section: "11.2 Erinnerungen",
    level: "B1"
  },
  {
    id: 22,
    phrase: "eine angenehme Überraschung",
    english: "a pleasant surprise",
    germanSentence: "Der unerwartete Besuch war eine angenehme Überraschung.",
    englishSentence: "The unexpected visit was a pleasant surprise.",
    category: "Memories & Experiences",
    section: "11.2 Erinnerungen",
    level: "B1"
  },
  {
    id: 23,
    phrase: "eine unerwartete Wendung",
    english: "an unexpected turn",
    germanSentence: "Die Geschichte nahm am Ende eine unerwartete Wendung.",
    englishSentence: "The story took an unexpected turn at the end.",
    category: "Memories & Experiences",
    section: "11.2 Erinnerungen",
    level: "B1–B2"
  },

  // 11.3 Places and atmosphere — Orte und Atmosphäre
  {
    id: 24,
    phrase: "ein ruhiger Ort",
    english: "a peaceful place",
    germanSentence: "Am See habe ich einen ruhigen Ort zum Lesen gefunden.",
    englishSentence: "I found a peaceful place to read by the lake.",
    category: "Places & Atmosphere",
    section: "11.3 Orte & Atmosphäre",
    level: "A2"
  },
  {
    id: 25,
    phrase: "eine atemberaubende Aussicht",
    english: "a breathtaking view",
    germanSentence: "Von diesem Balkon hat man eine atemberaubende Aussicht.",
    englishSentence: "There is a breathtaking view from this balcony.",
    category: "Places & Atmosphere",
    section: "11.3 Orte & Atmosphäre",
    level: "B1–B2"
  },
  {
    id: 26,
    phrase: "eine wunderschöne Landschaft",
    english: "a beautiful landscape",
    germanSentence: "Die Region ist für ihre wunderschöne Landschaft bekannt.",
    englishSentence: "The region is known for its beautiful landscape.",
    category: "Places & Atmosphere",
    section: "11.3 Orte & Atmosphäre",
    level: "B1"
  },
  {
    id: 27,
    phrase: "eine historische Stadt",
    english: "a historic city",
    germanSentence: "Heidelberg ist eine historische Stadt mit vielen alten Gebäuden.",
    englishSentence: "Heidelberg is a historic city with many old buildings.",
    category: "Places & Atmosphere",
    section: "11.3 Orte & Atmosphäre",
    level: "B1"
  },
  {
    id: 28,
    phrase: "eine lebhafte Atmosphäre",
    english: "a lively atmosphere",
    germanSentence: "Auf dem Markt herrscht am Samstag eine lebhafte Atmosphäre.",
    englishSentence: "There is a lively atmosphere at the market on Saturday.",
    category: "Places & Atmosphere",
    section: "11.3 Orte & Atmosphäre",
    level: "B1"
  },
  {
    id: 29,
    phrase: "eine gemütliche Atmosphäre",
    english: "a cosy atmosphere",
    germanSentence: "Das kleine Café hat eine gemütliche Atmosphäre.",
    englishSentence: "The small café has a cosy atmosphere.",
    category: "Places & Atmosphere",
    section: "11.3 Orte & Atmosphäre",
    level: "A2–B1"
  },
  {
    id: 30,
    phrase: "ein überfüllter Ort",
    english: "a crowded place",
    germanSentence: "Der Bahnhof ist morgens oft ein überfüllter Ort.",
    englishSentence: "The station is often crowded in the morning.",
    category: "Places & Atmosphere",
    section: "11.3 Orte & Atmosphäre",
    level: "B1"
  },

  // 11.4 Situations and results — Situationen und Ergebnisse
  {
    id: 31,
    phrase: "eine schwierige Entscheidung",
    english: "a difficult decision",
    germanSentence: "Es war eine schwierige Entscheidung, die Stadt zu verlassen.",
    englishSentence: "It was a difficult decision to leave the city.",
    category: "Situations & Outcomes",
    section: "11.4 Situationen",
    level: "B1"
  },
  {
    id: 32,
    phrase: "ein ernstes Problem",
    english: "a serious problem",
    germanSentence: "Der Fehler könnte zu einem ernsthaften Problem führen.",
    englishSentence: "The mistake could lead to a serious problem.",
    category: "Situations & Outcomes",
    section: "11.4 Situationen",
    level: "B1"
  },
  {
    id: 33,
    phrase: "eine bemerkenswerte Leistung",
    english: "a remarkable achievement",
    germanSentence: "Der erste Platz war eine bemerkenswerte Leistung für das junge Team.",
    englishSentence: "First place was a remarkable achievement for the young team.",
    category: "Situations & Outcomes",
    section: "11.4 Situationen",
    level: "B2"
  },
  {
    id: 34,
    phrase: "eine vielversprechende Zukunft",
    english: "a promising future",
    germanSentence: "Mit dieser Ausbildung hat sie gute Chancen auf eine vielversprechende Zukunft.",
    englishSentence: "With this training, she has a good chance of a promising future.",
    category: "Situations & Outcomes",
    section: "11.4 Situationen",
    level: "B1–B2"
  },
  {
    id: 35,
    phrase: "eine sinnvolle Arbeit",
    english: "meaningful work",
    germanSentence: "Für viele Menschen ist eine sinnvolle Arbeit besonders wichtig.",
    englishSentence: "Meaningful work is particularly important to many people.",
    category: "Situations & Outcomes",
    section: "11.4 Situationen",
    level: "B1"
  },
  {
    id: 36,
    phrase: "eine kreative Lösung",
    english: "a creative solution",
    germanSentence: "Gemeinsam haben wir eine kreative Lösung für das Problem gefunden.",
    englishSentence: "Together, we found a creative solution to the problem.",
    category: "Situations & Outcomes",
    section: "11.4 Situationen",
    level: "B1"
  },
  {
    id: 37,
    phrase: "wertvoller Rat",
    english: "valuable advice",
    germanSentence: "Ein wertvoller Rat meiner Lehrerin hat mir sehr geholfen.",
    englishSentence: "My teacher's valuable advice helped me a lot.",
    category: "Situations & Outcomes",
    section: "11.4 Situationen",
    level: "B1"
  },
  {
    id: 38,
    phrase: "einen guten Eindruck machen",
    english: "to make a good impression",
    germanSentence: "Beim Vorstellungsgespräch möchte ich einen guten Eindruck machen.",
    englishSentence: "I want to make a good impression at the job interview.",
    category: "Situations & Outcomes",
    section: "11.4 Situationen",
    level: "B1"
  },

  // 11.6 Useful B1/B2 verb expressions — Ausdrucksstarke Verben
  {
    id: 39,
    phrase: "erlangen",
    english: "to obtain / gain (experience/knowledge)",
    germanSentence: "Sie hat viel Erfahrung erlangt.",
    englishSentence: "She has gained a lot of experience.",
    category: "B1/B2 Expressive Verbs",
    section: "11.6 Ausdrucksstarke Verben",
    level: "B2"
  },
  {
    id: 40,
    phrase: "erzielen",
    english: "to achieve (results/success)",
    germanSentence: "Das Unternehmen hat gute Ergebnisse erzielt.",
    englishSentence: "The company achieved good results.",
    category: "B1/B2 Expressive Verbs",
    section: "11.6 Ausdrucksstarke Verben",
    level: "B2"
  },
  {
    id: 41,
    phrase: "verringern",
    english: "to reduce (costs/expenses)",
    germanSentence: "Wir müssen die Kosten verringern.",
    englishSentence: "We must reduce costs.",
    category: "B1/B2 Expressive Verbs",
    section: "11.6 Ausdrucksstarke Verben",
    level: "B2"
  },
  {
    id: 42,
    phrase: "steigern",
    english: "to increase / boost (productivity)",
    germanSentence: "Das Unternehmen möchte seine Produktivität steigern.",
    englishSentence: "The company wants to increase its productivity.",
    category: "B1/B2 Expressive Verbs",
    section: "11.6 Ausdrucksstarke Verben",
    level: "B2"
  },
  {
    id: 43,
    phrase: "vermeiden",
    english: "to avoid (mistakes)",
    germanSentence: "Wir sollten unnötige Fehler vermeiden.",
    englishSentence: "We should avoid unnecessary mistakes.",
    category: "B1/B2 Expressive Verbs",
    section: "11.6 Ausdrucksstarke Verben",
    level: "B1"
  },
  {
    id: 44,
    phrase: "erfordern",
    english: "to require / demand (time/effort)",
    germanSentence: "Diese Aufgabe erfordert viel Zeit.",
    englishSentence: "This task requires a lot of time.",
    category: "B1/B2 Expressive Verbs",
    section: "11.6 Ausdrucksstarke Verben",
    level: "B2"
  },
  {
    id: 45,
    phrase: "hervorheben",
    english: "to emphasize / highlight",
    germanSentence: "Ich möchte einen wichtigen Punkt hervorheben.",
    englishSentence: "I would like to emphasise an important point.",
    category: "B1/B2 Expressive Verbs",
    section: "11.6 Ausdrucksstarke Verben",
    level: "B2"
  },
  {
    id: 46,
    phrase: "einen Beitrag leisten",
    english: "to contribute to",
    germanSentence: "Jeder kann einen Beitrag zum Umweltschutz leisten.",
    englishSentence: "Everyone can contribute to environmental protection.",
    category: "B1/B2 Expressive Verbs",
    section: "11.6 Ausdrucksstarke Verben",
    level: "B2"
  },
  {
    id: 47,
    phrase: "ins Leben rufen",
    english: "to establish / launch an organisation",
    germanSentence: "Sie haben eine neue Organisation ins Leben gerufen.",
    englishSentence: "They established a new organisation.",
    category: "B1/B2 Expressive Verbs",
    section: "11.6 Ausdrucksstarke Verben",
    level: "B2"
  },
  {
    id: 48,
    phrase: "fördern",
    english: "to support / promote health",
    germanSentence: "Sport fördert die Gesundheit.",
    englishSentence: "Sport promotes health.",
    category: "B1/B2 Expressive Verbs",
    section: "11.6 Ausdrucksstarke Verben",
    level: "B1–B2"
  },
  {
    id: 49,
    phrase: "sich auseinandersetzen mit",
    english: "to engage with / deal with a topic",
    germanSentence: "Wir müssen uns mit diesem Thema auseinandersetzen.",
    englishSentence: "We have to deal with this topic.",
    category: "B1/B2 Expressive Verbs",
    section: "11.6 Ausdrucksstarke Verben",
    level: "B2"
  },
  {
    id: 50,
    phrase: "eine entscheidende Rolle spielen",
    english: "to play a decisive role",
    germanSentence: "Regelmäßige Bewegung spielt eine entscheidende Rolle für die Gesundheit.",
    englishSentence: "Regular exercise plays a crucial role in health.",
    category: "B1/B2 Expressive Verbs",
    section: "11.6 Ausdrucksstarke Verben",
    level: "B2"
  },
  {
    id: 51,
    phrase: "über Kenntnisse verfügen",
    english: "to have knowledge / command of skills",
    germanSentence: "Sie verfügt über sehr gute Deutschkenntnisse.",
    englishSentence: "She has very good German-language skills.",
    category: "B1/B2 Expressive Verbs",
    section: "11.6 Ausdrucksstarke Verben",
    level: "B2"
  }
];

const uniqueDescCats = Array.from(
  new Set(DESCRIPTIVE_PHRASES_LIST.map((item) => item.category))
) as string[];

export const DESCRIPTIVE_PHRASES_CATEGORIES = [
  `All (${DESCRIPTIVE_PHRASES_LIST.length})`,
  ...uniqueDescCats.sort()
];
