import { Component, OnInit } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-find-and-replace',
  templateUrl: './find-and-replace.component.html',
  styleUrls: ['./find-and-replace.component.css']
})
export class FindAndReplaceComponent  extends TransformationInterfaceComponent implements OnInit  {

  constructor() { 
    super()
  }
  ngOnInit() {
  }

  onDataChanged(){
    // VALIDATE
    this.dataChanged.emit(this.data);
  }

}
