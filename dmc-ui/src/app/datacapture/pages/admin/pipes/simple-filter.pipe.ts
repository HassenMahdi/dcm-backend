import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class SimpleFilterPipe implements PipeTransform {
    transform(items: any[], property:string,term: string): any {
        return items.filter(item => {
          const value = (item[property] || '').toLowerCase()
          const lowerTrem = (term || '').toLowerCase()
          return value.match(lowerTrem)
      });
  }
}
