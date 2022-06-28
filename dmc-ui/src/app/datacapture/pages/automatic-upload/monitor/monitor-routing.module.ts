import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorContainer } from './container/monitor-container.component';

const routes: Routes = [
  {
      path: '',
      component: MonitorContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule {}
