import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checksByType'
})
export class ChecksTypesPipe implements PipeTransform {
  transform(checks: any[], field_type: string[]): any {
    if (field_type)
      return checks.filter(check=> (check.property_types)? check.property_types.includes(field_type): true )
    else
      return checks;
  }
}
