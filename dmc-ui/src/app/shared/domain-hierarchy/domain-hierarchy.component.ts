import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SuperDomainService } from '@app/datacapture/pages/admin/services/super-domain.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';



function mapSuperdomain(superDom)
{
  return {
    title: superDom.name,
    key: superDom.id,
    icon: 'folder',
    info: superDom,
    children: [
      ...superDom.super_domains.map(mapSuperdomain), 
      ...superDom.domains.map(mapDomain),
    ],
    isSuperDomain: true
  }
}

function mapDomain(dom)
{
  return {
    title: dom.name,
    icon: 'block',
    key: dom.id,
    isLeaf: true,
    info : dom,
    isDomain: true,
  }
}


@Component({
  selector: 'app-domain-hierarchy',
  templateUrl: './domain-hierarchy.component.html',
  styleUrls: ['./domain-hierarchy.component.css']
})
export class DomainHierarchyComponent implements OnInit {

  nodes$: any;
  searchValue: '';
  expandedKey = null;
  activetedKey = null;

  activeDomain$ = new BehaviorSubject(null)
  activeSubDomina$ = new BehaviorSubject(null)
  
  @Input('collection') set collection(value){
    this.activeSubDomina$.next(value)
  }

  @Output()
  domainClicked = new EventEmitter<string>()
  @Output()
  collectionClicked = new EventEmitter<string>()

  constructor(
    private service: SuperDomainService
    ) { }

  ngOnInit() {

    this.nodes$ = this.service.hierarchy$.pipe(
      map((superDoms: any[]) => superDoms.map(mapSuperdomain))
    ).pipe(tap(() => combineLatest(this.activeDomain$, this.activeSubDomina$).subscribe(
      ([domain, subDomain]) => {
        this.activetedKey = [subDomain || domain]; 
        this.expandedKey = [domain] 
      }
    )));

    this.service.loadHierarchy()
  }

  onElementClick(element: any){
    const node = element.node;
    if(node.origin.isSuperDomain)
    this.onSuperDomainClick(node);
    else
    this.onDomainClick(node); 
  }

  onDomainClick(node) {
    const data = node.origin.info;
    this.collectionClicked.emit(data.id)
  }
  onSuperDomainClick(node) {
    const data = node.origin.info;
    this.domainClicked.emit(data.id)
  }
}
