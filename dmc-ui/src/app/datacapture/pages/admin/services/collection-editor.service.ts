import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { map, take, tap } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Subject, ReplaySubject, Observable, Observer } from 'rxjs';
import { DomainService } from './domain.service';
import { DomainConfigModalComponent } from '../modals/domain-config-modal/domain-config-modal.component';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { Domain } from '../models/domain';
import { SuperDomainService } from './super-domain.service';

@Injectable()
export class CollectionEditor {

  constructor(private ds: DomainService, private modal: NzModalService, private sds: SuperDomainService) {}

  loading = false;

  openConfig(data, super_domain_id) {

    const edit = data? true : false;
    let obj = new Domain(super_domain_id)
    if (data) {
      obj = {...data};
    }

    const modal = this.modal.create({
      nzTitle: 'Collection Configuration',
      nzFooter:[],
      nzContent: DomainConfigModalComponent,
      nzComponentParams: {
        data: obj,
        edit
      },
    });

    const instance = modal.getContentComponent();

    return Observable.create((done: Observer<any>) => {
      
    modal.afterClose.subscribe(result => {
      if (result){
        // this.ds.saveDomain(result).subscribe((saved)=>{
        this.load_data()
        done.next(result)
        done.complete()
        // })
      }
    });
    })
    

  }

  showDeleteConfirm(data) {
    let done = new Subject()
    const confirmModal = this.modal.confirm({
      nzTitle: 'Confirm Domain Deletion',
      nzContent: 'This action is irreversible. Once a domain is deleted everything related to this domain will also be erased',
      nzOnOk: () => {
        this.loading = true
        this.ds.deleteDomain(data).subscribe(()=> {
          this.load_data()
          done.next(true)
          done.complete()
        })
      }
    });

    return done;
  }

  showCopyConfirm(data) {
    let done = new Subject()
    const confirmModal = this.modal.confirm({
      nzTitle: 'Confirm Domain Duplication',
      nzContent: 'This action is irreversible. Target Fields will be duplicated for this collection.',
      nzOnOk: () => {
        this.loading = true
        this.ds.duplicateDomain(data).subscribe(()=> {
          this.load_data()
          done.next(true)
          done.complete()
        })
      }
    });
    return done
  }

  load_data(){
    this.updateHierarchy()
  }

  updateHierarchy(){
    this.sds.loadHierarchy()
  }

}
