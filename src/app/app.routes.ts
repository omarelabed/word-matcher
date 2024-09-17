import { Routes } from '@angular/router';
import { ExerciseComponent } from './exercise/exercise.component';
import { QuizComponent } from './quiz/quiz.component';
import { WordListComponent } from './word-list/word-list.component';

export const routes: Routes = [
    { path: '', component: WordListComponent },
    { path: 'exercise', component: ExerciseComponent },
    { path: 'quiz', component: QuizComponent },
];
