import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shortcuts-list-horizontal',
  templateUrl: './shortcuts-list-horizontal.component.html',
})
export class ShortcutsListHorizontalComponent implements OnInit {

  @Input() shortcuts

  constructor() { }

  ngOnInit() {
  }

}
