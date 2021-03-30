import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  public filmId$ = new BehaviorSubject<string>('0');
  public film$ = new BehaviorSubject(null);
  
  constructor(private http: HttpClient) {
    this.filmId$.subscribe((x) => this.get());
  }
  private get() {
    let url = `./api/films?id=${this.filmId$.value}`;
    this.http.get(url).subscribe((data: any) => {
      this.film$.next(data[0]);
    });
  }
}
