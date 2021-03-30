import { Component, OnInit } from '@angular/core';
import { PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { FilmListService } from '../services/film-list.service';

@Component({
  selector: 'app-page-film-list',
  templateUrl: './page-film-list.component.html',
  styleUrls: ['./page-film-list.component.scss'],
})
export class PageFilmListComponent implements OnInit {
  findItems: any = [];
  display = '';
  length = 25;
  pageSize = 10;
  _pageIndexForPaginator = 0;
  currentPath = '';
  get pageIndex() {
    return this._pageIndexForPaginator + 1;
  }
  set pageIndex(value) {
    this._pageIndexForPaginator = value - 1;
  }
  filmList: any = [];
  private routeSubscription: any;

  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
    private route: ActivatedRoute,
    public router: Router,
    private filmListService: FilmListService,
    private http: HttpClient
  ) {
    this.setPaginatorLabels();
    this.subscribeOnRouteChange();
    filmListService.length$.subscribe((value) => (this.length = value));
    filmListService.filmList$.subscribe((filmList) => {
      this.filmList = filmList;
    });
    filmListService.findItems$.subscribe((value) => {
      this.findItems = value;
    });
  }
  findByName(value: string) {
    this.filmListService.findByName(value);
  }
  subscribeOnRouteChange() {
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.onUpdateRoute();
      });
  }
  setPaginatorLabels() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Фильмов на странице';
    this.matPaginatorIntl.firstPageLabel = 'Первая';
    this.matPaginatorIntl.lastPageLabel = 'Последняя';
    this.matPaginatorIntl.nextPageLabel = 'Следующая';
    this.matPaginatorIntl.previousPageLabel = 'Предыдущая';
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this._pageIndexForPaginator = event.pageIndex;
    const routeSnapshot = this.route.snapshot;
    const routeQueryParams = routeSnapshot.queryParams;
    this.router.navigate(routeSnapshot.url, {
      queryParams: {
        display: routeQueryParams.display,
        page: this.pageIndex,
        limit: this.pageSize,
      },
    });
  }
  onUpdateRoute(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.pageSize = +queryParams.limit;
    this.pageIndex = +queryParams.page;
    this.display = queryParams.display;
    this.currentPath = this.route.snapshot.url.join('');
    const serverUrl = this.filmListService.createServerUrl(
      this.currentPath,
      this.route.snapshot.queryParams
    );
    this.filmListService.getData(serverUrl);
  }
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
  ngOnInit() {}
}
