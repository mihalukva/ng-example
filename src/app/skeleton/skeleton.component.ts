import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent implements OnInit {
  toggleTheme() {
    let rootEl = document.getElementById('root');
    if (rootEl !== null) rootEl.classList.toggle('dark-mode');
  }
  constructor() {}
  ngOnInit(): void {
    this.toggleTheme();
  }
}
