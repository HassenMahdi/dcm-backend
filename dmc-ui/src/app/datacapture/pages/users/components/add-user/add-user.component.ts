import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NotificationService } from '@app/core';
import { Users } from '../../models/users.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: Users;
  isLoading: boolean;
  domainList: any;
  profile: any;
  validateForm: FormGroup;
  listOfRoles: Array<{ id: number; roleInstance: string, domainInstance: string }> = [];

  constructor(private fb: FormBuilder,
              private service: UsersService,
              private notification: NotificationService) {}

  ngOnInit(): void {
    const password = this.user ? {} : {
      password: [null, [Validators.required, Validators.minLength(8)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    };
    const roles = {};
    if (this.user && this.user.roles.length > 0) {
      this.user.roles.forEach((role, i) => {
        roles['domain' + i] = [role.domain_id, [Validators.required]];
        roles['role' + i] = [role.role, [Validators.required]];
        const control = {
          id: i,
          roleInstance: `role${i}`,
          domainInstance: `domain${i}`
        };
        this.listOfRoles.push(control);
      });
      this.loadDomain(true);
    }
    let admin: any = {admin: [this.user ? this.user.admin : false, [Validators.required]]};
    if (this.user && this.profile && (this.user.id === this.profile.id)) {
      admin = {};
    }
    this.validateForm = this.fb.group({
      firstName: [this.user ? this.user.first_name : null, [Validators.required]],
      lastName: [this.user ? this.user.last_name : null, [Validators.required]],
      email: [this.user ? this.user.email : null, [Validators.email, Validators.required]],
      id: [this.user ? this.user.id : null],
      ...admin,
      ...password,
      ...roles
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfRoles.length > 0 ? this.listOfRoles[this.listOfRoles.length - 1].id + 1 : 0;
    const control = {
      id,
      roleInstance: `role${id}`,
      domainInstance: `domain${id}`
    };
    const index = this.listOfRoles.push(control);
    this.validateForm.addControl(
      this.listOfRoles[index - 1].roleInstance,
      new FormControl(null, Validators.required)
    );
    this.validateForm.addControl(
      this.listOfRoles[index - 1].domainInstance,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; roleInstance: string, domainInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfRoles.length >= 1) {
      const index = this.listOfRoles.indexOf(i);
      this.listOfRoles.splice(index, 1);
      this.validateForm.removeControl(i.roleInstance);
      this.validateForm.removeControl(i.domainInstance);
    }
  }

  loadDomain(event: any): void {
    if (event) {
      this.isLoading = true;
      this.service.getDomains().subscribe((res) => {
        this.domainList = res;
        this.isLoading = false;
      });
    }
  }

  resetRules(event: boolean): void {
    if (event) {
      this.listOfRoles = [];
      Object.keys(this.validateForm.controls).forEach((ctrl: string) => {
        if (ctrl.includes('domain') || ctrl.includes('role')) {
          this.validateForm.removeControl(ctrl);
        }
      });
    }
  }
}
