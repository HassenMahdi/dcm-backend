import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorContainer } from './container/author-container.component';
import { AuthorService } from './service/author.service';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { PipelineFilterPipe } from './pipes/pipeline-filter.pipe';


@NgModule({
  imports: [
    SharedModule,
    AuthorRoutingModule
  ],
  declarations: [
    AuthorContainer,
    AuthorListComponent,
    PipelineFilterPipe
  ],
  exports: [
  ],
  providers : [
    AuthorService
  ],
  entryComponents: [
  ]
})
export class AuthorModule {}
