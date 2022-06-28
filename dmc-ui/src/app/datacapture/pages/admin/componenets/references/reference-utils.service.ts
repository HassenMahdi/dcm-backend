import { Injectable } from '@angular/core';
import { deepCopy } from '@app/shared/utils/objects.utils';
import { NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ShareWithCollectionsComponent } from '../../modals/share-with-collections/share-with-collections.component';
import { ReferenceDataEditorComponent } from './reference-data-editor/reference-data-editor.component';
import { ReferenceTypeVersionEditorComponent } from './reference-type-version-editor/reference-type-version-editor.component';
import { RefernceType, RefernceTypeVersion } from './reference-type.model';
import { RefernceData } from './reference.model';
import { ReferenceService } from './reference.service';
import { RefrenceTypeEditorComponent } from './refrence-type-editor/refrence-type-editor.component';

@Injectable()
export class ReferenceUtilsService {
  setActiveRefType(item: any) {
    this.activeRefType$.next(item)
  }

  constructor(private modal: NzModalService, private service: ReferenceService) { }

  activeRefType$ = new Subject()

  onAddRefType(collection_id){
    return this.openRefTypeEditor(new RefernceType(collection_id))
  }

  onEditRefType(refType){
    return this.openRefTypeEditor(refType)
  }

  openRefTypeEditor(refType:RefernceType){
    return new Observable(observer=>{
      this.modal.create({ nzContent: RefrenceTypeEditorComponent,
        nzComponentParams: {data: deepCopy(refType)},
      }).afterClose.subscribe(success => {
        if(success){
          observer.next(success)
          observer.complete()
        }
      });
    })
  }

  openShareRefType(refType:RefernceType){
    return new Observable(observer=>{
      this.modal.create({ nzContent:   ShareWithCollectionsComponent,
        nzComponentParams: {data: deepCopy(refType)},
      }).afterClose.subscribe(success => {
        if(success){
          observer.next(success)
          observer.complete()
        }
      });
    })
  }

  editRefTypeVersion(refType:any, refTypeVersion:any){
    if (refTypeVersion.parent_id){
      return this.openRefTypeVersionEditor(refTypeVersion)
    } else {
      return this.openRefTypeVersionEditor(refType)
    }
  }

  createRefTypeVersion(refType){
    const v = new RefernceTypeVersion(refType.id)
    return this.openRefTypeVersionEditor(v)
  }

  openRefTypeVersionEditor(refTypeVersion:RefernceTypeVersion){
    return new Observable(observer=>{
      this.modal.create({ nzContent: ReferenceTypeVersionEditorComponent,
        nzComponentParams: {data: deepCopy(refTypeVersion)},
      }).afterClose.subscribe(success => {
        if(success){
          observer.next(success)
          observer.complete()
        }
      });
    })
  }

  onAddRefData(refType:RefernceType){
    return this.openRefDataEditor(new RefernceData(refType))
  }

  onEditRefData(refData){
    return this.openRefDataEditor(refData)
  }

  openRefDataEditor(refData:RefernceData){
    return new Observable(observer=>{
      this.modal.create({ nzContent: ReferenceDataEditorComponent,
        nzComponentParams: {data: deepCopy(refData)},
      }).afterClose.subscribe(success => {
        if(success){
          observer.next(success)
          observer.complete()
        }
      });
    })
  }

  onDeleteRefData(data){
    return new Observable(observer=>{
      this.modal.confirm({
        nzTitle: 'Are you sure delete this Reference?',
        nzContent: 'This action cannot be reverted.',
        nzOkText: 'Yes',
        nzOkType: 'danger',
        nzOnOk: () => {this.service.deleteReferenceData(data).subscribe(res=> observer.next(res))},
        nzCancelText: 'No',
        nzOnCancel: () => console.log('Cancel')
      })
    })
  }

  onDeleteRefType(data){
    return new Observable(observer=>{
      this.modal.confirm({
        nzTitle: 'Are you sure delete this Reference?',
        nzContent: 'This action cannot be reverted.',
        nzOkText: 'Yes',
        nzOkType: 'danger',
        nzOnOk: () => {this.service.deleteReferenceType(data).subscribe(res=> observer.next(res))},
        nzCancelText: 'No',
        nzOnCancel: () => console.log('Cancel')
      })
    })
  }
}
