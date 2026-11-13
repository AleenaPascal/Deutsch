export interface GrammarNotesItem {
  id: number;
  verbOrPattern: string;
  grammarForm: string; // e.g. "Präsens", "Präteritum", "Konjunktiv II", "Nuance Comparison"
  english: string;
  germanSentence: string;
  englishSentence: string;
  contrastGerman?: string;
  contrastEnglish?: string;
  conjugationSummary?: string;
  note?: string;
  category: string;
  section: string;
  level: string;
}

export const MODAL_GRAMMAR_LIST: GrammarNotesItem[] = [
  // 1. Modal Verbs — Present Tense (1.1 & 1.2)
  {
    id: 1,
    verbOrPattern: "können (kann, kannst, kann)",
    grammarForm: "Modalverb Präsens",
    english: "can / to be able to (ability or possibility)",
    germanSentence: "Ich kann Deutsch sprechen.",
    englishSentence: "I can speak German.",
    conjugationSummary: "ich kann | du kannst | er/sie/es kann | wir können | ihr könnt | sie/Sie können",
    note: "Expresses ability, skill, or learned possibility",
    category: "1. Modal Verbs Present",
    section: "1.1 Modalverben Präsens",
    level: "A1–A2"
  },
  {
    id: 2,
    verbOrPattern: "müssen (muss, musst, muss)",
    grammarForm: "Modalverb Präsens",
    english: "must / have to (necessity or obligation)",
    germanSentence: "Ich muss heute lernen.",
    englishSentence: "I have to study today.",
    conjugationSummary: "ich muss | du musst | er/sie/es muss | wir müssen | ihr müsst | sie/Sie müssen",
    note: "External necessity or strict obligation without choice",
    category: "1. Modal Verbs Present",
    section: "1.1 Modalverben Präsens",
    level: "A1–A2"
  },
  {
    id: 3,
    verbOrPattern: "dürfen (darf, darfst, darf)",
    grammarForm: "Modalverb Präsens",
    english: "may / to be allowed to (permission)",
    germanSentence: "Darf ich hier sitzen?",
    englishSentence: "May I sit here?",
    conjugationSummary: "ich darf | du darfst | er/sie/es darf | wir dürfen | ihr dürft | sie/Sie dürfen",
    note: "Asking for or granting official permission; 'nicht dürfen' = prohibition",
    category: "1. Modal Verbs Present",
    section: "1.1 Modalverben Präsens",
    level: "A1–A2"
  },
  {
    id: 4,
    verbOrPattern: "sollen (soll, sollst, soll)",
    grammarForm: "Modalverb Präsens",
    english: "should / to be supposed to (advice or instruction)",
    germanSentence: "Du sollst mehr Wasser trinken.",
    englishSentence: "You should drink more water.",
    conjugationSummary: "ich soll | du sollst | er/sie/es soll | wir sollen | ihr sollt | sie/Sie sollen",
    note: "Duty assigned by a doctor, teacher, or recommendation",
    category: "1. Modal Verbs Present",
    section: "1.1 Modalverben Präsens",
    level: "A1–A2"
  },
  {
    id: 5,
    verbOrPattern: "wollen (will, willst, will)",
    grammarForm: "Modalverb Präsens",
    english: "want to (intention or strong desire)",
    germanSentence: "Ich will in Deutschland studieren.",
    englishSentence: "I want to study in Germany.",
    conjugationSummary: "ich will | du willst | er/sie/es will | wir wollen | ihr wollt | sie/Sie wollen",
    note: "Firm intention or strong determined wish",
    category: "1. Modal Verbs Present",
    section: "1.1 Modalverben Präsens",
    level: "A1–A2"
  },
  {
    id: 6,
    verbOrPattern: "mögen (mag, magst, mag)",
    grammarForm: "Modalverb Präsens",
    english: "to like (likes and preferences)",
    germanSentence: "Ich mag Kaffee.",
    englishSentence: "I like coffee.",
    conjugationSummary: "ich mag | du magst | er/sie/es mag | wir mögen | ihr mögt | sie/Sie mögen",
    note: "Followed by a noun to express general preference",
    category: "1. Modal Verbs Present",
    section: "1.1 Modalverben Präsens",
    level: "A1–A2"
  },
  {
    id: 7,
    verbOrPattern: "möchten (möchte, möchtest, möchte)",
    grammarForm: "Konjunktiv II (Höflichkeit)",
    english: "would like (polite wishes or requests)",
    germanSentence: "Ich möchte einen Kaffee trinken.",
    englishSentence: "I would like to drink a coffee.",
    conjugationSummary: "ich möchte | du möchtest | er/sie/es möchte | wir möchten | ihr möchtet | sie/Sie möchten",
    note: "Polite form used in restaurants, shopping, and requests",
    category: "1. Modal Verbs Present",
    section: "1.1 Modalverben Präsens",
    level: "A1–A2"
  },

  // 1.3 Important Differences (Nuances)
  {
    id: 8,
    verbOrPattern: "können vs dürfen",
    grammarForm: "Bedeutungsunterschied",
    english: "Ability vs Permission",
    germanSentence: "Ich kann schwimmen. / Ich darf schwimmen.",
    englishSentence: "I can swim (ability) / I am allowed to swim (permission).",
    contrastGerman: "können = Fähigkeit / Möglichkeit | dürfen = Erlaubnis",
    contrastEnglish: "Can I do it physically vs Do I have permission to do it",
    note: "Essential distinction on exams and signs",
    category: "1. Modal Verbs Present",
    section: "1.3 Bedeutungsunterschiede",
    level: "A2"
  },
  {
    id: 9,
    verbOrPattern: "müssen vs sollen",
    grammarForm: "Bedeutungsunterschied",
    english: "Necessity vs Instruction / Recommendation",
    germanSentence: "Ich muss lernen. / Ich soll lernen.",
    englishSentence: "I must study (necessity) / I should study (someone told me to).",
    contrastGerman: "müssen = Notwendigkeit | sollen = Ratschlag / Auftrag von Dritten",
    contrastEnglish: "Personal need vs External command/advice",
    note: "Sollen usually comes from an external person's instructions",
    category: "1. Modal Verbs Present",
    section: "1.3 Bedeutungsunterschiede",
    level: "A2"
  },
  {
    id: 10,
    verbOrPattern: "wollen vs möchten",
    grammarForm: "Bedeutungsunterschied",
    english: "Strong intention vs Polite wish",
    germanSentence: "Ich will Kaffee. / Ich möchte Kaffee.",
    englishSentence: "I want coffee (blunt/strong) / I would like coffee (polite).",
    contrastGerman: "wollen = feste Absicht / direkt | möchten = höflicher Wunsch",
    contrastEnglish: "Direct desire vs Courteous request",
    note: "Always use 'möchte' when ordering food or speaking politely",
    category: "1. Modal Verbs Present",
    section: "1.3 Bedeutungsunterschiede",
    level: "A2"
  },

  // 2. Modal Verbs in the Past – Präteritum
  {
    id: 11,
    verbOrPattern: "konnte (können)",
    grammarForm: "Modalverb Präteritum",
    english: "could / was able to",
    germanSentence: "Ich konnte gestern nicht kommen.",
    englishSentence: "I could not come yesterday.",
    conjugationSummary: "ich konnte | du konntest | er konnte | wir konnten | ihr konntet | sie konnten",
    note: "Sentence structure: Modal in Pos 2 + Infinitive at the END",
    category: "2. Modal Verbs in Past (Präteritum)",
    section: "2. Präteritum Modalverben",
    level: "A2–B1"
  },
  {
    id: 12,
    verbOrPattern: "musste (müssen)",
    grammarForm: "Modalverb Präteritum",
    english: "had to (past obligation)",
    germanSentence: "Ich musste gestern arbeiten.",
    englishSentence: "I had to work yesterday.",
    conjugationSummary: "ich musste | du musstest | er musste | wir mussten | ihr musstet | sie mussten",
    note: "Drop the umlaut! müssen → musste (never müsst- in past)",
    category: "2. Modal Verbs in Past (Präteritum)",
    section: "2. Präteritum Modalverben",
    level: "A2–B1"
  },
  {
    id: 13,
    verbOrPattern: "durfte (dürfen)",
    grammarForm: "Modalverb Präteritum",
    english: "was allowed to",
    germanSentence: "Er durfte nicht ausgehen.",
    englishSentence: "He was not allowed to go out.",
    conjugationSummary: "ich durfte | du durftest | er durfte | wir durften | ihr durftet | sie durften",
    note: "Drop the umlaut! dürfen → durfte",
    category: "2. Modal Verbs in Past (Präteritum)",
    section: "2. Präteritum Modalverben",
    level: "A2–B1"
  },
  {
    id: 14,
    verbOrPattern: "sollte (sollen)",
    grammarForm: "Modalverb Präteritum",
    english: "was supposed to / should have",
    germanSentence: "Sie sollte mehr lernen.",
    englishSentence: "She was supposed to study more.",
    conjugationSummary: "ich sollte | du solltest | er sollte | wir sollten | ihr solltet | sie sollten",
    note: "Form is identical to Konjunktiv II form",
    category: "2. Modal Verbs in Past (Präteritum)",
    section: "2. Präteritum Modalverben",
    level: "A2–B1"
  },
  {
    id: 15,
    verbOrPattern: "wollte (wollen)",
    grammarForm: "Modalverb Präteritum",
    english: "wanted to",
    germanSentence: "Ich wollte Deutsch lernen.",
    englishSentence: "I wanted to learn German.",
    conjugationSummary: "ich wollte | du wolltest | er wollte | wir wollten | ihr wolltet | sie wollten",
    note: "Form is identical to Konjunktiv II form",
    category: "2. Modal Verbs in Past (Präteritum)",
    section: "2. Präteritum Modalverben",
    level: "A2–B1"
  },
  {
    id: 16,
    verbOrPattern: "mochte (mögen)",
    grammarForm: "Modalverb Präteritum",
    english: "liked (in the past)",
    germanSentence: "Als Kind mochte ich keine Milch.",
    englishSentence: "As a child, I didn't like milk.",
    conjugationSummary: "ich mochte | du mochtest | er mochte | wir mochten | ihr mochtet | sie mochten",
    note: "Drop the umlaut! mögen → mochte",
    category: "2. Modal Verbs in Past (Präteritum)",
    section: "2. Präteritum Modalverben",
    level: "B1"
  },

  // 3. Werden, Wurden and Würden
  {
    id: 17,
    verbOrPattern: "werden (wird, werden)",
    grammarForm: "Präsens (Futur / Vorgang)",
    english: "become / will (future)",
    germanSentence: "Ich werde Arzt. / Wir werden morgen reisen.",
    englishSentence: "I am becoming a doctor. / We will travel tomorrow.",
    conjugationSummary: "ich werde | du wirst | er wird | wir werden | ihr werdet | sie werden",
    note: "Become a state/profession OR Futur I (werden + Infinitiv)",
    category: "3. Werden, Wurden & Würden",
    section: "3. Werden Formen",
    level: "A1–B1"
  },
  {
    id: 18,
    verbOrPattern: "wurde / wurden",
    grammarForm: "Präteritum (Vergangenheit / Passiv)",
    english: "became / was / were (passive)",
    germanSentence: "Ich wurde krank. / Die Autos wurden repariert.",
    englishSentence: "I became ill. / The cars were repaired (passive).",
    conjugationSummary: "ich wurde | du wurdest | er wurde | wir wurden | ihr wurdet | sie wurden",
    note: "No umlaut! Real past event or passive voice (Vorgangspassiv)",
    category: "3. Werden, Wurden & Würden",
    section: "3. Werden Formen",
    level: "B1"
  },
  {
    id: 19,
    verbOrPattern: "würde / würden",
    grammarForm: "Konjunktiv II (Hypothese / Höflichkeit)",
    english: "would (hypothetical / polite)",
    germanSentence: "Ich würde gern nach Deutschland reisen. / Ich würde dir helfen.",
    englishSentence: "I would like to travel to Germany. / I would help you.",
    conjugationSummary: "ich würde | du würdest | er würde | wir würden | ihr würdet | sie würden",
    contrastGerman: "wurde = became (past reality) ↔ würde = would (hypothesis)",
    contrastEnglish: "wurde = happened in past | würde = hypothetical wish",
    note: "With umlaut! Used with Infinitive for most verbs: würde + machen/kommen",
    category: "3. Werden, Wurden & Würden",
    section: "3. Werden Formen",
    level: "B1"
  },

  // 4. Sein – War / Waren / Wäre / Wären
  {
    id: 20,
    verbOrPattern: "war / waren (sein)",
    grammarForm: "Präteritum (Vergangenheit)",
    english: "was / were (past reality)",
    germanSentence: "Ich war gestern krank. / Wir waren im Urlaub.",
    englishSentence: "I was ill yesterday. / We were on holiday.",
    conjugationSummary: "ich war | du warst | er/sie/es war | wir waren | ihr wart | sie/Sie waren",
    note: "Real past state of being (Fakten in der Vergangenheit)",
    category: "4. Sein & Haben (Past vs Konjunktiv II)",
    section: "4. Sein Formen",
    level: "A1–A2"
  },
  {
    id: 21,
    verbOrPattern: "wäre / wären (sein)",
    grammarForm: "Konjunktiv II (Hypothese / Wunsch)",
    english: "would be / were (hypothetical)",
    germanSentence: "Ich wäre gern in Deutschland. / Das wäre sehr schön.",
    englishSentence: "I would like to be in Germany. / That would be very nice.",
    conjugationSummary: "ich wäre | du wärst | er/sie/es wäre | wir wären | ihr wärt | sie/Sie wären",
    contrastGerman: "Ich war glücklich (real past). ↔ Ich wäre glücklich (hypothetical wish).",
    contrastEnglish: "I was happy (fact) vs I would be happy (wish/unreal).",
    note: "With umlaut! Used for hypothetical situations and polite questions",
    category: "4. Sein & Haben (Past vs Konjunktiv II)",
    section: "4. Sein Formen",
    level: "A2–B1"
  },

  // 5. Haben – Hatte / Hatten / Hätte / Hätten
  {
    id: 22,
    verbOrPattern: "hatte / hatten (haben)",
    grammarForm: "Präteritum (Vergangenheit)",
    english: "had (past possession / state)",
    germanSentence: "Ich hatte gestern keine Zeit. / Wir hatten viele Probleme.",
    englishSentence: "I had no time yesterday. / We had many problems.",
    conjugationSummary: "ich hatte | du hattest | er/sie/es hatte | wir hatten | ihr hattet | sie/Sie hatten",
    note: "Real past fact (Tatsache in der Vergangenheit)",
    category: "4. Sein & Haben (Past vs Konjunktiv II)",
    section: "5. Haben Formen",
    level: "A1–A2"
  },
  {
    id: 23,
    verbOrPattern: "hätte / hätten (haben)",
    grammarForm: "Konjunktiv II (Wunsch / Höflichkeit)",
    english: "would have (wish or polite request)",
    germanSentence: "Ich hätte gern einen Kaffee. / Wir hätten gern ein größeres Haus.",
    englishSentence: "I would like to have a coffee. / We would like a bigger house.",
    conjugationSummary: "ich hätte | du hättest | er/sie/es hätte | wir hätten | ihr hättet | sie/Sie hätten",
    contrastGerman: "Ich hatte Geld (real past fact). ↔ Ich hätte gern Geld (polite wish).",
    contrastEnglish: "I had money (past) vs I would like to have money (wish).",
    note: "With umlaut! 'Ich hätte gern...' is the standard polite order phrase",
    category: "4. Sein & Haben (Past vs Konjunktiv II)",
    section: "5. Haben Formen",
    level: "A2–B1"
  },

  // 6. Lassen – to let, allow, leave or have something done
  {
    id: 24,
    verbOrPattern: "lassen (lässt, lassen)",
    grammarForm: "Präsens & Präteritum",
    english: "to let / allow (Erlaubnis)",
    germanSentence: "Ich lasse ihn gehen.",
    englishSentence: "I let him go.",
    conjugationSummary: "Präsens: ich lasse, du lässt, er lässt, wir lassen, ihr lasst, sie lassen | Präteritum: ließ",
    note: "Meaning 1: To allow someone to do something (lassen + Infinitiv)",
    category: "5. Das Verb 'lassen'",
    section: "6. Lassen Bedeutungen",
    level: "A2–B1"
  },
  {
    id: 25,
    verbOrPattern: "lassen (liegen lassen)",
    grammarForm: "Präsens & Präteritum",
    english: "to leave something behind",
    germanSentence: "Ich lasse mein Handy zu Hause. / Sie ließ ihr Handy zu Hause.",
    englishSentence: "I leave my phone at home. / She left her phone at home.",
    contrastGerman: "Präteritum: Sie ließ ihr Handy zu Hause.",
    contrastEnglish: "In Präteritum: ließ (irregular: lassen → ließ)",
    note: "Meaning 2: To intentionally or accidentally leave something somewhere",
    category: "5. Das Verb 'lassen'",
    section: "6. Lassen Bedeutungen",
    level: "A2–B1"
  },
  {
    id: 26,
    verbOrPattern: "lassen (machen lassen)",
    grammarForm: "Präsens & Präteritum (Dienstleistung)",
    english: "to have something done / get serviced",
    germanSentence: "Ich lasse mein Auto reparieren. / Ich ließ mein Auto reparieren.",
    englishSentence: "I have my car repaired. / I had my car repaired.",
    contrastGerman: "Ich repariere mein Auto (I do it myself) ↔ Ich lasse es reparieren (a mechanic does it).",
    contrastEnglish: "Doing it oneself vs commissioning a professional",
    note: "Meaning 3: Having a service done by someone else (very common on B1)",
    category: "5. Das Verb 'lassen'",
    section: "6. Lassen Bedeutungen",
    level: "B1"
  },
  {
    id: 27,
    verbOrPattern: "Lass das!",
    grammarForm: "Imperativ (Aufhören)",
    english: "Stop doing that! / Leave it!",
    germanSentence: "Lass das bitte sein!",
    englishSentence: "Please stop doing that!",
    note: "Meaning 4: Stop an activity or leave it alone",
    category: "5. Das Verb 'lassen'",
    section: "6. Lassen Bedeutungen",
    level: "A2"
  },

  // 7. Important Konjunktiv II Forms & Examples
  {
    id: 28,
    verbOrPattern: "könnte (können Konj. II)",
    grammarForm: "Konjunktiv II",
    english: "could (polite request or possibility)",
    germanSentence: "Ich könnte dir helfen. / Könntest du mir helfen?",
    englishSentence: "I could help you. / Could you help me?",
    note: "Polite request formula: Könnten Sie bitte...?",
    category: "6. Konjunktiv II Master Forms",
    section: "7. Konjunktiv II Formen",
    level: "B1"
  },
  {
    id: 29,
    verbOrPattern: "müsste (müssen Konj. II)",
    grammarForm: "Konjunktiv II",
    english: "would have to",
    germanSentence: "Du müsstest mehr lernen, um die Prüfung zu bestehen.",
    englishSentence: "You would have to study more to pass the exam.",
    note: "With umlaut! Hypothetical necessity",
    category: "6. Konjunktiv II Master Forms",
    section: "7. Konjunktiv II Formen",
    level: "B1"
  },
  {
    id: 30,
    verbOrPattern: "dürfte (dürfen Konj. II)",
    grammarForm: "Konjunktiv II",
    english: "might be allowed to / probable estimate",
    germanSentence: "Wir dürften hier parken.",
    englishSentence: "We might be allowed to park here.",
    note: "With umlaut! Polite permission or careful estimate",
    category: "6. Konjunktiv II Master Forms",
    section: "7. Konjunktiv II Formen",
    level: "B1"
  },
  {
    id: 31,
    verbOrPattern: "sollte (sollen Konj. II)",
    grammarForm: "Konjunktiv II",
    english: "should (advice / recommendation)",
    germanSentence: "Du solltest zum Arzt gehen.",
    englishSentence: "You should go to the doctor.",
    note: "Most common way to give polite advice in German",
    category: "6. Konjunktiv II Master Forms",
    section: "7. Konjunktiv II Formen",
    level: "A2–B1"
  },

  // 8. Quick Revision Table for B1
  {
    id: 32,
    verbOrPattern: "war / waren ↔ wäre / wären",
    grammarForm: "Revision: Präteritum ↔ Konjunktiv II",
    english: "was / were (past) ↔ would be (wish)",
    germanSentence: "Ich war dort. / Ich wäre gern dort.",
    englishSentence: "I was there (fact). / I would like to be there (wish).",
    contrastGerman: "war = Präteritum | wäre = Konjunktiv II",
    contrastEnglish: "Past reality vs Hypothetical wish",
    note: "Key B1 pair to never mix up",
    category: "7. B1 Quick Revision Summary",
    section: "8. B1 Revision Table",
    level: "A2–B1"
  },
  {
    id: 33,
    verbOrPattern: "hatte / hatten ↔ hätte / hätten",
    grammarForm: "Revision: Präteritum ↔ Konjunktiv II",
    english: "had (past) ↔ would have (wish)",
    germanSentence: "Ich hatte Zeit. / Ich hätte gern Zeit.",
    englishSentence: "I had time (fact). / I would like to have time (wish).",
    contrastGerman: "hatte = Präteritum | hätte = Konjunktiv II",
    contrastEnglish: "Past possession vs Hypothetical wish",
    note: "Key B1 pair: Hatte (real past) vs Hätte (wish)",
    category: "7. B1 Quick Revision Summary",
    section: "8. B1 Revision Table",
    level: "A2–B1"
  },
  {
    id: 34,
    verbOrPattern: "wurde / wurden ↔ würde / würden",
    grammarForm: "Revision: Präteritum ↔ Konjunktiv II",
    english: "became / was passive ↔ would (conditional)",
    germanSentence: "Er wurde Lehrer. / Er würde gern Lehrer werden.",
    englishSentence: "He became a teacher (fact). / He would like to become a teacher (wish).",
    contrastGerman: "wurde = Präteritum / Passiv | würde = Konjunktiv II",
    contrastEnglish: "Past reality vs Conditional wish",
    note: "Crucial difference: wurde (no dots) vs würde (with umlaut dots)",
    category: "7. B1 Quick Revision Summary",
    section: "8. B1 Revision Table",
    level: "B1"
  },
  {
    id: 35,
    verbOrPattern: "konnte, musste, durfte, sollte, wollte, mochte, ließ",
    grammarForm: "Revision: Alle Präteritum-Formen",
    english: "could, had to, was allowed, should, wanted, liked, let/left",
    germanSentence: "Ich konnte, musste und wollte die deutsche Grammatik meistern.",
    englishSentence: "I could, had to and wanted to master German grammar.",
    note: "Drop the umlauts in Präteritum: konnte, musste, durfte, mochte",
    category: "7. B1 Quick Revision Summary",
    section: "8. B1 Revision Table",
    level: "B1"
  }
];

const uniqueModalCats = Array.from(
  new Set(MODAL_GRAMMAR_LIST.map((item) => item.category))
) as string[];

export const MODAL_GRAMMAR_CATEGORIES = [
  `All (${MODAL_GRAMMAR_LIST.length})`,
  ...uniqueModalCats.sort()
];
