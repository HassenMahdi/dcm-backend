import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { NodeMongoDBImport } from '@app/datacapture/pages/automatic-upload/pipeline/models/nodes/datasources.model';
import { ConnectorsService } from '@app/datacapture/pages/connectors/services/connectors.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-mongodb-import-node',
  templateUrl: './mongodb-import-node.component.html',
  styleUrls: ['./mongodb-import-node.component.css']
})
export class MongodbImportNodeComponent extends PipelineNodeComponent {

  nodeClass = NodeMongoDBImport

  constructor(private connectors: ConnectorsService) { 
    super()
  }

  ngOnInit(){
    this.getConnectors()

    super.ngOnInit()
  }

  editorOptions = {language: 'python'};

  connectors$

  getConnectors(){
    this.connectors$ = this.connectors.getAllByType(this.nodeClass.connectorDef.type).pipe(take(1))
  }
}
