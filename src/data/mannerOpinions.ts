export interface MannerOpinionItem {
  id: number;
  expression: string;
  english: string;
  germanSentence: string;
  englishSentence: string;
  category: string; // "Manner (Wie?)", "Emphasis & Focus", "Expressing Opinions", "Probability & Certainty", "Reactions", "Conversation Phrases"
  section: string;
  level: string;
}

export const MANNER_OPINIONS_LIST: MannerOpinionItem[] = [
  // 5.1 Manner – Wie macht man etwas?
  {
    id: 1,
    expression: "irgendwie",
    english: "somehow",
    germanSentence: "Irgendwie schaffen wir es, pünktlich anzukommen.",
    englishSentence: "Somehow, we will manage to arrive on time.",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "A2"
  },
  {
    id: 2,
    expression: "jedenfalls",
    english: "anyway; in any case",
    germanSentence: "Jedenfalls müssen wir die Aufgabe heute erledigen.",
    englishSentence: "In any case, we have to complete the task today.",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "A2–B1"
  },
  {
    id: 3,
    expression: "sowieso",
    english: "anyway; regardless",
    germanSentence: "Ich muss sowieso noch einkaufen.",
    englishSentence: "I have to go shopping anyway.",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "A2"
  },
  {
    id: 4,
    expression: "auf diese Weise",
    english: "in this way",
    germanSentence: "Auf diese Weise sparst du viel Zeit.",
    englishSentence: "In this way, you save a lot of time.",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "A2–B1"
  },
  {
    id: 5,
    expression: "versehentlich",
    english: "by mistake; accidentally",
    germanSentence: "Ich habe die falsche Datei versehentlich gelöscht.",
    englishSentence: "I accidentally deleted the wrong file.",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "B1"
  },
  {
    id: 6,
    expression: "absichtlich",
    english: "deliberately; intentionally",
    germanSentence: "Hast du das absichtlich gesagt?",
    englishSentence: "Did you say that intentionally?",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "B1"
  },
  {
    id: 7,
    expression: "heimlich",
    english: "secretly",
    germanSentence: "Die Kinder haben heimlich ein Stück Kuchen genommen.",
    englishSentence: "The children secretly took a piece of cake.",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "A2–B1"
  },
  {
    id: 8,
    expression: "sorgfältig",
    english: "carefully; thoroughly",
    germanSentence: "Bitte füll das Formular sorgfältig aus.",
    englishSentence: "Please fill out the form carefully.",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "B1"
  },
  {
    id: 9,
    expression: "selbstständig",
    english: "independently; on one's own",
    germanSentence: "Sie kann die Aufgabe selbstständig erledigen.",
    englishSentence: "She can complete the task independently.",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "B1"
  },
  {
    id: 10,
    expression: "offen",
    english: "openly",
    germanSentence: "Wir sollten offen über das Problem sprechen.",
    englishSentence: "We should speak openly about the problem.",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "A2"
  },
  {
    id: 11,
    expression: "öffentlich",
    english: "publicly",
    germanSentence: "Wir sollten persönliche Daten nicht öffentlich teilen.",
    englishSentence: "We shouldn't share personal data publicly.",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "B1"
  },
  {
    id: 12,
    expression: "privat",
    english: "privately",
    germanSentence: "Wir haben uns privat kennengelernt.",
    englishSentence: "We met privately.",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "A2"
  },
  {
    id: 13,
    expression: "direkt",
    english: "directly",
    germanSentence: "Du kannst mich direkt anrufen.",
    englishSentence: "You can call me directly.",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "A1–A2"
  },
  {
    id: 14,
    expression: "Schritt für Schritt",
    english: "step by step",
    germanSentence: "Schritt für Schritt verbessere ich mein Deutsch.",
    englishSentence: "Step by step, I am improving my German.",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "A2"
  },
  {
    id: 15,
    expression: "problemlos",
    english: "easily; without difficulty",
    germanSentence: "Die Anmeldung funktioniert problemlos.",
    englishSentence: "Registration works without any problems.",
    category: "Manner (Wie?)",
    section: "5.1 Manner",
    level: "A2–B1"
  },

  // 5.2 Emphasis and focus — Betonung und Hervorhebung
  {
    id: 16,
    expression: "vor allem",
    english: "especially; above all",
    germanSentence: "Ich mag vor allem deutsche Filme.",
    englishSentence: "I especially like German films.",
    category: "Emphasis & Focus",
    section: "5.2 Emphasis & Focus",
    level: "A2–B1"
  },
  {
    id: 17,
    expression: "hauptsächlich",
    english: "mainly",
    germanSentence: "Ich lerne hauptsächlich am Abend.",
    englishSentence: "I mainly study in the evening.",
    category: "Emphasis & Focus",
    section: "5.2 Emphasis & Focus",
    level: "B1"
  },
  {
    id: 18,
    expression: "insbesondere",
    english: "particularly",
    germanSentence: "Insbesondere junge Menschen nutzen soziale Medien.",
    englishSentence: "Young people in particular use social media.",
    category: "Emphasis & Focus",
    section: "5.2 Emphasis & Focus",
    level: "B1–B2"
  },
  {
    id: 19,
    expression: "persönlich",
    english: "personally",
    germanSentence: "Persönlich finde ich diese Idee gut.",
    englishSentence: "Personally, I think this idea is good.",
    category: "Emphasis & Focus",
    section: "5.2 Emphasis & Focus",
    level: "A2–B1"
  },
  {
    id: 20,
    expression: "allgemein",
    english: "in general",
    germanSentence: "Allgemein finde ich das Leben in dieser Stadt angenehm.",
    englishSentence: "In general, I find life in this city pleasant.",
    category: "Emphasis & Focus",
    section: "5.2 Emphasis & Focus",
    level: "B1"
  },
  {
    id: 21,
    expression: "tatsächlich",
    english: "actually; in fact",
    germanSentence: "Tatsächlich war die Reise günstiger als gedacht.",
    englishSentence: "In fact, the trip was cheaper than expected.",
    category: "Emphasis & Focus",
    section: "5.2 Emphasis & Focus",
    level: "B1"
  },
  {
    id: 22,
    expression: "in der Tat",
    english: "in fact; indeed",
    germanSentence: "In der Tat ist das eine schwierige Frage.",
    englishSentence: "Indeed, that is a difficult question.",
    category: "Emphasis & Focus",
    section: "5.2 Emphasis & Focus",
    level: "B1–B2"
  },
  {
    id: 23,
    expression: "überhaupt nicht",
    english: "not at all",
    germanSentence: "Das gefällt mir überhaupt nicht.",
    englishSentence: "I don't like that at all.",
    category: "Emphasis & Focus",
    section: "5.2 Emphasis & Focus",
    level: "A2"
  },

  // 5.3 Expressing opinions — Meinungen ausdrücken
  {
    id: 24,
    expression: "meiner Meinung nach",
    english: "in my opinion",
    germanSentence: "Meiner Meinung nach ist Online-Shopping praktisch.",
    englishSentence: "In my opinion, online shopping is convenient.",
    category: "Expressing Opinions",
    section: "5.3 Meinungen ausdrücken",
    level: "A2–B1"
  },
  {
    id: 25,
    expression: "aus meiner Sicht",
    english: "from my point of view",
    germanSentence: "Aus meiner Sicht ist diese Entscheidung richtig.",
    englishSentence: "From my point of view, this decision is correct.",
    category: "Expressing Opinions",
    section: "5.3 Meinungen ausdrücken",
    level: "B1"
  },
  {
    id: 26,
    expression: "ich denke",
    english: "I think",
    germanSentence: "Ich denke, dass wir mehr Zeit brauchen.",
    englishSentence: "I think that we need more time.",
    category: "Expressing Opinions",
    section: "5.3 Meinungen ausdrücken",
    level: "A1–A2"
  },
  {
    id: 27,
    expression: "ich habe das Gefühl",
    english: "I feel; I have the impression",
    germanSentence: "Ich habe das Gefühl, dass etwas nicht stimmt.",
    englishSentence: "I have the feeling that something is wrong.",
    category: "Expressing Opinions",
    section: "5.3 Meinungen ausdrücken",
    level: "A2–B1"
  },
  {
    id: 28,
    expression: "ich bin überzeugt",
    english: "I am convinced",
    germanSentence: "Ich bin überzeugt, dass regelmäßiges Üben hilft.",
    englishSentence: "I am convinced that regular practice helps.",
    category: "Expressing Opinions",
    section: "5.3 Meinungen ausdrücken",
    level: "B1"
  },
  {
    id: 29,
    expression: "ich bevorzuge",
    english: "I prefer",
    germanSentence: "Ich bevorzuge öffentliche Verkehrsmittel.",
    englishSentence: "I prefer public transport.",
    category: "Expressing Opinions",
    section: "5.3 Meinungen ausdrücken",
    level: "B1"
  },
  {
    id: 30,
    expression: "ich würde lieber",
    english: "I would rather",
    germanSentence: "Ich würde lieber zu Hause bleiben.",
    englishSentence: "I would rather stay at home.",
    category: "Expressing Opinions",
    section: "5.3 Meinungen ausdrücken",
    level: "A2"
  },
  {
    id: 31,
    expression: "es macht mir nichts aus",
    english: "I don't mind",
    germanSentence: "Es macht mir nichts aus, früh aufzustehen.",
    englishSentence: "I don't mind getting up early.",
    category: "Expressing Opinions",
    section: "5.3 Meinungen ausdrücken",
    level: "B1"
  },
  {
    id: 32,
    expression: "es ist mir egal",
    english: "I don't care / it's all the same to me",
    germanSentence: "Es ist mir egal, welchen Film wir sehen.",
    englishSentence: "I don't care which film we watch.",
    category: "Expressing Opinions",
    section: "5.3 Meinungen ausdrücken",
    level: "A2"
  },

  // 5.5 Certainty, possibility and probability
  {
    id: 33,
    expression: "sicherlich",
    english: "certainly",
    germanSentence: "Das ist sicherlich eine gute Idee.",
    englishSentence: "That is certainly a good idea.",
    category: "Probability & Certainty",
    section: "5.5 Sicherheit & Wahrscheinlichkeit",
    level: "A2–B1"
  },
  {
    id: 34,
    expression: "wahrscheinlich",
    english: "probably",
    germanSentence: "Er kommt wahrscheinlich morgen.",
    englishSentence: "He will probably come tomorrow.",
    category: "Probability & Certainty",
    section: "5.5 Sicherheit & Wahrscheinlichkeit",
    level: "A2"
  },
  {
    id: 35,
    expression: "unwahrscheinlich",
    english: "unlikely",
    germanSentence: "Es ist unwahrscheinlich, dass es heute schneit.",
    englishSentence: "It is unlikely to snow today.",
    category: "Probability & Certainty",
    section: "5.5 Sicherheit & Wahrscheinlichkeit",
    level: "B1"
  },
  {
    id: 36,
    expression: "möglicherweise",
    english: "possibly",
    germanSentence: "Möglicherweise müssen wir den Termin verschieben.",
    englishSentence: "We may have to reschedule the appointment.",
    category: "Probability & Certainty",
    section: "5.5 Sicherheit & Wahrscheinlichkeit",
    level: "B1"
  },
  {
    id: 37,
    expression: "anscheinend",
    english: "apparently",
    germanSentence: "Anscheinend ist der Zug verspätet.",
    englishSentence: "Apparently, the train is delayed.",
    category: "Probability & Certainty",
    section: "5.5 Sicherheit & Wahrscheinlichkeit",
    level: "B1"
  },
  {
    id: 38,
    expression: "offensichtlich",
    english: "obviously",
    germanSentence: "Offensichtlich hat er das Problem nicht verstanden.",
    englishSentence: "Obviously, he hasn't understood the problem.",
    category: "Probability & Certainty",
    section: "5.5 Sicherheit & Wahrscheinlichkeit",
    level: "B1"
  },
  {
    id: 39,
    expression: "selbstverständlich",
    english: "of course; certainly (formal)",
    germanSentence: "Selbstverständlich können Sie mit Karte bezahlen.",
    englishSentence: "Of course, you can pay by card.",
    category: "Probability & Certainty",
    section: "5.5 Sicherheit & Wahrscheinlichkeit",
    level: "A2–B1"
  },

  // 5.6 Positive and negative reactions
  {
    id: 40,
    expression: "glücklicherweise",
    english: "fortunately",
    germanSentence: "Glücklicherweise haben wir den Bus noch erreicht.",
    englishSentence: "Fortunately, we still caught the bus.",
    category: "Reactions",
    section: "5.6 Positive & Negative Reaktionen",
    level: "A2–B1"
  },
  {
    id: 41,
    expression: "zum Glück",
    english: "fortunately; luckily",
    germanSentence: "Zum Glück hatte ich einen Regenschirm dabei.",
    englishSentence: "Luckily, I had an umbrella with me.",
    category: "Reactions",
    section: "5.6 Positive & Negative Reaktionen",
    level: "A1–A2"
  },
  {
    id: 42,
    expression: "leider",
    english: "unfortunately",
    germanSentence: "Leider kann ich heute nicht kommen.",
    englishSentence: "Unfortunately, I cannot come today.",
    category: "Reactions",
    section: "5.6 Positive & Negative Reaktionen",
    level: "A1"
  },
  {
    id: 43,
    expression: "überraschenderweise",
    english: "surprisingly",
    germanSentence: "Überraschenderweise war das Essen sehr günstig.",
    englishSentence: "Surprisingly, the food was very inexpensive.",
    category: "Reactions",
    section: "5.6 Positive & Negative Reaktionen",
    level: "B1"
  },
  {
    id: 44,
    expression: "ehrlich gesagt",
    english: "honestly; to be honest",
    germanSentence: "Ehrlich gesagt gefällt mir diese Idee nicht.",
    englishSentence: "Honestly, I don't like this idea.",
    category: "Reactions",
    section: "5.6 Positive & Negative Reaktionen",
    level: "A2–B1"
  },

  // 5.7 Useful conversation expressions
  {
    id: 45,
    expression: "übrigens",
    english: "by the way",
    germanSentence: "Übrigens, ich habe deine Nachricht gelesen.",
    englishSentence: "By the way, I read your message.",
    category: "Conversation Phrases",
    section: "5.7 Nützliche Gesprächsausdrücke",
    level: "A2"
  },
  {
    id: 46,
    expression: "zum Beispiel",
    english: "for example",
    germanSentence: "Ich mache gern Sport, zum Beispiel Schwimmen.",
    englishSentence: "I like sports, for example swimming.",
    category: "Conversation Phrases",
    section: "5.7 Nützliche Gesprächsausdrücke",
    level: "A1"
  },
  {
    id: 47,
    expression: "das heißt",
    english: "that means",
    germanSentence: "Der Zug hat Verspätung. Das heißt, wir müssen warten.",
    englishSentence: "The train is delayed. That means we have to wait.",
    category: "Conversation Phrases",
    section: "5.7 Nützliche Gesprächsausdrücke",
    level: "A2"
  },
  {
    id: 48,
    expression: "mit anderen Worten",
    english: "in other words",
    germanSentence: "Mit anderen Worten brauchen wir mehr Zeit.",
    englishSentence: "In other words, we need more time.",
    category: "Conversation Phrases",
    section: "5.7 Nützliche Gesprächsausdrücke",
    level: "B1"
  },
  {
    id: 49,
    expression: "soweit ich weiß",
    english: "as far as I know",
    germanSentence: "Soweit ich weiß, ist das Geschäft heute geschlossen.",
    englishSentence: "As far as I know, the shop is closed today.",
    category: "Conversation Phrases",
    section: "5.7 Nützliche Gesprächsausdrücke",
    level: "B1"
  },
  {
    id: 50,
    expression: "egal was",
    english: "no matter what",
    germanSentence: "Egal was passiert, wir bleiben zusammen.",
    englishSentence: "No matter what happens, we stay together.",
    category: "Conversation Phrases",
    section: "5.7 Nützliche Gesprächsausdrücke",
    level: "A2"
  },
  {
    id: 51,
    expression: "das kommt darauf an",
    english: "it depends",
    germanSentence: "Das kommt darauf an, wie viel Zeit wir haben.",
    englishSentence: "It depends on how much time we have.",
    category: "Conversation Phrases",
    section: "5.7 Nützliche Gesprächsausdrücke",
    level: "A2–B1"
  },
  {
    id: 52,
    expression: "auf jeden Fall",
    english: "in any case; definitely",
    germanSentence: "Ich werde auf jeden Fall kommen.",
    englishSentence: "I will definitely come.",
    category: "Conversation Phrases",
    section: "5.7 Nützliche Gesprächsausdrücke",
    level: "A2"
  },
  {
    id: 53,
    expression: "auf keinen Fall",
    english: "under no circumstances",
    germanSentence: "Das würde ich auf keinen Fall machen.",
    englishSentence: "I would never do that under any circumstances.",
    category: "Conversation Phrases",
    section: "5.7 Nützliche Gesprächsausdrücke",
    level: "A2"
  }
];

const uniqueMannerCats = Array.from(
  new Set(MANNER_OPINIONS_LIST.map((item) => item.category))
) as string[];

export const MANNER_OPINIONS_CATEGORIES = [
  `All (${MANNER_OPINIONS_LIST.length})`,
  ...uniqueMannerCats.sort()
];
