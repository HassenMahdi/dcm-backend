import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';
import { PipelineTasksComponent } from '../../modals/pipeline-tasks/pipeline-tasks.component';

@Component({
  selector: 'app-monitor-item',
  templateUrl: './monitor-item.component.html',
  styleUrls: ['./monitor-item.component.css']
})
export class MonitorItemComponent implements OnInit {
  tasks$:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  @Input() monitors:any;
  @Input() pipeline:any;
  @Input() getTasks: (pipe: any, tasks$: BehaviorSubject<any>) => void;
  @Output() openRun: EventEmitter<any> = new EventEmitter<any>();
  constructor(private drawerService: NzDrawerService) { }

  ngOnInit(): void {
  }

  openTask(pipe: any) {
    this.getTasks(pipe, this.tasks$);
    const drawerRef = this.drawerService.create({
      nzTitle: 'Tasks',
      nzWidth: '40vw',
      nzClosable: false,
      nzContent: PipelineTasksComponent,
      nzContentParams: {
        tasks$: this.tasks$
      }
    });
  }

}
