import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { ConnectorSetupBaseComponent } from '../connector-setup.component';

@Component({
  selector: 'app-connector-sqlsetup',
  templateUrl: './connector-sqlsetup.component.html',
  styleUrls: ['./connector-sqlsetup.component.css']
})
export class ConnectorSQLSetupComponent extends ConnectorSetupBaseComponent{


  constructor(modal: NzModalRef, private fb: FormBuilder) {
    super(modal)
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [this.data.name, [Validators.required]],
      description: [this.data.description],
      host: [this.data.host, [Validators.required]],
      port: [this.data.port, [Validators.required]],
      database: [this.data.database, [Validators.required]],
      password: [this.data.password],
      user: [this.data.user],
    });
  }
}
