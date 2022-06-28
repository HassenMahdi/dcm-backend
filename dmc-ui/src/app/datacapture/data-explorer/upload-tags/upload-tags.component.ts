import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '@app/datacapture/pages/dashboard/service/dashboard.service';
import { withValue } from '@app/shared/utils/rxjs.utils';
import { NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { ExplorerService } from '../services/explorer.service';

@Component({
  selector: 'app-upload-tags',
  templateUrl: './upload-tags.component.html',
  styleUrls: ['./upload-tags.component.css']
})
export class UploadTagsComponent implements OnInit, OnDestroy {

  constructor(private tags: DashboardService, private explorer: ExplorerService, private modals:NzModalService) { }
  ngOnDestroy(): void {
    if(this.paramChanges) this.paramChanges.unsubscribe()
  }


  loading$ = new BehaviorSubject(false)
  tags$
  paramChanges
  editValue = null
  editTag = null
  searchValue = ''

  ngOnInit() {
    this.paramChanges = this.explorer.collectionId$.subscribe((id)=>{
      this.load_tags()
    })
  }

  load_tags(){
    this.loading$.next(true)
    this.tags$ = this.explorer.collectionId$.pipe(
      take(1),
      switchMap((id)=>this.tags.getTags(id)),
      tap(()=>this.loading$.next(false))
    )
  }

  onDeleteTag(tag){
    this.loading$.next(true)
    withValue(this.explorer.collectionId$, (domainId)=>{
      this.tags.deleteTag(domainId, tag).subscribe(()=> this.load_tags())
    })
  }

  onStartEditTag(tag){
    this.editValue = tag
    this.editTag = tag
  }

  onEditTag(){
    withValue(this.explorer.collectionId$, (domainId)=>{
      this.tags.editTag(domainId, this.editTag, this.editValue).subscribe(()=> this.load_tags())
    })
  }
}
