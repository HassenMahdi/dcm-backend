import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyFilter'
})
export class KeyFilterPipe implements PipeTransform {
  transform(items: any[], property:string,term: string): any {
    if(!items) return []
    return items.filter(item => {
      const value = (item[property] || '').toLowerCase()
      const lowerTrem = (term || '').toLowerCase()
      return value.match(lowerTrem)
    });
  }
}
