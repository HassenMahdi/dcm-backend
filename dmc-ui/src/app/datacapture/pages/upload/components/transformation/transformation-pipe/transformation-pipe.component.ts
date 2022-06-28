import { Component, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { selectTranformationNodes, selectPipeExpanded } from '../store/transformation.selectors';
import { AddTransNode, ResetTransformation, TransformationFlipExpand } from '../store/transformation.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { TRANSFORMATIONS } from '../transformations/transformers';
import { TranformationService } from '../services/tranformation.service';
import { take } from 'rxjs/operators';
import { selectDomain } from '../../../store/selectors/import.selectors';
import { forkJoin, Observable } from 'rxjs';


@Component({
  selector: 'app-transformation-pipe',
  templateUrl: './transformation-pipe.component.html',
  styleUrls: ['./transformation-pipe.component.css']
})
export class TransformationPipeComponent implements OnInit {
  // Data
  tarnsformations = TRANSFORMATIONS;
  saved = false;
  name = null;
  // Store
  pipe$ = null;
  domain$ = null;
  active$: Observable<any>;
  expanded$;
  canSave$;
  modified$;

  constructor(
    // private drawerRef: NzDrawerRef<string>,
    private store: Store<AppState>,
    private pipes: TranformationService
    ) {
    this.pipe$ = this.store.select(selectTranformationNodes);
    this.domain$ = this.store.select(selectDomain);
    this.expanded$ = this.store.select(selectPipeExpanded);
    this.active$ = this.pipes.active$;
    this.active$.subscribe((active: any) => {
        this.name = (active) ? active.name : null,
        this.saved = (active && active.id) ? true : false;
    });
    this.canSave$ = this.pipes.canSave$;
    this.modified$ = this.pipes.modified$;
  }

  close(): void {
    // this.drawerRef.close(null);
  }

  ngOnInit() {

  }

  addTransformation(t) {
    const rule = {type: t.type, applied: false , valid: false};
    this.store.dispatch(new AddTransNode(rule));
  }

  changeOrder(index, direction) {
    // TODO STORE CHENGE ORDER
  }

  onReset() {
    this.store.dispatch(new ResetTransformation());
  }

  onFlipCollapse() {
    this.store.dispatch(new TransformationFlipExpand());
  }

  onSave() {
    this.pipes.saveEdited();
  }

  onSaveAsNew() {
    this.pipes.saveEdited(true);
  }

  onSaveAndApply() {
    this.pipes.upadatePreviewMode('TARGET');
    this.onSave();
  }

  onDelete() {
    this.active$.subscribe(
      (active: any) => {
        this.pipes.delete(active).subscribe(() => this.afterSave());
      }
    ).unsubscribe();
  }

  afterSave() {
    // this.drawerRef.close();
  }
}
