import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'dk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() collapse = new EventEmitter<any>();
}
