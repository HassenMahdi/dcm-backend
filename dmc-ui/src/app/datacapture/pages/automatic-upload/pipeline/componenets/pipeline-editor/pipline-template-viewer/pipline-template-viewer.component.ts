import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipline-template-viewer',
  templateUrl: './pipline-template-viewer.component.html',
  styleUrls: ['./pipline-template-viewer.component.css']
})
export class PiplineTemplateViewerComponent implements OnInit {

  nodes
  links

  constructor() { }

  ngOnInit(): void {
  }

}
