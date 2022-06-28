import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  appSize$= new BehaviorSubject('default')

  constructor() { }

  setDefaultSize(){
    this.appSize$.next('default')
  }
  setCompactSize(){
    this.appSize$.next('compact')
  }
}
