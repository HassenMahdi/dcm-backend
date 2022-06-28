import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { NodeMapToStandard } from '@app/datacapture/pages/automatic-upload/pipeline/models/nodes/other.model';
import { PiplineUtilityService } from '@app/datacapture/pages/automatic-upload/pipeline/services/pipline-utility.service';
import { MappingTemplateService } from '@app/datacapture/pages/upload/services/mapping/mapping-template.service';
import { MappingService } from '@app/shared/services/mapping.service';
import { GetMappingDataToModel } from '@app/shared/utils/mapping.utils';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-node-template-mapping',
  templateUrl: './node-template-mapping.component.html',
  styleUrls: ['./node-template-mapping.component.css']
})
export class NodeTemplateMappingComponent  extends PipelineNodeComponent {
  
  static width = "70vw" 

  nodeClass = NodeMapToStandard;

  templates$
  sourceHeaders$
  template_id = null;
  mapping = {}

  enableExtentions = false;
  highlightDropZone = false

  showSummary = false;

  constructor(private templates:MappingTemplateService, 
    private utility: PiplineUtilityService, 
    private service:MappingService, 
    private msg: NotificationService) 
  {
    super();
  }

  ngOnInit(): void 
  {
   
    this.template_id = this.data.template_id;

    this.mapping = GetMappingDataToModel(this.data.mapping)

    this.sourceHeaders$ = this.utility.getNodeInputHeaders(this.data.key)
    this.templates$ = this.templates.getTemplates();
  }

  reset()
  {
    this.mapping = {}
  }

  onTemplateChanged(template_id)
  {
    this.template_id = template_id;
    this.mapping = {};
  }

  save()
  {
    this.data.template_id = this.template_id;

    this.data.mapping = []
    Object.keys(this.mapping).forEach(target=>{
      const source = this.mapping[target]

      this.data.mapping.push({target, source})
    })

    this.onSave.emit(this.data)
  }

  AutoMap()
  {
    forkJoin(this.sourceHeaders$.pipe(take(1)))
    .subscribe((headers)=>{
      const message = this.msg.loading(`Loading Mapping`)

      // RESOURCE WORKAORUND
      const resourceType = this.template_id.split('.')[0].toLowerCase();

        this.service.GetAutoMapping(headers[0], resourceType)
          .subscribe((mapping)=>{
            this.msg.close(message)
            this.mapping = GetMappingDataToModel(mapping)
        })
    })
  }
}
