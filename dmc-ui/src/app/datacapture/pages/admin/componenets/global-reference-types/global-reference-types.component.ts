import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminNavigator } from '../../services/admin-navigator.service';
import { ReferenceUtilsService } from '../references/reference-utils.service';
import { ReferenceService } from '../references/reference.service';

@Component({
  selector: 'app-global-reference-types',
  templateUrl: './global-reference-types.component.html',
  styleUrls: ['./global-reference-types.component.css']
})
export class GlobalReferenceTypesComponent implements OnInit {

  constructor(public utils: ReferenceUtilsService, private service: ReferenceService, private nav:AdminNavigator) {
    this.laodData()
  }

  ngOnInit() {}

  laodData(){
    this.service.getReferenceTypesByCollection(null).subscribe(
      (data:any) => {
        this.list$.next(data)
      }
    )
  }

  list$ = new BehaviorSubject([])

  addRefrenceType(){
    this.utils.onAddRefType(null).subscribe(res=> this.laodData())
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
    this.nav.gotToRefData(item.id)
  }

  OnEditVersion(refType, refTypeVersion){
    this.utils.editRefTypeVersion(refType, refTypeVersion).subscribe(res=> this.laodData())
  }

  OnCreateVersion(refType){
    this.utils.createRefTypeVersion(refType).subscribe(res=> this.laodData())
  }
}
