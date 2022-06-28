import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RefernceDataPageComponent } from './pages/refernce-data-page/refernce-data-page.component';
import { FieldsPageComponent } from './pages/fields-page/fields-page.component';
import { DomainsPageComponent } from './pages/domains-page/domains-page.component';
import { SharedModule } from '@app/shared';
import { DomainConfigModalComponent } from './modals/domain-config-modal/domain-config-modal.component';
import { FieldModalComponent } from './modals/field-modal/field-modal.component';
import { SuperDomainsPageComponent } from './pages/super-domains-page/super-domains-page.component';
import { SuperDomainConfigModalComponent } from './modals/super-domain-config-modal/super-domain-config-modal.component';
import { DomainCardComponent } from './componenets/domain-card/domain-card.component';
import { DomainsHierarchyComponent } from './componenets/domains-hierarchy/domains-hierarchy.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { CollectionDetailsComponent } from './pages/collection-details/collection-details.component';
import { CollectionCardComponent } from './componenets/collection-card/collection-card.component';
import { CollectionEditor } from './services/collection-editor.service';
import { TreePipe } from './pipes/tree.pipe';
// import { MetaComponent } from './componenets/meta/meta.component';
import { SimpleFilterPipe } from './pipes/simple-filter.pipe';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdminReducer, FEATURE_NAME } from './store/admin.state';
import { DisplayChangerComponent } from './componenets/display-changer/display-changer.component';
import { FieldInputComponent } from './componenets/field-input/field-input.component';
import { FieldTypesComponent } from './componenets/field-types/field-types.component';
import { FieldTypesPipe } from './componenets/field-types.pipe';
import { ChecksTypesPipe } from './componenets/check-field-types';
import { RefrenceTypesComponent } from './componenets/references/refrence-types/refrence-types.component';
import { RefrenceTypeDataComponent } from './componenets/references/refrence-type-data/refrence-type-data.component';
import { RefrenceTypeEditorComponent } from './componenets/references/refrence-type-editor/refrence-type-editor.component';
import { ReferenceUtilsService } from './componenets/references/reference-utils.service';
import { ReferenceDataEditorComponent } from './componenets/references/reference-data-editor/reference-data-editor.component';
import { ReferenceTypeInputComponent } from './componenets/reference-type-input/reference-type-input.component';
import { DefaultChecksComponent } from './modals/field-modal/default-checks/default-checks.component';
import { ReferenceInputComponent } from './componenets/reference-input/reference-input.component';
import { GlobalReferencesComponent } from './pages/global-references/global-references.component';
import { GlobalReferenceTypesComponent } from './componenets/global-reference-types/global-reference-types.component';
import { ShareWithCollectionsComponent } from './modals/share-with-collections/share-with-collections.component';
import { GlobalReferenceDataComponent } from './pages/global-reference-data/global-reference-data.component';
import { ReferenceTypeVersionEditorComponent } from './componenets/references/reference-type-version-editor/reference-type-version-editor.component';


@NgModule({
  declarations: [
    RefernceDataPageComponent, 
    FieldsPageComponent, 
    DomainsPageComponent, 
    DomainConfigModalComponent,
    SuperDomainConfigModalComponent,
    FieldModalComponent, 
    SuperDomainsPageComponent,
    DomainCardComponent,
    DomainsHierarchyComponent,
    AdminLayoutComponent,
    CollectionDetailsComponent,
    CollectionCardComponent,
    TreePipe,
    // MetaComponent,
    SimpleFilterPipe,
    DisplayChangerComponent,
    FieldInputComponent,
    FieldTypesComponent,
    FieldTypesPipe,
    ChecksTypesPipe,
    RefrenceTypesComponent,
    RefrenceTypeDataComponent,
    RefrenceTypeEditorComponent,
    ReferenceDataEditorComponent,
    ReferenceTypeInputComponent,
    DefaultChecksComponent,
    ReferenceInputComponent,
    GlobalReferencesComponent,
    GlobalReferenceTypesComponent,
    ShareWithCollectionsComponent,
    GlobalReferenceDataComponent,
    ReferenceTypeVersionEditorComponent
  ],
  providers:[
    CollectionEditor,
    ReferenceUtilsService
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,

    StoreModule.forFeature(FEATURE_NAME, AdminReducer),
    EffectsModule.forFeature([]),
  ],
  entryComponents:[ShareWithCollectionsComponent, DomainConfigModalComponent, FieldModalComponent, SuperDomainConfigModalComponent, RefrenceTypeEditorComponent, ReferenceDataEditorComponent]
})
export class AdminModule { }
