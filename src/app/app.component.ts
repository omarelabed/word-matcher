import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTabGroup, MatTab],
  template: `
  <main>
  <h1>Word Matcher</h1>
  <mat-tab-group>
    <mat-tab label="Erfassen">
      Erfassen / Liste
    </mat-tab>
    <mat-tab label="Trainieren">
      Trainieren
    </mat-tab>
    <mat-tab label="Prüfung">
      Prüfung
    </mat-tab>
  </mat-tab-group>
</main>
`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'word-matcher';
}
