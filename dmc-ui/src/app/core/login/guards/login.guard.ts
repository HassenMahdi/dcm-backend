import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppState, selectIsAuthenticated } from '@app/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({providedIn: 'root'})
export class DatafactureGuard implements CanActivate {
  isAuthenticated: boolean;
  isAuthenticated$: Observable<boolean>;
  constructor(private store: Store<AppState>, private router: Router, private service: LoginService) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.isAuthenticated$.subscribe((res: boolean) => {this.isAuthenticated = res; });
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return new Observable((observer)=>{
      if (this.isAuthenticated) {
        observer.next(true);
      } else {
        this.service.attemptLogin().subscribe(succeeded=>{
          if(succeeded){
            observer.next(true)
            // this.router.navigate(['/datacapture']);
          } else {
            observer.next(false) 
            this.router.navigate(['/login']);
          }
        })
      }
    })
  }
}
