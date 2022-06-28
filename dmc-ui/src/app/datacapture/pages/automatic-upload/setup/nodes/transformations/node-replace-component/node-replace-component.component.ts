import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-replace-component',
  templateUrl: './node-replace-component.component.html',
  styleUrls: ['./node-replace-component.component.css', '../base-node-transformation/base-node-transformation.component.css']
})
export class NodeReplaceComponent extends PipelineNodeComponent {

  constructor() {
    super()
  }

  save() {
    this.onSave.emit(this.data)
  }

}
