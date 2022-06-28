import { Component, Input, OnInit } from '@angular/core';
import { ToMap } from '@app/shared/utils/arrays.utils';
import { CONNECTOR_TYPES } from '../../models/connectors.model';

@Component({
  selector: 'app-connector-icon',
  templateUrl: './connector-icon.component.html',
  styleUrls: ['./connector-icon.component.css']
})
export class ConnectorIconComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  types = ToMap(CONNECTOR_TYPES, (e)=>e.type, (e)=>e)
  @Input() type

}
