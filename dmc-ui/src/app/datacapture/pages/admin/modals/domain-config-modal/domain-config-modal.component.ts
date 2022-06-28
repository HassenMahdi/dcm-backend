import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { DomainService } from '../../services/domain.service';
import { EntityModal } from '../entity-modal';

@Component({
  selector: 'app-domain-config-modal',
  templateUrl: './domain-config-modal.component.html'
})
export class DomainConfigModalComponent extends EntityModal implements OnInit {
  classifications = [
    {label: 'Private', value: 'private'},
    {label: 'Public',  value: 'public'},
    {label: 'Confidential', value: 'confidential'},
  ];

  constructor(private mr: NzModalRef, private ds: DomainService) {
    super(mr);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  canSave() {
    return this.data.name && this.data.classification && (this.data.enableDF !== null);
  }

  canClose() {
    return !this.loading;
  }

  close() {
    this.modalrRef.close(false);
  }

  save() {
    if (this.canSave()) {
      this.loading = false;
      this.ds.saveDomain(this.data).subscribe(res => {
        this.modalrRef.close(true);
      });
    }
  }

}
