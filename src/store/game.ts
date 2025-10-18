import { create } from 'zustand';
import wordsData from '../data/words-eo.json';
import { toNFC, uniqueLetters } from '../utils/eo';
import type { GamePhase, GameStats } from '../types';

// Fallback words if JSON fails to load
const FALLBACK_WORDS = [
  'hundo',
  'kato',
  'domo',
  'libro',
  'akvo',
  'pano',
  'sunos',
  'nokto',
  'amiko',
  'varma',
];

const words: string[] = Array.isArray(wordsData) && wordsData.length > 0 ? wordsData : FALLBACK_WORDS;

// LocalStorage keys
const STATS_KEY = 'ehm-stats';
const SETTINGS_KEY = 'ehm-settings';

// Load stats from localStorage
const loadStats = (): GameStats => {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load stats:', e);
  }
  return { games: 0, wins: 0, streak: 0 };
};

// Save stats to localStorage
const saveStats = (stats: GameStats): void => {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats:', e);
  }
};

// Load settings from localStorage
const loadSettings = () => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load settings:', e);
  }
  return { maxMistakes: 6, allowHints: false };
};

interface GameState {
  secret: string;
  guessed: Set<string>;
  wrong: Set<string>;
  maxMistakes: number;
  phase: GamePhase;
  stats: GameStats;

  // Actions
  newGame: () => void;
  guess: (letter: string) => void;
}

const pickRandomWord = (): string => {
  const word = words[Math.floor(Math.random() * words.length)];
  return toNFC(word);
};

export const useGame = create<GameState>((set, get) => {
  const settings = loadSettings();

  return {
    secret: pickRandomWord(),
    guessed: new Set(),
    wrong: new Set(),
    maxMistakes: settings.maxMistakes,
    phase: 'playing',
    stats: loadStats(),

    newGame: () => {
      set({
        secret: pickRandomWord(),
        guessed: new Set(),
        wrong: new Set(),
        phase: 'playing',
      });
    },

    guess: (raw: string) => {
      const letter = toNFC(raw.toLowerCase());
      const { secret, guessed, wrong, maxMistakes, phase, stats } = get();

      // Ignore if game is over or letter already guessed
      if (phase !== 'playing') return;
      if (guessed.has(letter) || wrong.has(letter)) return;

      const nextGuessed = new Set(guessed);
      const nextWrong = new Set(wrong);

      // Check if letter is in secret word
      if (secret.includes(letter)) {
        nextGuessed.add(letter);
      } else {
        nextWrong.add(letter);
      }

      // Determine new phase
      let nextPhase: GamePhase = 'playing';
      const secretLetters = uniqueLetters(secret);
      const allGuessed = [...secretLetters].every(l => nextGuessed.has(l));

      if (allGuessed) {
        nextPhase = 'won';
        // Update stats for win
        const newStats: GameStats = {
          games: stats.games + 1,
          wins: stats.wins + 1,
          streak: stats.streak + 1,
        };
        saveStats(newStats);
        set({ stats: newStats });
      } else if (nextWrong.size >= maxMistakes) {
        nextPhase = 'lost';
        // Update stats for loss
        const newStats: GameStats = {
          games: stats.games + 1,
          wins: stats.wins,
          streak: 0,
        };
        saveStats(newStats);
        set({ stats: newStats });
      }

      set({
        guessed: nextGuessed,
        wrong: nextWrong,
        phase: nextPhase,
      });
    },
  };
});
