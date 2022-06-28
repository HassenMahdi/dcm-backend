import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TranformationDrawerService } from '../../services/tranformation-drawer.service';
import { TranformationService } from '../../services/tranformation.service';
import { Arraylength } from '@app/shared/utils/arrays.utils';

@Component({
  selector: 'app-active-transformation-input',
  templateUrl: './active-transformation-input.component.html',
  styleUrls: ['./active-transformation-input.component.css']
})
export class ActiveTransformationInputComponent implements OnInit {
  pm$: any;
  expanded$: any;
  nodesCount$;
  nodesModified$;
  canSave$;
  filters$: any;
  previewMode$: any;

  modes = [
    {mode: 'SOURCE', icon: 'file-text', tooltip: 'View Source', label: 'Source'},
    {mode: 'TARGET', icon: 'thunderbolt', tooltip: 'View Target', label: 'Target'},
  ];

  constructor(
    private service: TranformationService,
    private drawer: TranformationDrawerService
    )
  {
    this.nodesCount$ = this.service.nodes$.pipe(map(Arraylength));
    this.previewMode$ = this.service.previewMode$;
    this.nodesModified$ = this.service.modified$;
    this.canSave$ = this.service.canSave$;
    this.filters$ = this.service.filters;
  }


  type = 2;
  activeId$;
  domainPipes$;

  ngOnInit() {
    this.activeId$ = this.service.active$.pipe(map((e: any) => (e) ? e.id : null));
    this.domainPipes$ = this.service.domainPipes$;
    this.pm$ = this.service.previewMode$;
    this.expanded$ = this.service.expanded$;
  }

  resetFilter() {
    this.service.reset$.next(true);
  }

  onFlipCollapse() {
    this.service.flipCollapse();
  }

  loadPipes() {
    this.service.getInContext().subscribe((l) => this.domainPipes$.next(l));
  }

  onEditClick() {
    this.drawer.openEditor();
  }

  onClearClick() {
    this.service.setActive(null);
  }

  onAddClick() {
    this.service.setActive(null);
    this.drawer.openEditor();
  }

  onActiveChanged(activeId) {
    this.domainPipes$.subscribe((pipes: any[]) => {
      const active = pipes.find(e => e.id === activeId);
      this.service.setActive(active);
    }).unsubscribe();
  }

  updatePreviewMode(mode) {
    this.service.upadatePreviewMode(mode);
  }

}
