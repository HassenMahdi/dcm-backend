import { Component, Input, OnInit } from '@angular/core';
import { MakeProvider, AbstractValueAccessor } from '@app/datacapture/pages/upload/components/transformation/shared/abstarct.accessor';
import { AdminNavigator } from '../../services/admin-navigator.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { TargetFieldsService } from '../../services/fields.service';
import { withLatestFrom, tap, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-field-input',
  templateUrl: './field-input.component.html',
  styleUrls: ['./field-input.component.css'],
  providers: [MakeProvider(FieldInputComponent)]
})
export class FieldInputComponent extends AbstractValueAccessor implements OnInit {

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
