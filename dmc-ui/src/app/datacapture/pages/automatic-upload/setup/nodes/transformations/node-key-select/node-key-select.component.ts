import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { Component} from '@angular/core';

@Component({
  selector: 'app-node-key-select',
  templateUrl: './node-key-select.component.html',
  styleUrls: ['./node-key-select.component.css']
})
export class NodeKeySelectComponent extends PipelineNodeComponent {

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

}
