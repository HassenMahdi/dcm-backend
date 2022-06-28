import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { LoginComponent } from './container/login.component';
import { LoginService } from './service/login.service';
import { DatafactureGuard } from './guards/login.guard';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { ResetComponent } from './components/reset/reset.component';
import { LoginPageGuard } from './guards/login-page.guard';

const components = [
  LoginComponent,
  LoginFormComponent,
  NewPasswordComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [...components, ResetComponent],
  exports: [
  ],
  providers : [
    LoginService,
    DatafactureGuard,
    LoginPageGuard
  ],
  entryComponents: [
    NewPasswordComponent
  ]
})
export class LoginModule {}
