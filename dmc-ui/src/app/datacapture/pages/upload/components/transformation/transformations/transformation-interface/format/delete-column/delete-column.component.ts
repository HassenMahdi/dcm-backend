import { Component, OnInit } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-delete-column',
  templateUrl: './delete-column.component.html',
  styleUrls: ['./delete-column.component.css']
})
export class DeleteColumnComponent  extends TransformationInterfaceComponent implements OnInit  {

  constructor() { 
    super()
  }
  ngOnInit() {
  }

}
