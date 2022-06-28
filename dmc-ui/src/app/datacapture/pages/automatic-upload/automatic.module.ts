import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { AutomaticRoutingModule } from './automatic-routing.module';
import { PipelineModule } from './pipeline/pipeline.module';


@NgModule({
  imports: [
    SharedModule,
    AutomaticRoutingModule,
    PipelineModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers : [
  ],
  entryComponents: [
  ]
})
export class AutomaticModule {}
