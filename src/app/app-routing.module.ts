import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageFilmComponent } from './page-film/page-film.component';
import { PageActorComponent } from './page-actor/page-actor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageStartComponent } from './page-start/page-start.component';

import { PageActorListComponent } from './page-actor-list/page-actor-list.component';
import { PageFilmListComponent } from './page-film-list/page-film-list.component';

import { RouterService } from './services/additional-router.service';
const routes: Routes = [
  { path: '', component: PageStartComponent },
  { path: 'actors', component:PageActorListComponent },
  { path: 'films', component:PageFilmListComponent },
  { path: 'actor/:id', component: PageActorComponent },
  { path: 'film/:id', component: PageFilmComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private routerService: RouterService){}
}
