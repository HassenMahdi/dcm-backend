import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/core';
import { NzModalRef } from 'ng-zorro-antd';
import { EntityModal } from '../../../modals/entity-modal';
import { ReferenceService } from '../reference.service';

@Component({
  selector: 'app-reference-type-version-editor',
  templateUrl: './reference-type-version-editor.component.html',
  styleUrls: ['./reference-type-version-editor.component.css']
})
export class ReferenceTypeVersionEditorComponent extends EntityModal implements OnInit {

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
}
