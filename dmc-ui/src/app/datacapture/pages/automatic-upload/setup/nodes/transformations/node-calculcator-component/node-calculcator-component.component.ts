import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { CalculatorModalComponent } from '@app/datacapture/pages/upload/components/transformation/transformations/transformation-interface/format/calculator/calculator-modal/calculator-modal.component';
import { deepCopy } from '@app/shared/utils/objects.utils';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-node-calculcator-component',
  templateUrl: './node-calculcator-component.component.html',
  styleUrls: ['./node-calculcator-component.component.css', '../base-node-transformation/base-node-transformation.component.css']
})
export class NodeCalculcatorComponent extends PipelineNodeComponent {
  operations = ['+','*','/','-'];
  index = null;
  constructor(private modal: NzModalService) {
    super()
  }

  save() {
    this.onSave.emit(this.data)
  }

  openFormula(){
    const modal = this.modal.create({
      nzContent: CalculatorModalComponent,
      nzComponentParams:{
        node_index: this.index,
        formula: deepCopy(this.data.formula || [])
      }
    })

    modal.afterClose.subscribe(
      (formula)=>{
        if(formula){
          this.data.formula = formula;
        }
      }
    )
  }

  getFormulaText(){
    return (this.data.formula || []).map(e=>e.value).join(' ')
  }

}
