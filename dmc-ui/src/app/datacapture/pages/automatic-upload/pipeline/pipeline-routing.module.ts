import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipelineEditorComponent } from './componenets/pipeline-editor/pipeline-editor.component';
import { AuthorPipelineComponent } from './containers/author-pipeline/author-pipeline.component';

const routes: Routes = [
  {
    path:'',
    component:AuthorPipelineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipelineRoutingModule { }
