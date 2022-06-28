import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { MonitorContainer } from './container/monitor-container.component';
import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorService } from './service/monitor.service';
import { MonitorListComponent } from './components/monitor-list/monitor-list.component';
import { MonitorItemComponent } from './components/monitor-item/monitor-item.component';
import { PipelineTasksComponent } from './modals/pipeline-tasks/pipeline-tasks.component';


@NgModule({
  imports: [
    SharedModule,
    MonitorRoutingModule
  ],
  declarations: [
    MonitorContainer,
    MonitorListComponent,
    MonitorItemComponent,
    PipelineTasksComponent
  ],
  exports: [
  ],
  providers : [
    MonitorService
  ],
  entryComponents: [
    PipelineTasksComponent
  ]
})
export class MonitorModule {}
