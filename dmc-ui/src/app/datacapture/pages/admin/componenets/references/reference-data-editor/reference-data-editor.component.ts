import { Component, OnInit } from '@angular/core';
import { DATA_TYPES } from '@app/shared/utils/types';
import { NzModalRef } from 'ng-zorro-antd';
import { EntityModal } from '../../../modals/entity-modal';
import { ReferenceService } from '../reference.service';

@Component({
  selector: 'app-reference-data-editor',
  templateUrl: './reference-data-editor.component.html',
  styleUrls: ['./reference-data-editor.component.css']
})
export class ReferenceDataEditorComponent extends EntityModal implements OnInit {

  constructor(modalrRef: NzModalRef, private service:ReferenceService) { 
    super(modalrRef)
  }

  types = DATA_TYPES
  refType = null

  ngOnInit() {
    super.ngOnInit()

    this.service.getReferenceTypesById(this.data.ref_type_id).subscribe(refType=>this.refType = refType)
  }

  onSave = () => {
    this.loading = true
    this.service.saveReferenceData(this.data).subscribe(res=>{
      this.save()
    },()=> this.loading = false)
  }
}
