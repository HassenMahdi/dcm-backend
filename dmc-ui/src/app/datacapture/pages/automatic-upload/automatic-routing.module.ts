import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorPipelineComponent } from './pipeline/containers/author-pipeline/author-pipeline.component';

const routes: Routes = [
    {
        path: 'pipeline',
        component: AuthorPipelineComponent
    },
    {
        path: 'pipeline/:id',
        component: AuthorPipelineComponent
    },
    {
        path: 'author',
        loadChildren : () => import('app/datacapture/pages/automatic-upload/author/author.module').then(m => m.AuthorModule)
    },
    {
        path: 'monitor',
        loadChildren : () => import('app/datacapture/pages/automatic-upload/monitor/monitor.module').then(m => m.MonitorModule)
    },
    {
      path: '**',
      redirectTo: 'author',
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomaticRoutingModule {}
