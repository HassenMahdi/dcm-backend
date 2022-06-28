import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipelineFilter'
})
export class PipelineFilterPipe implements PipeTransform {
    transform(items: any[], property: string, term: string): any {
      if (items) {
        return items.filter(item => {
          const value = (item[property] || '').toLowerCase();
          const lowerTrem = (term || '').toLowerCase();
          return value.match(lowerTrem);
        });
      }
      return items;
    }
}
