import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { WordListComponent } from './word-list/word-list.component';
import { ExerciseComponent } from './exercise/exercise.component';
import {MatTabsModule} from '@angular/material/tabs';
import { TabStateService } from './tab-state.service';
import { Tab } from './tab';
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
    MatTabsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Word Matcher';
  activeLink = 'manage';
  tabStateService = inject(TabStateService);
  tabs: Tab[] = [];
  
  constructor() {
    this.tabs = this.tabStateService.getTabs();
  }
}
