// Esperanto language utilities for hangman game

export const EO_LETTERS = [
  'a',
  'b',
  'c',
  'ĉ',
  'd',
  'e',
  'f',
  'g',
  'ĝ',
  'h',
  'ĥ',
  'i',
  'j',
  'ĵ',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'r',
  's',
  'ŝ',
  't',
  'u',
  'ŭ',
  'v',
  'z',
] as const;

/**
 * Normalize string to NFC form to ensure diacritics are stable
 */
export const toNFC = (s: string): string => s.normalize('NFC');

/**
 * Check if a character is a valid Esperanto letter
 */
export const isEoLetter = (ch: string): boolean => {
  const normalized = toNFC(ch);
  return EO_LETTERS.includes(normalized as (typeof EO_LETTERS)[number]);
};

/**
 * Map base letter to diacritic when followed by 'x'
 * cx → ĉ, gx → ĝ, hx → ĥ, jx → ĵ, sx → ŝ, ux → ŭ
 */
const X_MAP: Record<string, string> = {
  c: 'ĉ',
  g: 'ĝ',
  h: 'ĥ',
  j: 'ĵ',
  s: 'ŝ',
  u: 'ŭ',
};

/**
 * Convert x-notation to diacritic character
 * Returns the diacritic if prev+next forms valid x-notation, else null
 */
export function fromXNotation(prev: string, next: string): string | null {
  const p = prev.toLowerCase();
  const n = next.toLowerCase();
  if (n !== 'x') return null;
  return X_MAP[p] ?? null;
}

/**
 * Get set of unique letters in a word
 */
export const uniqueLetters = (word: string): Set<string> => new Set([...toNFC(word)]);
