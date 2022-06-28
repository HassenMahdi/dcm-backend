import { CONNECTOR_DEF_BLOB_STORAGE, CONNECTOR_DEF_MONGODB, CONNECTOR_DEF_POSTGRES, CONNECTOR_DEF_SQL } from "@app/datacapture/pages/connectors/models/connectors.model";
import * as go from "gojs";
import { PipelineNode } from "../node.model";

const $ = go.GraphObject.make;

export class NodeDatasource extends PipelineNode{
    static type = 'DATASOURCE'
    static category = 'DATASOURCE'
    static shape = 'RoundedRectangle'
    static color = '#1ca5cc'
    static label = 'Generic Datasource'
    static ports = [{id:"OUTPUT",spot:go.Spot.RightCenter}]
    static showLabel = true
    static package = "CONNECT"
}

export class NodeImportConnector extends NodeDatasource{
    static connectorDef:any
    
    static type = "IMPORT_CONNECTOR"

    public static createNode(){
        const connector_data = {
            connector_type: this.connectorDef.type
        }   
        return {...super.createNode(), ...connector_data}
    }
}

export class NodeManualImport extends NodeDatasource{
    static type = "IMPORT_MANUAL"  
    static nzicon = 'file'
    static label = "File"
    static package = 'CORE';
}


export class NodeBlobStorage extends NodeImportConnector{
    static type = "BLOB_STORAGE_IMPORT_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_BLOB_STORAGE    
}

export class NodeSQLImport extends NodeImportConnector{
    static type = "SQL_IMPORT_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_SQL
}

export class NodePostgresImport extends NodeImportConnector{
    static type = "POSTGRES_IMPORT_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_POSTGRES
}

export class NodeMongoDBImport extends NodeImportConnector{
    static type = "MONGODB_IMPORT_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_MONGODB
}

// export class NodeMongoDBImport extends NodeImportConnector{
//     static type = "MONGODB_IMPORT_CONNECTOR"
//     static connectorDef = CONNECTOR_DEF_MONGODB
// }

// SET UP NODE METADATA
for (let cls of [NodeBlobStorage, NodeSQLImport, NodePostgresImport, NodeMongoDBImport]){
    cls.nzicon = cls.connectorDef.icon
    cls.label = cls.connectorDef.label
}

export class NodeCollectionImport extends NodeDatasource{
    static type = "COLLECTION_IMPORT"
    static nzicon = 'folder'
    static label = 'Collection'
}
