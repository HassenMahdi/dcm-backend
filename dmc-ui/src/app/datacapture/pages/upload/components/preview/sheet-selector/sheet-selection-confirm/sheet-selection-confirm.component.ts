import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-sheet-selection-confirm',
  templateUrl: './sheet-selection-confirm.component.html',
  styleUrls: ['./sheet-selection-confirm.component.css']
})
export class SheetSelectionConfirmComponent implements OnInit {

  @ViewChild('modalFooter',{static:true}) public modalFooter: TemplateRef<any>;
  
  constructor(protected modalrRef: NzModalRef) {
    
  }

 ngOnInit() {
   this.modalrRef['nzFooter'] = null
   this.modalrRef['nzTitle'] = null
 }

 close(result){
   this.modalrRef.close(result)
 }

}
