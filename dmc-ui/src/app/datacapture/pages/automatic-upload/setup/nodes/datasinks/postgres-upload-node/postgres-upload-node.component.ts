import { Component, OnInit } from '@angular/core';
import { NodePostgresUpload } from '@app/datacapture/pages/automatic-upload/pipeline/models/nodes/datasink.model';
import { ConnectorsService } from '@app/datacapture/pages/connectors/services/connectors.service';
import { SqlUploadNodeComponent } from '../sql-upload-node/sql-upload-node.component';

@Component({
  selector: 'app-postgres-upload-node',
  templateUrl: '../sql-upload-node/sql-upload-node.component.html',
})
export class PostgresUploadNodeComponent extends SqlUploadNodeComponent {

  nodeClass = NodePostgresUpload

  constructor(connectors: ConnectorsService){
    super(connectors)
  }

}
