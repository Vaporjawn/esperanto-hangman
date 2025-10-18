// Core game types for Esperanto Hangman

export type Letter = string; // Esperanto letters including ĉ ĝ ĥ ĵ ŝ ŭ

export type GamePhase = 'playing' | 'won' | 'lost';

export interface GameState {
  secret: string;
  guessed: Set<string>;
  wrong: Set<string>;
  maxMistakes: number;
  phase: GamePhase;
}

export interface GameStats {
  games: number;
  wins: number;
  streak: number;
}

export interface GameSettings {
  maxMistakes: number;
  allowHints: boolean;
}
