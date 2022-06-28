import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminNavigator } from '../../../services/admin-navigator.service';
import { ReferenceUtilsService } from '../reference-utils.service';
import { ReferenceService } from '../reference.service';

@Component({
  selector: 'app-refrence-types',
  templateUrl: './refrence-types.component.html',
  styleUrls: ['./refrence-types.component.css']
})
export class RefrenceTypesComponent implements OnInit, OnDestroy {

  collection_id
  sub: any;
  constructor(public utils: ReferenceUtilsService, private service: ReferenceService, private nav: AdminNavigator) {
    this.sub = this.nav.activeSubDomina$.pipe(tap((id)=> {
      const diff = id != this.collection_id 
      this.collection_id = id
      if (  this.collection_id  ){
        if (diff){
          this.laodData()
        }
      } else {
        this.laodData()
      }
        
      
    })).subscribe()
  }
  ngOnDestroy(): void {
    if ( this.sub ) this.sub.unsubscribe()
  }

  ngOnInit() {}

  laodData(){
    this.service.getReferenceTypesByCollection(this.collection_id).subscribe(
      (data:any) => {
        this.list$.next(data)
      }
    )
  }

  list$ = new BehaviorSubject([])

  addRefrenceType(){
    this.utils.onAddRefType(this.collection_id).subscribe(res=> this.laodData())
  }

  editRefrenceType(refType){
    this.utils.onEditRefType(refType).subscribe(res=> this.laodData())
  }

  deleteRefrenceType(refType){
    this.utils.onDeleteRefType(refType).subscribe(res=> this.laodData())
  }

  shareRefrenceType(refType){
    this.utils.openShareRefType(refType).subscribe(res=> this.laodData())
  }

  openReferenceData(item){
    this.utils.setActiveRefType(item)
  }
}
