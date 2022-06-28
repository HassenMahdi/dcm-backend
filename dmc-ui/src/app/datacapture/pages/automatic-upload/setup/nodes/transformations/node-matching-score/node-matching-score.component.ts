import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-matching-score',
  templateUrl: './node-matching-score.component.html',
  styleUrls: ['./node-matching-score.component.css']
})
export class NodeMatchingScoreComponent extends PipelineNodeComponent {

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

}
