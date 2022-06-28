import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shortcuts-list',
  templateUrl: './shortcuts-list.component.html',
})
export class ShortcutsListComponent implements OnInit {
  @Input() shortcuts;
  constructor() { }

  ngOnInit() {
  }

}
