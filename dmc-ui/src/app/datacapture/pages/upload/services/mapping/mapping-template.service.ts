import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MAPPING_TEMPLATES } from './mapping-templates-mock';
import * as _ from "lodash"


@Injectable({
  providedIn: 'root'
})
export class MappingTemplateService {

  constructor() { }

  getTemplates()
  {
    return of(MAPPING_TEMPLATES.map(t=>(
      {
        id: t._id,
        name: t._id.split(".")[0],
        description: t.id,
      }
    )))
  }

  getTemplateDef(template_id, embed=false)
  {
    const template = _.cloneDeep(MAPPING_TEMPLATES.filter( t=> t._id==template_id || ( t._id == template_id + '.schema.json'))[0])

    if (!template)
      return of(null)
      
    if(embed)
    {
      // TODO SHOULD ONLY GET EMBEDED REFRENCES
      for (let ref of MAPPING_TEMPLATES)
      {
        Object.keys(ref.definitions).forEach(key=>{template.definitions[key] = ref.definitions[key]})
      }
    }

    return of(template)
  }
}
