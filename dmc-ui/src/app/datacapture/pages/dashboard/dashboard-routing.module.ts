import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './container/dashboard-container.component';
import { UserDashboardComponent } from './container/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
      path: '',
      // component: DashboardComponent,
      component: UserDashboardComponent,
  },
  {
    path: 'stats',
    component: UserDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
