import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  loading: boolean;
  @Input() pipelines = [];
  @Input() search = "";
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
