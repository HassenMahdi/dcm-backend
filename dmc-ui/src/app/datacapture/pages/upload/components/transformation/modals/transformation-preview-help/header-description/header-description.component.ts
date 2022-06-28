import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-description',
  templateUrl: './header-description.component.html',
  styleUrls: ['./header-description.component.css']
})
export class HeaderDescriptionComponent implements OnInit {
  description: any;
  name: string;
  keys = Object.keys;
  constructor() { }

  ngOnInit() {
  }

}
