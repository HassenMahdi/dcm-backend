import { Component, OnInit } from '@angular/core';
import { DomainService } from '../../services/domain.service';
import { take, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AdminNavigator } from '../../services/admin-navigator.service';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnInit {

  constructor(private service: DomainService, private route: ActivatedRoute, private nav: AdminNavigator) { }

  collection$:any
  subid;
  id;
  laoding$ = new BehaviorSubject(false);

  ngOnInit() {
      this.route.params.subscribe(params => {
         this.id = params.id;
         this.subid = params.subid;
         this.loadData();
      });
  }
  loadData() {
    this.laoding$.next(true)
    this.collection$ = this.service.getById(this.id).pipe(take(1), tap(() => this.laoding$.next(false)));
  }

  exit(){
    this.nav.goToSuperDomainCollections(this.subid)
  }
}
