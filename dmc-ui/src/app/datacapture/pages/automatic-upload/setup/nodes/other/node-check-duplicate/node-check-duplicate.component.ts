import { Component} from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-check-duplicate',
  templateUrl: './node-check-duplicate.component.html',
  styleUrls: ['./node-check-duplicate.component.css']
})
export class NodeCheckDuplicateComponent extends PipelineNodeComponent  {

  editorOptions = {language: 'python'};

  constructor() {
    super()
  }



}
