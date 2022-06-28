import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectorsRoutingModule } from './connectors-routing.module';
import { ConnectorsComponent } from './containers/connectors/connectors.component';
import { SharedModule } from '@app/shared';
import { ConnectorTypesComponent } from './modals/connector-types/connector-types.component';
import { ConnectorSQLSetupComponent } from './modals/connector-sqlsetup/connector-sqlsetup.component';
import { ConnectorAzureBlobSetupComponent } from './modals/connector-azure-blob-setup/connector-azure-blob-setup.component';
import { ConnectorAWSS3SetupComponent } from './modals/connector-awss3-setup/connector-awss3-setup.component';
import { ConnectorIconComponent } from './shared/connector-icon/connector-icon.component';


@NgModule({
  declarations: [ConnectorsComponent, ConnectorTypesComponent, ConnectorSQLSetupComponent, ConnectorAzureBlobSetupComponent, ConnectorAWSS3SetupComponent, ConnectorIconComponent],
  imports: [
    CommonModule,
    ConnectorsRoutingModule,
    SharedModule,
  ]
})
export class ConnectorsModule { }
