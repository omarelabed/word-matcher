import { Injectable } from '@angular/core';
import { WordMatch } from './word-match';

@Injectable({
  providedIn: 'root',
})
export class WordMatchService {
  wordMatches: WordMatch[] = [];

  constructor() {
    this.wordMatches = JSON.parse(localStorage.getItem('wordMatches') || '[]');
  }

  getAllWordMatches(): WordMatch[] {
    return this.wordMatches;
  }

  addWordMatch(wordMatch: WordMatch): void {
    if (
      this.wordMatches.some(
        ({ wordA: a, wordB: b }) =>
          a === wordMatch.wordA && b === wordMatch.wordB
      )
    ) {
      return;
    }
    this.wordMatches.push(wordMatch);
    this.wordMatches.sort(this.sortAlphabeticallyByWordA);
    this.setWordMatches(this.wordMatches);
  }

  deleteWordMatch(wordMatch: WordMatch): void {
    this.setWordMatches(
      this.wordMatches.filter(
        ({ wordA: a, wordB: b }) =>
          a !== wordMatch.wordA && b !== wordMatch.wordB
      )
    );
  }

  updateWordMatch(oldWordMatch: WordMatch, newWordMatch: WordMatch): void {
    this.setWordMatches(
      this.wordMatches.map((wordMatch) =>
        wordMatch.wordA === oldWordMatch.wordA &&
        wordMatch.wordB === oldWordMatch.wordB
          ? newWordMatch
          : wordMatch
      )
    );
  }

  getDefaultWordMatches(): WordMatch[] {
    return [
      { wordA: 'Hund', wordB: 'Cane' },
      { wordA: 'Katze', wordB: 'Gatto' },
      { wordA: 'Maus', wordB: 'Topo' },
      { wordA: 'Pferd', wordB: 'Cavallo' },
      { wordA: 'Schaf', wordB: 'Pecora' },
      { wordA: 'Kuh', wordB: 'Mucca' },
      { wordA: 'Ziege', wordB: 'Capra' },
      { wordA: 'Huhn', wordB: 'Pollo' },
      { wordA: 'Ente', wordB: 'Anatra' },
      { wordA: 'Schwein', wordB: 'Maiale' },
    ];
  }

  sortAlphabeticallyByWordA(a: WordMatch, b: WordMatch): number {
    return a.wordA.localeCompare(b.wordA);
  }

  addExampleData() {
    if (this.wordMatches.length > 0) {
      return;
    }
    this.setWordMatches(this.getDefaultWordMatches());
  }

  resetData() {
    this.setWordMatches([]);
  }

  setWordMatches(wordMatches: WordMatch[]) {
    this.wordMatches = wordMatches;
    this.wordMatches.sort(this.sortAlphabeticallyByWordA);
    localStorage.setItem('wordMatches', JSON.stringify(this.wordMatches));
  }
}
