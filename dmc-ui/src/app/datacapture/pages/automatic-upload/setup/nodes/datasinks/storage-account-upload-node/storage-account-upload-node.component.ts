import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { NodeBlobStorageUpload } from '@app/datacapture/pages/automatic-upload/pipeline/models/nodes/datasink.model';
import { ConnectorsService } from '@app/datacapture/pages/connectors/services/connectors.service';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AzureConnectorService } from '../../datasources/azure/storage-account/services/azure-connector.service';

@Component({
  selector: 'app-storage-account-upload-node',
  templateUrl: './storage-account-upload-node.component.html',
  styleUrls: ['./storage-account-upload-node.component.css']
})
export class StorageAccountUploadNodeComponent extends PipelineNodeComponent {

  nodeClass = NodeBlobStorageUpload

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
    this.connectors$ = this.connectors.getAllByType(this.nodeClass.connectorDef.type).pipe(take(1))
  }

}
