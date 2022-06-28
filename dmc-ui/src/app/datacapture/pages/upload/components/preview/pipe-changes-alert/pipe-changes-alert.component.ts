import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';


@Component({
  selector: 'app-pipe-changes-alert',
  templateUrl: './pipe-changes-alert.component.html'
})
export class PipeChangesAlertComponent implements OnInit {

  currentSequence = {
    icon: 'info-circle',
    title: 'Unsaved Changes',
    content: 'You have made changes to the pipe. <br>Please save them before leaving or they will not be applied.',
    buttons: [
      {label: 'Ok', action: 'close', style: 'primary'},
      {label: 'Continue witout saving', action: 'continue'},
    ],
  };

  @ViewChild('modalFooter', {static: true}) public modalFooter: TemplateRef<any>;

  constructor(protected modalrRef: NzModalRef) {}

  ngOnInit() {
    this.modalrRef['nzFooter'] = this.modalFooter;

    // this.currentSequence = this.getCurrentSquence()
  }

  onButtonClick(action) {
    switch(action) {
      case 'ok':
      case 'close':
      case 'continue':
        return this.close(action);
    }
  }

  close(action) {
    this.modalrRef.close(action);
  }
}
