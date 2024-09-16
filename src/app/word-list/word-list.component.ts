import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { WordMatch } from '../word-match';

@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './word-list.component.html',
})
export class WordListComponent {
  wordMatches: WordMatch[] = [];
  dataSource: MatTableDataSource<WordMatch>;

  @ViewChild(MatSort) sort: MatSort | null = null;

  displayedColumns: string[] = ['language1', 'language2'];

  language1 = { key: 'de', name: 'German' };
  language2 = { key: 'it', name: 'Italian' };

  constructor() {
    this.wordMatches = [
      { language1: 'Hund', language2: 'Cane' },
      { language1: 'Katze', language2: 'Gatto' },
      { language1: 'Maus', language2: 'Topo' },
      { language1: 'Pferd', language2: 'Cavallo' },
      { language1: 'Schaf', language2: 'Pecora' },
      { language1: 'Kuh', language2: 'Mucca' },
      { language1: 'Ziege', language2: 'Capra' },
      { language1: 'Huhn', language2: 'Pollo' },
      { language1: 'Ente', language2: 'Anatra' },
      { language1: 'Schwein', language2: 'Maiale' },
    ].sort((a, b) => a.language1.localeCompare(b.language1));

    this.dataSource = new MatTableDataSource(this.wordMatches);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
