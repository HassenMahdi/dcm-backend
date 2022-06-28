import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { selectPipelineEditLinks, selectPipelineEditNodes } from '../store/pipeline.selectors';
import { map, take, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { forkJoin, Observable, of, pipe } from 'rxjs';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';


@Injectable({
  providedIn: 'root'
})
export class PiplineUtilityService {

  links$;
  nodes$;

  constructor(private store: Store<AppState>, private manual:FileImportService) { 
    this.links$ = this.store.select(selectPipelineEditLinks).pipe(map(e => _.cloneDeep(e)));
    this.nodes$ = this.store.select(selectPipelineEditNodes).pipe(map(e => _.cloneDeep(e)));
  }

  getNodeInputHeaders(task_id)
  {
    return new Observable(observer=>{
      forkJoin([this.nodes$.pipe(take(1)), this.links$.pipe(take(1))]).subscribe(([nodes, links]: any) => {    
        const path = this.constructPath(task_id, links)
        this.getOuputHeaders(path, nodes).pipe(
          tap((headers)=>observer.next(headers)),
          tap(()=> observer.complete())).subscribe()
      })
    })
  }

  private constructPath(currentkey, links)
  {
    let path = null
    links.filter(l=>l.to==currentkey).forEach(l => {
      path = path || {}
      path[l.from] = 
      {
        port : l.toPort,
        path : this.constructPath(l.from, links)
      }    
    });
    // todo check for loops
    return path
  }

  private getOuputHeaders(path, nodes)
  {
    return new Observable(observer=>{

      const inputTaskIds = Object.keys(path)
      
      // check if node has input
      if(inputTaskIds.length == 0)
      {
        observer.next([])
        observer.complete()
        return;
      }
      
      const InputHeaders = []
      // for each input get observale of output headers
      for (let inputTaskId of inputTaskIds)
      {
        const Input =path[inputTaskId];
        const InputPath = Input.path;
        const InputNode = nodes.find(n=>n.key==inputTaskId)


        switch(InputNode.type)
        {
          case "IMPORT_MANUAL":
          {
            InputHeaders.push(InputNode.sheet_id? this.manual.getFileData(0, InputNode.sheet_id, 0).pipe(map(data=>data.headers)) : of([]) )
            break;
          }

          case "BLOB_STORAGE_IMPORT_CONNECTOR":
          case "SQL_IMPORT_CONNECTOR":
          case "POSTGRES_IMPORT_CONNECTOR":
          case "MONGODB_IMPORT_CONNECTOR":
            {
              InputHeaders.push(this.manual.previewConnectorData(InputNode).pipe(map((data:any)=>data.headers)))
              break;
            }

          default: 
            InputHeaders.push(InputPath?this.getOuputHeaders(InputPath, nodes) : of([]))
        }
      }
  
     
      forkJoin(InputHeaders).pipe(take(1)).subscribe((headersList:any[])=>{
        observer.next(headersList.reduce((prev, curr)=>([...prev, ...curr])));
        observer.complete();
      })

    })
  }
}
