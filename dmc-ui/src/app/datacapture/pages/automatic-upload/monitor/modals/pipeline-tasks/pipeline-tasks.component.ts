import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pipeline-tasks',
  templateUrl: './pipeline-tasks.component.html',
  styleUrls: ['./pipeline-tasks.component.css']
})
export class PipelineTasksComponent implements OnInit {
  tasks$:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  ngOnInit(): void {
  }

  
}
