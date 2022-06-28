import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { NodeTranformationService } from './service/node-transformation.service';

@Component({
  selector: 'app-node-pipeline',
  templateUrl: './node-pipeline.component.html',
  styleUrls: ['./node-pipeline.component.css']
})
export class NodePipelineComponent extends PipelineNodeComponent {
  pipes = [];
  constructor(private service: NodeTranformationService) {
    super();
    this.service.getAllPipes().subscribe((res: any[]) => {
      this.pipes = res;
    })
  }

  save() {
    this.onSave.emit(this.data)
  }

}
