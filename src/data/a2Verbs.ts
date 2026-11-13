import { A1VerbItem } from './a1Verbs';
import { A2_VERBS_SHEET1 } from './a2VerbsSheet1';
import { A2_VERBS_SHEET2 } from './a2VerbsSheet2';
import { A2_VERBS_SHEET3 } from './a2VerbsSheet3';

export const A2_VERBS_LIST: A1VerbItem[] = [
  ...A2_VERBS_SHEET1,
  ...A2_VERBS_SHEET2,
  ...A2_VERBS_SHEET3
];

// Extract unique categories from A2 verbs
const uniqueCategories = Array.from(
  new Set(A2_VERBS_LIST.map((item) => item.category).filter(Boolean))
) as string[];

export const A2_CATEGORIES = [
  `All (${A2_VERBS_LIST.length})`,
  ...uniqueCategories.sort(),
  'Reflexive Verbs',
  'Separable Verbs'
];
