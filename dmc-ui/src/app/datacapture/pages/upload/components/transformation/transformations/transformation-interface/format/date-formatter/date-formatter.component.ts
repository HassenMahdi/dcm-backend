import { Component, OnInit } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-date-formatter',
  templateUrl: './date-formatter.component.html',
  styleUrls: ['./date-formatter.component.css']
})
export class DateFormatterComponent extends TransformationInterfaceComponent implements OnInit {

  formats = [
    { label: "dd/mm/yyyy", value:"%d/%m%Y"},
    { label: "mm/dd/yyyy", value:"%m/%d/%Y"},
    { label: "yyyy/mm/dd", value:"%Y/%m/%d"},
    { label: "yyyy-dd-mm", value:"%Y-%d-%m"},
  ]

  constructor() { 
    super()
  }

  ngOnInit() {
  }

}
