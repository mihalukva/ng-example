import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
interface IRoute {
  path: string;
  redirectTo: string;
}
@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private routes: Array<IRoute> = [
    { path: '/films', redirectTo: '/films?display=all&page=1&limit=10' },
    {
      path: '/films?display=all',
      redirectTo: '/films?display=all&page=1&limit=10',
    },
    {
      path: '/films?display=marked',
      redirectTo: '/films?display=marked&page=1&limit=10',
    },
    {
      path: '/films?display=watched',
      redirectTo: '/films?display=watched&page=1&limit=10',
    },
    {
      path: '/films?display=favorite',
      redirectTo: '/films?display=favorite&page=1&limit=10',
    },

    { path: '/actors', redirectTo: '/actors?display=all&page=1&limit=10' },
    {
      path: '/actors?display=all',
      redirectTo: '/actors?display=all&page=1&limit=10',
    },
    {
      path: '/actors?display=favorite',
      redirectTo: '/actors?display=favorite&page=1&limit=10',
    },
  ];
  private routeSubscription: any;
  constructor(public router: Router) {
    this.routeSubscription = this.router.events
      .pipe(filter((event: any) => event instanceof NavigationStart))
      .subscribe((event) => {
        const routeToRedirect = this.findRoute(event.url);
        this.redirectTo(routeToRedirect);
      });
  }
  private redirectTo(route: IRoute | null) {
    if (route !== null) {
      this.router.navigateByUrl(route.redirectTo);
    }
  }
  private findRoute(route: string): IRoute | null {
    const routeNumber = this.routes.findIndex((value) => {
      return route === value.path;
    });
    if (routeNumber !== -1) {
      return this.routes[routeNumber];
    } else {
      return null;
    }
  }
}
