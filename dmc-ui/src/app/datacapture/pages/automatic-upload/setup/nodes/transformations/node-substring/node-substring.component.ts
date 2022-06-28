import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-substring',
  templateUrl: './node-substring.component.html',
  styleUrls: ['./node-substring.component.css']
})
export class NodeSubstringComponent extends PipelineNodeComponent {

  constructor() {  super()}

  ngOnInit(): void {
  }

  AddSubstring()
  {
    this.data.substrings.push({start:null, end: null, column: ''}) 
  }

  RemoveSubstring(index)
  {
    this.data.substrings.splice(index, 1)
  }
}
