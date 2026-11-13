export interface DegreeAmountItem {
  id: number;
  expression: string;
  english: string;
  opposite: string;
  oppositeEnglish: string;
  pairLabel: string;
  germanSentence: string;
  englishSentence: string;
  category: string;
  level: string;
}

export const DEGREE_AMOUNT_LIST: DegreeAmountItem[] = [
  {
    id: 1,
    expression: "sehr",
    english: "Very",
    opposite: "kaum",
    oppositeEnglish: "Hardly",
    pairLabel: "sehr ↔ kaum",
    germanSentence: "Das Restaurant ist sehr beliebt, aber das andere ist kaum bekannt.",
    englishSentence: "The restaurant is very popular, but the other one is hardly known.",
    category: "Degree & Intensity",
    level: "A1–A2"
  },
  {
    id: 2,
    expression: "ziemlich",
    english: "Quite / Fairly",
    opposite: "wenig",
    oppositeEnglish: "Little / Not much",
    pairLabel: "ziemlich ↔ wenig",
    germanSentence: "Der Weg ist ziemlich steil, aber der andere ist wenig steil.",
    englishSentence: "The path is quite steep, but the other one is not very steep.",
    category: "Degree & Intensity",
    level: "A2"
  },
  {
    id: 3,
    expression: "eher",
    english: "Rather / Preferably",
    opposite: "lieber",
    oppositeEnglish: "Preferably / Rather",
    pairLabel: "eher ↔ lieber",
    germanSentence: "Ich trinke eher Tee als Kaffee, aber heute trinke ich lieber Kaffee.",
    englishSentence: "I would rather drink tea than coffee, but today I prefer coffee.",
    category: "Preference & Tendency",
    level: "A2–B1"
  },
  {
    id: 4,
    expression: "extrem",
    english: "Extremely",
    opposite: "kaum",
    oppositeEnglish: "Hardly",
    pairLabel: "extrem ↔ kaum",
    germanSentence: "Die Wohnung ist extrem teuer, aber die andere ist kaum teuer.",
    englishSentence: "The apartment is extremely expensive, but the other one is hardly expensive.",
    category: "Degree & Intensity",
    level: "A2"
  },
  {
    id: 5,
    expression: "unglaublich",
    english: "Incredibly",
    opposite: "normal",
    oppositeEnglish: "Normal",
    pairLabel: "unglaublich ↔ normal",
    germanSentence: "Der Ausblick ist unglaublich schön, aber die Aussicht hier ist normal.",
    englishSentence: "The view is incredibly beautiful, but the view here is ordinary.",
    category: "Degree & Intensity",
    level: "A2"
  },
  {
    id: 6,
    expression: "besonders",
    english: "Especially",
    opposite: "gewöhnlich",
    oppositeEnglish: "Ordinary",
    pairLabel: "besonders ↔ gewöhnlich",
    germanSentence: "Dieses Kapitel ist besonders wichtig, aber das andere ist gewöhnlich.",
    englishSentence: "This chapter is especially important, but the other one is ordinary.",
    category: "Emphasis & Focus",
    level: "A2"
  },
  {
    id: 7,
    expression: "äußerst",
    english: "Extremely (formal)",
    opposite: "wenig",
    oppositeEnglish: "Slightly / Little",
    pairLabel: "äußerst ↔ wenig",
    germanSentence: "Das ist äußerst unwahrscheinlich.",
    englishSentence: "That is extremely unlikely.",
    category: "Degree & Intensity",
    level: "B1"
  },
  {
    id: 8,
    expression: "zu",
    english: "Too (more than wanted)",
    opposite: "nicht genug",
    oppositeEnglish: "Not enough",
    pairLabel: "zu ↔ nicht genug",
    germanSentence: "Der Kaffee ist zu heiß, aber der Tee ist nicht heiß genug.",
    englishSentence: "The coffee is too hot, but the tea is not hot enough.",
    category: "Degree & Excess",
    level: "A1–A2"
  },
  {
    id: 9,
    expression: "genug / ausreichend",
    english: "Enough",
    opposite: "nicht genug",
    oppositeEnglish: "Not enough",
    pairLabel: "genug ↔ nicht genug",
    germanSentence: "Wir haben genug Zeit, aber gestern hatten wir nicht genug Zeit.",
    englishSentence: "We have enough time, but yesterday we didn't have enough time.",
    category: "Sufficiency",
    level: "A1–A2"
  },
  {
    id: 10,
    expression: "vollständig / vollkommen",
    english: "Completely / Entirely",
    opposite: "teilweise",
    oppositeEnglish: "Partially",
    pairLabel: "vollkommen ↔ teilweise",
    germanSentence: "Ich stimme dir vollkommen zu, aber mein Freund stimmt dir nur teilweise zu.",
    englishSentence: "I completely agree with you, but my friend only partially agrees with you.",
    category: "Totality & Completeness",
    level: "A2–B1"
  },
  {
    id: 11,
    expression: "völlig",
    english: "Completely / Totally",
    opposite: "teilweise",
    oppositeEnglish: "Partially",
    pairLabel: "völlig ↔ teilweise",
    germanSentence: "Nach der Reise war ich völlig erschöpft, aber mein Bruder war nur teilweise müde.",
    englishSentence: "After the trip I was completely exhausted, but my brother was only partly tired.",
    category: "Totality & Completeness",
    level: "A2–B1"
  },
  {
    id: 12,
    expression: "total",
    english: "Totally (colloquial)",
    opposite: "überhaupt nicht",
    oppositeEnglish: "Not at all",
    pairLabel: "total ↔ überhaupt nicht",
    germanSentence: "Das Essen ist total lecker, aber der Nachtisch schmeckt überhaupt nicht gut.",
    englishSentence: "The food is really delicious, but the dessert doesn't taste good at all.",
    category: "Totality & Completeness",
    level: "A1–A2"
  },
  {
    id: 13,
    expression: "absolut",
    english: "Absolutely",
    opposite: "teilweise",
    oppositeEnglish: "Partially",
    pairLabel: "absolut ↔ teilweise",
    germanSentence: "Das ist absolut richtig.",
    englishSentence: "That is absolutely correct.",
    category: "Totality & Completeness",
    level: "A2"
  },
  {
    id: 14,
    expression: "ungefähr / etwa",
    english: "Approximately / About",
    opposite: "genau",
    oppositeEnglish: "Exactly",
    pairLabel: "ungefähr ↔ genau",
    germanSentence: "Der Bus kommt in etwa zehn Minuten, aber die genaue Zeit kenne ich nicht.",
    englishSentence: "The bus will arrive in about ten minutes, but I don't know the exact time.",
    category: "Approximation & Precision",
    level: "A1–A2"
  },
  {
    id: 15,
    expression: "circa",
    english: "Roughly / Approximately",
    opposite: "genau",
    oppositeEnglish: "Exactly",
    pairLabel: "circa ↔ genau",
    germanSentence: "Das Paket wiegt circa zwei Kilo.",
    englishSentence: "The parcel weighs approximately two kilos.",
    category: "Approximation & Precision",
    level: "A1–A2"
  },
  {
    id: 16,
    expression: "fast",
    english: "Almost / Nearly",
    opposite: "ganz",
    oppositeEnglish: "Completely",
    pairLabel: "fast ↔ ganz",
    germanSentence: "Ich bin fast fertig, aber meine Schwester ist schon ganz fertig.",
    englishSentence: "I am almost finished, but my sister is already completely finished.",
    category: "Approximation & Precision",
    level: "A1"
  },
  {
    id: 17,
    expression: "beinahe",
    english: "Almost / Nearly (close call)",
    opposite: "tatsächlich",
    oppositeEnglish: "Actually",
    pairLabel: "beinahe ↔ tatsächlich",
    germanSentence: "Ich hätte beinahe den Zug verpasst, aber tatsächlich habe ich ihn noch erreicht.",
    englishSentence: "I almost missed the train, but actually I managed to catch it.",
    category: "Approximation & Precision",
    level: "A2–B1"
  },
  {
    id: 18,
    expression: "fast alle",
    english: "Almost all",
    opposite: "niemand",
    oppositeEnglish: "Nobody",
    pairLabel: "fast alle ↔ niemand",
    germanSentence: "Fast alle Plätze sind reserviert, aber niemand hat diesen Platz reserviert.",
    englishSentence: "Almost all the seats are reserved, but nobody has reserved this seat.",
    category: "Quantity & Proportion",
    level: "A1–A2"
  },
  {
    id: 19,
    expression: "fast nichts",
    english: "Almost nothing",
    opposite: "sehr viel",
    oppositeEnglish: "A lot",
    pairLabel: "fast nichts ↔ sehr viel",
    germanSentence: "Heute habe ich fast nichts gegessen, aber gestern habe ich sehr viel gegessen.",
    englishSentence: "I ate almost nothing today, but yesterday I ate a lot.",
    category: "Quantity & Proportion",
    level: "A1–A2"
  },
  {
    id: 20,
    expression: "kaum",
    english: "Hardly / Barely",
    opposite: "deutlich",
    oppositeEnglish: "Clearly",
    pairLabel: "kaum ↔ deutlich",
    germanSentence: "Ich kann dich wegen des Lärms kaum hören.",
    englishSentence: "I can hardly hear you because of the noise.",
    category: "Degree & Intensity",
    level: "A2"
  },
  {
    id: 21,
    expression: "fast nie",
    english: "Hardly ever",
    opposite: "oft",
    oppositeEnglish: "Often",
    pairLabel: "fast nie ↔ oft",
    germanSentence: "Wir gehen fast nie ins Kino, aber unsere Freunde gehen oft dorthin.",
    englishSentence: "We hardly ever go to the cinema, but our friends go there often.",
    category: "Frequency & Degree",
    level: "A1–A2"
  },
  {
    id: 22,
    expression: "gerade noch",
    english: "Just barely",
    opposite: "überhaupt nicht mehr",
    oppositeEnglish: "No longer at all",
    pairLabel: "gerade noch ↔ überhaupt nicht mehr",
    germanSentence: "Wir haben den letzten Bus gerade noch erreicht.",
    englishSentence: "We only just caught the last bus.",
    category: "Limitation & Margins",
    level: "A2–B1"
  },
  {
    id: 23,
    expression: "mehr oder weniger",
    english: "More or less",
    opposite: "überhaupt nicht",
    oppositeEnglish: "Not at all",
    pairLabel: "mehr oder weniger ↔ überhaupt nicht",
    germanSentence: "Die Arbeit ist mehr oder weniger fertig.",
    englishSentence: "The work is more or less finished.",
    category: "Approximation & Precision",
    level: "A2"
  },
  {
    id: 24,
    expression: "relativ",
    english: "Relatively",
    opposite: "extrem",
    oppositeEnglish: "Extremely",
    pairLabel: "relativ ↔ extrem",
    germanSentence: "Die Aufgabe war relativ einfach, aber die nächste ist extrem schwierig.",
    englishSentence: "The task was relatively easy, but the next one is extremely difficult.",
    category: "Degree & Intensity",
    level: "A2"
  },
  {
    id: 25,
    expression: "etwas zu viel",
    english: "A little too much",
    opposite: "etwas zu wenig",
    oppositeEnglish: "A little too little",
    pairLabel: "etwas zu viel ↔ etwas zu wenig",
    germanSentence: "Ich habe etwas zu viel Kaffee getrunken, aber gestern habe ich etwas zu wenig getrunken.",
    englishSentence: "I drank a little too much coffee, but yesterday I drank a little too little.",
    category: "Degree & Excess",
    level: "A2"
  },
  {
    id: 26,
    expression: "nur",
    english: "Only / Just",
    opposite: "auch",
    oppositeEnglish: "Also",
    pairLabel: "nur ↔ auch",
    germanSentence: "Ich brauche nur fünf Minuten, aber mein Freund braucht auch zehn Minuten.",
    englishSentence: "I only need five minutes, but my friend also needs ten minutes.",
    category: "Limitation & Focus",
    level: "A1"
  },
  {
    id: 27,
    expression: "erst",
    english: "First / Only (not until)",
    opposite: "schon",
    oppositeEnglish: "Already",
    pairLabel: "erst ↔ schon",
    germanSentence: "Der Film beginnt erst um neun, aber das Konzert beginnt schon um sieben.",
    englishSentence: "The film doesn't start until nine, but the concert starts already at seven.",
    category: "Time & Expectation",
    level: "A1–A2"
  },
  {
    id: 28,
    expression: "mindestens",
    english: "At least (minimum)",
    opposite: "höchstens",
    oppositeEnglish: "At most",
    pairLabel: "mindestens ↔ höchstens",
    germanSentence: "Du brauchst mindestens eine Stunde, aber ich brauche höchstens dreißig Minuten.",
    englishSentence: "You need at least an hour, but I need at most thirty minutes.",
    category: "Limits & Boundaries",
    level: "A2"
  },
  {
    id: 29,
    expression: "wenigstens",
    english: "At least (concession)",
    opposite: "zumindest",
    oppositeEnglish: "At least",
    pairLabel: "wenigstens ↔ zumindest",
    germanSentence: "Wenigstens ist der Regen jetzt vorbei.",
    englishSentence: "At least the rain has stopped now.",
    category: "Limits & Boundaries",
    level: "A2–B1"
  },
  {
    id: 30,
    expression: "höchstens",
    english: "At most",
    opposite: "mindestens",
    oppositeEnglish: "At least",
    pairLabel: "höchstens ↔ mindestens",
    germanSentence: "Die Fahrt dauert höchstens eine halbe Stunde.",
    englishSentence: "The journey takes half an hour at most.",
    category: "Limits & Boundaries",
    level: "A2"
  },
  {
    id: 31,
    expression: "viel",
    english: "A lot / Much",
    opposite: "wenig",
    oppositeEnglish: "Little",
    pairLabel: "viel ↔ wenig",
    germanSentence: "Heute habe ich viel zu tun, aber morgen habe ich wenig zu tun.",
    englishSentence: "I have a lot to do today, but tomorrow I have little to do.",
    category: "Quantity & Proportion",
    level: "A1"
  },
  {
    id: 32,
    expression: "viele",
    english: "Many",
    opposite: "wenige",
    oppositeEnglish: "Few",
    pairLabel: "viele ↔ wenige",
    germanSentence: "Viele Leute fahren mit dem Fahrrad, aber wenige fahren mit dem Bus.",
    englishSentence: "Many people cycle, but few travel by bus.",
    category: "Quantity & Proportion",
    level: "A1"
  },
  {
    id: 33,
    expression: "ein bisschen",
    english: "A little / A bit",
    opposite: "viel",
    oppositeEnglish: "A lot",
    pairLabel: "ein bisschen ↔ viel",
    germanSentence: "Kannst du bitte ein bisschen langsamer sprechen?",
    englishSentence: "Could you please speak a little more slowly?",
    category: "Quantity & Proportion",
    level: "A1"
  },
  {
    id: 34,
    expression: "ein paar",
    english: "A few",
    opposite: "keine",
    oppositeEnglish: "None",
    pairLabel: "ein paar ↔ keine",
    germanSentence: "Ich habe noch ein paar Fragen, aber mein Freund hat keine Fragen.",
    englishSentence: "I have a few more questions, but my friend has no questions.",
    category: "Quantity & Proportion",
    level: "A1"
  },
  {
    id: 35,
    expression: "zu viel",
    english: "Too much",
    opposite: "zu wenig",
    oppositeEnglish: "Too little",
    pairLabel: "zu viel ↔ zu wenig",
    germanSentence: "Du solltest nicht zu viel arbeiten, aber auch nicht zu wenig lernen.",
    englishSentence: "You should not work too much, but also not study too little.",
    category: "Degree & Excess",
    level: "A1–A2"
  },
  {
    id: 36,
    expression: "zu viele",
    english: "Too many",
    opposite: "zu wenige",
    oppositeEnglish: "Too few",
    pairLabel: "zu viele ↔ zu wenige",
    germanSentence: "Zu viele Autos stehen im Stau, aber es gibt zu wenige Busse.",
    englishSentence: "Too many cars are stuck in traffic, but there are too few buses.",
    category: "Degree & Excess",
    level: "A1–A2"
  },
  {
    id: 37,
    expression: "mehrere",
    english: "Several",
    opposite: "wenige",
    oppositeEnglish: "Few",
    pairLabel: "mehrere ↔ wenige",
    germanSentence: "Ich habe mehrere Angebote verglichen, aber nur wenige waren interessant.",
    englishSentence: "I compared several offers, but only a few were interesting.",
    category: "Quantity & Proportion",
    level: "A2"
  },
  {
    id: 38,
    expression: "beide",
    english: "Both",
    opposite: "keiner von beiden",
    oppositeEnglish: "Neither",
    pairLabel: "beide ↔ keiner von beiden",
    germanSentence: "Beide Vorschläge klingen gut, aber keiner von beiden ist perfekt.",
    englishSentence: "Both suggestions sound good, but neither is perfect.",
    category: "Quantity & Duality",
    level: "A1–A2"
  },
  {
    id: 39,
    expression: "keiner von beiden",
    english: "Neither of the two",
    opposite: "beide",
    oppositeEnglish: "Both",
    pairLabel: "keiner von beiden ↔ beide",
    germanSentence: "Keiner von beiden passt heute, aber beide passen morgen.",
    englishSentence: "Neither of the two works today, but both work tomorrow.",
    category: "Quantity & Duality",
    level: "A2"
  },
  {
    id: 40,
    expression: "rund",
    english: "About / Roughly",
    opposite: "genau",
    oppositeEnglish: "Exactly",
    pairLabel: "rund ↔ genau",
    germanSentence: "Die Stadt hat rund 50.000 Einwohner.",
    englishSentence: "The town has about 50,000 residents.",
    category: "Approximation & Precision",
    level: "A2"
  }
];

const uniqueDegreeCats = Array.from(
  new Set(DEGREE_AMOUNT_LIST.map((item) => item.category))
) as string[];

export const DEGREE_AMOUNT_CATEGORIES = [
  `All (${DEGREE_AMOUNT_LIST.length})`,
  ...uniqueDegreeCats.sort()
];
