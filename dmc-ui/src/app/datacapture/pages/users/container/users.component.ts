import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AppState, NotificationService, selectProfile } from '@app/core';
import { AddUserComponent } from '../components/add-user/add-user.component';
import { Users } from './../models/users.model';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  searchUser = '';
  profile: any;
  profile$: Observable<any>;
  reload$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  constructor(private modalService: NzModalService,
              private store: Store<AppState>,
              private service: UsersService,
              private notification: NotificationService) {
    this.profile$ = this.store.select(selectProfile);
    this.profile$.subscribe((res) => {this.profile = res; });
  }

  addUser(msg: string, edit: boolean, user?: Users): void {
    const modal: NzModalRef = this.modalService.create({
      nzTitle: edit ? 'Edit User' : 'Add User',
      nzClosable: false,
      nzWrapClassName: 'vertical-center-modal',
      nzWidth: 'xXL',
      nzContent: AddUserComponent,
      nzOkText: edit ? 'Edit' : 'Add',
      nzComponentParams: {
        user,
        profile: this.profile
      },
      nzOnOk: componentInstance => {
        try {
          modal.componentInstance.nzOkLoading = true;
          componentInstance.submitForm();
          if (componentInstance.validateForm.valid) {
            this.onAddUser(componentInstance.validateForm, edit, (user ? user.admin : false)).subscribe((res) => {
              this.notification.success(msg);
              modal.componentInstance.nzOkLoading = false;
              this.reload$.next(true);
              modal.close();
            });
          } else {
            this.notification.error('Invalid Form');
            setTimeout(() => { modal.componentInstance.nzOkLoading = false; }, 1000);
          }
          return false;
        } catch (error) {
          // this.notification.error(error);
          modal.close();
        }
      }
    });
  }

  onAddUser(form: FormGroup, edit: boolean, isAdmin?: boolean) {
    const user: Users = {
      first_name: form.controls.firstName.value,
      last_name: form.controls.lastName.value,
      admin: form.controls.admin ? form.controls.admin.value : null,
      email: form.controls.email.value,
      password: form.controls.password ? form.controls.password.value : null,
      created_on: null,
      modified_on: null,
      id: form.controls.id.value,
      roles: []
    };
    // Add roles
    const domains = Object.keys(form.controls).filter((e) => {if (e.includes('domain')) {return e; } });
    domains.forEach((domain, i) => {
      user.roles.push({role: form.controls['role' + i].value, domain_id: form.controls['domain' + i].value});
    });
    if (edit) {
      user.admin = (typeof(user.admin) === 'boolean' ) ? user.admin : isAdmin;
      return this.service.editUser(user);
    } else {
      return this.service.addUser(user);
    }
  }

  reload(): void {
    this.reload$.next(true);
  }

  editUser(user: Users): void {
    this.addUser('The user was updated successfully.', true, user);
  }
}
