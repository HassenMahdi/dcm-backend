import { Component, Input, OnInit } from '@angular/core';
import { MakeProvider, AbstractValueAccessor } from '@app/datacapture/pages/upload/components/transformation/shared/abstarct.accessor';
import { BehaviorSubject } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { AdminNavigator } from '../../services/admin-navigator.service';
import { TargetFieldsService } from '../../services/fields.service';

@Component({
  selector: 'app-reference-input',
  templateUrl: './reference-input.component.html',
  styleUrls: ['./reference-input.component.css'],
  providers: [MakeProvider(ReferenceInputComponent)]
})
export class ReferenceInputComponent extends AbstractValueAccessor implements OnInit {

  @Input() types = null
  fields$ = new BehaviorSubject([])
  // COULD BE SET AS INPUT INSTEAD
  collectionID$
  open = false

  loading$ = new BehaviorSubject(false)
  
  constructor(private nav: AdminNavigator, private fields:TargetFieldsService) { 
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
    this.reset()
    this.loading$.next(true)
    this.collectionID$.pipe(
      switchMap((colID)=>this.fields.getSimple(colID)),
      tap((fileds:any[])=> this.fields$.next(fileds)),
      tap(()=> this.loading$.next(false),
      catchError(()=>{this.reset(); return null})
      )
      ).subscribe()
  }

  reset(){
    this.loading$.next(false)
    this.fields$.next(null)
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);
}