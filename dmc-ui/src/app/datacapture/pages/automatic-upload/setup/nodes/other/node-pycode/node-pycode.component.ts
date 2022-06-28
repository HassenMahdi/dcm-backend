import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-pycode',
  templateUrl: './node-pycode.component.html',
  styleUrls: ['./node-pycode.component.css']
})
export class NodePycodeComponent extends PipelineNodeComponent  {

  constructor() { 
    super()
  }

  editorOptions = {language: 'python'};

  ngOnInit(): void {
  }

}
