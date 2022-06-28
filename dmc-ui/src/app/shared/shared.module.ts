import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsProviderModule } from '@app/icons-provider.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NzIconService, NzModalModule } from 'ng-zorro-antd';
import { PageHeaderComponent } from './page-header/page-header.component';
import { UtilsService } from './services/utils.service';
import { BoolIconComponent } from './bool-icon/bool-icon.component';
import { NsAutoHeightTableDirective } from './directives/auto-table-height.directive';
import { DataGridComponent } from './data-grid/data-grid.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';
import { AngularResizedEventModule } from 'angular-resize-event';
import { EnvTagComponent } from './env-tag/env-tag.component';
import { AuditComponent } from './audit/audit.component';
import { RegexHelperTriggerComponent } from './regex-helper/regex-helper-trigger/regex-helper-trigger.component';
import { RegexHelperDocumentationComponent } from './regex-helper/regex-helper-documentation/regex-helper-documentation.component';
import { KeyFilterPipe } from './pipes/key-filter.pipe';
import { CustomIconsService } from './services/custom-icons.service';
import { GridFooterComponent } from './grid-footer/grid-footer.component';
import { TagsCellRendererComponent } from './tags-cell-renderer/tags-cell-renderer.component';
import { GridCellAutoTypeComponent } from './grid-cell-auto-type/grid-cell-auto-type.component';
import { DomainHierarchyComponent } from './domain-hierarchy/domain-hierarchy.component';
import { DomainBreadcrumbComponent } from './domain-breadcrumb/domain-breadcrumb.component';
import { ClearGridFilterComponent } from './clear-grid-filter/clear-grid-filter.component';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { MetaComponent } from '@app/datacapture/pages/admin/componenets/meta/meta.component';
import { DcmPreviewGridComponent } from './dcm-preview-grid/dcm-preview-grid.component';
import { ConnectorPreviewComponent } from './connector-preview/connector-preview.component';
import { DcmCleansingGridComponent } from './dcm-cleansing-grid/dcm-cleansing-grid.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
// import { ZorroSharperModule } from "zorro-sharper";

// In this constant, Add all the shared modules and components that you will be using in all the rest of the application
// For example, All the modules of the ANT JS Library.
// This is So each module gets imported once throughout all the application.
const SharedModules = [
  CommonModule,
  IconsProviderModule,
  NgZorroAntdModule,
  FormsModule,
  ReactiveFormsModule,
  NzModalModule,
  AngularResizedEventModule,
  AgGridModule,
  MonacoEditorModule,
];

const Components = [
  PageHeaderComponent,
  BoolIconComponent,
  NsAutoHeightTableDirective,
  DataGridComponent,
  CustomTooltipComponent,
  EnvTagComponent,
  AuditComponent,
  RegexHelperTriggerComponent,
  KeyFilterPipe,
  RegexHelperDocumentationComponent,
  GridFooterComponent,
  TagsCellRendererComponent,
  GridCellAutoTypeComponent,
  DomainHierarchyComponent,
  DomainBreadcrumbComponent,
  ClearGridFilterComponent,
  MetaComponent,
  DcmPreviewGridComponent,
  ConnectorPreviewComponent,
  DcmCleansingGridComponent
];

@NgModule({
  imports: [
    ...SharedModules,
  ],
  declarations: [
    ...Components,
    SafeHtmlPipe,
  ],
  exports: [
    ...SharedModules,
    ...Components
  ],
  providers: [
    UtilsService,
    // CustomIconsService,
    {provide: NzIconService, useClass:CustomIconsService}
  ],
  entryComponents: [
    CustomTooltipComponent,
    AuditComponent,
    RegexHelperDocumentationComponent,
    TagsCellRendererComponent,
    GridCellAutoTypeComponent,
  ]
})
export class SharedModule {}


