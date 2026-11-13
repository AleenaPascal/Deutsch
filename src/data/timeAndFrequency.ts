export interface TimeFrequencyItem {
  id: number;
  expression: string;
  english: string;
  oppositeOrContrast?: string;
  germanSentence: string;
  englishSentence: string;
  category: string; // e.g. "Regular Intervals", "Frequency & How Often", "Past, Present & Future", "Sequence & Order", "Useful Expressions"
  section: string;   // e.g. "3.1", "3.2", "3.3", "3.4", "3.5"
  level: string;
}

export const TIME_FREQUENCY_LIST: TimeFrequencyItem[] = [
  // 3.1 Daily, weekly, monthly and yearly — Regelmäßige Zeitangaben
  {
    id: 1,
    expression: "jeden Tag",
    english: "every day",
    germanSentence: "Ich lerne jeden Tag Deutsch.",
    englishSentence: "I learn German every day.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A1"
  },
  {
    id: 2,
    expression: "täglich",
    english: "daily",
    germanSentence: "Ich gehe täglich spazieren.",
    englishSentence: "I go for a walk daily.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A1–A2"
  },
  {
    id: 3,
    expression: "alltäglich",
    english: "everyday; ordinary",
    germanSentence: "Das ist ein alltägliches Problem.",
    englishSentence: "That is an everyday problem.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A2–B1"
  },
  {
    id: 4,
    expression: "jeden Morgen",
    english: "every morning",
    germanSentence: "Jeden Morgen trinke ich ein Glas Wasser.",
    englishSentence: "Every morning I drink a glass of water.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A1"
  },
  {
    id: 5,
    expression: "jeden Nachmittag",
    english: "every afternoon",
    germanSentence: "Jeden Nachmittag mache ich einen Spaziergang.",
    englishSentence: "Every afternoon I go for a walk.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A1"
  },
  {
    id: 6,
    expression: "jeden Abend",
    english: "every evening",
    germanSentence: "Sie liest jeden Abend ein Buch.",
    englishSentence: "She reads a book every evening.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A1"
  },
  {
    id: 7,
    expression: "jede Nacht",
    english: "every night",
    germanSentence: "Das Baby wacht jede Nacht auf.",
    englishSentence: "The baby wakes up every night.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A1"
  },
  {
    id: 8,
    expression: "jedes Wochenende",
    english: "every weekend",
    germanSentence: "Jedes Wochenende besuche ich meine Eltern.",
    englishSentence: "I visit my parents every weekend.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A1"
  },
  {
    id: 9,
    expression: "jede Woche",
    english: "every week",
    germanSentence: "Wir telefonieren jede Woche.",
    englishSentence: "We talk on the phone every week.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A1"
  },
  {
    id: 10,
    expression: "wöchentlich",
    english: "weekly",
    germanSentence: "Wir treffen uns wöchentlich.",
    englishSentence: "We meet weekly.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A2"
  },
  {
    id: 11,
    expression: "jeden Monat",
    english: "every month",
    germanSentence: "Ich bezahle die Rechnung jeden Monat.",
    englishSentence: "I pay the bill every month.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A1"
  },
  {
    id: 12,
    expression: "monatlich",
    english: "monthly",
    germanSentence: "Ich bekomme mein Gehalt monatlich.",
    englishSentence: "I receive my salary monthly.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A2"
  },
  {
    id: 13,
    expression: "jedes Jahr",
    english: "every year",
    germanSentence: "Wir besuchen jedes Jahr unsere Freunde.",
    englishSentence: "We visit our friends every year.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A1"
  },
  {
    id: 14,
    expression: "jährlich",
    english: "yearly; annually",
    germanSentence: "Die Veranstaltung findet jährlich statt.",
    englishSentence: "The event takes place annually.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A2–B1"
  },
  {
    id: 15,
    expression: "jeden zweiten Tag",
    english: "every other day",
    germanSentence: "Ich gehe jeden zweiten Tag spazieren.",
    englishSentence: "I go for a walk every other day.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A2"
  },
  {
    id: 16,
    expression: "unter der Woche",
    english: "on weekdays",
    germanSentence: "Unter der Woche stehe ich früh auf.",
    englishSentence: "I get up early on weekdays.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A2"
  },
  {
    id: 17,
    expression: "am Wochenende",
    english: "at the weekend",
    germanSentence: "Am Wochenende schlafe ich länger.",
    englishSentence: "At the weekend, I sleep longer.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A1"
  },
  {
    id: 18,
    expression: "während der Woche",
    english: "during the week",
    germanSentence: "Während der Woche habe ich wenig Freizeit.",
    englishSentence: "During the week, I have little free time.",
    category: "Regular Intervals",
    section: "3.1 Daily, Weekly & Yearly",
    level: "A2"
  },

  // 3.2 Frequency — Wie oft?
  {
    id: 19,
    expression: "immer",
    english: "always",
    oppositeOrContrast: "nie (never)",
    germanSentence: "Er kommt immer pünktlich.",
    englishSentence: "He is always on time.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A1"
  },
  {
    id: 20,
    expression: "normalerweise",
    english: "usually",
    oppositeOrContrast: "selten (seldom)",
    germanSentence: "Normalerweise fahre ich mit dem Bus.",
    englishSentence: "I usually travel by bus.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A1–A2"
  },
  {
    id: 21,
    expression: "gewöhnlich",
    english: "generally; usually",
    oppositeOrContrast: "ungewöhnlich",
    germanSentence: "Gewöhnlich esse ich um sieben Uhr zu Abend.",
    englishSentence: "I usually have dinner at seven.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A2"
  },
  {
    id: 22,
    expression: "meistens",
    english: "mostly; most of the time",
    oppositeOrContrast: "selten",
    germanSentence: "Meistens koche ich selbst.",
    englishSentence: "Most of the time, I cook for myself.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A1–A2"
  },
  {
    id: 23,
    expression: "oft",
    english: "often",
    oppositeOrContrast: "selten",
    germanSentence: "Ich gehe oft nach der Arbeit spazieren.",
    englishSentence: "I often go for a walk after work.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A1"
  },
  {
    id: 24,
    expression: "häufig",
    english: "frequently",
    oppositeOrContrast: "selten",
    germanSentence: "Im Sommer regnet es hier häufig.",
    englishSentence: "It rains frequently here in summer.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A2"
  },
  {
    id: 25,
    expression: "manchmal",
    english: "sometimes",
    oppositeOrContrast: "nie",
    germanSentence: "Manchmal arbeite ich von zu Hause.",
    englishSentence: "Sometimes I work from home.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A1"
  },
  {
    id: 26,
    expression: "gelegentlich",
    english: "occasionally",
    oppositeOrContrast: "regelmäßig",
    germanSentence: "Gelegentlich essen wir in diesem Restaurant.",
    englishSentence: "We occasionally eat at this restaurant.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A2–B1"
  },
  {
    id: 27,
    expression: "ab und zu",
    english: "from time to time",
    oppositeOrContrast: "ständig",
    germanSentence: "Ab und zu sehe ich mir einen Film an.",
    englishSentence: "From time to time, I watch a film.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A2"
  },
  {
    id: 28,
    expression: "selten",
    english: "rarely / seldom",
    oppositeOrContrast: "oft",
    germanSentence: "Sie trinkt selten Kaffee.",
    englishSentence: "She rarely drinks coffee.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A1–A2"
  },
  {
    id: 29,
    expression: "kaum jemals",
    english: "hardly ever",
    oppositeOrContrast: "häufig",
    germanSentence: "Ich sehe kaum jemals fern.",
    englishSentence: "I hardly ever watch television.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A2"
  },
  {
    id: 30,
    expression: "fast nie",
    english: "hardly ever; almost never",
    oppositeOrContrast: "oft",
    germanSentence: "Wir gehen fast nie ins Kino.",
    englishSentence: "We hardly ever go to the cinema.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A1–A2"
  },
  {
    id: 31,
    expression: "nie",
    english: "never",
    oppositeOrContrast: "immer",
    germanSentence: "Ich esse nie spät am Abend.",
    englishSentence: "I never eat late in the evening.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A1"
  },
  {
    id: 32,
    expression: "niemals",
    english: "never (stronger)",
    oppositeOrContrast: "immer",
    germanSentence: "Ich werde das niemals vergessen.",
    englishSentence: "I will never forget that.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A2"
  },
  {
    id: 33,
    expression: "regelmäßig",
    english: "regularly",
    oppositeOrContrast: "unregelmäßig",
    germanSentence: "Wir treiben regelmäßig Sport.",
    englishSentence: "We exercise regularly.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A2"
  },
  {
    id: 34,
    expression: "unregelmäßig",
    english: "irregularly",
    oppositeOrContrast: "regelmäßig",
    germanSentence: "Die Busse fahren abends unregelmäßig.",
    englishSentence: "The buses run irregularly in the evening.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A2"
  },
  {
    id: 35,
    expression: "jedes Mal",
    english: "every time",
    oppositeOrContrast: "manchmal",
    germanSentence: "Jedes Mal, wenn ich anrufe, ist sie beschäftigt.",
    englishSentence: "Every time I call, she is busy.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A2"
  },
  {
    id: 36,
    expression: "den ganzen Tag",
    english: "all day long",
    oppositeOrContrast: "nur kurz",
    germanSentence: "Es hat den ganzen Tag geregnet.",
    englishSentence: "It rained all day long.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A1–A2"
  },
  {
    id: 37,
    expression: "jeden einzelnen Tag",
    english: "every single day",
    oppositeOrContrast: "nur gelegentlich",
    germanSentence: "Sie trainiert jeden einzelnen Tag.",
    englishSentence: "She trains every single day.",
    category: "Frequency & How Often",
    section: "3.2 Frequency Scale",
    level: "A2"
  },

  // 3.3 Past, present and future — Vergangenheit, Gegenwart und Zukunft
  {
    id: 38,
    expression: "in der Vergangenheit",
    english: "in the past",
    germanSentence: "In der Vergangenheit war das Leben anders.",
    englishSentence: "Life was different in the past.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "A2"
  },
  {
    id: 39,
    expression: "früher",
    english: "formerly; earlier",
    germanSentence: "Früher habe ich viel Fußball gespielt.",
    englishSentence: "I used to play a lot of football.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "A1–A2"
  },
  {
    id: 40,
    expression: "heutzutage",
    english: "nowadays",
    germanSentence: "Heutzutage benutzen viele Menschen Smartphones.",
    englishSentence: "Nowadays, many people use smartphones.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "A2–B1"
  },
  {
    id: 41,
    expression: "momentan",
    english: "currently; at present",
    germanSentence: "Momentan suche ich eine neue Wohnung.",
    englishSentence: "I am currently looking for a new apartment.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "A2"
  },
  {
    id: 42,
    expression: "derzeit",
    english: "currently (more formal)",
    germanSentence: "Derzeit lerne ich Deutsch.",
    englishSentence: "I am currently learning German.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "B1"
  },
  {
    id: 43,
    expression: "zurzeit",
    english: "at present; currently",
    germanSentence: "Zurzeit habe ich viel zu tun.",
    englishSentence: "At present, I have a lot to do.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "A2"
  },
  {
    id: 44,
    expression: "jetzt",
    english: "now",
    germanSentence: "Jetzt muss ich nach Hause gehen.",
    englishSentence: "Now I have to go home.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "A1"
  },
  {
    id: 45,
    expression: "gerade jetzt",
    english: "right now; at this very moment",
    germanSentence: "Gerade jetzt habe ich keine Zeit.",
    englishSentence: "Right now, I have no time.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "A1–A2"
  },
  {
    id: 46,
    expression: "in Zukunft",
    english: "in the future",
    germanSentence: "In Zukunft möchte ich mehr reisen.",
    englishSentence: "In the future, I would like to travel more.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "A2"
  },
  {
    id: 47,
    expression: "bald",
    english: "soon",
    germanSentence: "Der Bus kommt bald.",
    englishSentence: "The bus will arrive soon.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "A1"
  },
  {
    id: 48,
    expression: "später",
    english: "later",
    germanSentence: "Wir können später darüber sprechen.",
    englishSentence: "We can talk about it later.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "A1"
  },
  {
    id: 49,
    expression: "vor Kurzem",
    english: "recently",
    germanSentence: "Ich habe vor Kurzem ein neues Buch gekauft.",
    englishSentence: "I bought a new book recently.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "A2–B1"
  },
  {
    id: 50,
    expression: "in letzter Zeit",
    english: "lately; recently",
    germanSentence: "In letzter Zeit lerne ich viel Deutsch.",
    englishSentence: "Lately, I have been studying a lot of German.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "A2"
  },
  {
    id: 51,
    expression: "eines Tages",
    english: "one day; someday",
    germanSentence: "Eines Tages möchte ich Deutschland besuchen.",
    englishSentence: "Someday I would like to visit Germany.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "A2"
  },
  {
    id: 52,
    expression: "von jetzt an",
    english: "from now on",
    germanSentence: "Von jetzt an werde ich mehr Deutsch sprechen.",
    englishSentence: "From now on, I will speak more German.",
    category: "Time Horizons",
    section: "3.3 Past, Present & Future",
    level: "A2–B1"
  },

  // 3.4 Sequence and order — Reihenfolge und zeitlicher Ablauf
  {
    id: 53,
    expression: "vorher",
    english: "before",
    germanSentence: "Bitte ruf mich vorher an.",
    englishSentence: "Please call me beforehand.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A2"
  },
  {
    id: 54,
    expression: "im Voraus",
    english: "beforehand; in advance",
    germanSentence: "Vielen Dank im Voraus für Ihre Hilfe.",
    englishSentence: "Thank you in advance for your help.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A2–B1"
  },
  {
    id: 55,
    expression: "danach",
    english: "afterwards; after that",
    germanSentence: "Wir essen und gehen danach ins Kino.",
    englishSentence: "We eat and afterwards go to the cinema.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A1–A2"
  },
  {
    id: 56,
    expression: "anschließend",
    english: "then; afterwards",
    germanSentence: "Zuerst frühstücke ich. Anschließend gehe ich zur Arbeit.",
    englishSentence: "First I have breakfast. Then I go to work.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A2–B1"
  },
  {
    id: 57,
    expression: "zuerst",
    english: "at first; initially",
    germanSentence: "Zuerst möchte ich etwas trinken.",
    englishSentence: "First, I would like something to drink.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A1"
  },
  {
    id: 58,
    expression: "schließlich",
    english: "finally; at last",
    germanSentence: "Schließlich haben wir eine Lösung gefunden.",
    englishSentence: "Finally, we found a solution.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A2–B1"
  },
  {
    id: 59,
    expression: "inzwischen",
    english: "in the meantime",
    germanSentence: "Ich koche. Inzwischen kannst du den Tisch decken.",
    englishSentence: "I am cooking. In the meantime, you can set the table.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A2–B1"
  },
  {
    id: 60,
    expression: "währenddessen",
    english: "meanwhile",
    germanSentence: "Sie lernt. Währenddessen hört ihr Bruder Musik.",
    englishSentence: "She is studying. Meanwhile, her brother is listening to music.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "B1"
  },
  {
    id: 61,
    expression: "gleichzeitig",
    english: "at the same time",
    germanSentence: "Wir können nicht gleichzeitig sprechen.",
    englishSentence: "We cannot speak at the same time.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A2"
  },
  {
    id: 62,
    expression: "sofort",
    english: "immediately",
    germanSentence: "Bitte kommen Sie sofort hierher.",
    englishSentence: "Please come here immediately.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A1"
  },
  {
    id: 63,
    expression: "gleich",
    english: "right away",
    germanSentence: "Ich komme gleich zurück.",
    englishSentence: "I will be right back.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A1–A2"
  },
  {
    id: 64,
    expression: "nachher",
    english: "afterwards; later on",
    germanSentence: "Wir können nachher zusammen essen.",
    englishSentence: "We can eat together later.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A2"
  },
  {
    id: 65,
    expression: "bis dahin",
    english: "until then",
    germanSentence: "Bis dahin muss ich meine Arbeit erledigen.",
    englishSentence: "I have to finish my work by then.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A2"
  },
  {
    id: 66,
    expression: "seitdem",
    english: "since then",
    germanSentence: "Seitdem lerne ich regelmäßig Deutsch.",
    englishSentence: "Since then, I have been studying German regularly.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A2–B1"
  },
  {
    id: 67,
    expression: "am Anfang",
    english: "at the beginning",
    germanSentence: "Am Anfang war Deutsch schwierig für mich.",
    englishSentence: "At the beginning, German was difficult for me.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A1–A2"
  },
  {
    id: 68,
    expression: "am Ende",
    english: "in the end",
    germanSentence: "Am Ende waren alle zufrieden.",
    englishSentence: "In the end, everyone was satisfied.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A1–A2"
  },
  {
    id: 69,
    expression: "im letzten Moment",
    english: "at the last moment",
    germanSentence: "Er kam im letzten Moment an.",
    englishSentence: "He arrived at the last moment.",
    category: "Sequence & Order",
    section: "3.4 Sequence & Order",
    level: "A2"
  },

  // 3.5 Useful time expressions — Weitere Zeitangaben
  {
    id: 70,
    expression: "plötzlich",
    english: "all of a sudden",
    germanSentence: "Plötzlich begann es zu regnen.",
    englishSentence: "Suddenly, it started raining.",
    category: "Useful Time Expressions",
    section: "3.5 Weitere Zeitangaben",
    level: "A2"
  },
  {
    id: 71,
    expression: "auf einmal",
    english: "suddenly; unexpectedly",
    germanSentence: "Auf einmal war das Licht aus.",
    englishSentence: "All of a sudden, the lights went out.",
    category: "Useful Time Expressions",
    section: "3.5 Weitere Zeitangaben",
    level: "A2"
  },
  {
    id: 72,
    expression: "von Zeit zu Zeit",
    english: "from time to time",
    germanSentence: "Von Zeit zu Zeit besuche ich meine Großeltern.",
    englishSentence: "From time to time, I visit my grandparents.",
    category: "Useful Time Expressions",
    section: "3.5 Weitere Zeitangaben",
    level: "A2"
  },
  {
    id: 73,
    expression: "im Moment",
    english: "at the moment",
    germanSentence: "Im Moment bin ich sehr beschäftigt.",
    englishSentence: "At the moment, I am very busy.",
    category: "Useful Time Expressions",
    section: "3.5 Weitere Zeitangaben",
    level: "A1–A2"
  },
  {
    id: 74,
    expression: "vorerst",
    english: "for the time being",
    germanSentence: "Vorerst bleiben wir hier.",
    englishSentence: "For the time being, we will stay here.",
    category: "Useful Time Expressions",
    section: "3.5 Weitere Zeitangaben",
    level: "B1"
  },
  {
    id: 75,
    expression: "von Tag zu Tag",
    english: "day by day",
    germanSentence: "Mein Deutsch wird von Tag zu Tag besser.",
    englishSentence: "My German is getting better day by day.",
    category: "Useful Time Expressions",
    section: "3.5 Weitere Zeitangaben",
    level: "A2"
  },
  {
    id: 76,
    expression: "Jahr für Jahr",
    english: "year after year",
    germanSentence: "Jahr für Jahr kommen mehr Touristen.",
    englishSentence: "More tourists come year after year.",
    category: "Useful Time Expressions",
    section: "3.5 Weitere Zeitangaben",
    level: "A2"
  },
  {
    id: 77,
    expression: "lange Zeit",
    english: "for a long time",
    germanSentence: "Ich habe lange Zeit in Kochi gelebt.",
    englishSentence: "I lived in Kochi for a long time.",
    category: "Useful Time Expressions",
    section: "3.5 Weitere Zeitangaben",
    level: "A2"
  },
  {
    id: 78,
    expression: "zum ersten Mal",
    english: "for the first time",
    germanSentence: "Ich besuche Deutschland zum ersten Mal.",
    englishSentence: "I am visiting Germany for the first time.",
    category: "Useful Time Expressions",
    section: "3.5 Weitere Zeitangaben",
    level: "A1–A2"
  },
  {
    id: 79,
    expression: "zum letzten Mal",
    english: "for the last time",
    germanSentence: "Ich sehe diesen Film zum letzten Mal.",
    englishSentence: "I am watching this film for the last time.",
    category: "Useful Time Expressions",
    section: "3.5 Weitere Zeitangaben",
    level: "A2"
  }
];

const uniqueTimeCats = Array.from(
  new Set(TIME_FREQUENCY_LIST.map((item) => item.category))
) as string[];

export const TIME_FREQUENCY_CATEGORIES = [
  `All (${TIME_FREQUENCY_LIST.length})`,
  ...uniqueTimeCats.sort()
];
