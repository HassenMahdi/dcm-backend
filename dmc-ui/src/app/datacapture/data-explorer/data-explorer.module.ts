import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataExplorerRoutingModule } from './data-explorer-routing.module';
import { DataExplorerContainerComponent } from './data-explorer-container/data-explorer-container.component';
import { SharedModule } from '@app/shared/shared.module';
import { UploadDataComponent } from '../pages/dashboard/components/upload-data/upload-data.component';
import { CollectionDataComponent } from './collection-data/collection-data.component';
import { UploadFlowComponent } from './upload-flow/upload-flow.component';
import { UploadTagsComponent } from './upload-tags/upload-tags.component';
import { UploadListComponent } from '../pages/dashboard/components/upload-list/upload-list.component';
import { StoreModule } from '@ngrx/store';
import { DashboardReducer } from '../pages/dashboard/store/reducer/dashboard.reducer';
import { FEATURE_NAME } from '../pages/dashboard/store/dashboard.state';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [DataExplorerContainerComponent, UploadDataComponent, CollectionDataComponent, UploadFlowComponent, UploadTagsComponent, UploadListComponent],
  imports: [
    CommonModule,
    DataExplorerRoutingModule,
    SharedModule,
    StoreModule.forFeature(FEATURE_NAME, DashboardReducer),
    // CoreModule,
  ]
})
export class DataExplorerModule { }
