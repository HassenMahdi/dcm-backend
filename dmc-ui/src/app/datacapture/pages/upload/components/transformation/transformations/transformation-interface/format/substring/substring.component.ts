import { Component, OnInit } from '@angular/core';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-substring',
  templateUrl: './substring.component.html',
  styleUrls: ['./substring.component.css']
})
export class SubstringComponent extends TransformationInterfaceComponent implements OnInit  {

  constructor() { 
    super()
  }

  ngOnInit() {
  }

  AddSubstring()
  {
    this.data.substrings = this.data.substrings || []
    this.data.substrings.push({start:null, end: null, column: ''}) 
    this.onDataChanged();
  }

  RemoveSubstring(index)
  {
    this.data.substrings.splice(index, 1)
    this.onDataChanged();
  }
}
