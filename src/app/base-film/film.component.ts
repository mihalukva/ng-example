import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Storage } from '../services/storage.interface';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent implements OnInit {
  @Input() film: any = {};
  @Output() filmClick = new EventEmitter<string>();

  private markedFilms: Storage = new LocalStorageService('markedFilms');
  private watchedFilms: Storage = new LocalStorageService('watchedFilms');
  private favoriteFilms: Storage = new LocalStorageService('favoriteFilms');

  marked: boolean = false;
  watched: boolean = false;
  favorite: boolean = false;

  toggleItem(storage: Storage, key: string): void {
    if (storage.getItem(key) !== null) {
      storage.deleteItem(key);
    } else {
      storage.setItem(key, 'true');
    }
  }
  markButtonClick(id: string) {
    this.toggleItem(this.markedFilms, id);
    this.marked = !this.marked;
  }
  watchButtonClick(id: string) {
    this.toggleItem(this.watchedFilms, id);
    this.watched = !this.watched;
  }
  favoriteButtonClick(id: string) {
    this.toggleItem(this.favoriteFilms, id);
    this.favorite = !this.favorite;
  }
  constructor() {}
  ngOnInit(): void {
    this.marked =
      this.markedFilms.getItem(this.film.id) === 'true' ? true : false;
    this.watched =
      this.watchedFilms.getItem(this.film.id) === 'true' ? true : false;
    this.favorite =
      this.favoriteFilms.getItem(this.film.id) === 'true' ? true : false;
  }
}
