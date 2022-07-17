import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { StorageAccountImportNodeComponent } from './nodes/datasources/azure/storage-account/storage-account.component';
import { BaseNodeTransformationComponent } from './nodes/transformations/base-node-transformation/base-node-transformation.component';
import { NodePycodeComponent } from './nodes/other/node-pycode/node-pycode.component';
import { SqlImportNodeComponent } from './nodes/datasources/sql-import-node/sql-import-node.component';
import { SqlUploadNodeComponent } from './nodes/datasinks/sql-upload-node/sql-upload-node.component';
import { StorageAccountUploadNodeComponent } from './nodes/datasinks/storage-account-upload-node/storage-account-upload-node.component';
import { PostgresImportNodeComponent } from './nodes/datasources/postgres-import-node/postgres-import-node.component';
import { PostgresUploadNodeComponent } from './nodes/datasinks/postgres-upload-node/postgres-upload-node.component';
import { NodeFilterComponent } from './nodes/transformations/node-filter-component/node-filter-component.component';
import { NodeFilterReplaceComponent } from './nodes/transformations/node-filer-replace-component/node-filer-replace-component.component';
import { NodeMergeComponent } from './nodes/transformations/node-merge-component/node-merge-component.component';
import { NodeReplaceComponent } from './nodes/transformations/node-replace-component/node-replace-component.component';
import { NodeDeleteRowComponent } from './nodes/transformations/node-delete-row-component/node-delete-row-component.component';
import { NodeDefaultComponent } from './nodes/transformations/node-default-component/node-default-component.component';
import { NodeSplitterComponent } from './nodes/transformations/node-splitter-component/node-splitter-component.component';
import { NodeCalculcatorComponent } from './nodes/transformations/node-calculcator-component/node-calculcator-component.component';
import { NodeFormatDateComponent } from './nodes/transformations/node-format-date-component/node-format-date-component.component';
import { NodeGroupbyComponent } from './nodes/transformations/node-groupby-component/node-groupby-component.component';
import { NodeHashComponent } from './nodes/transformations/node-hash-component/node-hash-component.component';
import { CollectionImportComponent } from './nodes/datasources/collection-import/collection-import.component';
import { CollectionUploadComponent } from './nodes/datasinks/collection-upload/collection-upload.component';
import { NodeJoinComponent } from './nodes/other/node-join/node-join.component';
import { NodePipelineComponent } from './nodes/other/node-pipeline/node-pipeline.component';
import { NodeTranformationService } from './nodes/other/node-pipeline/service/node-transformation.service';
import { ManualImportNodeComponent } from './nodes/datasources/manual-import-node/manual-import-node.component';
import { MongodbUploadNodeComponent } from './nodes/datasinks/mongodb-upload-node/mongodb-upload-node.component';
import { MongodbImportNodeComponent } from './nodes/datasources/mongodb-import-node/mongodb-import-node.component';
import { NodeTemplateMappingComponent } from './nodes/other/node-template-mapping/node-template-mapping.component';
import { TemplateDefinitionComponent } from './nodes/other/node-template-mapping/template-definition/template-definition.component';
import { FormsModule } from '@angular/forms';

import { DndModule } from 'ngx-drag-drop';
import { EnbaleExtentionPipe } from './nodes/other/node-template-mapping/enbale-extention.pipe';
import { DraggableShelfComponent } from './nodes/other/node-template-mapping/draggable-shelf/draggable-shelf.component';
import { BaseCheckNodeComponent } from './nodes/checks/base-check-node/base-check-node.component';
import { NodeRequestComponent } from './nodes/other/node-request/node-request.component';
import { NodeCheckDuplicateComponent } from './nodes/other/node-check-duplicate/node-check-duplicate.component';
import { NodeMatchingScoreComponent } from './nodes/transformations/node-matching-score/node-matching-score.component';
import { NodeKeySelectComponent } from './nodes/transformations/node-key-select/node-key-select.component';
import { NodeSubstringComponent } from './nodes/transformations/node-substring/node-substring.component';
import { NodeEmptyCheckComponent } from './nodes/checks/node-empty-check/node-empty-check.component';
import { NodeFormatCheckComponent } from './nodes/checks/node-format-check/node-format-check.component';
import { HaystackMappingComponent } from './nodes/other/haystack-mapping/haystack-mapping.component';
import { NodePluginComponent } from './nodes/other/node-plugin/node-plugin.component';


const setupComponenets = [
  StorageAccountImportNodeComponent,
  BaseNodeTransformationComponent,
  NodePycodeComponent,
  SqlImportNodeComponent,
  SqlUploadNodeComponent,
  StorageAccountUploadNodeComponent,
  PostgresImportNodeComponent,
  PostgresUploadNodeComponent,
  NodeFilterComponent,
  NodeFilterReplaceComponent,
  NodeMergeComponent,
  NodeReplaceComponent,
  NodeDeleteRowComponent,
  NodeDefaultComponent,
  NodeSplitterComponent,
  NodeCalculcatorComponent,
  NodeFormatDateComponent,
  NodeGroupbyComponent,
  NodeHashComponent,
  CollectionImportComponent,
  CollectionUploadComponent,
  NodeJoinComponent,
  NodePipelineComponent,
  ManualImportNodeComponent,
  MongodbUploadNodeComponent,
  MongodbImportNodeComponent,
  NodeTemplateMappingComponent,
  TemplateDefinitionComponent,
  NodeCheckDuplicateComponent,
  NodeRequestComponent,
  NodeMatchingScoreComponent,
  NodeKeySelectComponent,
  BaseCheckNodeComponent,
    NodeSubstringComponent,
    NodeEmptyCheckComponent,
    NodeFormatCheckComponent,
]

const pipes = [
  EnbaleExtentionPipe
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    DndModule
  ],
  declarations: [
    ...setupComponenets,
    ...pipes,
    DraggableShelfComponent,
    HaystackMappingComponent,
    NodePluginComponent,
  ],
  exports: [
    ...setupComponenets,
    ...pipes,
  ],
  providers : [
    NodeTranformationService,
  ],
  entryComponents: [
    BaseNodeTransformationComponent,
    StorageAccountImportNodeComponent
  ]
})
export class PipelineSetupModule {}
