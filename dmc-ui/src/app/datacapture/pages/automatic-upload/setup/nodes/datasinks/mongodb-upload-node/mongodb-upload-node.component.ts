import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { NodeMongoDBUpload } from '@app/datacapture/pages/automatic-upload/pipeline/models/nodes/datasink.model';
import { ConnectorsService } from '@app/datacapture/pages/connectors/services/connectors.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-mongodb-upload-node',
  templateUrl: './mongodb-upload-node.component.html',
  styleUrls: ['./mongodb-upload-node.component.css']
})
export class MongodbUploadNodeComponent extends PipelineNodeComponent {

  nodeClass = NodeMongoDBUpload
  editorOptions = {language: 'python'};

  constructor(private connectors: ConnectorsService) { 
    super()
  }

  ngOnInit(){
    this.getConnectors()

    super.ngOnInit()
  }

  connectors$

  getConnectors(){
    this.connectors$ = this.connectors.getAllByType(this.nodeClass.connectorDef.type).pipe(take(1))
  }

}
