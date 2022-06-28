import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipeline-node',
  templateUrl: './pipeline-node.component.html',
  styleUrls: ['./pipeline-node.component.css']
})
export class PipelineNodeComponent implements OnInit {

  data: any = {};
  size = "default";
  form_orientation = 'horizontal';
  nodeClass
  onSave = new EventEmitter<any>();
  onCancel = new EventEmitter<void>();

  
  constructor() { 
  }

  ngOnInit(): void {
  }


  save() {
    this.onSave.emit(this.data);
  }

  cancel() {
    this.onCancel.emit(this.data);
  }

  static width = "700px" 
}
