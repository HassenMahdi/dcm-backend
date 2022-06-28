import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css']
})
export class MetaComponent implements OnInit {

  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}
