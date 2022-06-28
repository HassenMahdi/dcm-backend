import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { AppState, selectToken } from '@app/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private http: HttpClient, private store: Store<AppState>) {
  }

  getUsers() {
    return this.http.get(environment.auth + `user/`);
  }

  getDomains() {
    return this.http.get(environment.admin + 'domain/super/');
  }

  addUser(user: any): Observable<any> {
    return this.http.post(environment.auth + `user/`, user);
  }

  editUser(user: any): Observable<any> {
    return this.http.put(environment.auth + `user/`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(environment.auth + `user/${id}`);
  }
}
