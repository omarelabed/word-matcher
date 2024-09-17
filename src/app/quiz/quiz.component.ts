import { Component, inject } from '@angular/core';
import { TabStateService } from '../tab-state.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { WordMatchService } from '../word-match.service';
import { WordMatch } from '../word-match';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  tabStateService = inject(TabStateService);
  quizStarted = false;
  wordMatchService = inject(WordMatchService);
  wordMatches: WordMatch[] = [];

  currentWordMatchIndex = 0;
  failedWordMatches: WordMatch[] = [];
  correctWordMatches: WordMatch[] = [];
  currentLanguage = 'A';
  wordCount = 0;
  hideResult = true;

  constructor() {
    this.setRandomLanguage();
  }

  generateRandomWordMatches() {
    this.wordCount = this.wordMatchService.getWordMatches().length;
    return this.wordMatchService.getRandomWordMatches(this.wordCount);
  }

  startQuiz() {
    this.quizStarted = true;
    this.currentWordMatchIndex = 0;
    this.failedWordMatches = [];
    this.correctWordMatches = [];
    this.hideResult = false;
    this.wordMatches = this.generateRandomWordMatches();
    this.setRandomLanguage();
    this.tabStateService.disableAllBut('quiz');
  }

  getCurrentWordMatch(): WordMatch {
    return this.wordMatches[this.currentWordMatchIndex];
  }

  getCurrentWordMatchIndex(): number {
    return this.currentWordMatchIndex;
  }

  checkAnswer(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const answer = form.elements[0] as HTMLInputElement;
    const expectedAnswer =
      this.currentLanguage === 'A'
        ? this.getCurrentWordMatch().wordB
        : this.getCurrentWordMatch().wordA;
    if (expectedAnswer === answer.value) {
      this.correctWordMatches.push(
        this.wordMatches[this.currentWordMatchIndex]
      );
    } else {
      this.failedWordMatches.push(this.wordMatches[this.currentWordMatchIndex]);
    }
    answer.value = '';
    answer.focus();
    this.currentWordMatchIndex++;
    if (this.currentWordMatchIndex >= this.wordMatches.length) {
      this.stopQuiz();
    }
    this.setRandomLanguage();
  }

  setRandomLanguage() {
    this.currentLanguage = Math.random() < 0.5 ? 'A' : 'B';
  }

  getCurrentWord() {
    return this.currentLanguage === 'A'
      ? this.getCurrentWordMatch().wordA
      : this.getCurrentWordMatch().wordB;
  }

  getResult() {
    if (
      this.hideResult ||
      this.quizStarted ||
      this.wordMatches.length !==
      this.correctWordMatches.length + this.failedWordMatches.length
    ) {
      return null;
    }
    return `${this.correctWordMatches.length}/${this.wordMatches.length}`;
  }

  stopQuiz() {
    this.quizStarted = false;
    this.tabStateService.enableAll();
  }
}
