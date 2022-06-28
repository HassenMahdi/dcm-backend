import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';

@Component({
  selector: 'app-node-filter-component',
  templateUrl: './node-filter-component.component.html',
  styleUrls: ['./node-filter-component.component.css', '../base-node-transformation/base-node-transformation.component.css']
})
export class NodeFilterComponent extends PipelineNodeComponent {
  numberOperations = [
    {value: '>', label: '>'},
    {value: '>=', label: '>='},
    {value: '<', label: '<'},
    {value: '<=', label: '<='},
    {value: '==', label: '='},
    {value: '!=', label: '!='}
  ];
  stringOperations = [
    {value: 'fullmatch', label: 'Equals'},
    {value: 'contains', label: 'Contains'},
    {value: 'startswith', label: 'Starts With'},
    {value: 'endswith', label: 'Ends With'},
    {value: 'match', label: 'REGEX'},
    // {value: 'notEqual', label: 'notEqual'},
  ];
  operations = [
    {
      label: 'Numbers', operations: this.numberOperations
    },
    {
      label: 'Strings', operations: this.stringOperations
    }
  ];

  constructor() {
    super()
  }

  save() {
    this.onSave.emit(this.data)
  }

  onAddCondition() {
    this.data.conditions = this.data.conditions || [];
    this.data.conditions.push({});
  }

  onRemoveCondition(i) {
    this.data.conditions.splice(i, 1);
  }

  isUsingRegex(op) {
    return this.stringOperations.map(e => e.value).includes(op);
  }

}
