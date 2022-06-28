import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TranformationDrawerService } from '../../services/tranformation-drawer.service';
import { TranformationService } from '../../services/tranformation.service';

export class TransformPipeInput implements OnInit {
  pm$: any;
  activeId$;
  domainPipes$;

  type = 2;
  modes = [
    {mode: 'TARGET', icon: 'file-sync', tooltip: 'View Target'},
    {mode: 'SOURCE', icon: 'file-text', tooltip: 'View Source'}
  ];
  constructor(
    private service: TranformationService,
    private drawer: TranformationDrawerService
    ) {}




  ngOnInit() {
    this.activeId$ = this.service.active$.pipe(map((e: any) => (e) ? e.id : null));
    this.domainPipes$ = this.service.domainPipes$;
    this.pm$ = this.service.previewMode$;
  }

  loadPipes() {
    this.service.getInContext().subscribe((l) => this.domainPipes$.next(l));
  }

  onEditClick() {
    this.drawer.openEditor();
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
