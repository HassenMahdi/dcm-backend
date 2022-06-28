import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../service/login.service';
import { AppState, ActionAuthLogin } from '@app/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from '@app/core/notifications/notification.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NewPasswordComponent } from '../components/new-password/new-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading$ = new BehaviorSubject(false);

  constructor(public auth: LoginService,
              private store: Store<AppState>,
              private modalService: NzModalService,
              private not: NotificationService) {}


  login(event: any): void {
    this.loading$.next(true);
    // this.auth.saveCredentialsPassword("email", "pass");
    this.auth.login(event.email, event.password).subscribe((res: any) => {
      if(event.remember){
        this.auth.saveCredentialsPassword(event.email, event.password)
      }
    }, err => this.loading$.next(false));
  }

  resetPw(email: string) {
    this.auth.resetPw(email).subscribe((res: any) => {
      if (res) {
        this.not.success(res.message);
        // this.newPw();
      }
    });
  }

  newPw(): void {
    const modal: NzModalRef = this.modalService.create({
      nzTitle: 'Enter New password',
      nzClosable: false,
      nzWrapClassName: 'vertical-center-modal',
      nzWidth: 'xXL',
      nzContent: NewPasswordComponent,
      nzOkText: 'Ok',
      nzOnOk: componentInstance => {
        try {
          modal.componentInstance.nzOkLoading = true;
          componentInstance.submitForm();
          if (componentInstance.validateForm.valid) {
          } else {
            this.not.error('Invalid Form');
            setTimeout(() => { modal.componentInstance.nzOkLoading = false; }, 1000);
          }
          return false;
        } catch (error) {
          modal.close();
        }
      }
    });
  }
}
