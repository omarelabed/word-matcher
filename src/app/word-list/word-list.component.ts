import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { WordMatch } from '../word-match';
import { WordMatchService } from '../word-match.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss'],
})
export class WordListComponent {

  wordMatches: WordMatch[] = [];
  dataSource: MatTableDataSource<WordMatch>;
  
  wordAHeader = 'Wort 1';
  wordBHeader = 'Wort 2';
  
  newWordA = '';
  newWordB = '';

  displayedColumns: string[] = ['wordA', 'wordB', 'actions'];
  wordMatchService = inject(WordMatchService);

  @ViewChild(MatSort) sort: MatSort | null = null;


  constructor() {
    this.wordMatches = this.wordMatchService.getAllWordMatches();
    this.dataSource = new MatTableDataSource(this.wordMatches);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onNewWordMatchSubmit(wordMatch: WordMatch) {
    this.wordMatchService.addWordMatch(wordMatch);
    this.dataSource = new MatTableDataSource(
      this.wordMatchService.getAllWordMatches()
    );
  }

  deleteWordMatch(wordMatch: WordMatch) {
    this.wordMatchService.deleteWordMatch(wordMatch);
    this.dataSource = new MatTableDataSource(
      this.wordMatchService.getAllWordMatches()
    );
  }

  updateWordMatch(oldWordMatch: WordMatch, newWordMatch: WordMatch) {
    this.wordMatchService.updateWordMatch(oldWordMatch, newWordMatch);
    this.dataSource = new MatTableDataSource(
      this.wordMatchService.getAllWordMatches()
    );
  }

  toggleEditMode({wordA, wordB}: WordMatch) {
    this.wordMatches.map((wm) => {
      if (wm.wordA === wordA && wm.wordB === wordB) {
        wm.editMode = !wm.editMode;
      }
      return wm;
    });
  }
}
