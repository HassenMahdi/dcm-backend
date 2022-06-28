import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/core';
import { camelize } from '@app/shared/utils/strings.utils';
import { DATA_TYPES } from '@app/shared/utils/types';
import { NzModalRef } from 'ng-zorro-antd';
import { EntityModal } from '../../../modals/entity-modal';
import { ReferenceService } from '../reference.service';

@Component({
  selector: 'app-refrence-type-editor',
  templateUrl: './refrence-type-editor.component.html',
  styleUrls: ['./refrence-type-editor.component.css']
})
export class RefrenceTypeEditorComponent extends EntityModal implements OnInit {
  types = DATA_TYPES;

  constructor(modalrRef: NzModalRef, private service: ReferenceService, private not: NotificationService) {
    super(modalrRef);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onSave = () => {
    this.loading = true;
    this.service.saveReferenceType(this.data).subscribe(res => {
      this.save();
    }, (err) => {
      this.loading = false;
      // this.not.error('Reference Type Name is redondant. Please choose another one.');
    });
  }

  onLabelChange(p) {
    p.code = camelize(p.label);
  }

}
