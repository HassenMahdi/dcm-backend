import { Component, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  validateForm: FormGroup;
  resetPwForm: FormGroup;
  visible = false;
  @Output() login: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetPw: EventEmitter<any> = new EventEmitter<any>();
  @Input() loading = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [{value: null, disabled: this.loading}, [Validators.required, Validators.email]],
      password: [{value: null, disabled: this.loading}, [Validators.required]],
      remember: [false]
    });
    this.resetPwForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
    });
  }

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.login.emit({email: this.validateForm.controls.email.value, password: this.validateForm.controls.password.value, remember: this.validateForm.controls.remember.value});
    }
  }


  forgotPassword(): void {
    // tslint:disable-next-line: forin
    for (const i in this.resetPwForm.controls) {
      this.resetPwForm.controls[i].markAsDirty();
      this.resetPwForm.controls[i].updateValueAndValidity();
    }

    if (this.resetPwForm.valid) {
      this.resetPw.emit(this.resetPwForm.controls.email.value);
    }
  }
}
