import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { NodeBlobStorage } from '@app/datacapture/pages/automatic-upload/pipeline/models/nodes/datasources.model';
import { CONNECTOR_DEF_BLOB_STORAGE } from '@app/datacapture/pages/connectors/models/connectors.model';
import { ConnectorsService } from '@app/datacapture/pages/connectors/services/connectors.service';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AzureConnectorService } from './services/azure-connector.service';

@Component({
  selector: 'app-storage-account',
  templateUrl: './storage-account.component.html',
  styleUrls: ['./storage-account.component.css']
})
export class StorageAccountImportNodeComponent extends PipelineNodeComponent {

  nodeClass = NodeBlobStorage

  constructor(private con: AzureConnectorService, private connectors: ConnectorsService) { 
    super()
  }

  ngOnInit(){
    this.getConnectors()

    super.ngOnInit()
  }

  containers$ = new BehaviorSubject<any>(null)
  blobs$ = new BehaviorSubject<any>(null)
  connectors$

  getConnectors(){
    this.connectors$ = this.connectors.getAllByType(CONNECTOR_DEF_BLOB_STORAGE.type).pipe(take(1))
  }
}
