import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-default-component',
  templateUrl: './node-default-component.component.html',
  styleUrls: ['./node-default-component.component.css', '../base-node-transformation/base-node-transformation.component.css']
})
export class NodeDefaultComponent extends PipelineNodeComponent {
  constructor() {
    super()
  }

  save() {
    this.onSave.emit(this.data)
  }

}
