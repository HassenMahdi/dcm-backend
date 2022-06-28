import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-footer',
  templateUrl: './grid-footer.component.html',
  styleUrls: ['./grid-footer.component.css']
})
export class GridFooterComponent implements OnInit {

  @Input('t') total = 0
  constructor() { }

  ngOnInit() {
  }

}
