import { Component, OnInit } from '@angular/core';
import { SuperDomainService } from '../../services/super-domain.service';
import { map, tap } from 'rxjs/operators';
import { AdminNavigator } from '../../services/admin-navigator.service';
import { combineLatest } from 'rxjs';



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
  selector: 'app-domains-hierarchy',
  templateUrl: './domains-hierarchy.component.html',
  styleUrls: ['./domains-hierarchy.component.css']
})
export class DomainsHierarchyComponent implements OnInit {
  nodes$: any;
  searchValue: '';
  expandedKey = null;
  activetedKey = null;

  constructor(
    private service: SuperDomainService,
    private nav: AdminNavigator
    ) { }

  ngOnInit() {

    this.nodes$ = this.service.hierarchy$.pipe(
      map((superDoms: any[]) => superDoms.map(mapSuperdomain))
    ).pipe(tap(() => combineLatest(this.nav.activeDomain$, this.nav.activeSubDomina$).subscribe(
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
    const domain = node.origin.info;
    this.nav.goToDomainFields(domain.super_domain_id, domain.id);
  }
  onSuperDomainClick(node) {
    const superDomain = node.origin.info;
    this.nav.goToSuperDomainCollections(superDomain.id);
  }
  onSeeAllClick(){
    this.nav.goToDomains()
  }

}
