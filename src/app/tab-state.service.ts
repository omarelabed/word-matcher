import { Injectable } from '@angular/core';
import { Tab } from './tab';

export const TABS: Tab[] = [
  {
    label: 'Erfassen',
    routerLink: '/',
    disabled: false,
    link: '',
  },
  {
    label: 'Trainieren',
    routerLink: '/exercise',
    disabled: false,
    link: 'exercise',
  },
  {
    label: 'Prüfung',
    routerLink: '/quiz',
    disabled: false,
    link: 'quiz',
  },
];

@Injectable({
  providedIn: 'root'
})
export class TabStateService {

  tabs: Tab[] = TABS;

  constructor() { }

  getTabs(): Tab[] {
    return this.tabs;
  }

  disableAllBut(link: string) {
    this.tabs.forEach(tab => {
      tab.disabled = tab.link !== link;
    });
  }

  enableAll() {
    this.tabs.forEach(tab => {
      tab.disabled = false;
    });
  }
}
