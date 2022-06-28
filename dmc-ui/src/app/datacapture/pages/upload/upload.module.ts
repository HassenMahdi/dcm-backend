import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponentComponent } from './container/upload-component.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { ImportComponent } from './components/import/import.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { CleansingComponent } from './components/cleansing/cleansing.component';
import { PreviewComponent } from './components/preview/preview.component';
import { UploadComponent } from './components/upload/upload.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { uploadReducers } from './store/upload.state';
import { ImportEffects } from './store/effects/import.effect';
import { FileImportService } from './services/file-import.service';
import { MappingService } from './services/mapping.service';
import { NgDragDropModule } from 'ng-drag-drop';
import { DndModule } from 'ngx-drag-drop';
import { CleansingService } from './services/cleansing.service';
import { TransformationPipeComponent } from './components/transformation/transformation-pipe/transformation-pipe.component';
import { TransformationNodeComponent } from './components/transformation/transformation-node/transformation-node.component';
import { TransformationInterfaceComponent } from './components/transformation/transformations/transformation-interface/transformation-interface.component';
import { FormatterComponent } from './components/transformation/transformations/transformation-interface/format/formatter/formatter.component';
import { ColumnsInputComponent } from './components/transformation/shared/columns-input/columns-input.component';
import { UploadGuard } from './guards/upload.guard';
import { MergerComponent } from './components/transformation/transformations/transformation-interface/format/merger/merger.component';
import { DeleteColumnComponent } from './components/transformation/transformations/transformation-interface/format/delete-column/delete-column.component';
import { DeleteRowsComponent } from './components/transformation/transformations/transformation-interface/format/delete-rows/delete-rows.component';
import { ActiveTransformationInputComponent } from './components/transformation/shared/active-transformation-input/active-transformation-input.component';
import { TransformationLoaderComponent } from './components/transformation/shared/transformation-loader/transformation-loader.component';
import { TransformationSaverComponent } from './components/transformation/shared/transformation-saver/transformation-saver.component';
import { TranformationService } from './components/transformation/services/tranformation.service';
import { TranformationDrawerService } from './components/transformation/services/tranformation-drawer.service';
import { TargetPreviewComponent } from './components/preview/view-modes/target-preview/target-preview.component';
import { SourcePreviewComponent } from './components/preview/view-modes/source-preview/source-preview.component';
import { TransformationEffects } from './components/transformation/store/transformation.effect';
import { PreviousMappingsComponent } from './components/mapping/previous-mappings/previous-mappings.component';
import { TransformationSideBarComponent } from './components/transformation/transformation-side-bar/transformation-side-bar.component';
import { TransformationToolbarComponent } from './components/transformation/transformation-toolbar/transformation-toolbar.component';
import { SheetSelectorComponent } from './components/preview/sheet-selector/sheet-selector.component';
import { FilterComponent } from './components/transformation/transformations/transformation-interface/format/filter/filter.component';
import { NodeStatusComponent } from './components/transformation/shared/node-status/node-status.component';
import { TransformationPreviewHelpComponent } from './components/transformation/modals/transformation-preview-help/transformation-preview-help.component';
import { TransformationHotKeysService } from './components/transformation/services/transformation-hot-keys.service';
import { GridBottomToolbarComponent } from './components/preview/view-modes/grid-bottom-toolbar/grid-bottom-toolbar.component';
import { ShortcutsListComponent } from './components/transformation/shared/shortcuts-list/shortcuts-list.component';
import { HotkeysFilterPipe } from './components/transformation/pipes/hotkeys-filter.pipe';
import { ShortcutsListHorizontalComponent } from './components/transformation/shared/shortcuts-list-horizontal/shortcuts-list-horizontal.component';
import { SheetSelectionConfirmComponent } from './components/preview/sheet-selector/sheet-selection-confirm/sheet-selection-confirm.component';
import { SheetsFilterPipe } from './components/preview/sheet-selector/sheets-filter.pipe';
import { FindAndReplaceComponent } from './components/transformation/transformations/transformation-interface/format/find-and-replace/find-and-replace.component';
import { PipeChangesAlertComponent } from './components/preview/pipe-changes-alert/pipe-changes-alert.component';
import { DefaultValueComponent } from './components/transformation/transformations/transformation-interface/format/default-value/default-value.component';
import { DeactivateUploadGuard } from './guards/deactivate-upload.guard';
import { SplitterComponent } from './components/transformation/transformations/transformation-interface/format/splitter/splitter.component';
import { MappingEffects } from './store/effects/mapping.effect';
import { OverviewComponent } from './components/upload/overview/overview.component';
import { UploadTagsComponent } from './components/upload/upload-tags/upload-tags.component';
import { UploadService } from './services/upload.service';
import { UploadDataComponent } from './components/upload/upload-data/upload-data.component';
import { FilterPipe } from './pipe/source-filter.pipe';
import { CalculatorComponent } from './components/transformation/transformations/transformation-interface/format/calculator/calculator.component';
import { CalculatorModalComponent } from './components/transformation/transformations/transformation-interface/format/calculator/calculator-modal/calculator-modal.component';
import { ImportedFileInfoComponent } from './components/import/imported-file-info/imported-file-info.component';
import { DateFormatterComponent } from './components/transformation/transformations/transformation-interface/format/date-formatter/date-formatter.component';
import { DatasetComponent } from './components/import/dataset/dataset.component';
import { HeaderDescriptionComponent } from './components/transformation/modals/transformation-preview-help/header-description/header-description.component';
import { GroupByComponent } from './components/transformation/transformations/transformation-interface/format/group-by/group-by.component';
import { HashComponent } from './components/transformation/transformations/transformation-interface/format/hash/hash.component';
import { SubstringComponent } from './components/transformation/transformations/transformation-interface/format/substring/substring.component';

const components = [
  UploadComponentComponent,
  StepperComponent,
  ImportComponent,
  MappingComponent,
  CleansingComponent,
  PreviewComponent,
  UploadComponent,
  TransformationPipeComponent,
  TransformationNodeComponent,
  TransformationInterfaceComponent,
  FormatterComponent,
  ColumnsInputComponent,
  MergerComponent,
  DeleteColumnComponent,
  DeleteRowsComponent,
  ActiveTransformationInputComponent,
  TransformationLoaderComponent,
  TransformationSaverComponent,
  TargetPreviewComponent,
  SourcePreviewComponent,
  PreviousMappingsComponent,
  TransformationSideBarComponent,
  TransformationToolbarComponent,
  SheetSelectorComponent,
  FilterComponent,
  NodeStatusComponent,
  TransformationPreviewHelpComponent,
  GridBottomToolbarComponent,
  ShortcutsListComponent,
  HotkeysFilterPipe,
  ShortcutsListHorizontalComponent,
  SheetSelectionConfirmComponent,
  SheetsFilterPipe,
  FindAndReplaceComponent,
  PipeChangesAlertComponent,
  DefaultValueComponent,
  SplitterComponent,
  OverviewComponent,
  UploadTagsComponent,
  UploadDataComponent,
  FilterPipe,
  CalculatorComponent,
  CalculatorModalComponent,
  ImportedFileInfoComponent,
  DateFormatterComponent,
  DatasetComponent, 
  HeaderDescriptionComponent, 
  GroupByComponent,
  HashComponent
];

@NgModule({
  imports: [
    UploadRoutingModule,
    SharedModule,
    StoreModule.forFeature('upload', uploadReducers),
    EffectsModule.forFeature([ImportEffects, TransformationEffects, MappingEffects]),
    // Drag and Drop
    DndModule,
    NgDragDropModule.forRoot(),
  ],
  declarations: [...components, SubstringComponent],
  exports: [
  ],
  providers : [
    FileImportService,
    MappingService,
    CleansingService,
    UploadGuard,
    DeactivateUploadGuard,
    TranformationDrawerService,
    TranformationService,
    TransformationHotKeysService,
    UploadService
  ],
  entryComponents: [
    TransformationPipeComponent,
    HeaderDescriptionComponent,
    TransformationInterfaceComponent,
    FormatterComponent,
    MergerComponent,
    DeleteColumnComponent,
    DeleteRowsComponent,
    PreviousMappingsComponent,
    FilterComponent,
    TransformationPreviewHelpComponent,
    SheetSelectionConfirmComponent,
    FindAndReplaceComponent,
    PipeChangesAlertComponent,
    DefaultValueComponent,
    SplitterComponent,
    CalculatorComponent,
    CalculatorModalComponent,
    DateFormatterComponent,
    DatasetComponent,
    GroupByComponent,
    HashComponent
  ]
})
export class UploadModule {}
