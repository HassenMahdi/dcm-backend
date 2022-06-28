import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-node-status',
  templateUrl: './node-status.component.html',
  styleUrls: ['./node-status.component.css']
})
export class NodeStatusComponent implements OnInit {

  @Input() valid
  @Input() messages

  constructor() { }

  ngOnInit() {
  }

}
