import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppState, selectProfile } from '@app/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSuperDomain } from '@app/datacapture/pages/upload/store/selectors/import.selectors';

@Injectable({providedIn: 'root'})
export class RolesGuard implements CanActivate {
  profile: any;
  selectedDomain: string;
  profile$: Observable<any>;
  selectedDomain$: Observable<any>;
  constructor(private store: Store<AppState>, private router: Router) {
    this.profile$ = this.store.select(selectProfile);
    this.selectedDomain$ = this.store.select(selectSuperDomain);
    this.profile$.subscribe((res: any) => {this.profile = res; });
    this.selectedDomain$.subscribe((res: any) => {this.selectedDomain = res; });
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.profile && this.profile.admin) {
      return true;
    } else {
      switch (next.data.role) {
        case 'domainAdmin':
          if (this.profile && this.selectedDomain && this.profile.roles.length > 0) {
            const i = this.profile.roles.map((e) => (e.domain_id)).indexOf(this.selectedDomain);
            if (i >= 0) {
              if (this.profile.roles[i].role === 'domainAdmin') {
                return true;
              }
            }
          }
          this.router.navigate(['/datacapture/upload/cleansing']);
          return false;
        case 'ADMIN': {
          this.router.navigate(['/datacapture/dashboard']);
          return false;
        }
        default:
          return true;
      }
    }
    // canActivate: [AccessGuard],
    // data: {role: 'ADMIN'}
  }
}
