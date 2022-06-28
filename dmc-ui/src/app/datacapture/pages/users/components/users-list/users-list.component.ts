import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/users.model';
import { BehaviorSubject } from 'rxjs';
import { Column } from '@app/datacapture/pages/admin/models/column';
import { NotificationService } from '@app/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() searchTerm = '';
  @Input() reload$: BehaviorSubject<any>;
  @Output() updateUser: EventEmitter<any> = new EventEmitter();
  users$: BehaviorSubject<Users[]> = new BehaviorSubject([]);
  loading: boolean;
  columns = [
    new Column('', 'action'),
    new Column('First Name', 'first_name'),
    new Column('Last Name', 'last_name'),
    // new Column('Name', 'name'),
    new Column('Email', 'email'),
    new Column('Created On', 'created_on'),
    new Column('Modified On', 'modified_on')
  ];

  constructor(private service: UsersService, private not: NotificationService) {}

  ngOnInit() {
    if (this.reload$) {
      this.reload$.subscribe((res) => {
        if (res) { this.loadData(); }
      });
    }
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.service.getUsers().subscribe((res: any) => {
      if (res) {
        this.users$.next(res.data);
        this.loading = false;
      }
    });
  }

  deleteUser(id: string): void {
    this.service.deleteUser(id).subscribe((res: any) => {
      this.not.success('The user was deleted successfully.');
      this.loadData();
    });
  }
}
