import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Session } from 'protractor';
import { Observable } from 'rxjs';
import { ActionAuthLogin, selectIsAuthenticated } from '@app/core';
import { Store } from '@ngrx/store';
import { catchError, tap } from 'rxjs/operators';
import { ActionAuthLogout } from '@app/core/auth/auth.actions';
import { Router } from '@angular/router';
import { selectProfile } from '@app/core/auth/auth.selectors';
import { NotificationService } from '@app/core/notifications/notification.service';

@Injectable({providedIn: 'root'})
export class LoginService {

  KEY_USER_EMAIL = 'DCM_USER'
  KEY_USER_PASS = 'DCM_PASS'

  isAuthenticated = false;
  profile = null;

  constructor(private http: HttpClient, private store: Store<any>, private router: Router, private msg: NotificationService) {
    this.store.select(selectIsAuthenticated).subscribe((res: boolean) => {this.isAuthenticated = res; });
    this.store.select(selectProfile).subscribe((res: boolean) => {this.profile = res; });
  }

  requestLogin(email, password){
    return this.http.post(environment.auth + `auth/login`, {email, password}, {headers: {skip: 'true'}})
  }

  login(email: string, password: string) {
    return this.requestLogin(email, password).pipe(
      tap((res:any)=>{
        this.store.dispatch(new ActionAuthLogin(res.Authorization));
        this.router.navigate(['/datacapture'])
      }),
      catchError(this.logout)
    );
  }

  logout() {
    const onLogout = ()=>{
      this.store.dispatch(new ActionAuthLogout())
      this.router.navigate(['/login'])
      this.clearCredentialsPassword()
      return null;
    } 
    return this.http.post(environment.auth + `auth/logout`, {}).pipe(
      tap(onLogout),
      catchError(onLogout)
    );

  }

  resetPw(email: string) {
    return this.http.post(environment.auth + 'user/password', {email});
  }

  updatePw(password: string, token: string) {
    return this.http.put(environment.auth + 'user/password', {token, password});
  }

  info(token: string): any {
    return this.http.get(environment.auth + `auth/info`, {headers: {token}});
  }

  saveCredentialsPassword(email, password){
    // TODO MUST CRYPT DATA
    localStorage.setItem(this.KEY_USER_EMAIL, email)
    localStorage.setItem(this.KEY_USER_PASS, password)
  }

  clearCredentialsPassword(){
    // TODO MUST DECRYPT DATA
    localStorage.removeItem(this.KEY_USER_EMAIL)
    localStorage.removeItem(this.KEY_USER_PASS)
  }

  // Login In Remembered User
  attemptLogin(){
    return new Observable(observer=>{
      const email = localStorage.getItem(this.KEY_USER_EMAIL)
      const password = localStorage.getItem(this.KEY_USER_PASS)
      if(email && password){
        const message = this.msg.loading(`Loging in as ${email}`)
        this.requestLogin(email, password).subscribe((res:any)=>{
          this.store.dispatch(new ActionAuthLogin(res.Authorization));
          observer.next(true)
        }, ()=> {
          observer.next(false)
          this.msg.close(message)
      },()=> this.msg.close(message))
      } else {
        observer.next(false)
      }
    })
  }
}
