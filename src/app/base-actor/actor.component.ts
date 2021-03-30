import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Storage } from '../services/storage.interface';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss'],
})
export class ActorComponent implements OnInit {
  @Input() actor: any = {};
  @Output() actorClick = new EventEmitter<string>();

  constructor() {}

  private favoriteActors: Storage = new LocalStorageService('favoriteActors');
  favorite: boolean = false;
  toggleItem(storage: Storage, key: string): void {
    if (storage.getItem(key) !== null) {
      storage.deleteItem(key);
    } else {
      storage.setItem(key, 'true');
    }
  }
  favoriteButtonClick(id: string) {
    this.toggleItem(this.favoriteActors, id);
    this.favorite = !this.favorite;
  }
  ngOnInit(): void {
    this.favorite =
      this.favoriteActors.getItem(this.actor.id) === 'true' ? true : false;
  }
}
