import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { ConnectorSetupBaseComponent } from '../connector-setup.component';

@Component({
  selector: 'app-connector-awss3-setup',
  templateUrl: './connector-awss3-setup.component.html',
  styleUrls: ['./connector-awss3-setup.component.css']
})
export class ConnectorAWSS3SetupComponent extends ConnectorSetupBaseComponent{

  constructor(modal: NzModalRef) {
    super(modal)
   }

  ngOnInit(): void {
  }

}
