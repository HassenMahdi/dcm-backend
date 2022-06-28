import { Component } from "@angular/core";
import { AppState, NotificationService } from "@app/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject } from "rxjs";
import { PipelineEditMetaData, PipelineEditRunId } from "../../pipeline/store/pipeline.actions";
import { MonitorService } from "../service/monitor.service";

@Component({
    selector: 'app-monitor',
    templateUrl: './monitor-container.component.html',
    styleUrls: ['./monitor-container.component.css']
})
export class MonitorContainer {
    searchPipeline = "";
    pipelines:any = [];
    constructor(private service: MonitorService,
        private not: NotificationService,
        private store: Store<AppState>) {
        this.getData();
    }
    
    getData() {
        const loader = this.not.loading('Loading pipelines...');
        this.service.getAll().subscribe((pipelines) => {
            this.pipelines = pipelines;
            this.not.close(loader);
        }, (err) => {this.not.close(loader); })
    }

    getMonitors = (pipe: any, monitors$: BehaviorSubject<any>) => {
        const loader = this.not.loading('Loading...');
        this.service.getMonitors(pipe.id).subscribe((res: any) => {
            monitors$.next(res);
            this.not.close(loader);
        }, (err) => {this.not.close(loader); })
    }

    getRunTasks = (run: any, tasks$: BehaviorSubject<any>) => {
        const loader = this.not.loading('Loading...');
        this.service.getRunTasks(run.run_id).subscribe((res: any) => {
            tasks$.next(res);
            this.not.close(loader);
        }, (err) => {this.not.close(loader); })
    }

    openRun(event) {
        this.store.dispatch(new PipelineEditMetaData({
            pipeline_id: event.pipeline.id,
            name: event.pipeline.name,
            description: event.pipeline.description
        }));
        this.store.dispatch(new PipelineEditRunId({run_id: event.run_id, pipeline_id: event.pipeline.id}));
    }
}