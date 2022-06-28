import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-base-check-node',
  templateUrl: './base-check-node.component.html',
  styleUrls: ['./base-check-node.component.css']
})
export class BaseCheckNodeComponent extends PipelineNodeComponent  {

  constructor() { super() }

  ngOnInit(): void {
  }

}
