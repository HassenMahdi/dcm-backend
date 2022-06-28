import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminNavigator {

  activeDomain$ = new BehaviorSubject(null);
  activeSubDomina$ = new BehaviorSubject(null);

  constructor(private router: Router, private active: ActivatedRoute) {

    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd && event.url) {
        const phrase = event.url; 
        const collection = /collection\/([0-9a-zA-z]*)\//.exec(phrase);
        const domain = /domains\/([0-9a-zA-z]*)\//.exec(phrase);

        this.activeDomain$.next((domain || [])[1]);
        this.activeSubDomina$.next((collection || [])[1]);
      }
    });
   }

  goToSuperDomainCollections(id){
    this.router.navigate(['datacapture', 'admin', 'domains', id, 'collection'])
  }

  goToDomainFields(id, colid){
    this.router.navigate(['datacapture', 'admin', 'domains', id, 'collection', colid, 'fields'])
  }

  goToDomains(){
    this.router.navigate(['datacapture', 'admin', 'domains'])
  }

  goToDomainRefrences(id){
    this.router.navigate(['datacapture', 'admin', 'domains', id, 'collection'])
  }

  gotToRefData(ref_type_id: any) {
    this.router.navigate(['datacapture', 'admin', 'references', ref_type_id])
  }

  gotToRefTypes() {
    this.router.navigate(['datacapture', 'admin', 'references'])
  }
}
