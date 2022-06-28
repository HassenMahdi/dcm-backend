import { Component, OnInit } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-splitter',
  templateUrl: './splitter.component.html',
  styleUrls: ['./splitter.component.css']
})
export class SplitterComponent  extends TransformationInterfaceComponent implements OnInit  {

  constructor() { 
    super()
  }

  ngOnInit() {
  }
}
