import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './container/users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersFilterPipe } from './pipes/users-filter.pipe';

const components = [
  UsersComponent,
  UsersListComponent,
  AddUserComponent,
  UsersFilterPipe
];

@NgModule({
  imports: [
    UsersRoutingModule,
    SharedModule,
  ],
  declarations: [...components],
  exports: [
  ],
  providers : [
  ],
  entryComponents: [
    AddUserComponent
  ]
})
export class UsersModule {}
