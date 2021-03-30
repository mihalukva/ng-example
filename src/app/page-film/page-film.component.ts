import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../services/film.service';
import { ActorService } from '../services/actor.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-page-film',
  templateUrl: './page-film.component.html',
  styleUrls: ['./page-film.component.scss'],
})
export class PageFilmComponent implements OnInit {
  film: any = undefined;
  actor: any = undefined;
  onMouseEnter = new Subject<any>();
  onMouseLeave = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private actorService: ActorService
  ) {
    this.filmService.film$.subscribe((film) => (this.film = film));
    this.actorService.actor$.subscribe((actor) => {
      this.actor = actor;
    });
    this.onMouseEnter
      .pipe(debounceTime(100))
      .subscribe((x) => this.showActorCard(x));
    this.onMouseEnter
      .pipe(debounceTime(1000))
      .subscribe((x) => this.hideActorCard(x));
  }
  position: any = {
    left: '100%',
    top: '0',
  };

  isMouseOnActorHint = false;
  showActorCard(param: any) {
    if (param !== undefined) {
      this.actorService.actorId$.next(param.actorId);
      this.isActorHintVisible = true;
      setTimeout(() => {
        let actorHint: any = document.getElementById('actorHint');
        let styles = window.getComputedStyle(actorHint, null);
        let width = styles.getPropertyValue('width');
        this.position.left =
          param.target.layerX - +width.replace('px', '') + 'px';
        this.position.top = param.target.layerY + 'px';
      }, 200);
    }
  }
  isActorHintVisible = false;
  hideActorCard(param: any) {
    if (param === undefined && !this.isMouseOnActorHint) {
      this.isActorHintVisible = false;
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>
      this.filmService.filmId$.next(params.id)
    );
  }
}
