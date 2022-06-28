import { Component, Input, OnInit } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from '@app/datacapture/pages/upload/components/transformation/shared/abstarct.accessor';
import { BehaviorSubject } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { AdminNavigator } from '../../services/admin-navigator.service';
import { ReferenceService } from '../references/reference.service';

@Component({
  selector: 'app-reference-type-input',
  templateUrl: './reference-type-input.component.html',
  styleUrls: ['./reference-type-input.component.css'],
  providers: [MakeProvider(ReferenceTypeInputComponent)]
})
export class ReferenceTypeInputComponent  extends AbstractValueAccessor implements OnInit {

  list$ = new BehaviorSubject([])
  // COULD BE SET AS INPUT INSTEAD
  collectionID$
  open = false

  loading$ = new BehaviorSubject(false)
  
  constructor(private nav: AdminNavigator, private service:ReferenceService) { 
    super()

    this.collectionID$ = this.nav.activeSubDomina$
  }

  ngOnInit() {
  }


  onOpenChange(open){
    if (open) {
      this.open = true
      this.onOpen()
    } else {
      this.open = false
    }
  }

  onOpen(){
    this.reset();
    this.loading$.next(true);
    this.collectionID$.pipe(
      switchMap((colID)=>this.service.getSimple(colID)),
      tap((fileds:any[])=> this.list$.next(fileds)),
      tap(()=> this.loading$.next(false),
      // catchError(()=>{this.reset(); return null})
      )
      ).subscribe()
  }

  reset(){
    this.loading$.next(false)
    this.list$.next(null)
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

}
