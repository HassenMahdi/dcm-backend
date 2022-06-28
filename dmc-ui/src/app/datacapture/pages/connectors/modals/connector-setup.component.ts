import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';

export class ConnectorSetupBaseComponent {

  constructor(protected modal: NzModalRef) { }

  data

  onSave = new EventEmitter<any>()

  getModel(){
    const value = this.validateForm.value

    return {...this.data,...value}
  }

  isValid(){
    return this.validateForm.valid
  }

  validateForm: FormGroup;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
}
