import { Component, OnInit } from '@angular/core';
import { ActorService } from '../services/actor.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-page-actor',
  templateUrl: './page-actor.component.html',
  styleUrls: ['./page-actor.component.scss'],
})
export class PageActorComponent implements OnInit {
  actor: any = null;
  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute
  ) {
    this.actorService.actor$.subscribe((actor) => {
      this.actor = actor;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.actorService.actorId$.next(params.id);
    });
  }
}
