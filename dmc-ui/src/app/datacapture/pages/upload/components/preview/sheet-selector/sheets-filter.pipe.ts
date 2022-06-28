import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sheetsFilter'
})
export class SheetsFilterPipe implements PipeTransform {

  transform(sheets: any[], maxElements: number, rightSide: boolean = false): any {

    if(rightSide){
      return sheets.slice(maxElements, sheets.length);
    }else{
      return sheets.slice(0, maxElements);
    }
  }

}
