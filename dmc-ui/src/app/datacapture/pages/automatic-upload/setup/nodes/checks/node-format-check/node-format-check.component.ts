import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-format-check',
  templateUrl: './node-format-check.component.html',
  styleUrls: ['./node-format-check.component.css']
})
export class NodeFormatCheckComponent extends PipelineNodeComponent {

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

  AddFormat()
  {
   this.data.formats = this.data.formats || []
   this.data.formats.push({"column": null, "format": null})
  }

  RemoveFormat(index)
  {
    this.data.formats.slice(index, 1)
  }
}
