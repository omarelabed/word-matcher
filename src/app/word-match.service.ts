import { Injectable } from '@angular/core';
import { WordMatch } from './word-match';

@Injectable({
  providedIn: 'root',
})
export class WordMatchService {
  wordMatches: WordMatch[] = [];

  constructor() {}

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
  }

  deleteWordMatch(wordMatch: WordMatch): void {
    this.wordMatches = this.wordMatches.filter(
      ({ wordA: a, wordB: b }) => a !== wordMatch.wordA && b !== wordMatch.wordB
    );
  }

  updateWordMatch(oldWordMatch: WordMatch, newWordMatch: WordMatch): void {
    this.wordMatches = this.wordMatches.map((wordMatch) =>
      wordMatch.wordA === oldWordMatch.wordA &&
      wordMatch.wordB === oldWordMatch.wordB
        ? newWordMatch
        : wordMatch
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
    this.wordMatches = this.getDefaultWordMatches();
    this.wordMatches.sort(this.sortAlphabeticallyByWordA);
  }
}
