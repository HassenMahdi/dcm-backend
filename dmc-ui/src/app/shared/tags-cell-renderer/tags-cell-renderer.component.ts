import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags-cell-renderer',
  templateUrl: './tags-cell-renderer.component.html',
  styleUrls: ['./tags-cell-renderer.component.css']
})
export class TagsCellRendererComponent implements ICellRendererAngularComp {
  public params: any;
  tags:string[]
  agInit(params: any): void {
    this.params = params;

    this.tags = this.params.value
  }

  public invokeParentMethod() {
    this.params.context.componentParent.methodFromParent(
      `Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`
    );
  }

  refresh(): boolean {
    return false;
  }

}
