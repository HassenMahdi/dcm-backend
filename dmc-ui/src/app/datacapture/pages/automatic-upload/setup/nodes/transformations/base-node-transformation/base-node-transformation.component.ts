import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { NgxEditorModel } from 'ngx-monaco-editor';

@Component({
  selector: 'app-base-node-transformation',
  templateUrl: './base-node-transformation.component.html',
  styleUrls: ['./base-node-transformation.component.css']
})
export class BaseNodeTransformationComponent extends PipelineNodeComponent  {
  editorOptions = {language: 'json'};
  code = '';

  constructor() {
    super()
  }


  ngOnInit(): void {
    this.code = JSON.stringify(this.data, null, 2)
  }

  save(){
    this.data = JSON.parse(this.code)
    this.onSave.emit(this.data)
  }

}
