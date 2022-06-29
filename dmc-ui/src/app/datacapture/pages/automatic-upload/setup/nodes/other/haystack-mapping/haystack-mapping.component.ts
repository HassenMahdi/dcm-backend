import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/core/notifications/notification.service';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { PiplineUtilityService } from '@app/datacapture/pages/automatic-upload/pipeline/services/pipline-utility.service';
import { HAYSTACK_DEFS } from './haystack.const';

@Component({
  selector: 'app-haystack-mapping',
  templateUrl: './haystack-mapping.component.html',
  styleUrls: ['./haystack-mapping.component.css']
})
export class HaystackMappingComponent  extends PipelineNodeComponent {
  
  TAGS = []
  static width = "70vw" 
  
  highlightDropZone = false
  sourceHeaders = []
  targetTags = []

  addedHeader = ""
  tagSearch = "";

  constructor(
    private utility: PiplineUtilityService, 
    private msg: NotificationService) 
  {
    super();
  }

  ngOnInit(): void 
  {
    this.sourceHeaders = this.data.headers || []
    this.targetTags = this.data.mapping || []

    this.filterTags()
  }

  AddTag(t)
  {
    console.log({tagDef: t})
    const bTagExist = !!this.targetTags.find(tt=>tt.target == t.name)
    if (bTagExist)
    {
      this.msg.warn("Tag already exists")
      return 
    }

    // this.targetTags.push({target:t.name, source: null})
  }

  AddHeader()
  {
    if (!this.addedHeader)
      return this.msg.warn("Header cannot be empty exists")
    if (!!this.sourceHeaders.find(h=>h==this.addedHeader))
      return this.msg.warn("Header already exists")
       
      this.sourceHeaders.push(this.addedHeader)
      this.addedHeader = ""
  }

  save(): void {
    this.data.headers = this.sourceHeaders
    this.data.mapping = this.targetTags

    this.onSave.emit(this.data)
  }

  Map(header, target)
  {
    target.source = header
  }

  Unmap(target)
  {
    target.source = null
  }

  filterTags()
  {
    if (!!this.tagSearch)
      this.TAGS = HAYSTACK_DEFS.rows.filter(t=>{return this.tagSearch.match(t.def.val.toLowerCase())})
    else
      this.TAGS = HAYSTACK_DEFS.rows
  }
}