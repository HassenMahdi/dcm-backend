import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-draggable-shelf',
  templateUrl: './draggable-shelf.component.html',
  styleUrls: ['./draggable-shelf.component.css']
})
export class DraggableShelfComponent implements OnInit {

  @Input() items 

  @Output() dragEnd = new EventEmitter<any>() 
  @Output() dragStart = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

}
