import { Component, OnInit } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-group-by',
  templateUrl: './group-by.component.html',
  styleUrls: ['./group-by.component.css']
})
export class GroupByComponent extends TransformationInterfaceComponent implements OnInit  {

  constructor() { 
    super()
  }

  aggFunctions = [
    {label:'Sum', value:"sum"},
    {label:'Mean/Average', value:"mean"},
    {label:'Max', value:"max"},
    {label:'Min', value:"min"},
  ]

  ngOnInit() {
  }

}
