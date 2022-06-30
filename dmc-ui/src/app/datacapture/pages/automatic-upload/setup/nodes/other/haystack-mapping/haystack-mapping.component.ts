import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/core/notifications/notification.service';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { PiplineUtilityService } from '@app/datacapture/pages/automatic-upload/pipeline/services/pipline-utility.service';
import { BehaviorSubject } from 'rxjs';
import { HAYSTACK_DEFS } from './haystack.const';

@Component({
  selector: 'app-haystack-mapping',
  templateUrl: './haystack-mapping.component.html',
  styleUrls: ['./haystack-mapping.component.css']
})
export class HaystackMappingComponent  extends PipelineNodeComponent {
  
  TAGS = new BehaviorSubject(null)
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
  }

  AddTag(t)
  {
    console.log({t})
    if (!!this.targetTags.find(tt=>tt.target == t.name))
      return this.msg.warn("Tag already exists")

    console.log()
    const target:any = {target:t.def.val, source: null}

    const bIsMarker = t.is.find(is=>is.val == 'marker')
    if(bIsMarker)
    {
      target.value = "✓"
      target.disabled = true
    }

    const bIsRef = t.is.find(is=>is.val == 'ref')
    if(bIsRef)
    {
      target.prefix = "@"
    }
    
    this.targetTags.push(target)
  }

  AddHeader()
  {
    if (!this.addedHeader)
      return this.msg.warn("Header cannot be empty")
    if (!!this.sourceHeaders.find(h=>h==this.addedHeader))
      return this.msg.warn("Header already exists")
       
      this.sourceHeaders.push(this.addedHeader)
      this.addedHeader = ""
  }

  RemoveHeader(index)
  {
    const h = this.sourceHeaders[index]
    this.targetTags.forEach((t, i)=> {if(t.source==h) this.Unmap(t)})
    this.sourceHeaders.splice(index, 1)
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

  Untag(index)
  {
    this.targetTags.splice(index, 1)
  }

  getTags(filter='')
  {
    if (!!filter)
      this.TAGS.next(HAYSTACK_DEFS.rows.filter(t=>{return t.def.val.toLowerCase().match(filter.toLowerCase())}))
    else
      this.TAGS.next(HAYSTACK_DEFS.rows)
  }

  filterTimout = null
  filterTags()
  {
    if (this.filterTimout) window.clearTimeout(this.filterTimout);
    this.filterTimout = window.setTimeout(() => {this.getTags(this.tagSearch)}, 300)
  }

  onTagMenuVisibleChange(visible)
  {
    if(visible)
      this.getTags(this.tagSearch)
    else
      this.TAGS.next(null)
  }
}