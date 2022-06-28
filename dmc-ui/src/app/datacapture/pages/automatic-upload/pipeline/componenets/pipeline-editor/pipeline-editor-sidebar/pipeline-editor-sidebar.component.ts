import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DefaultArray } from '@app/shared/utils/arrays.utils';
import { ALL_NODES } from '../../../models/factories/templates.factory';

@Component({
  selector: 'app-pipeline-editor-sidebar',
  templateUrl: './pipeline-editor-sidebar.component.html',
  styleUrls: ['./pipeline-editor-sidebar.component.css']
})
export class PipelineEditorSidebarComponent implements OnInit {

  @Output() addedNode = new EventEmitter<any>();
  @Output() onSave = new EventEmitter<any>();
  @Output() onSaveAs = new EventEmitter<any>();
  @Output() onViewTemplate = new EventEmitter<any>();
  nodesMap;
  labels = {
    'DATASOURCE': 'Datasource',
    'TRANSFORMATION': 'Transform',
    'MERGE': 'Merge',
    'SCRIPTS': 'Code',
    'DATASINK': 'Storage',
    'API CALL': 'Web',
    'CHECK': 'Check/Cleanse',
    'MAPPING': 'Mapping',
    '':''
  };

  constructor() { }

  ngOnInit(): void {
    this.nodesMap = {};
    for (const node of ALL_NODES) {
      const arr = DefaultArray(this.nodesMap, this.labels[node.category] || node.category);
      arr.push(node);
    }
  }

  addNode(nodeClass) {
    this.addedNode.emit(nodeClass.createNode());
  }
}
