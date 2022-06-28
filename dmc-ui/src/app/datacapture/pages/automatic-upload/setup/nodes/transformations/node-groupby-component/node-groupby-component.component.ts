import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-groupby-component',
  templateUrl: './node-groupby-component.component.html',
  styleUrls: ['./node-groupby-component.component.css', '../base-node-transformation/base-node-transformation.component.css']
})
export class NodeGroupbyComponent extends PipelineNodeComponent {
  aggFunctions = [
    {label:'Sum', value:"sum"},
    {label:'Mean/Average', value:"mean"},
    {label:'Max', value:"max"},
    {label:'Min', value:"min"},
  ];

  constructor() {
    super()
  }

  save() {
    this.onSave.emit(this.data)
  }

}
