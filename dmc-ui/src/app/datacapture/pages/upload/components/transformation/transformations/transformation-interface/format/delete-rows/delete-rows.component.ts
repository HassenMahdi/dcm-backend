import { Component, OnInit } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-delete-rows',
  templateUrl: './delete-rows.component.html',
  styleUrls: ['./delete-rows.component.css']
})
export class DeleteRowsComponent  extends TransformationInterfaceComponent implements OnInit  {

  constructor() { 
    super()
  }
  ngOnInit() {
  }

}
