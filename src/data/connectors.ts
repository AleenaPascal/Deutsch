export interface ConnectorItem {
  id: number;
  connector: string;
  english: string;
  wordOrderType: 'Type 1 (Pos 0 - Coordinating)' | 'Type 2 (Verb at end - Subordinating)' | 'Type 3 (Pos 2 - Sentence Adverb)' | 'Type 4 (Two-Part Structure)';
  germanSentence: string;
  englishSentence: string;
  category: string; // "Adding Info", "Giving Reasons", "Consequences & Results", "Contrast & Opposition", "Purpose", "Conditions", "Time & Sequence", "Listing & Concluding", "Two-Part Connectors"
  section: string;
  level: string;
}

export const CONNECTORS_LIST: ConnectorItem[] = [
  // 6.1 Adding information — Informationen hinzufügen
  {
    id: 1,
    connector: "und",
    english: "and",
    wordOrderType: "Type 1 (Pos 0 - Coordinating)",
    germanSentence: "Ich lerne Deutsch und übe jeden Tag.",
    englishSentence: "I learn German and practise every day.",
    category: "Adding Information",
    section: "6.1 Adding Information",
    level: "A1"
  },
  {
    id: 2,
    connector: "zusätzlich",
    english: "additionally",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Zusätzlich bietet die Schule Online-Kurse an.",
    englishSentence: "Additionally, the school offers online courses.",
    category: "Adding Information",
    section: "6.1 Adding Information",
    level: "B1"
  },
  {
    id: 3,
    connector: "außerdem",
    english: "moreover; besides",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Außerdem kann man viel Zeit sparen.",
    englishSentence: "Moreover, you can save a lot of time.",
    category: "Adding Information",
    section: "6.1 Adding Information",
    level: "A2–B1"
  },
  {
    id: 4,
    connector: "darüber hinaus",
    english: "furthermore; beyond that",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Darüber hinaus bietet das Unternehmen flexible Arbeitszeiten.",
    englishSentence: "Furthermore, the company offers flexible working hours.",
    category: "Adding Information",
    section: "6.1 Adding Information",
    level: "B1–B2"
  },
  {
    id: 5,
    connector: "zudem",
    english: "in addition",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Zudem ist die Lage sehr günstig.",
    englishSentence: "In addition, the location is very convenient.",
    category: "Adding Information",
    section: "6.1 Adding Information",
    level: "B1"
  },
  {
    id: 6,
    connector: "nicht nur ... sondern auch",
    english: "not only ... but also",
    wordOrderType: "Type 4 (Two-Part Structure)",
    germanSentence: "Online-Shopping ist nicht nur bequem, sondern auch zeitsparend.",
    englishSentence: "Online shopping is not only convenient but also time-saving.",
    category: "Adding Information",
    section: "6.1 Adding Information",
    level: "B1"
  },
  {
    id: 7,
    connector: "sowie",
    english: "as well as",
    wordOrderType: "Type 1 (Pos 0 - Coordinating)",
    germanSentence: "Wir brauchen Bücher sowie andere Lernmaterialien.",
    englishSentence: "We need books as well as other learning materials.",
    category: "Adding Information",
    section: "6.1 Adding Information",
    level: "B1"
  },
  {
    id: 8,
    connector: "sowohl ... als auch",
    english: "both ... and",
    wordOrderType: "Type 4 (Two-Part Structure)",
    germanSentence: "Sowohl Kinder als auch Erwachsene können teilnehmen.",
    englishSentence: "Both children and adults can participate.",
    category: "Adding Information",
    section: "6.1 Adding Information",
    level: "B1"
  },

  // 6.2 Giving reasons — Gründe nennen
  {
    id: 9,
    connector: "weil",
    english: "because",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Ich lerne Deutsch, weil ich in Deutschland studieren möchte.",
    englishSentence: "I learn German because I want to study in Germany.",
    category: "Giving Reasons",
    section: "6.2 Giving Reasons",
    level: "A1–A2"
  },
  {
    id: 10,
    connector: "da",
    english: "since; because",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Da ich müde bin, gehe ich früh ins Bett.",
    englishSentence: "Since I am tired, I am going to bed early.",
    category: "Giving Reasons",
    section: "6.2 Giving Reasons",
    level: "B1"
  },
  {
    id: 11,
    connector: "wegen + Genitiv",
    english: "because of",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Wegen des Regens bleiben wir zu Hause.",
    englishSentence: "Because of the rain, we are staying at home.",
    category: "Giving Reasons",
    section: "6.2 Giving Reasons",
    level: "A2–B1"
  },
  {
    id: 12,
    connector: "aufgrund + Genitiv",
    english: "due to",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Aufgrund des schlechten Wetters wurde das Spiel abgesagt.",
    englishSentence: "Due to the bad weather, the match was cancelled.",
    category: "Giving Reasons",
    section: "6.2 Giving Reasons",
    level: "B1–B2"
  },
  {
    id: 13,
    connector: "aus diesem Grund",
    english: "for this reason",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Ich habe morgen eine Prüfung. Aus diesem Grund lerne ich heute.",
    englishSentence: "I have an exam tomorrow. For this reason, I am studying today.",
    category: "Giving Reasons",
    section: "6.2 Giving Reasons",
    level: "B1"
  },
  {
    id: 14,
    connector: "zumal",
    english: "especially since; particularly because",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Ich bleibe heute zu Hause, zumal ich krank bin.",
    englishSentence: "I am staying home today, especially since I am ill.",
    category: "Giving Reasons",
    section: "6.2 Giving Reasons",
    level: "B2"
  },
  {
    id: 15,
    connector: "das liegt daran, dass",
    english: "that's because",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Das liegt daran, dass ich wenig Zeit habe.",
    englishSentence: "That's because I have little time.",
    category: "Giving Reasons",
    section: "6.2 Giving Reasons",
    level: "B1"
  },

  // 6.3 Showing consequences and results — Folgen ausdrücken
  {
    id: 16,
    connector: "deshalb",
    english: "therefore",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Ich bin müde. Deshalb gehe ich schlafen.",
    englishSentence: "I am tired. Therefore, I am going to sleep.",
    category: "Consequences & Results",
    section: "6.3 Showing Consequences",
    level: "A2"
  },
  {
    id: 17,
    connector: "deswegen",
    english: "therefore; that's why",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Es regnet. Deswegen bleiben wir zu Hause.",
    englishSentence: "It is raining. That's why we are staying home.",
    category: "Consequences & Results",
    section: "6.3 Showing Consequences",
    level: "A2"
  },
  {
    id: 18,
    connector: "daher",
    english: "hence; therefore",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Die Preise sind gestiegen. Daher kaufen weniger Menschen das Produkt.",
    englishSentence: "Prices have increased. Hence, fewer people buy the product.",
    category: "Consequences & Results",
    section: "6.3 Showing Consequences",
    level: "B1"
  },
  {
    id: 19,
    connector: "folglich",
    english: "consequently",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Er hat viel geübt. Folglich hat er die Prüfung bestanden.",
    englishSentence: "He practised a lot. Consequently, he passed the exam.",
    category: "Consequences & Results",
    section: "6.3 Showing Consequences",
    level: "B1–B2"
  },
  {
    id: 20,
    connector: "infolgedessen",
    english: "as a result",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Der Zug hatte Verspätung. Infolgedessen kamen wir zu spät.",
    englishSentence: "The train was delayed. As a result, we arrived late.",
    category: "Consequences & Results",
    section: "6.3 Showing Consequences",
    level: "B2"
  },
  {
    id: 21,
    connector: "somit",
    english: "thus; consequently",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Alle Unterlagen sind vollständig. Somit können wir den Antrag einreichen.",
    englishSentence: "All documents are complete. Thus, we can submit the application.",
    category: "Consequences & Results",
    section: "6.3 Showing Consequences",
    level: "B1–B2"
  },
  {
    id: 22,
    connector: "als Folge",
    english: "as a consequence",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Als Folge des Unfalls wurde die Straße gesperrt.",
    englishSentence: "As a consequence of the accident, the road was closed.",
    category: "Consequences & Results",
    section: "6.3 Showing Consequences",
    level: "B1"
  },
  {
    id: 23,
    connector: "darum",
    english: "that's why",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Ich habe morgen frei. Darum kann ich dich besuchen.",
    englishSentence: "I am free tomorrow. That's why I can visit you.",
    category: "Consequences & Results",
    section: "6.3 Showing Consequences",
    level: "A2"
  },
  {
    id: 24,
    connector: "sodass",
    english: "so; with the result that",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Es regnete stark, sodass wir zu Hause blieben.",
    englishSentence: "It rained heavily, so we stayed at home.",
    category: "Consequences & Results",
    section: "6.3 Showing Consequences",
    level: "B1"
  },

  // 6.4 Showing contrast and opposition — Gegensatz ausdrücken
  {
    id: 25,
    connector: "aber",
    english: "but",
    wordOrderType: "Type 1 (Pos 0 - Coordinating)",
    germanSentence: "Ich bin müde, aber ich muss noch lernen.",
    englishSentence: "I am tired, but I still have to study.",
    category: "Contrast & Opposition",
    section: "6.4 Showing Contrast",
    level: "A1"
  },
  {
    id: 26,
    connector: "jedoch",
    english: "however; nevertheless",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Das Hotel ist teuer. Es ist jedoch sehr schön.",
    englishSentence: "The hotel is expensive. However, it is very beautiful.",
    category: "Contrast & Opposition",
    section: "6.4 Showing Contrast",
    level: "B1"
  },
  {
    id: 27,
    connector: "allerdings",
    english: "however",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Das Zimmer ist klein, allerdings sehr gemütlich.",
    englishSentence: "The room is small, but very cosy.",
    category: "Contrast & Opposition",
    section: "6.4 Showing Contrast",
    level: "B1"
  },
  {
    id: 28,
    connector: "obwohl",
    english: "although",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Obwohl es regnet, gehen wir spazieren.",
    englishSentence: "Although it is raining, we are going for a walk.",
    category: "Contrast & Opposition",
    section: "6.4 Showing Contrast",
    level: "A2–B1"
  },
  {
    id: 29,
    connector: "trotzdem",
    english: "nevertheless; despite that",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Ich war krank. Trotzdem ging ich zur Arbeit.",
    englishSentence: "I was ill. Nevertheless, I went to work.",
    category: "Contrast & Opposition",
    section: "6.4 Showing Contrast",
    level: "A2–B1"
  },
  {
    id: 30,
    connector: "dennoch",
    english: "nevertheless (more formal)",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Es war schwierig. Dennoch haben wir es geschafft.",
    englishSentence: "It was difficult. Nevertheless, we managed it.",
    category: "Contrast & Opposition",
    section: "6.4 Showing Contrast",
    level: "B2"
  },
  {
    id: 31,
    connector: "stattdessen",
    english: "instead",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Ich fahre heute nicht mit dem Auto. Stattdessen nehme ich den Bus.",
    englishSentence: "I am not driving today. Instead, I am taking the bus.",
    category: "Contrast & Opposition",
    section: "6.4 Showing Contrast",
    level: "B1"
  },
  {
    id: 32,
    connector: "anstatt",
    english: "instead of",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Anstatt fernzusehen, lese ich ein Buch.",
    englishSentence: "Instead of watching television, I read a book.",
    category: "Contrast & Opposition",
    section: "6.4 Showing Contrast",
    level: "B1"
  },
  {
    id: 33,
    connector: "trotz + Genitiv",
    english: "despite",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Trotz des Regens gingen wir spazieren.",
    englishSentence: "Despite the rain, we went for a walk.",
    category: "Contrast & Opposition",
    section: "6.4 Showing Contrast",
    level: "B1"
  },
  {
    id: 34,
    connector: "im Gegenteil",
    english: "on the contrary",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Ich bin nicht müde. Im Gegenteil, ich bin sehr fit.",
    englishSentence: "I am not tired. On the contrary, I am very energetic.",
    category: "Contrast & Opposition",
    section: "6.4 Showing Contrast",
    level: "B1"
  },
  {
    id: 35,
    connector: "im Vergleich dazu",
    english: "in comparison",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Das neue Handy ist teuer. Im Vergleich dazu ist das alte Modell günstiger.",
    englishSentence: "The new phone is expensive. In comparison, the old model is cheaper.",
    category: "Contrast & Opposition",
    section: "6.4 Showing Contrast",
    level: "B1"
  },
  {
    id: 36,
    connector: "wohingegen",
    english: "whereas; while",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Ich fahre gern mit dem Zug, wohingegen mein Bruder lieber fährt.",
    englishSentence: "I like travelling by train, whereas my brother prefers driving.",
    category: "Contrast & Opposition",
    section: "6.4 Showing Contrast",
    level: "B2"
  },
  {
    id: 37,
    connector: "während",
    english: "while; whereas",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Während ich gern lese, sieht mein Bruder lieber fern.",
    englishSentence: "While I like reading, my brother prefers watching television.",
    category: "Contrast & Opposition",
    section: "6.4 Showing Contrast",
    level: "B1"
  },

  // 6.5 Expressing purpose — Einen Zweck ausdrücken
  {
    id: 38,
    connector: "damit",
    english: "so that",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Ich lerne jeden Tag, damit ich die Prüfung bestehe.",
    englishSentence: "I study every day so that I pass the exam.",
    category: "Purpose & Aim",
    section: "6.5 Expressing Purpose",
    level: "A2–B1"
  },
  {
    id: 39,
    connector: "um ... zu",
    english: "in order to",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Ich lerne Deutsch, um in Deutschland zu studieren.",
    englishSentence: "I learn German in order to study in Germany.",
    category: "Purpose & Aim",
    section: "6.5 Expressing Purpose",
    level: "A2–B1"
  },
  {
    id: 40,
    connector: "zu diesem Zweck",
    english: "for this purpose",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Zu diesem Zweck brauchen wir weitere Informationen.",
    englishSentence: "For this purpose, we need more information.",
    category: "Purpose & Aim",
    section: "6.5 Expressing Purpose",
    level: "B1–B2"
  },
  {
    id: 41,
    connector: "mit dem Ziel, ... zu",
    english: "with the aim of",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Sie lernt Deutsch mit dem Ziel, in Deutschland zu arbeiten.",
    englishSentence: "She learns German with the aim of working in Germany.",
    category: "Purpose & Aim",
    section: "6.5 Expressing Purpose",
    level: "B2"
  },

  // 6.6 Conditions — Bedingungen ausdrücken
  {
    id: 42,
    connector: "wenn",
    english: "if; whenever",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Wenn ich Zeit habe, besuche ich dich.",
    englishSentence: "If I have time, I will visit you.",
    category: "Conditions",
    section: "6.6 Expressing Conditions",
    level: "A1–A2"
  },
  {
    id: 43,
    connector: "falls",
    english: "in case; if",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Falls du Hilfe brauchst, kannst du mich anrufen.",
    englishSentence: "In case you need help, you can call me.",
    category: "Conditions",
    section: "6.6 Expressing Conditions",
    level: "B1"
  },
  {
    id: 44,
    connector: "es sei denn",
    english: "unless",
    wordOrderType: "Type 1 (Pos 0 - Coordinating)",
    germanSentence: "Ich gehe spazieren, es sei denn, es regnet.",
    englishSentence: "I will go for a walk unless it rains.",
    category: "Conditions",
    section: "6.6 Expressing Conditions",
    level: "B1–B2"
  },
  {
    id: 45,
    connector: "solange",
    english: "as long as",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Solange du übst, wirst du besser.",
    englishSentence: "As long as you practise, you will improve.",
    category: "Conditions",
    section: "6.6 Expressing Conditions",
    level: "B1"
  },
  {
    id: 46,
    connector: "nur wenn",
    english: "only if",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Ich komme mit, nur wenn ich Zeit habe.",
    englishSentence: "I will come along only if I have time.",
    category: "Conditions",
    section: "6.6 Expressing Conditions",
    level: "B1"
  },
  {
    id: 47,
    connector: "sonst",
    english: "otherwise; or else",
    wordOrderType: "Type 3 (Pos 2 - Sentence Adverb)",
    germanSentence: "Beeil dich, sonst verpassen wir den Zug.",
    englishSentence: "Hurry up, or else we will miss the train.",
    category: "Conditions",
    section: "6.6 Expressing Conditions",
    level: "A2–B1"
  },

  // 6.7 Time and sequence — Zeitliche Reihenfolge
  {
    id: 48,
    connector: "als",
    english: "when (one-time past event)",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Als ich klein war, spielte ich oft draußen.",
    englishSentence: "When I was little, I often played outside.",
    category: "Time & Sequence",
    section: "6.7 Time and Sequence",
    level: "A2"
  },
  {
    id: 49,
    connector: "nachdem",
    english: "after; after that",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Nachdem ich gegessen hatte, ging ich spazieren.",
    englishSentence: "After I had eaten, I went for a walk.",
    category: "Time & Sequence",
    section: "6.7 Time and Sequence",
    level: "B1"
  },
  {
    id: 50,
    connector: "bevor",
    english: "before",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Bevor ich schlafen gehe, lese ich ein Buch.",
    englishSentence: "Before I go to sleep, I read a book.",
    category: "Time & Sequence",
    section: "6.7 Time and Sequence",
    level: "A2–B1"
  },
  {
    id: 51,
    connector: "bis",
    english: "until",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Ich warte hier, bis du zurückkommst.",
    englishSentence: "I will wait here until you return.",
    category: "Time & Sequence",
    section: "6.7 Time and Sequence",
    level: "A2–B1"
  },
  {
    id: 52,
    connector: "sobald",
    english: "as soon as",
    wordOrderType: "Type 2 (Verb at end - Subordinating)",
    germanSentence: "Sobald ich Zeit habe, rufe ich dich an.",
    englishSentence: "As soon as I have time, I will call you.",
    category: "Time & Sequence",
    section: "6.7 Time and Sequence",
    level: "B1"
  },

  // 6.11 Special two-part connectors — Zweiteilige Konnektoren
  {
    id: 53,
    connector: "entweder ... oder",
    english: "either ... or",
    wordOrderType: "Type 4 (Two-Part Structure)",
    germanSentence: "Entweder fahren wir mit dem Bus oder wir nehmen ein Taxi.",
    englishSentence: "Either we travel by bus or we take a taxi.",
    category: "Two-Part Connectors",
    section: "6.11 Special Two-Part",
    level: "B1"
  },
  {
    id: 54,
    connector: "weder ... noch",
    english: "neither ... nor",
    wordOrderType: "Type 4 (Two-Part Structure)",
    germanSentence: "Weder mein Bruder noch meine Schwester trinkt Kaffee.",
    englishSentence: "Neither my brother nor my sister drinks coffee.",
    category: "Two-Part Connectors",
    section: "6.11 Special Two-Part",
    level: "B1"
  },
  {
    id: 55,
    connector: "je ... desto / umso",
    english: "the more ... the more",
    wordOrderType: "Type 4 (Two-Part Structure)",
    germanSentence: "Je mehr ich übe, desto sicherer spreche ich.",
    englishSentence: "The more I practise, the more confidently I speak.",
    category: "Two-Part Connectors",
    section: "6.11 Special Two-Part",
    level: "B1–B2"
  },
  {
    id: 56,
    connector: "ob ... oder",
    english: "whether ... or",
    wordOrderType: "Type 4 (Two-Part Structure)",
    germanSentence: "Ich weiß nicht, ob er heute oder morgen kommt.",
    englishSentence: "I don't know whether he is coming today or tomorrow.",
    category: "Two-Part Connectors",
    section: "6.11 Special Two-Part",
    level: "B1"
  },
  {
    id: 57,
    connector: "einerseits ... andererseits",
    english: "on the one hand ... on the other hand",
    wordOrderType: "Type 4 (Two-Part Structure)",
    germanSentence: "Einerseits ist Online-Shopping bequem, andererseits kann es teuer sein.",
    englishSentence: "On the one hand, online shopping is convenient; on the other hand, it can be expensive.",
    category: "Two-Part Connectors",
    section: "6.11 Special Two-Part",
    level: "B1"
  }
];

const uniqueConnCats = Array.from(
  new Set(CONNECTORS_LIST.map((item) => item.category))
) as string[];

export const CONNECTORS_CATEGORIES = [
  `All (${CONNECTORS_LIST.length})`,
  ...uniqueConnCats.sort()
];
