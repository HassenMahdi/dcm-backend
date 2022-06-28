import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutContainer } from './layout/container/layout.container';
import { RolesGuard } from '@app/core/login/guards/roles.guard';

const routes: Routes = [
  {
      path: '',
      component: LayoutContainer,
      children: [
        {
          path: 'admin',
          loadChildren : () => import('app/datacapture/pages/admin/admin.module').then(m => m.AdminModule)
        },
        {
          path: 'users',
          loadChildren : () => import('app/datacapture/pages/users/users.module').then(m => m.UsersModule),
          canActivate: [RolesGuard],
          data: {role: 'ADMIN'}
        },
        {
          path: 'upload',
          loadChildren : () => import('app/datacapture/pages/upload/upload.module').then(m => m.UploadModule)
        },
        {
          path: 'dashboard',
          loadChildren : () => import('app/datacapture/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
        },
        {
          path: 'explorer',
          loadChildren : () => import('app/datacapture/data-explorer/data-explorer.module').then(m => m.DataExplorerModule)
        },
        {
          path: 'automatic',
          loadChildren : () => import('app/datacapture/pages/automatic-upload/automatic.module').then(m => m.AutomaticModule)
        },
        {
          path: '**',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataCaptureRoutingModule {}
