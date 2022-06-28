import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { TransformationInterfaceComponent } from '../transformations/transformation-interface/transformation-interface.component';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { DeleteTransNode, UpdateTransNode, UpdateNodeOrder } from '../store/transformation.actions';
import { TRANSFORMATIONS } from '../transformations/transformers';
import { selectPipeExpanded, selectTranformationNodeStatus } from '../store/transformation.selectors';
import { NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';
import { deepCopy } from '@app/shared/utils/objects.utils';

@Component({
  selector: 'app-transformation-node',
  templateUrl: './transformation-node.component.html',
  styleUrls: ['./transformation-node.component.css']
})
export class TransformationNodeComponent implements OnInit {

  @Output() changeOrder = new EventEmitter<number>()
  @Output() delete = new EventEmitter()

  @ViewChild('paramsHost', {static: true, read: ViewContainerRef}) paramsHost: ViewContainerRef;
  transformationComponent: TransformationInterfaceComponent;

  transofrmation

  expanded$ = new BehaviorSubject(false)

  params
  status$
  index 
  @Input('index') set _index(value) {
    this.index = value
    
    this.status$ = this.store.select(selectTranformationNodeStatus(this.index))
  }
  @Input("params") set _params(value){
    this.params = JSON.parse(JSON.stringify(value))
    this.updateTransformation()
    this.loadComponent();
  }  

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store<AppState>, private modalService: NzModalService) { 
    // this.expanded$ =  this.store.select(selectPipeExpanded)
  }

  ngOnInit() {
  }

  updateTransformation(){
    if (this.params && this.params.type){
      for (let t of TRANSFORMATIONS){
        if (t.type == this.params.type){
          this.transofrmation = t;
          break;
        }
      }
    }
  }

  getTranformerComponent(){
    const component = this.transofrmation.component || TransformationInterfaceComponent;

    return component;
  }

  loadComponent() {
    if (this.transofrmation){

      const component = this.getTranformerComponent()
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

      const viewContainerRef = this.paramsHost;

      // viewContainerRef.clear();

      const transformationRef = viewContainerRef.createComponent(componentFactory);
      this.transformationComponent = (transformationRef.instance) as TransformationInterfaceComponent;

      this.transformationComponent.data = this.params;
      this.transformationComponent.index = this.index;
      this.transformationComponent.dataChanged.subscribe(data => this.onDataChanged(data))
    }
  }

  onDataChanged(data){
    this.store.dispatch(new UpdateTransNode(data, this.index))
  }

  onDelete(){
    this.store.dispatch(new DeleteTransNode(this.index))
  }

  onChangeOrder(step){
    this.store.dispatch(new UpdateNodeOrder(this.index, step))
  }

  showCompAsModal(): void {
    const modal:any = this.modalService.create({
      nzTitle: this.transofrmation.label,
      nzContent: this.getTranformerComponent(),
      nzComponentParams:{
        data: deepCopy(this.params),
        index: this.index,
        size: 'default'
      },
      nzOnOk:()=>{
        const instance: TransformationInterfaceComponent = modal.getContentComponent()
        this.onDataChanged(instance.data)
      }
    });
  }
}
