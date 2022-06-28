import { tokenName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { selectFileHeaders } from '@app/datacapture/pages/upload/store/selectors/import.selectors';
import { Parser } from '@app/shared/utils/paerser.utils';
import { Store } from '@ngrx/store';
import { NzModalRef } from 'ng-zorro-antd';
import { throwError } from 'rxjs';
import { selectInputCloumnsByIndex } from '../../../../../store/transformation.selectors';

@Component({
  selector: 'app-calculator-modal',
  templateUrl: './calculator-modal.component.html',
  styleUrls: ['./calculator-modal.component.css']
})
export class CalculatorModalComponent implements OnInit {

  constructor(private modal: NzModalRef, private store: Store<AppState>) {
  }

  error = null
  formula = []
  node_index = 0
  columns$

  ngOnInit() {
    this.modal['nzFooter']=null
    this.columns$ = this.store.select(selectInputCloumnsByIndex(this.node_index));
  }

  addToken(value, type){

    const token = {
      value,
      type
    }

    this.formula.push(token)

    this.updateFormula()
  }

  updateFormula(){
    let index = 0
    let token = this.formula[index]
    while(token) {
      if(token.type == 'number'){
        const next_index = index+1
        const next_token = this.formula[next_index]
        if (next_token && next_token.type == 'number'){
          this.formula.splice(next_index, 1)
          token.value = String(token.value).concat(next_token.value) 
        }
      }      
      token = this.formula[++index]
    }


    try{
      this.lex(this.formula)
      this.error = null
    } catch (e) {
      this.error = e
    }
  }

  clear(){
    this.formula = []
    this.updateFormula()
  }

  removeLastToken(){
    const token = this.formula[this.formula.length - 1]
    if(token){
      switch(token.type){
        case 'number': {
          const token_len = token.value.length
          if(token_len > 1){
            token.value = String(token.value).substr(0, token_len - 1) 
            break
          }
        }
        default:
          this.formula.pop()
      }
      this.updateFormula()
    }
  }


  lex(expr: any[]){
    Parser.validate([...expr])
  }

  submit(){
    this.modal.close(this.formula)
  }

  close(){
    this.modal.close()
  }
}
