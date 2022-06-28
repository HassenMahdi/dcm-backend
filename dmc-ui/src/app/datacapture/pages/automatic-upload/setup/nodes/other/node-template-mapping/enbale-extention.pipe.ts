import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enbaleExtention'
})
export class EnbaleExtentionPipe implements PipeTransform {

  transform(array: any[], enable=false): unknown {
    if(enable)
      return array;
    else
      return array.filter(e=>!e.key.startsWith("_") && !["extension", "modifierExtension"].includes(e.key));
  }

}
