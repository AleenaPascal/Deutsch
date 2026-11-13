export interface PrepositionItem {
  id: number;
  preposition: string;
  english: string;
  caseType: 'Akkusativ' | 'Dativ' | 'Wechsel (Two-Way)' | 'Genitiv' | 'Time Expression' | 'Contraction' | 'Idiomatic';
  germanSentence: string;
  englishSentence: string;
  contrastGerman?: string;
  contrastEnglish?: string;
  note?: string;
  category: string;
  section: string;
  level: string;
}

export const PREPOSITIONS_A1_B1_LIST: PrepositionItem[] = [
  // 1. Akkusativpräpositionen (Accusative Prepositions)
  {
    id: 1,
    preposition: "durch",
    english: "through",
    caseType: "Akkusativ",
    germanSentence: "Wir gehen durch den Park.",
    englishSentence: "We walk through the park.",
    note: "Always takes Akkusativ: den Park (masc. Akk)",
    category: "1. Akkusativpräpositionen",
    section: "1. Akkusativ",
    level: "A1"
  },
  {
    id: 2,
    preposition: "für",
    english: "for",
    caseType: "Akkusativ",
    germanSentence: "Das Geschenk ist für dich.",
    englishSentence: "The gift is for you.",
    note: "Personal pronoun in Akkusativ: dich",
    category: "1. Akkusativpräpositionen",
    section: "1. Akkusativ",
    level: "A1"
  },
  {
    id: 3,
    preposition: "gegen",
    english: "against",
    caseType: "Akkusativ",
    germanSentence: "Ich bin gegen den Plan.",
    englishSentence: "I am against the plan.",
    note: "Akkusativ: den Plan (masc. Akk)",
    category: "1. Akkusativpräpositionen",
    section: "1. Akkusativ",
    level: "A1–A2"
  },
  {
    id: 4,
    preposition: "ohne",
    english: "without",
    caseType: "Akkusativ",
    germanSentence: "Kaffee ohne Zucker, bitte.",
    englishSentence: "Coffee without sugar, please.",
    note: "Always Akkusativ; often without article",
    category: "1. Akkusativpräpositionen",
    section: "1. Akkusativ",
    level: "A1"
  },
  {
    id: 5,
    preposition: "um",
    english: "around",
    caseType: "Akkusativ",
    germanSentence: "Wir gehen um den See.",
    englishSentence: "We walk around the lake.",
    note: "Spatial meaning: around the lake",
    category: "1. Akkusativpräpositionen",
    section: "1. Akkusativ",
    level: "A1"
  },
  {
    id: 6,
    preposition: "um (Zeit)",
    english: "at (exact time)",
    caseType: "Akkusativ",
    germanSentence: "Der Film beginnt um acht Uhr.",
    englishSentence: "The film starts at eight o'clock.",
    note: "Time meaning: exact clock time",
    category: "1. Akkusativpräpositionen",
    section: "1. Akkusativ",
    level: "A1"
  },
  {
    id: 7,
    preposition: "bis",
    english: "until / up to",
    caseType: "Akkusativ",
    germanSentence: "Ich bleibe bis morgen.",
    englishSentence: "I am staying until tomorrow.",
    note: "Often used without article (bis morgen, bis Montag)",
    category: "1. Akkusativpräpositionen",
    section: "1. Akkusativ",
    level: "A1"
  },
  {
    id: 8,
    preposition: "entlang",
    english: "along",
    caseType: "Akkusativ",
    germanSentence: "Wir gehen den Fluss entlang.",
    englishSentence: "We walk along the river.",
    note: "Usually comes AFTER the noun (postposition) and takes Akkusativ",
    category: "1. Akkusativpräpositionen",
    section: "1. Akkusativ",
    level: "A2"
  },
  {
    id: 9,
    preposition: "über",
    english: "across / over",
    caseType: "Akkusativ",
    germanSentence: "Wir gehen über die Brücke.",
    englishSentence: "We walk across the bridge.",
    note: "Movement from one side to the other = Akkusativ",
    category: "1. Akkusativpräpositionen",
    section: "1. Akkusativ",
    level: "A1–A2"
  },

  // 2. Dativpräpositionen (Dative Prepositions)
  {
    id: 10,
    preposition: "aus",
    english: "from / out of",
    caseType: "Dativ",
    germanSentence: "Ich komme aus Indien.",
    englishSentence: "I come from India.",
    note: "Origin, nationality, or exiting a building",
    category: "2. Dativpräpositionen",
    section: "2. Dativ",
    level: "A1"
  },
  {
    id: 11,
    preposition: "bei",
    english: "at / with / near",
    caseType: "Dativ",
    germanSentence: "Ich bin bei meiner Freundin.",
    englishSentence: "I am at my friend's place.",
    note: "Living with/staying with/working at a place",
    category: "2. Dativpräpositionen",
    section: "2. Dativ",
    level: "A1"
  },
  {
    id: 12,
    preposition: "mit",
    english: "with / by (transport)",
    caseType: "Dativ",
    germanSentence: "Ich fahre mit dem Bus.",
    englishSentence: "I travel by bus.",
    note: "Dem Bus (masc. Dat) - means of transport or company",
    category: "2. Dativpräpositionen",
    section: "2. Dativ",
    level: "A1"
  },
  {
    id: 13,
    preposition: "nach",
    english: "after / to (cities, countries)",
    caseType: "Dativ",
    germanSentence: "Nach der Arbeit gehe ich nach Hause.",
    englishSentence: "After work, I go home.",
    note: "Der Arbeit (fem. Dat); nach Hause = home (idiom)",
    category: "2. Dativpräpositionen",
    section: "2. Dativ",
    level: "A1"
  },
  {
    id: 14,
    preposition: "seit",
    english: "since / for (ongoing time)",
    caseType: "Dativ",
    germanSentence: "Ich lerne seit einem Jahr Deutsch.",
    englishSentence: "I have been learning German for a year.",
    note: "Einem Jahr (neut. Dat) - ongoing action started in past",
    category: "2. Dativpräpositionen",
    section: "2. Dativ",
    level: "A1–A2"
  },
  {
    id: 15,
    preposition: "von",
    english: "from / by",
    caseType: "Dativ",
    germanSentence: "Der Brief ist von Anna.",
    englishSentence: "The letter is from Anna.",
    note: "Origin of an object/message or possession",
    category: "2. Dativpräpositionen",
    section: "2. Dativ",
    level: "A1"
  },
  {
    id: 16,
    preposition: "zu",
    english: "to (people, places, appointments)",
    caseType: "Dativ",
    germanSentence: "Ich gehe zu meiner Arbeit.",
    englishSentence: "I am going to my workplace.",
    note: "Meiner Arbeit (fem. Dat) - destination (people/institutions)",
    category: "2. Dativpräpositionen",
    section: "2. Dativ",
    level: "A1"
  },
  {
    id: 17,
    preposition: "gegenüber",
    english: "opposite",
    caseType: "Dativ",
    germanSentence: "Die Bank ist gegenüber dem Bahnhof.",
    englishSentence: "The bank is opposite the railway station.",
    note: "Can stand before or after noun: dem Bahnhof gegenüber",
    category: "2. Dativpräpositionen",
    section: "2. Dativ",
    level: "A2"
  },

  // 3. Wechselpräpositionen (Two-Way Prepositions: Wo? Dativ vs Wohin? Akkusativ)
  {
    id: 18,
    preposition: "an",
    english: "at / on (vertical surface)",
    caseType: "Wechsel (Two-Way)",
    germanSentence: "Das Bild hängt an der Wand.",
    englishSentence: "The picture is hanging on the wall.",
    contrastGerman: "Ich hänge das Bild an die Wand.",
    contrastEnglish: "I hang the picture on the wall (Wohin? Akkusativ).",
    note: "Wo? = Dativ (an der Wand) | Wohin? = Akkusativ (an die Wand)",
    category: "3. Wechselpräpositionen",
    section: "3. Wechsel",
    level: "A1–A2"
  },
  {
    id: 19,
    preposition: "auf",
    english: "on (horizontal surface)",
    caseType: "Wechsel (Two-Way)",
    germanSentence: "Das Buch liegt auf dem Tisch.",
    englishSentence: "The book is lying on the table.",
    contrastGerman: "Ich lege das Buch auf den Tisch.",
    contrastEnglish: "I put the book on the table (Wohin? Akkusativ).",
    note: "Wo? = Dativ (auf dem Tisch) | Wohin? = Akkusativ (auf den Tisch)",
    category: "3. Wechselpräpositionen",
    section: "3. Wechsel",
    level: "A1–A2"
  },
  {
    id: 20,
    preposition: "hinter",
    english: "behind",
    caseType: "Wechsel (Two-Way)",
    germanSentence: "Der Parkplatz ist hinter dem Haus.",
    englishSentence: "The parking lot is behind the house.",
    note: "Wo? = Dativ (hinter dem Haus)",
    category: "3. Wechselpräpositionen",
    section: "3. Wechsel",
    level: "A1–A2"
  },
  {
    id: 21,
    preposition: "in (Wo? Dativ)",
    english: "in / inside (location)",
    caseType: "Wechsel (Two-Way)",
    germanSentence: "Ich wohne in Berlin. / Ich bin in der Küche.",
    englishSentence: "I live in Berlin. / I am in the kitchen.",
    contrastGerman: "Ich gehe in die Küche.",
    contrastEnglish: "I am going into the kitchen (Wohin? Akkusativ).",
    note: "Wo? = Dativ (in der Küche) | Wohin? = Akkusativ (in die Küche)",
    category: "3. Wechselpräpositionen",
    section: "3. Wechsel",
    level: "A1"
  },
  {
    id: 22,
    preposition: "in (Wohin? Akkusativ)",
    english: "into (direction / destination)",
    caseType: "Wechsel (Two-Way)",
    germanSentence: "Ich gehe in die Küche.",
    englishSentence: "I am going into the kitchen.",
    contrastGerman: "Ich bin in der Küche.",
    contrastEnglish: "I am in the kitchen (Wo? Dativ).",
    note: "Wohin? = Akkusativ (in die Küche)",
    category: "3. Wechselpräpositionen",
    section: "3. Wechsel",
    level: "A1"
  },
  {
    id: 23,
    preposition: "neben",
    english: "next to / beside",
    caseType: "Wechsel (Two-Way)",
    germanSentence: "Die Apotheke ist neben der Bank.",
    englishSentence: "The pharmacy is next to the bank.",
    contrastGerman: "Ich stelle den Stuhl neben den Tisch.",
    contrastEnglish: "I put the chair next to the table (Wohin? Akkusativ).",
    note: "Wo? = Dativ (neben der Bank) | Wohin? = Akkusativ (neben den Tisch)",
    category: "3. Wechselpräpositionen",
    section: "3. Wechsel",
    level: "A1–A2"
  },
  {
    id: 24,
    preposition: "über",
    english: "above / over",
    caseType: "Wechsel (Two-Way)",
    germanSentence: "Die Lampe hängt über dem Tisch.",
    englishSentence: "The lamp is hanging above the table.",
    note: "Wo? = Dativ (über dem Tisch - no contact)",
    category: "3. Wechselpräpositionen",
    section: "3. Wechsel",
    level: "A1–A2"
  },
  {
    id: 25,
    preposition: "unter",
    english: "under / beneath",
    caseType: "Wechsel (Two-Way)",
    germanSentence: "Die Katze schläft unter dem Bett.",
    englishSentence: "The cat is sleeping under the bed.",
    contrastGerman: "Ich lege die Tasche unter den Tisch.",
    contrastEnglish: "I put the bag under the table (Wohin? Akkusativ).",
    note: "Wo? = Dativ (unter dem Bett) | Wohin? = Akkusativ (unter den Tisch)",
    category: "3. Wechselpräpositionen",
    section: "3. Wechsel",
    level: "A1–A2"
  },
  {
    id: 26,
    preposition: "vor",
    english: "in front of",
    caseType: "Wechsel (Two-Way)",
    germanSentence: "Das Auto steht vor dem Haus.",
    englishSentence: "The car is parked in front of the house.",
    contrastGerman: "Ich stelle das Auto vor das Haus.",
    contrastEnglish: "I park the car in front of the house (Wohin? Akkusativ).",
    note: "Wo? = Dativ (vor dem Haus) | Wohin? = Akkusativ (vor das Haus)",
    category: "3. Wechselpräpositionen",
    section: "3. Wechsel",
    level: "A1–A2"
  },
  {
    id: 27,
    preposition: "zwischen",
    english: "between",
    caseType: "Wechsel (Two-Way)",
    germanSentence: "Die Bank ist zwischen dem Café und dem Hotel.",
    englishSentence: "The bank is between the café and the hotel.",
    note: "Wo? = Dativ (zwischen dem Café und dem Hotel)",
    category: "3. Wechselpräpositionen",
    section: "3. Wechsel",
    level: "A1–A2"
  },
  {
    id: 28,
    preposition: "an (Haltestelle)",
    english: "at / by (bus stop, border)",
    caseType: "Wechsel (Two-Way)",
    germanSentence: "Ich warte an der Haltestelle.",
    englishSentence: "I am waiting at the bus stop.",
    note: "Wo? = Dativ (an der Haltestelle)",
    category: "3. Wechselpräpositionen",
    section: "3. Wechsel",
    level: "A1"
  },

  // 4. Genitivpräpositionen (Genitive Prepositions)
  {
    id: 29,
    preposition: "außerhalb",
    english: "outside of",
    caseType: "Genitiv",
    germanSentence: "Außerhalb der Stadt ist es ruhiger.",
    englishSentence: "It is quieter outside the city.",
    note: "Takes Genitiv: der Stadt (fem. Gen)",
    category: "4. Genitivpräpositionen",
    section: "4. Genitiv",
    level: "B1"
  },
  {
    id: 30,
    preposition: "innerhalb",
    english: "within / inside of",
    caseType: "Genitiv",
    germanSentence: "Innerhalb einer Woche bekommst du eine Antwort.",
    englishSentence: "You will receive an answer within a week.",
    note: "Takes Genitiv: einer Woche (fem. Gen)",
    category: "4. Genitivpräpositionen",
    section: "4. Genitiv",
    level: "B1"
  },
  {
    id: 31,
    preposition: "trotz",
    english: "despite / in spite of",
    caseType: "Genitiv",
    germanSentence: "Trotz des Regens gehen wir spazieren.",
    englishSentence: "Despite the rain, we go for a walk.",
    note: "Takes Genitiv: des Regens (masc. Gen +s)",
    category: "4. Genitivpräpositionen",
    section: "4. Genitiv",
    level: "B1"
  },
  {
    id: 32,
    preposition: "wegen",
    english: "because of / due to",
    caseType: "Genitiv",
    germanSentence: "Wegen des Wetters bleibe ich zu Hause.",
    englishSentence: "I am staying at home because of the weather.",
    note: "Takes Genitiv: des Wetters (neut. Gen +s)",
    category: "4. Genitivpräpositionen",
    section: "4. Genitiv",
    level: "A2–B1"
  },
  {
    id: 33,
    preposition: "statt / anstatt",
    english: "instead of",
    caseType: "Genitiv",
    germanSentence: "Statt des Kaffees trinke ich Tee.",
    englishSentence: "Instead of coffee, I drink tea.",
    note: "Takes Genitiv: des Kaffees (masc. Gen +s)",
    category: "4. Genitivpräpositionen",
    section: "4. Genitiv",
    level: "B1"
  },
  {
    id: 34,
    preposition: "während",
    english: "during",
    caseType: "Genitiv",
    germanSentence: "Während des Urlaubs lerne ich nicht.",
    englishSentence: "I don't study during the holiday.",
    note: "Takes Genitiv: des Urlaubs (masc. Gen +s)",
    category: "4. Genitivpräpositionen",
    section: "4. Genitiv",
    level: "B1"
  },

  // 5. Time expressions – Zeitangaben
  {
    id: 35,
    preposition: "um (Uhrzeit)",
    english: "at (exact time)",
    caseType: "Time Expression",
    germanSentence: "Wir treffen uns um acht Uhr.",
    englishSentence: "We meet at eight o'clock.",
    note: "Um = exact time (Um neun Uhr = at 9:00)",
    category: "5. Zeitangaben (Time)",
    section: "5. Time Expressions",
    level: "A1"
  },
  {
    id: 36,
    preposition: "am (Tage & Daten)",
    english: "on (days and dates)",
    caseType: "Time Expression",
    germanSentence: "Am Montag arbeite ich.",
    englishSentence: "I work on Monday.",
    note: "Am = days and parts of day (Am Montag, am Morgen; except: in der Nacht)",
    category: "5. Zeitangaben (Time)",
    section: "5. Time Expressions",
    level: "A1"
  },
  {
    id: 37,
    preposition: "von ... bis",
    english: "from ... to (time span)",
    caseType: "Time Expression",
    germanSentence: "Ich arbeite von neun bis fünf.",
    englishSentence: "I work from nine to five.",
    note: "Time interval: from 9 to 5",
    category: "5. Zeitangaben (Time)",
    section: "5. Time Expressions",
    level: "A1"
  },
  {
    id: 38,
    preposition: "bis (Endpunkt)",
    english: "until",
    caseType: "Time Expression",
    germanSentence: "Ich bleibe bis morgen.",
    englishSentence: "I am staying until tomorrow.",
    note: "End point of a time period",
    category: "5. Zeitangaben (Time)",
    section: "5. Time Expressions",
    level: "A1"
  },
  {
    id: 39,
    preposition: "seit (Dauer)",
    english: "since / for",
    caseType: "Time Expression",
    germanSentence: "Ich wohne seit zwei Jahren hier.",
    englishSentence: "I have been living here for two years.",
    note: "Takes Dativ: zwei Jahren (plural Dat +n)",
    category: "5. Zeitangaben (Time)",
    section: "5. Time Expressions",
    level: "A1–A2"
  },
  {
    id: 40,
    preposition: "nach (zeitlich)",
    english: "after",
    caseType: "Time Expression",
    germanSentence: "Nach dem Essen gehe ich spazieren.",
    englishSentence: "After the meal, I go for a walk.",
    note: "Takes Dativ: dem Essen (neut. Dat)",
    category: "5. Zeitangaben (Time)",
    section: "5. Time Expressions",
    level: "A1"
  },
  {
    id: 41,
    preposition: "vor (zeitlich)",
    english: "before / ago",
    caseType: "Time Expression",
    germanSentence: "Vor dem Essen wasche ich meine Hände.",
    englishSentence: "Before eating, I wash my hands.",
    note: "Takes Dativ: dem Essen (neut. Dat)",
    category: "5. Zeitangaben (Time)",
    section: "5. Time Expressions",
    level: "A1"
  },
  {
    id: 42,
    preposition: "während (zeitlich)",
    english: "during",
    caseType: "Time Expression",
    germanSentence: "Während des Unterrichts bin ich aufmerksam.",
    englishSentence: "I am attentive during the lesson.",
    note: "Takes Genitiv: des Unterrichts (masc. Gen +s)",
    category: "5. Zeitangaben (Time)",
    section: "5. Time Expressions",
    level: "B1"
  },
  {
    id: 43,
    preposition: "gegen (ungefähr)",
    english: "around / approximately (time)",
    caseType: "Time Expression",
    germanSentence: "Ich komme gegen acht Uhr.",
    englishSentence: "I will arrive around eight o'clock.",
    note: "Gegen = approximate time (Gegen neun Uhr = around 9:00)",
    category: "5. Zeitangaben (Time)",
    section: "5. Time Expressions",
    level: "A2"
  },

  // 6. Other useful prepositional expressions & Idioms
  {
    id: 44,
    preposition: "rund ums Jahr",
    english: "throughout the year / all year round",
    caseType: "Idiomatic",
    germanSentence: "Das Museum ist rund ums Jahr geöffnet.",
    englishSentence: "The museum is open throughout the year.",
    note: "Fixed expression (rund um das Jahr)",
    category: "6. Feste Wendungen",
    section: "6. Idioms",
    level: "A2–B1"
  },
  {
    id: 45,
    preposition: "auf jeden Fall",
    english: "definitely / in any case",
    caseType: "Idiomatic",
    germanSentence: "Ich komme auf jeden Fall.",
    englishSentence: "I will definitely come.",
    note: "Very common German conversational phrase",
    category: "6. Feste Wendungen",
    section: "6. Idioms",
    level: "A1–A2"
  },

  // 7. Important Contractions (Präpositionen + Artikel)
  {
    id: 46,
    preposition: "an + dem = am",
    english: "at the / on the",
    caseType: "Contraction",
    germanSentence: "Ich bin am Bahnhof.",
    englishSentence: "I am at the railway station.",
    note: "an + dem = am (Dativ masc./neut.)",
    category: "7. Verschmelzungen (Contractions)",
    section: "7. Contractions",
    level: "A1"
  },
  {
    id: 47,
    preposition: "an + das = ans",
    english: "to the / onto the",
    caseType: "Contraction",
    germanSentence: "Ich gehe ans Fenster.",
    englishSentence: "I go to the window.",
    note: "an + das = ans (Akkusativ neut.)",
    category: "7. Verschmelzungen (Contractions)",
    section: "7. Contractions",
    level: "A1"
  },
  {
    id: 48,
    preposition: "in + dem = im",
    english: "in the",
    caseType: "Contraction",
    germanSentence: "Ich bin im Supermarkt.",
    englishSentence: "I am in the supermarket.",
    note: "in + dem = im (Dativ masc./neut.)",
    category: "7. Verschmelzungen (Contractions)",
    section: "7. Contractions",
    level: "A1"
  },
  {
    id: 49,
    preposition: "in + das = ins",
    english: "into the",
    caseType: "Contraction",
    germanSentence: "Ich gehe ins Kino.",
    englishSentence: "I am going to the cinema.",
    note: "in + das = ins (Akkusativ neut.)",
    category: "7. Verschmelzungen (Contractions)",
    section: "7. Contractions",
    level: "A1"
  },
  {
    id: 50,
    preposition: "zu + dem = zum",
    english: "to the (masc./neut.)",
    caseType: "Contraction",
    germanSentence: "Ich gehe zum Arzt.",
    englishSentence: "I am going to the doctor.",
    note: "zu + dem = zum (Dativ masc./neut.)",
    category: "7. Verschmelzungen (Contractions)",
    section: "7. Contractions",
    level: "A1"
  },
  {
    id: 51,
    preposition: "zu + der = zur",
    english: "to the (fem.)",
    caseType: "Contraction",
    germanSentence: "Ich gehe zur Post.",
    englishSentence: "I am going to the post office.",
    note: "zu + der = zur (Dativ fem.)",
    category: "7. Verschmelzungen (Contractions)",
    section: "7. Contractions",
    level: "A1"
  },
  {
    id: 52,
    preposition: "bei + dem = beim",
    english: "at the / with the",
    caseType: "Contraction",
    germanSentence: "Ich bin beim Arzt.",
    englishSentence: "I am at the doctor's.",
    note: "bei + dem = beim (Dativ masc./neut.)",
    category: "7. Verschmelzungen (Contractions)",
    section: "7. Contractions",
    level: "A1"
  },
  {
    id: 53,
    preposition: "von + dem = vom",
    english: "from the",
    caseType: "Contraction",
    germanSentence: "Er kommt vom Bahnhof.",
    englishSentence: "He is coming from the station.",
    note: "von + dem = vom (Dativ masc./neut.)",
    category: "7. Verschmelzungen (Contractions)",
    section: "7. Contractions",
    level: "A1"
  },
  {
    id: 54,
    preposition: "für + das = fürs",
    english: "for the",
    caseType: "Contraction",
    germanSentence: "Das ist fürs Kind.",
    englishSentence: "That is for the child.",
    note: "für + das = fürs (Akkusativ neut.)",
    category: "7. Verschmelzungen (Contractions)",
    section: "7. Contractions",
    level: "A1"
  },
  {
    id: 55,
    preposition: "um + das = ums",
    english: "around the",
    caseType: "Contraction",
    germanSentence: "Wir gehen ums Haus.",
    englishSentence: "We walk around the house.",
    note: "um + das = ums (Akkusativ neut.)",
    category: "7. Verschmelzungen (Contractions)",
    section: "7. Contractions",
    level: "A1"
  }
];

const uniquePrepCats = Array.from(
  new Set(PREPOSITIONS_A1_B1_LIST.map((item) => item.category))
) as string[];

export const PREPOSITIONS_CATEGORIES = [
  `All (${PREPOSITIONS_A1_B1_LIST.length})`,
  ...uniquePrepCats.sort()
];
