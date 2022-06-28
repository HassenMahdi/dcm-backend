import { Component, OnInit, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { DomainService } from '../../services/domain.service';
import { NzModalService } from 'ng-zorro-antd';
import { DomainConfigModalComponent } from '../../modals/domain-config-modal/domain-config-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Domain } from '../../models/domain';
import { CollectionEditor } from '../../services/collection-editor.service';
import { tap, take } from 'rxjs/operators';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-domains-page',
  templateUrl: './domains-page.component.html',
  styleUrls: ['./domains-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DomainsPageComponent implements OnInit {
  sub: any;
  super_domain_id = null;
  loadingList = [{}];
  loading = false;
  searchTerm: string;
  displayList = true;
  domains$ = new BehaviorSubject<any>([]);
  profile$: Observable<any>;
  constructor(private route: ActivatedRoute,
              public ds: DomainService,
              public modal: NzModalService,
              private router: Router,
              private editor: CollectionEditor,
              public s: StoreService
    ) { }

  ngOnInit() {
    this.profile$ = this.s.getProfile();
    this.sub = this.route.params.subscribe(params => {
      this.super_domain_id = params.id;
      this.load_data();
   });
  }

  enableAddbtn(profile): boolean {
    if(profile){
      if( profile.admin ){
        return true
      }else{
        const roles = profile.roles || []
        const i = roles.map((e) => e.domain_id).indexOf(this.super_domain_id);
        if (i >= 0) {
          if (roles[i].role === 'domainAdmin') {
            return true;
          }
        }
      }  
    }
    return false;
  }

  load_data() {
    this.loading = true,
    this.domains$.next(this.loadingList);
    this.ds.getAllBySuperId(this.super_domain_id).subscribe(dms => {
      this.loading = false;
      this.domains$.next(dms);
    });
  }

  openConfig(data) {
    this.editor.openConfig(data, this.super_domain_id).subscribe(() => {
      this.load_data();
    });
  }

  getAvatar(d: any) {
    return (d.name || ' ')[0];
  }

  navigate(r) {
    this.router.navigate(r);
  }

}
