import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  public actorId$ = new BehaviorSubject<string>('0');
  public actor$ = new BehaviorSubject(null);
  
  constructor(private http: HttpClient) {
    this.actorId$.subscribe((x) => this.get());
  }
  private get() {
    let url = `./api/actors?id=${this.actorId$.value}`;
    this.http.get(url).subscribe((data: any) => {
      this.actor$.next(data[0]);
    });
  }
}
