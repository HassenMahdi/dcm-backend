import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-join',
  templateUrl: './node-join.component.html',
  styleUrls: ['./node-join.component.css']
})
export class NodeJoinComponent extends PipelineNodeComponent {
  join_types = [
    {label:'Left', value: 'left'},
    {label:'Right', value: 'right'},
    {label:'Outer', value: 'outer'},
    {label:'Inner', value: 'inner'}
  ]
  constructor() {
    super()
  }

  save() {
    this.onSave.emit(this.data)
  }

}
