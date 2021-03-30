import { Component, OnInit } from '@angular/core';
import { PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { ActorListService } from '../services/actor-list.service';

@Component({
  selector: 'app-page-actor-list',
  templateUrl: './page-actor-list.component.html',
  styleUrls: ['./page-actor-list.component.scss'],
})
export class PageActorListComponent implements OnInit {
  findItems: any = [];
  actorList: any = [];
  private routeSubscription: any;
  currentPath = '';
  display = '';
  length = 25;
  pageSize = 10;
  _pageIndexForPaginator = 0;

  get pageIndex(): number {
    return this._pageIndexForPaginator + 1;
  }
  set pageIndex(value: number) {
    this._pageIndexForPaginator = value - 1;
  }

  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
    private route: ActivatedRoute,
    public router: Router,
    private actorListService: ActorListService,
    private http: HttpClient
  ) {
    this.setPaginatorLabels();
    this.subscribeOnRouteChange();
    actorListService.length$.subscribe((value) => (this.length = value));
    actorListService.actorList$.subscribe((actorList) => {
      this.actorList = actorList;
    });
    actorListService.findItems$.subscribe((value) => {
      this.findItems = value;
    });
  }
  findByName(value: string) {
    this.actorListService.findByName(value);
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
    const serverUrl = this.actorListService.createServerUrl(
      this.currentPath,
      this.route.snapshot.queryParams
    );
    this.actorListService.getData(serverUrl);
  }
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
  ngOnInit() {}
}
