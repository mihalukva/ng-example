import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Storage } from './storage.interface';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class ActorListService {
  findItems$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  actorList$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  length$: BehaviorSubject<number> = new BehaviorSubject<number>(25);

  constructor(private http: HttpClient) {}

  private storageName: any = {
    actors: { favorite: 'favoriteActors' },
    films: {
      marked: 'markedFilms',
      favorite: 'favoriteFilms',
      watched: 'watchedFilms',
    },
  };
  createServerUrl(path: string, queryParams: any) {
    let url = `./api/` + path + '?';
    if (queryParams.display === 'all')
      url += `_page=${queryParams.page}&_limit=${queryParams.limit}`;
    else {
      let storageName = this.storageName[path][queryParams.display];
      const storage = new LocalStorageService(storageName);
      this.length$.next(storage.length());
      const ids = this.idList(
        storageName,
        +queryParams.page,
        +queryParams.limit
      );
      if (ids.length === 0) {
        url += `_start=0&_end=0`;
      } else {
        url += ids.join('&');
      }
    }
    return url;
  }

  getData(url: string) {
    this.http.get(url, { observe: 'response' }).subscribe((data: any) => {
      this.actorList$.next(data.body);
      if (data.headers.get('X-Total-Count') !== null) {
        this.length$.next(data.headers.get('X-Total-Count'));
      }
    });
  }
  private idList(storageName: string, page: number, limit: number) {
    const favoriteActorsStorage: Storage = new LocalStorageService(storageName);
    const storageObj = favoriteActorsStorage.getAll();
    const actorIdList = Object.keys(storageObj);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let ids: Array<string> = [];
    for (let i = startIndex; i < endIndex && i < actorIdList.length; i++) {
      ids.push('id=' + actorIdList[i]);
    }
    return ids;
  }
  findByName(value: string) {
    let url = `./api/actors?secondaryName_like=${value}`;
    this.http.get(url, { observe: 'response' }).subscribe((data: any) => {
      if (data.body.length > 0) {
        this.findItems$.next(this.transformFindResult(data.body));
      } else {
        let url = `./api/actors?primaryName_like=${value}`;
        this.http.get(url, { observe: 'response' }).subscribe((data: any) => {
          this.findItems$.next(this.transformFindResult(data.body));
        });
      }
    });
  }
  private transformFindResult(data: Array<any>) {
    let findResult: Array<any> = [];
    data.forEach((element: any) => {
      const newItem = {
        value: element.primaryName,
        link: 'actor/' + element.id,
        img: './images/actors/' + element.poster.name + '.jpeg',
        text: element.primaryName + ' | ' + element.secondaryName,
      };
      findResult.push(newItem);
    });
    return findResult;
  }
}
