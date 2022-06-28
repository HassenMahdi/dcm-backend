import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipelineRoutingModule } from './pipeline-routing.module';
import { PipelineEditorComponent } from './componenets/pipeline-editor/pipeline-editor.component';
import { SharedModule } from '@app/shared/shared.module';
import { PipelineNodeComponent } from './componenets/pipeline-editor/pipeline-node/pipeline-node.component';

import { GojsAngularModule } from 'gojs-angular';
import { PipelineEditorSidebarComponent } from './componenets/pipeline-editor/pipeline-editor-sidebar/pipeline-editor-sidebar.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { PiplineTemplateViewerComponent } from './componenets/pipeline-editor/pipline-template-viewer/pipline-template-viewer.component';
import { AuthorPipelineComponent } from './containers/author-pipeline/author-pipeline.component';
import { FEATURE_NAME, PipelineReducer } from './store/pipeline.state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EditPipelineMetadataComponent } from './componenets/modals/edit-pipeline-metadata/edit-pipeline-metadata.component';
import { PipelineEffects } from './store/pipeline.effects';
import { PipelineRunToolbarComponent } from './componenets/pipeline-run-toolbar/pipeline-run-toolbar.component';
import { PipelineSetupModule } from '../setup/pipeline-setup.module';

// TODO REMOVE NGX PIPELINE FROM PACKAGE
@NgModule({
  declarations: [
    PipelineEditorComponent,
    PipelineNodeComponent,
    PipelineEditorSidebarComponent,
    PiplineTemplateViewerComponent,
    AuthorPipelineComponent,
    EditPipelineMetadataComponent,
    PipelineRunToolbarComponent,
  ],
  imports: [
    StoreModule.forFeature(FEATURE_NAME, PipelineReducer),
    EffectsModule.forFeature([PipelineEffects]),
    CommonModule,
    // PipelineRoutingModule,
    SharedModule,
    GojsAngularModule,
    NgxJsonViewerModule,

    PipelineSetupModule
  ]
})
export class PipelineModule { }
