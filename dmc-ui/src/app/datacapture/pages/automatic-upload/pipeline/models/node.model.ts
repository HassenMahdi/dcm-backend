import { DcmPreviewGridComponent } from "@app/shared/dcm-preview-grid/dcm-preview-grid.component";
import { CustomIconsService } from "@app/shared/services/custom-icons.service";
import { ServiceLocator } from "@app/shared/utils/injector.utils";
import { stateColor } from "@app/shared/utils/state-colors.utils";
import { randomPosition } from "@app/shared/utils/strings.utils";
import * as go from "gojs";

const $ = go.GraphObject.make;

export class PipelineNode{

    // NODE CATEGORY MUST BE UNIQUE FOR EACH CLASS(USED TO FETCH CLASS )
    static type;
    // NODE CATEGORY
    static category;
    // DEFAULT LABEL OF THE NODE
    static label;
    static showLabel = true
    
    
    // NODE COLORATION OR THEME
    static color = '#c8c811';
    static background = 'white';
    static textcolor = 'black';
    static shape = 'Circle'
    static shapeSize = 50
    // icons as source
    static icon = null;
    // icons as ng zorro type
    static nzicon = null;
    static icontransform = null;
    static iconSize= 32
    static width = 180;
    static icontype = "";
    static fontFamily = '-apple-system, BlinkMacSystemFont, sans-serif;';
    static component: any = null;

    static previewComponent: any = DcmPreviewGridComponent

    static package = 'CORE'

    public static getPreviewNode(data, run){ 
        const task = run.tasks.find(t => t.task_id == data.key)
        const output = task.output
        if(output)
        {
            return {
                component:this.previewComponent,
                params:{
                    file_id: output.file_id,
                    sheet_id: output.sheet_id,
                    folder: output.folder
                }
            }
        } 
        return null
    } 

    public static onDoubleClicked(task)
    {
        const status = task.state
        if(status == "success")
            return "PREVIEW"
        if(status == "running")
            return "PREVIEW"

        return "EDIT"        
    }

    // PORTS USED FOR THE DATAGRID
    public static getComponenent(node){
        return this.component
    }

    public static setComponenet(c){
        this.component = c
        return this
    }

    static ports: {id: string, spot: go.Spot}[] = [];

    constructor(){}

    public static validate(){

    }

    public static createNode(){
        return {
            key : String(new Date().getTime()),
            label: this.label,
            type: this.type,
            loc: randomPosition(10) + " " + randomPosition(10)
        };
    }

    public static getNodeTemplate(options = {}, addons=[]){
        return $(go.Node, 'Spot',
            {...options},
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            ...this.makeAddons(addons),
            ...this.makeRunStatus(),
            $(go.Panel, "Vertical",
            $(go.Panel, "Auto",
            $(go.Shape, this.shape, { 
                fill: this.color, 
                stroke: null,  
                desiredSize: new go.Size(this.shapeSize, this.shapeSize) 
                },
                this.runBinding('fill')
                ),
            this.makeIcon(),
            )
            ),
            { toolTip: $("ToolTip",$(go.TextBlock, { text: this.label, margin: 4 }))},
            ...this.makeLabels(),
            ...this.makePorts(),
        )
    }

    public static makeAddons(addons: any[]){
       return addons.map(a=>a(this))
    }

    public static makePorts() {
        return this.ports.map((p)=>$(go.Shape, 'Circle',
        {
            opacity: 1,
            fill: this.color,
            strokeWidth: 2,
            stroke:"white",
            desiredSize: new go.Size(10,10),
            portId: p.id, 
            alignment: p.spot,
            fromLinkable: true,
            toLinkable: true
        },
        this.runBinding('fill')
        )) 
    }

    public static makeIcon(){
        let i = {}
        if (this.nzicon){
            const iconsService = ServiceLocator.injector.get(CustomIconsService)
            const svg = iconsService.getIconSvgElement(this.nzicon+'-o')
            i={element: svg}
        } else if(this.icon) {
            i ={ source: this.icon }
        } else {
            i={}
        }

        return  $(go.Picture, { desiredSize: new go.Size(this.iconSize, this.iconSize), ...i, margin: 8, transform: this.icontransform })
    }

    public static makeLabels(){
        if(this.showLabel){
            return [
                $(go.Panel,{padding:4 , alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top},
                    $(go.TextBlock, { text: this.label, stroke:this.color}, new go.Binding("text", "label") )
                ) 
            ]
        }else{
            return []
        }
    }

    public static makeRunStatus(){
        return []
    }

    public static runBinding(property="stroke"){
        return new go.Binding(property, "run", (run, target)=>{
            if(run){
                const node = target.part.data
                const id = node.key
                const task = run.tasks.find(t=>t.task_id==id)
                if (task){
                   return stateColor(task.state)
                }
            }

            return this.color
          }).ofModel()
    }
}