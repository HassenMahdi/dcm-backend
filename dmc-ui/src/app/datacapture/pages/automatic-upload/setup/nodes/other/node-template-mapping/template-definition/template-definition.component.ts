import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MappingTemplateService } from '@app/datacapture/pages/upload/services/mapping/mapping-template.service';
import { withValue } from '@app/shared/utils/rxjs.utils';
import { NzThMeasureDirective } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-template-definition',
  templateUrl: './template-definition.component.html',
  styleUrls: ['./template-definition.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateDefinitionComponent{

  template_id
  template
  model = {}
  array_elements = {}
  template$ = new BehaviorSubject<any>(null)
  expandedProps = {}

  @Input() enableExtentions = false
  @Input() highlight = false

  @Input("template") set _template(t)
  {
    this.template_id = t; 

    withValue(this.templates.getTemplateDef(this.template_id, true), (template)=>{
      this.template = template
      this.template$.next(template)
    })
  }

  @Input("mapping") set _mapping(m)
  {
    this.model = m;

    // Update Array Elements
    Object.keys(this.model).forEach(key=>
    {
      const path = key.split(".")

      let base = null
      for (let p of path)
      {
        if(p[0]=="[" && p[p.length-1]=="]")
        {
          this.array_elements[base] = this.array_elements[base] || [] ; 

          const index = parseInt(p.substring(1,p.length-1));
          // TODO ADD TYPE HERE
          this.array_elements[base][index] = {}
        }

        base = (base)? [base, p].join(".") : p
      }
    })
  }
  @Output() mappingChange = new EventEmitter();


  constructor(public templates:MappingTemplateService) { }

  findDefinition($ref)
  {

    if(!$ref || !$ref.split)
      return [];

    const path = $ref.split("/")

    let target = this.template

    for (let i = 1; i < path.length; i++)
    {
      const p = path[i];
      target = target[p];
    }
    
    return (target)? target.allOf:[];
  }

  doesPathHaveMapping(path:string)
  {
    const paths = path.split(".")
    return Object.keys(this.model).filter((key)=>
    {
      const keys = key.split(".")
      for (let index = 0; index < paths.length; index++) {
        if(paths[index] != keys[index])
          return false;
      }

      return true;
    }
    ).length;
  }

  onMappingChanged(event ,path)
  {
    const value = event.target.value
    this.setMapItem(path, value)
  }

  setMapItem(path, value)
  {
    if(value)
    {
      this.model[path] = value;
    } 
    else
    {
      if(this.model[path])
        delete this.model[path];
    }

    this.mappingChange.emit(this.model)
  }

  onDrop(event:any, path:string)
  {
    this.setMapItem(path, event.data)
  }

  AddArrayElement(path, item)
  {
    this.array_elements[path] = this.array_elements[path] || [];
    this.array_elements[path].push(item.value);

    this.expandedProps[path] = true;
  }

}
