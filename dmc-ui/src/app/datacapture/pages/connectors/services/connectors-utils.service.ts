import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ConnectorTypesComponent } from '../modals/connector-types/connector-types.component';

import * as _ from "lodash"
import { ConnectorsService } from './connectors.service';
import { CONNECTOR_TYPES } from '../models/connectors.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectorsUtilsService {

  constructor(private modal:NzModalService, private drawer:NzModalService, private service: ConnectorsService) { }

  addConnector(){
    return new Observable((observer)=>{
      const types_modal = this.modal.create({
        nzContent:ConnectorTypesComponent,
        nzFooter:null,
        nzTitle:'Add New Connector'
      })
      
      types_modal.afterClose.subscribe((type)=>{
      if(type){
        this.openSetup({type}).subscribe(()=>{
          observer.next(true)
        }, null, ()=> observer.complete())
      }
      })
    })
  }

  editConnector(connector){
    return new Observable(observer=>{
      this.service.getOne(connector.id).subscribe(connector_data=>{
        this.openSetup(connector_data).subscribe(()=>{
          observer.next(true)
        }, null, ()=> observer.complete())
      })
    })

  }

  openSetup(connector){
    return new Observable((observer)=>{

      const connector_def = this.CONNECTOR_TYPES.find((e)=>e.type==connector.type) 
      
      const default_connector = {
        name:connector_def.label,
        creation_date: new Date()
      }
      const data = {...default_connector, ...connector}
      const connector_modal = this.modal.create({
        nzContent:connector_def.setupComponenet,
        nzBodyStyle:{padding:"0"},
        nzComponentParams:{
          data
        },
        nzTitle: `<i>${connector_def.label}</i> Connector Setup`,
        nzOkText:'Save',
        nzOnOk:()=>{
          return new Promise((resolve)=>{
            const comp = connector_modal.componentInstance
            comp.submitForm()
            if (comp.isValid()){
              this.service.save(comp.getModel()).subscribe(()=>{
                observer.next(true)
                observer.complete()
                resolve()
              }, ()=> resolve(false))
            } else {
              resolve(false)
            }
          })
        },
      })
    })
  }


  tryToDelete(connector){
    return new Observable(observer=>{
      this.modal.confirm({
        nzTitle: 'Are you sure delete this Connector?',
        nzContent: 'This action cannot be reverted.',
        nzOkText: 'Yes',
        nzOkType: 'danger',
        nzOnOk: () => {this.service.delete(connector.id).subscribe(res=> observer.next(res))},
        nzCancelText: 'No'
      })
    })
  }

  CONNECTOR_TYPES = CONNECTOR_TYPES
}
