import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RUN_STATES } from '@app/shared/utils/state-colors.utils';

@Component({
  selector: 'app-pipeline-run-toolbar',
  templateUrl: './pipeline-run-toolbar.component.html',
  styleUrls: ['./pipeline-run-toolbar.component.css']
})
export class PipelineRunToolbarComponent implements OnInit {

  @Input("run") set _run(value){this.updateData(value)}
  @Output() trigger = new EventEmitter<any>()
  run:any;
  runStatus
  progressSteps
  doneSteps
  progress
  progressStatus
  showProgress
  badgeType
  legend = RUN_STATES
  showDetails = false

  constructor() { 
    this.reset()
  }

  ngOnInit(): void {
  }

  updateData(value){
    this.run = value
    if(this.run){
      this.showProgress = true
      this.runStatus = this.run.state
      this.progressSteps = this.run.tasks.length
      this.doneSteps = this.run.tasks.filter(e=>e.state=='success').length

      this.progress = Math.floor((this.doneSteps / this.progressSteps) * 100)


      switch(this.runStatus){
        // success, failed, running
        case "success": {
          this.progressStatus = 'success' ;
          this.badgeType = 'success'
          break;
        }
        case "failed": {
          this.progressStatus = 'exception';
          this.badgeType = 'error'
          break;
        }
        case "running": {
          this.progressStatus = 'active' ;
          this.badgeType = 'processing'
          break;
        }
      }
    } else {
      this.reset()
    }
  }

  openLogs(run: any) {
  }

  reset(){
    this.progressSteps = 0
    this.doneSteps = 0
    this.progress = 0
    this.runStatus = 'not_running'
    this.progressStatus = 'normal'
    this.showProgress = false
    this.badgeType = 'default'
  }
}
