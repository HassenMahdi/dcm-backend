import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppState, NotificationService } from "@app/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { tap, map } from "rxjs/operators";
import { PipelinesService } from "../services/pipelines.service";
import { PipelineActionTypes, PipelineEdit, PipelineEditLinks, PipelineEditNodes, PipelineEditRunId, PipelineReset } from "./pipeline.actions";

@Injectable()
export class PipelineEffects {
  constructor(
    private actions$: Actions<Action>,
    private store: Store<AppState>,
    private service: PipelinesService,
    private not: NotificationService,
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  reset = this.actions$.pipe(
    ofType<PipelineReset>(PipelineActionTypes.RESET),
    map(() => {
        this.router.navigate(['/datacapture/automatic/pipeline'])
      }
    )
  );

  @Effect({ dispatch: false })
  openRun = this.actions$.pipe(
    ofType<PipelineEditRunId>(PipelineActionTypes.EDIT_RUN_ID),
    map((action) => {
      if (action.event.pipeline_id)
        this.router.navigate(['/datacapture/automatic/pipeline/'+ action.event.pipeline_id]);
      }
    )
  );
  @Effect({ dispatch: false })
  edit = this.actions$.pipe(
    ofType<PipelineEdit>(PipelineActionTypes.EDIT_PIPELINE),
    map((action) => {
      // todo : fill the store with a service that takes id and gets nodes and links
        const loader = this.not.loading('Loading your pipeline...');
        this.service.getDagDetails(action.metadata.pipeline_id).subscribe((res: any) => {
          if (res) {
            this.store.dispatch(new PipelineEditNodes(res.nodes));
            this.store.dispatch(new PipelineEditLinks(res.links));
            this.not.close(loader);
            this.router.navigate(['/datacapture/automatic/pipeline/' + action.metadata.pipeline_id])
          }
        }, (err) => this.not.close(loader))
      }
    )
  );
}