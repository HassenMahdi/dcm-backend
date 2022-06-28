import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { NodePostgresImport } from '@app/datacapture/pages/automatic-upload/pipeline/models/nodes/datasources.model';
import { ConnectorsService } from '@app/datacapture/pages/connectors/services/connectors.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-postgres-import-node',
  templateUrl: '../sql-import-node/sql-import-node.component.html',
  styleUrls: ['./postgres-import-node.component.css']
})
export class PostgresImportNodeComponent extends PipelineNodeComponent {

  nodeClass = NodePostgresImport

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


  getWith(type){
    return this.data.get_with==type
  }
}
