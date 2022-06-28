import { Component, OnInit, Input } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent extends TransformationInterfaceComponent implements OnInit  {

  @Input() showReverse = true;

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
    super();
  }

  ngOnInit() {
  }

  onAddCondition() {
    this.data.conditions = this.data.conditions || [];
    this.data.conditions.push({});
    this.onDataChanged();
  }

  onRemoveCondition(i) {
    this.data.conditions.splice(i, 1);
    this.onDataChanged();
  }

  isUsingRegex(op) {
    return this.stringOperations.map(e => e.value).includes(op);
  }
}
