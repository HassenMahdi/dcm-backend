import { Component, Input, OnInit } from '@angular/core';
import { DomainService } from '@app/datacapture/pages/admin/services/domain.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-domain-breadcrumb',
  templateUrl: './domain-breadcrumb.component.html',
  styleUrls: ['./domain-breadcrumb.component.css']
})
export class DomainBreadcrumbComponent implements OnInit {

  @Input()
  set collectionId(id){
    if(id){
      this.loading$.next(true)
      this.collection$.next(null)
      this.domains.getInfoById(id).subscribe(info=>{
        this.collection$.next(info)
        this.loading$.next(false)
      })

    } else {
      this.loading$.next(false)
      this.collection$.next(null)
    }
  }

  loading$ = new BehaviorSubject(false)
  collection$ = new BehaviorSubject(null)

  constructor(private domains: DomainService) { }

  ngOnInit(): void {
  }

}
