import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { PipelinesService } from '../../services/pipelines.service';
import { PipelineEditLinks, PipelineEditMetaData, PipelineEditNodes, PipelineEditRunId } from '../../store/pipeline.actions';
import { selectPipelineEditLinks, selectPipelineEditNodes, selectPipelineMetaData, selectRunId } from '../../store/pipeline.selectors';
import * as _ from 'lodash';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, interval, Observable, Subject, timer } from 'rxjs';
import { PipelineEditorService } from '../../services/pipeline-editor.service';
import { withValue } from '@app/shared/utils/rxjs.utils';
import { rejects } from 'assert';

@Component({
  selector: 'app-author-pipeline',
  templateUrl: './author-pipeline.component.html',
  styleUrls: ['./author-pipeline.component.css']
})
export class AuthorPipelineComponent implements OnDestroy {

  // PIPELINE DATA
  links$;
  nodes$;
  metadata$;

  // RUN DATA
  runId$: Observable<string>;// MANGAGE RUNS HERE
  run$ = new BehaviorSubject(null)
  stop$;
  context :any= {}


  // LOADERS
  loadingTrigger$ = new BehaviorSubject<any>(null)

  constructor(public pipelines: PipelinesService, private editorService: PipelineEditorService, private ntf: NotificationService, private store: Store<AppState>) {
    // FETCH STORE DATA
    this.links$ = this.store.select(selectPipelineEditLinks).pipe(map(e => _.cloneDeep(e)));
    this.nodes$ = this.store.select(selectPipelineEditNodes).pipe(map(e => _.cloneDeep(e)));
    this.metadata$ = this.store.select(selectPipelineMetaData).pipe(map(e => _.cloneDeep(e)));
    this.runId$ = this.store.select(selectRunId);
    // LISTENERS
    this.runId$.pipe(tap(this.onRunIdChanged)).subscribe()
   }

   
  ngOnDestroy(): void {this.resetRunData()}

  // METHODS +
  getContextFromRun(run: any) {
    this.context = {};
    if (run) {
      this.context[run.state] = true;
      this.context.preview = (run.conf) ? run.conf.preview : false;
      this.context.paused = run.paused;
    } else {
      this.context.idle = true;
    }
    this.context.monitor = (this.context.success || this.context.running || this.context.failed);
    this.context.monitor_as_preview = this.context.preview && this.context.monitor;
    this.context.monitor_as_run = !this.context.preview && this.context.monitor;
  }

  saveAndPublish=()=>this.save().then(()=>this.publish())

  // PUBLISH AND RESOLVE
  publish=()=>new Promise((resolve, reject) => {
      forkJoin([this.metadata$.pipe(take(1))])
      .subscribe(([metaData]: any) => {
        if(!metaData.pipeline_id)
        {
          reject("Pipeline ID is null");
        } else {
          this.pipelines.publishDag(metaData.pipeline_id).subscribe(() => {
            resolve(null)
          }, err=>reject("Failed to publish pipeline"));
        }
      })
    })

  // SAVE AND RESOLVE
  save=()=>new Promise((resolve, reject) => {
      forkJoin([this.links$.pipe(take(1)), this.nodes$.pipe(take(1)), this.metadata$.pipe(take(1))])
      .subscribe(([links, nodes, metaData]: any) => {
        if (metaData.name != '') {
          this.pipelines.saveDag(metaData, nodes, links).subscribe((pipeline_id) => {
              this.store.dispatch(new PipelineEditMetaData({...metaData, pipeline_id}));
              resolve(pipeline_id)
            }, (err) => reject("Failed to save pipeline"));
        } else {
          this.edit().then(this.save).then(resolve).catch(()=>reject("Cannot Proceed without Saving"));
        }
      });
    })

  edit=()=> new Promise((resolve, reject)=>{
    this.metadata$.pipe(take(1)).subscribe((metaData) => {
      this.editorService.editPipeline({...metaData}).subscribe((r) => {
        if (r) { 
          this.store.dispatch(new PipelineEditMetaData(r)); 
          resolve(true)
        } else {
          reject("Failed to edit")
        }
      });
    })
  })

  // CANCEL PREVIOUS POOLING
  // START POOLING NEW DATA
  monitorRun=(runId)=>{
    this.stopMonitoring()
    this.stop$ = new Subject()
    timer(0,2000).pipe(takeUntil(this.stop$), switchMap(()=>this.pipelines.getRun(runId)), tap(this.onRunDataRecieved)).subscribe();
  }
  
  // CALL TO GET IMMEDIATE RESULT or RESTART POOLING
  monitorCurrentRun=()=>{withValue(this.runId$, (runId)=>{if( runId ) this.monitorRun(runId)})}
  pause=()=>new Promise((resolve)=>{withValue(this.metadata$, (p)=>{this.pipelines.pause(p.pipeline_id, {stop_at:null}).subscribe(()=>resolve(true))})})
  unpause=()=>new Promise((resolve)=>{withValue(this.metadata$, (p)=>{this.pipelines.unpause(p.pipeline_id, {stop_at:null}).subscribe(()=>resolve(true))})})
  retry=()=>new Promise((resolve)=>{withValue(this.runId$, (run_id)=>{this.pipelines.retry(run_id, {}).subscribe(()=>resolve(true))})})
  
  // STOP RUN MONITORING AND CLEAR CURRENT RUN DATA
  resetRunData=()=>{
    this.stopMonitoring()
    this.run$.next(null)
    this.getContextFromRun(null);
  }

  run=(config)=>new Promise((resolve, reject)=>{
      this.resetRunData()
      withValue(this.metadata$,(p)=>{this.pipelines.trigger(p.pipeline_id, config).subscribe((res:any)=>{
          const run_id = res.run_id;
          this.store.dispatch(new PipelineEditRunId({run_id, pipeline_id: p.pipeline_id}));
          resolve(true)
        }, err=> reject("Failed to run"))
      })
    })

  cancel=()=>new Promise(resolve=>{
    this.resetRunData()
    this.store.dispatch(new PipelineEditRunId({run_id: null, pipeline_id: null}));
    resolve(true)
  })

  handleTrigger=(method, fn, msg=null)=>{
    this.loadingTrigger$.next(method)
    this.stopMonitoring()
    fn()
      .then(()=>this.onTriggerComplete(msg))
      .then(this.monitorCurrentRun)
      .catch((e)=>{this.onTriggerFailed(e)})
  }

  // STOP MONITORING THE CURRENT RUN
  stopMonitoring=()=>{if (this.stop$) this.stop$.next()}
  // CLASS FUNCIONS -

  // EVENT HANDLERS +
  onRunDataRecieved=(run_res:any)=>{
    this.getContextFromRun(run_res);
    if(['success','failed'].includes(run_res.state)) this.stopMonitoring()
    else if(this.context.paused) this.stopMonitoring()
    this.run$.next(run_res)
  }
  
  onRunIdChanged=(runId)=>{(runId)?this.monitorCurrentRun():this.resetRunData();}
  onDiagramNodeDataChange(nodes){this.store.dispatch(new PipelineEditNodes(nodes));}
  onDiagramLinkDataChange(links){this.store.dispatch(new PipelineEditLinks(links));}

  onTaskDatasetChange(event){this.pipelines.updateTask(null, null, null, null, null) ; console.log({event})}

  onTriggerComplete=(msg=null)=>{
    if(msg) this.ntf.success(msg)
    this.loadingTrigger$.next(null);
  }
  onTriggerFailed=(error)=>{
    this.ntf.error(String(error))
    this.loadingTrigger$.next(null)
  }

  // EVENT HANDLERS -

  // TRIGGER EVENTS +
  onCancel(){this.handleTrigger('cancel', this.cancel, "Cancelled Pipeline")}
  onPublish(){this.handleTrigger('publish', this.saveAndPublish, "Published Pipeline")}
  onTrigger(){this.handleTrigger('run', ()=>this.saveAndPublish().then(()=>this.run({})), "Triggerd Pipeline")}
  onTriggerPreview(){this.handleTrigger('run', ()=>this.saveAndPublish().then(()=>this.run({preview:true})), "Triggerd Pipeline Preview")}
  onJumpNext(){this.handleTrigger('save_and_continue', ()=>this.saveAndPublish().then(this.unpause))}
  onPause(){this.handleTrigger('pause', this.pause)}
  onContinue(){this.handleTrigger('continue', this.unpause)}
  onRetryFailed(){this.handleTrigger('retry', ()=>this.saveAndPublish().then(this.retry))}
  onEdit(){this.edit().then(()=>this.onTriggerComplete("Edited Pipline")).catch(()=>{})}
  onSave(){this.save().then(()=>this.onTriggerComplete("Saved Pipline")).catch()}
  // TRIGGER EVENTS -
}
