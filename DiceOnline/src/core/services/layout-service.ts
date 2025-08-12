import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private showHeaderFooterSubject = new BehaviorSubject<boolean>(true);
  showHeaderFooter$ = this.showHeaderFooterSubject.asObservable();

  // Routes zonder header/footer
  private noHeaderFooterRoutes: string[] = ['/sandbox'];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderFooterVisibility(event.urlAfterRedirects);
      }
    });
  }

  private updateHeaderFooterVisibility(url: string) {
    if (this.isNoHeaderFooterPage(url)) {
      this.showHeaderFooterSubject.next(false);
    } else {
      this.showHeaderFooterSubject.next(true);
    }
  }

  private isNoHeaderFooterPage(url: string): boolean {
    return this.noHeaderFooterRoutes.includes(url);
  }
}