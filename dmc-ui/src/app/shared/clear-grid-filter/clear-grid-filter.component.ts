import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-clear-grid-filter',
  templateUrl: './clear-grid-filter.component.html',
  styleUrls: ['./clear-grid-filter.component.css']
})
export class ClearGridFilterComponent implements OnInit {
  @Input() gridApi: any = null;
  @Input() filters: any = [];
  @Output() reinit: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  clearFilter() {
    this.reinit.emit(true);
  }

}
