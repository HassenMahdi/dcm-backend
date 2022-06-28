import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionDataComponent } from './collection-data/collection-data.component';
import { DataExplorerContainerComponent } from './data-explorer-container/data-explorer-container.component';
import { UploadFlowComponent } from './upload-flow/upload-flow.component';
import { UploadTagsComponent } from './upload-tags/upload-tags.component';


const routes: Routes = [
  {
    path:'',
    component: DataExplorerContainerComponent,
    children:[
      {
        path:'data',
        component: CollectionDataComponent,
      },
      {
        path:'tags',
        component: UploadTagsComponent,
      },
      {
        path:'uploads',
        component: UploadFlowComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataExplorerRoutingModule { }
