import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ReferenceUtilsService } from '../reference-utils.service';
import { ReferenceService } from '../reference.service';

@Component({
  selector: 'app-refrence-type-data',
  templateUrl: './refrence-type-data.component.html',
  styleUrls: ['./refrence-type-data.component.css']
})
export class RefrenceTypeDataComponent implements OnInit, OnDestroy {

  activeRefType
  referenceData$ = new Subject() 
  loading
  uploadURI
  sub
  constructor(public utils: ReferenceUtilsService, public service:ReferenceService) { 
    this.sub =this.utils.activeRefType$.subscribe((activeRefType)=>{
      this.activeRefType=activeRefType
      this.uploadURI = this.service.ReferenceDataImport(activeRefType);
      this.laodData()
    })
  }
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
  }

  ngOnInit(): void {
    
  }

  laodData(){
    this.referenceData$.next([])
    if( this.activeRefType )
      this.loading = true
      this.service.getReferenceDataByType(this.activeRefType.id).subscribe(
        (data:any) => {
          this.referenceData$.next(data)
          this.loading = false
        }
        )
      
  }

  addRefrenceType(){
    this.utils.onAddRefData(this.activeRefType).subscribe(res=> this.laodData())
  }

  editRefrenceType(data){
    this.utils.onEditRefData(data).subscribe(res=> this.laodData())
  }

  deleteRefrenceType(data){
    this.utils.onDeleteRefData(data).subscribe(res=> this.laodData())
  }

  handleChange(info: any): void {
    if (info.file.status !== 'uploading') {
      this.loading = true;
    }
    if (info.file.status === 'done') {
      // this.notification.success(`Fields updated successfully from file ${info.file.name}.`);
      this.laodData();
    } else if (info.file.status === 'error') {
      // this.notification.error(`Failed to update.`);
      this.laodData();
    }
  }
}
