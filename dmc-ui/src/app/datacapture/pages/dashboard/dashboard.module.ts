import { NgModule } from '@angular/core';
import { DashboardComponent } from './container/dashboard-container.component';
import { SharedModule } from '@app/shared';
import { DashboardService } from './service/dashboard.service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserDashboardComponent } from './container/user-dashboard/user-dashboard.component';


@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule,
    // StoreModule.forFeature(FEATURE_NAME, DashboardReducer),
    // EffectsModule.forFeature([]),
  ],
  declarations: [
    DashboardComponent,
    // UploadListComponent,
    // UploadDataComponent,
    UserDashboardComponent
  ],
  exports: [
  ],
  providers : [
    DashboardService
  ],
  entryComponents: [
  ]
})
export class DashboardModule {}
