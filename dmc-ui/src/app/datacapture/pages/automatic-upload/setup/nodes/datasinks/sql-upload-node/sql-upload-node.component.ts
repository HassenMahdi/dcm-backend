import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { NodeSQLUpload } from '@app/datacapture/pages/automatic-upload/pipeline/models/nodes/datasink.model';
import { ConnectorsService } from '@app/datacapture/pages/connectors/services/connectors.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sql-upload-node',
  templateUrl: './sql-upload-node.component.html',
  styleUrls: ['./sql-upload-node.component.css']
})
export class SqlUploadNodeComponent extends PipelineNodeComponent {

  nodeClass = NodeSQLUpload

  constructor(private connectors: ConnectorsService) { 
    super()
  }

  editorOptions = {language: 'sql'};

  ngOnInit(){
    this.getConnectors()

    super.ngOnInit()
  }

  connectors$

  getConnectors(){
    this.connectors$ = this.connectors.getAllByType(this.nodeClass.connectorDef.type).pipe(take(1))
  }



}
