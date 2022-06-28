
import * as go from "gojs";
import { PipelineNode } from "../node.model";

const $ = go.GraphObject.make;

export class NodeConcat extends PipelineNode{
    static type = 'concat'
    static category = 'MERGE'
    static nzicon = "insert-row-below"
    static color = 'orange';
    static label = 'Concat'
    static ports = [
        {id:"INPUT",spot:new go.Spot(0.1,0.2)},
        {id:"CONCAT",spot: new go.Spot(0.1,0.8)},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
}

export class NodeTransformationPipeline extends PipelineNode{
    static type = 'PIPELINE_TRANSFORMATION'
    static category = 'TRANSFORMATION'
    static nzicon = "api"
    static color = 'darkorange';
    static label = 'Pipeline'
    static ports = [
        {id:"INPUT",spot: go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
}

export class NodeJoin extends PipelineNode{
    static type = 'join'
    static category = 'MERGE'
    static nzicon = "link"
    static color = 'orange';
    static label = 'Join'
    static ports = [
        {id:"INPUT",spot: new go.Spot(0.1,0.2)},
        {id:"JOIN", spot: new go.Spot(0.1,0.8)},
        {id:"OUTPUT",spot:go.Spot.RightCenter},
    ]
}

export class NodePycode extends PipelineNode{
    static type = 'pycode';
    static category = 'SCRIPTS';

    // static icon = 'assets/images/svg/pycode.svg';
    static nzicon = "pycode" 
    static color = 'red';
    static label = 'Python Transformation'
    static ports = [
        {id:"INPUT",spot:go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ];
}


export class NodeMap extends PipelineNode{
    static type = 'map'
    static category = 'MAPPING'
    static nzicon = "rotate-left"
    static color = 'darkorange';
    static label = 'Simple Mapping'
    static ports = [
        {id:"INPUT",spot: go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
}

export class NodeMapToStandard extends PipelineNode{
    static type = 'map_standard'
    static category = 'MAPPING'    
    static nzicon = "fire"
    static color = 'darkorange';
    static label = 'HL7-FHIR'
    static package = "HL7";
    static ports = [
        {id:"INPUT",spot: go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
}

export class NodeMapToHaystack extends PipelineNode{
    static type = 'map_haystack'
    static category = 'MAPPING'    
    static nzicon = "tag"
    static color = 'darkorange';
    static label = 'Haystack'
    static package = "IOT";
    static ports = [
        {id:"INPUT",spot: go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
}

export class NodeRequest extends PipelineNode{
  static type = 'request'
  static category = 'API CALL'
  static nzicon = "api"
  static color = 'purple';
  static label = 'API Request (For each)'
  static ports = [
      {id:"INPUT",spot: go.Spot.Left},
      {id:"OUTPUT",spot:go.Spot.Right},
  ]
}

export class NodeRequestImport extends PipelineNode{
    static type = 'import_api'
    static category = 'API CALL'
    static nzicon = "api"
    static color = 'purple';
    static label = 'API Request'
    static ports = [
        // {id:"INPUT",spot: go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
  }

export class NodeSelect extends PipelineNode{
    static type = 'select'
    static category = 'TRANSFORMATION'    
    static nzicon = "select"
    static color = 'darkorange';
    static label = 'Select'
    static ports = [
        {id:"INPUT",spot: go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
}