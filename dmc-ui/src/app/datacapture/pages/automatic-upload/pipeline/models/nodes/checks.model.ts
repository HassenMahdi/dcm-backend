import { DcmCleansingGridComponent } from "@app/shared/dcm-cleansing-grid/dcm-cleansing-grid.component";
import * as go from "gojs";
import { BaseCheckNodeComponent } from "../../../setup/nodes/checks/base-check-node/base-check-node.component";
import { PipelineNode } from "../node.model";
const $ = go.GraphObject.make;

export class NodeCheck extends PipelineNode{
    static type = 'NODE_CHECK'
    static category = 'CHECK'
    static shape = 'RoundedRectangle'
    static color = 'red'
    static label = 'Base Check'
    static ports = [{id:"INPUT",spot:go.Spot.LeftCenter}, {id:"OUTPUT",spot:go.Spot.RightCenter}]
    static showLabel = true

    static package = "CHECK";
    static component = BaseCheckNodeComponent;

    public static getPreviewNode(data, run){ 
        const task = run.tasks.find(t => t.task_id == data.key)
        const output = task.output
        const status = task.state

        if(status == "success")
        {
            return {
                component:this.previewComponent,
                params:{
                    file_id: output.file_id,
                    sheet_id: output.sheet_id,
                    folder: output.folder
                }
            }
        } else {
            return {
                component:DcmCleansingGridComponent,
                params:{
                    file_id: output.file_id,
                    sheet_id: output.sheet_id,
                    folder: output.folder,
                    result_id: output.result_id
                },
                OnOpen : (comp, obs)=>{comp.datasetChanged.subscribe(dataset=>obs.next(dataset))}
            }
        }
    } 

    public static onDoubleClicked(task)
    {
        const status = task.state
        if(status == "success")
            return "PREVIEW"
        if(status == "failed")
            if(task.output && task.output.result_id)
                return "PREVIEW"
            else
                return "EDIT"

        return "EDIT"        
    }
}

export class NodeDuplicateCheck extends NodeCheck{
    static type = "duplicate_check"
    static label = "Duplicate Check"
    static nzicon = 'copy'
}

export class NodeComparionCheck extends NodeCheck{
    static type = "string_comparison"
    static label = "Format Comparison"
    static nzicon = "pause"
    static icontransform = "rotate(90deg)"
}

export class NodeColumnComparison extends NodeCheck{
    static type = "column_comparison"
    static label = "Column Compariosn"
    static nzicon = 'pause'
    static icontransform = "rotate(90deg)"
}

export class NodeCodeCheck extends NodeCheck{
    static type = "pycode_check"
    static label = "Python Check"
    static nzicon = "pycode" 
    static category = "SCRIPTS" 
}

export class NodeTypeCheck extends NodeCheck{
    static type = "type_check"
    static label = "Type Check"
    static nzicon = "strikethrough" 
}

export class NodeMatchingScore extends NodeCheck{
    static type = 'matching_score'
    static nzicon = "column-width"
    static label = 'Matching Score'
  }

  export class NodeFormatCheck extends NodeCheck{
    static type = 'format_check'
    static nzicon = "font-size"
    static label = 'Format Check'
  }


  export class NodeEmptyCheck extends NodeCheck{
    static type = 'empty_check'
    static nzicon = "close-square"
    static label = 'Empty Check'
  }
  
