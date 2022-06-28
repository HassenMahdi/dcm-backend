import { Injectable } from '@angular/core';
import { NzDrawerService, NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { EditPipelineMetadataComponent } from '../componenets/modals/edit-pipeline-metadata/edit-pipeline-metadata.component';
import { PiplineTemplateViewerComponent } from '../componenets/pipeline-editor/pipline-template-viewer/pipline-template-viewer.component';
import { PipelineMetadata } from '../models/metadata.model';
import { ALL_NODES } from '../models/factories/node-classes.factory';

@Injectable({
  providedIn: 'root'
})
export class PipelineEditorService {

  NODES_LIST = ALL_NODES;
  links = [];
  nodes = [];

  constructor(private drawer: NzDrawerService, private msg: NzMessageService) { }

  getNodeClass(type): any {
    return this.NODES_LIST.find(c => c.type === type);
  }

  editNode(node) {
    return new Observable(observer => {
      const nodeClass = this.getNodeClass(node.type);
      const CompClass = nodeClass.getComponenent(node)
      const ref: any = this.drawer.create({
        nzContent: CompClass,
        nzContentParams: {
          data: node
        },
        nzWidth: CompClass.width,
        nzClosable: false,
      });

      setTimeout(() => {
        ref.getContentComponent().onSave.subscribe((newNode) => { observer.next(newNode); observer.complete(); ref.close(); });
        ref.getContentComponent().onCancel.subscribe(() => ref.close());
      }, 0);
    });
  }

  viewTemplate(nodes, links) {
    const ref = this.drawer.create({
      nzContent: PiplineTemplateViewerComponent,
      nzContentParams: {
        nodes,
        links
      },
      nzWidth: '90vw',
      nzClosable: false,
    });
  }

  editPipeline(metaData): Observable<PipelineMetadata> {
    return new Observable(observer => {
      const ref = this.drawer.create({
        nzTitle: 'Pipeline MetaData',
        nzContent: EditPipelineMetadataComponent,
        nzContentParams: {
          metaData
        },
        nzWidth: '40vw',
        nzClosable: false,
      })
      ref.afterClose.subscribe((metadata: PipelineMetadata) => {
        observer.next(metadata)
        observer.complete()
      });
    })
  }

  updateNode(node) {
  }

  addNode(nodeCategory) {
  }

  deleteNode(node) {
  }

  previewNode(data: any, run: any) {
    return new Observable(obs=>{
      const task = run.tasks.find(t => t.task_id == data.key)
    const nodeClass = this.getNodeClass(data.type)
    const output = task.output || {}

    const previewNode = nodeClass.getPreviewNode(data, run)
    
    if (previewNode) {
      const comp = this.drawer.create({
        nzTitle: data.label + ' Preview',
        nzContent: previewNode.component,
        nzContentParams: previewNode.params,
        nzWidth: '90vw',
      })

      comp.afterOpen.subscribe(()=>{
         if (previewNode.OnOpen) previewNode.OnOpen(comp.getContentComponent(), obs)
      })

      comp.afterClose.subscribe(()=>{
        obs.complete()
     })
       
      } else if (output.status == 'success') {
        this.msg.info('No Preview for this Node')
        obs.complete()
      } else {
        this.msg.info('Preview is not ready')
        obs.complete()
      }
    })
  }
}
