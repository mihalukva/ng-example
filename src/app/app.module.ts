import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModules } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SkeletonComponent } from './skeleton/skeleton.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageStartComponent } from './page-start/page-start.component';
import { PageFilmListComponent } from './page-film-list/page-film-list.component';
import { PageActorListComponent } from './page-actor-list/page-actor-list.component';
import { PageActorComponent } from './page-actor/page-actor.component';
import { PageFilmComponent } from './page-film/page-film.component';

import { ActorComponent } from './base-actor/actor.component';
import { FilmComponent } from './base-film/film.component';
import { SearchComponent } from './base-search/search.component';

@NgModule({
  declarations: [
    SkeletonComponent,
    PageFilmComponent,
    PageActorComponent,
    ActorComponent,
    FilmComponent,
    SearchComponent,
    PageNotFoundComponent,
    PageStartComponent,
    PageFilmListComponent,
    PageActorListComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignModules,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [SkeletonComponent],
})
export class AppModule {}
