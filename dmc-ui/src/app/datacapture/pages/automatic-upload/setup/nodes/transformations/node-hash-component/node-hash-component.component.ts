import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-hash-component',
  templateUrl: './node-hash-component.component.html',
  styleUrls: ['./node-hash-component.component.css', '../base-node-transformation/base-node-transformation.component.css']
})
export class NodeHashComponent extends PipelineNodeComponent {

  constructor() {
    super()
  }

  save() {
    this.onSave.emit(this.data)
  }

}
