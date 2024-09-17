import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { WordListComponent } from './word-list/word-list.component';
import { ExerciseComponent } from './exercise/exercise.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTabGroup,
    MatTab,
    WordListComponent,
    ExerciseComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'word-matcher';
}
