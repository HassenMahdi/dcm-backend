import { Component, OnInit } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-default-value',
  templateUrl: './default-value.component.html',
  styleUrls: ['./default-value.component.css']
})
export class DefaultValueComponent extends TransformationInterfaceComponent implements OnInit  {

  constructor() { 
    super()
  }

  ngOnInit() {
  }

}
