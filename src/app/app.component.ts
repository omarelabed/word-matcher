import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { WordListComponent } from './word-list/word-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTabGroup, MatTab, WordListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'word-matcher';
}
