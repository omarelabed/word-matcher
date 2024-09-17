import { Routes } from '@angular/router';
import { WordListComponent } from './word-list/word-list.component';
import { ExerciseComponent } from './exercise/exercise.component';

const routeConfig: Routes = [
  { path: '', component: WordListComponent },
  { path: 'exercise', component: ExerciseComponent },
];

export default routeConfig;
