import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dk-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {
  @Input()  title: string;
  @Input()  addBtn: string;
  @Input()  hideAddbtn: boolean;
  @Input()  hideFilter: boolean;
  @Input()  hideIcons: boolean;
  @Output() Click: EventEmitter<boolean> = new EventEmitter<boolean>();
}
