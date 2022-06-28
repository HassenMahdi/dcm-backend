import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Component, OnInit } from '@angular/core';
import { formatByType, inferType } from '../utils/strings.utils';

@Component({
  selector: 'app-grid-cell-auto-type',
  templateUrl: './grid-cell-auto-type.component.html',
  styleUrls: ['./grid-cell-auto-type.component.css']
})
export class GridCellAutoTypeComponent implements ICellRendererAngularComp {
  public params: any;
  public value
  public type

  agInit(params: any): void {
    this.params = params;
    
    const field = this.params.colDef.field
    const rawValue = this.params.data[field];
    this.type = inferType(rawValue)
    this.value = formatByType(rawValue, this.type)
  }

  refresh(): boolean {
    return false;
  }
}