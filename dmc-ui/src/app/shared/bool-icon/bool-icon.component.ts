import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bool-icon',
  templateUrl: './bool-icon.component.html',
  styleUrls: ['./bool-icon.component.css']
})
export class BoolIconComponent implements OnInit {

  @Input() b = null;

  constructor() { }

  ngOnInit() {
  }

}
