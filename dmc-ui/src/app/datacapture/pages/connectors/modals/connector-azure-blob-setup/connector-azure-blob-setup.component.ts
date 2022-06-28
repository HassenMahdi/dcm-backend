import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { ConnectorSetupBaseComponent } from '../connector-setup.component';

@Component({
  selector: 'app-connector-azure-blob-setup',
  templateUrl: './connector-azure-blob-setup.component.html',
  styleUrls: ['./connector-azure-blob-setup.component.css']
})
export class ConnectorAzureBlobSetupComponent extends ConnectorSetupBaseComponent{

  constructor(modal: NzModalRef, private fb: FormBuilder) {
    super(modal)
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [this.data.name, [Validators.required]],
      description: [this.data.description],
      url: [this.data.url, [Validators.required]],
      auth_with: [this.data.auth_with || 'sas_token'],
      sas_token: [this.data.sas_token],
      shared_access_key: [this.data.shared_access_key],
    });
  }

  authWith = [
    {value:"sas_token", label:"SAS Token"},
    {value:"shared_access_key", label:"Shared Access Key"},
  ]

  isAuthWith(type){
    return this.validateForm.get("auth_with").value == type
  }  

}
