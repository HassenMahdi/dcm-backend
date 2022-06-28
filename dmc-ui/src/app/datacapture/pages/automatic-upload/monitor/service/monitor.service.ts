import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
  })
export class MonitorService {

    constructor(private http: HttpClient) {}

    getAll(page?, size?){
        return this.http.get(environment.pipeline + 'dataflow/list-pipelines')
    }

    getMonitors(id) {
        return this.http.get(environment.pipeline + `monitor/dag/${id}/run`)
    }

    getRunTasks(runId) {
        return this.http.get(environment.pipeline + `monitor/run/${runId}`)
    }

    getTaskLogs(runId, taskId, executionDate) {
        return this.http.get(environment.pipeline + `monitor/log/${runId}/${taskId}/${executionDate}`);
    }
}