import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-delete-row-component',
  templateUrl: './node-delete-row-component.component.html',
  styleUrls: ['./node-delete-row-component.component.css', '../base-node-transformation/base-node-transformation.component.css']
})
export class NodeDeleteRowComponent extends PipelineNodeComponent {
  constructor() {
    super()
  }

  save() {
    this.onSave.emit(this.data)
  }

}
