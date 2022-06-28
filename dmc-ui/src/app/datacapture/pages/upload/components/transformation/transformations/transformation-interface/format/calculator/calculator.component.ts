import { Component, OnInit } from '@angular/core';
import { deepCopy } from '@app/shared/utils/objects.utils';
import { NzModalService } from 'ng-zorro-antd';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';
import { CalculatorModalComponent } from './calculator-modal/calculator-modal.component';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent  extends TransformationInterfaceComponent implements OnInit  {
  
  operations = ['+','*','/','-']
  constructor(private modal: NzModalService) { 
    super()
  }

  ngOnInit() {
  
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
          this.data.formula = formula
          this.onDataChanged()
        }
      }
    )
  }

  getFormulaText(){
    return (this.data.formula || []).map(e=>e.value).join(' ')
  }
}

