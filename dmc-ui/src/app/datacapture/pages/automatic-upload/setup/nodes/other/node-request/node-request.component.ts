import { Component } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-request',
  templateUrl: './node-request.component.html',
  styleUrls: ['./node-request.component.css']
})
export class NodeRequestComponent extends PipelineNodeComponent  {

  editorOptions = {language: 'javascript'};

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

  AddHeader()
  {
    this.data.header = this.data.header || []
    this.data.header.push({})
  }
  RemoveHeader(index)
  {
    this.data.header.splice(index, 1)
  }
}
