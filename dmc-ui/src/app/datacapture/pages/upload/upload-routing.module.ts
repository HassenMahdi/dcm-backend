import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponentComponent } from './container/upload-component.component';
import { ImportComponent } from './components/import/import.component';
import { PreviewComponent } from './components/preview/preview.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { CleansingComponent } from './components/cleansing/cleansing.component';
import { UploadComponent } from './components/upload/upload.component';
import { UploadGuard } from './guards/upload.guard';
import { DeactivateUploadGuard } from './guards/deactivate-upload.guard';
import { RolesGuard } from '@app/core/login/guards/roles.guard';

const routes: Routes = [
  {
      path: '',
      component: UploadComponentComponent,
      children: [
        {
          path: 'import',
          component: ImportComponent,
          canActivate: [UploadGuard],
          data: {route: 'IMPORT'}
        },
        {
          path: 'transform',
          component: PreviewComponent,
          canActivate: [UploadGuard],
          canDeactivate: [DeactivateUploadGuard],
          data: {route: 'TRANSFORM'}
        },
        {
          path: 'mapping',
          component: MappingComponent,
          canActivate: [UploadGuard],
          data: {route: 'MAPPING'}
        },
        {
          path: 'cleansing',
          component: CleansingComponent,
          canActivate: [UploadGuard],
          data: {route: 'CLEANSING'}
        },
        {
          path: 'uploading',
          component: UploadComponent,
          canActivate: [UploadGuard, RolesGuard],
          data: {route: 'UPLOAD', role: 'domainAdmin'}
        },
        {
          path: '**',
          redirectTo: 'import'
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule {}
