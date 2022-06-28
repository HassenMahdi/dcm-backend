import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DomainService } from '@app/datacapture/pages/admin/services/domain.service';
import { SuperDomainService } from '@app/datacapture/pages/admin/services/super-domain.service';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { iif } from 'rxjs/internal/observable/iif';
import { map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {

  collectionId$ = new BehaviorSubject(null)

  constructor(private router: Router) {}

  setCollection(id){
    this.collectionId$.next(id)
  }

  goToCollectionData(id){
    this.setCollection(id)
    this.router.navigate(['datacapture', 'explorer', 'data'])
  }
}
