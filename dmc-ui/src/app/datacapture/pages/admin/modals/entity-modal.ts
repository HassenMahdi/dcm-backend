import { OnInit, Input, ViewChild, TemplateRef, Directive } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';

@Directive()
export class EntityModal implements OnInit {

  @Input() data
  @Input() edit

  loading = false

  constructor(protected modalrRef: NzModalRef) {
    
   }

  ngOnInit() {
  }

  canSave(){
    return true
  }

  canClose(){
    return true
  }

  close(){
    this.modalrRef.close(false)
  }

  save(){
    this.modalrRef.close(true)
  }

}
