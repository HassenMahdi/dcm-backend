import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { stringToColour } from '../utils/strings.utils';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  @Input() set audits(value) {
    if (value) {
      const data = [];
      Object.keys(value).forEach((column) => {
        Object.keys(value[column]).forEach((row) => {
          data.push({
            column,
            row: Number(row) + 1,
            oldValue: value[column][row].previous,
            newValue: value[column][row].new,
            uploadDate: value[column][row].updated_at,
            user: value[column][row].user,
            avatar: this.getAvatar(value[column][row].user),
            color: stringToColour(value[column][row].user)
          });
        });
      });
      this.data$.next(data);
      this.loading$.next(false);
    }
  }
  data$ =  new BehaviorSubject([]);
  size$ = new BehaviorSubject(5);
  page$ = new BehaviorSubject(1);
  loading$ = new BehaviorSubject(true);
  keys = Object.keys;
  constructor() { }

  ngOnInit() {
  }

  getAvatar(user: string): string {
    if (user) {
      const name = user[0].toUpperCase() + '' + user[user.lastIndexOf(' ') + 1].toUpperCase();
      return name;
    }
  }

}
