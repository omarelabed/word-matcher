import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { WordMatch } from '../word-match';
import { WordMatchService } from '../word-match.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss',
})
export class ExerciseComponent {
  wordMatches: WordMatch[] = [];
  wordMatchService = inject(WordMatchService);

  currentWordMatch: WordMatch | null = null;
  currentLanguage: 'A' | 'B' = 'A';

  snackBarRef = inject(MatSnackBar);

  constructor() {
    this.wordMatches = this.wordMatchService.getWordMatches();
    this.nextWordMatch();
  }

  nextWordMatch() {
    const wordMatchCount = this.wordMatches.length;
    const randomIndex = Math.floor(Math.random() * wordMatchCount);
    this.currentWordMatch = this.wordMatches[randomIndex];
    this.currentLanguage = Math.random() < 0.5 ? 'A' : 'B';
  }

  getCurrentWord() {
    return this.currentLanguage === 'A'
      ? this.currentWordMatch?.wordA
      : this.currentWordMatch?.wordB;
  }

  checkAnswer(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const answer = form.elements[0] as HTMLInputElement;
    const expectedAnswer =
      this.currentLanguage === 'A'
        ? this.currentWordMatch?.wordB
        : this.currentWordMatch?.wordA;
    if (expectedAnswer === answer.value) {
      this.nextWordMatch();
      this.openSnackBar('✅', 'OK', { panelClass: 'success-snackbar' });
    } else {
      this.nextWordMatch();
      this.openSnackBar(`❌ ${expectedAnswer}`, 'OK', {
        panelClass: 'error-snackbar',
      });
    }
    answer.value = '';
    answer.focus();
  }

  openSnackBar(message: string, action: string, options: any = {}) {
    this.snackBarRef.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      ...options,
    });
  }
}
