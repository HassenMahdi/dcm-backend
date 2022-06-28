import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { RegexHelperDocumentationComponent } from '../regex-helper-documentation/regex-helper-documentation.component';

@Component({
  selector: 'app-regex-helper-trigger',
  templateUrl: './regex-helper-trigger.component.html'
})
export class RegexHelperTriggerComponent implements OnInit {

  constructor(public drawer: NzDrawerService) { }

  ngOnInit() {
  }

  onClick(){
    this.drawer.create({
      nzContent: RegexHelperDocumentationComponent,
      nzWidth:'90%',
      // nzHeight:'90%',
      // nzPlacement: 'bottom'
    })
  }
}
