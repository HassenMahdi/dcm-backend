import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { CONNECTOR_TYPES } from '../../models/connectors.model';

@Component({
  selector: 'app-connector-types',
  templateUrl: './connector-types.component.html',
  styleUrls: ['./connector-types.component.css']
})
export class ConnectorTypesComponent implements OnInit {

  constructor(public modal:NzModalRef) { }

  ngOnInit(): void {
  }

  searchTerm = ''
  
  types = CONNECTOR_TYPES

  onSelectType(type){
    this.modal.close(type)
  }
  
}
