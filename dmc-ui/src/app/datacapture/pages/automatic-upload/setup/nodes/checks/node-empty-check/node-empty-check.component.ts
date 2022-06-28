import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-empty-check',
  templateUrl: './node-empty-check.component.html',
  styleUrls: ['./node-empty-check.component.css']
})
export class NodeEmptyCheckComponent extends PipelineNodeComponent {

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

}
