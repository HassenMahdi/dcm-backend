import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'hotkeysFilter'
})
export class HotkeysFilterPipe implements PipeTransform {

  transform(keys: any[], controlPressed:boolean, shiftPressed: boolean, altPressed: boolean): any {

    let include = []
    let exclude = []
    if(controlPressed)  include.push('control'); else exclude.push('control')
    if(shiftPressed)    include.push('shift') ; else exclude.push('shift')
    if(altPressed)      include.push('alt'); else exclude.push('alt')

    keys = keys.filter(k=>k.shortcut)

    keys = keys.filter(k => {
      const splitKeys:string[] = k.key.split(".")
      
      if(!include.length) return k.alwaysShow;

      for (let key of exclude) {
        if (splitKeys.includes(key)) return false
      }
      for (let key of include) {
        if (!splitKeys.includes(key)) return false
      }

      return true
    })
    return keys
  }

}
