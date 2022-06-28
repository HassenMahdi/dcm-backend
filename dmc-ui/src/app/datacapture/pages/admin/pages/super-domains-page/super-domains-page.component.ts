import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { SuperDomain } from '../../models/super-domain';
import { SuperDomainConfigModalComponent } from '../../modals/super-domain-config-modal/super-domain-config-modal.component';
import { SuperDomainService } from '../../services/super-domain.service';
import { StoreService } from '../../services/store.service';
import { NotificationService } from '@app/core';

@Component({
  selector: 'app-super-domains-page',
  templateUrl: './super-domains-page.component.html',
  styleUrls: ['./super-domains-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperDomainsPageComponent implements OnInit {
  loadingList = [{}];
  loading = false;
  searchTerm;
  domains$ = new BehaviorSubject<any>([]);
  profile$: Observable<any>;
  constructor(
    public ds: SuperDomainService,
    public modal: NzModalService,
    private router: Router,
    public s: StoreService,
    private msg: NotificationService) {}

  ngOnInit() {
    this.profile$ = this.s.getProfile();
    this.load_data();
  }

  load_data() {
    this.loading = true;
    this.domains$.next(this.loadingList);
    const msg = this.msg.loading('Loading Domains');
    this.ds.get().subscribe((dms) => {
      this.loading = false;
      this.msg.close(msg);
      this.domains$.next(dms);
    }, err => {
      this.msg.close(msg);
      this.domains$.next([]);
      this.loading = false;
      this.msg.error('Failed to load Domains');
    });
  }

  openConfig(data) {
    const edit = data ? true : false;
    data = {...data} || new SuperDomain();
    const modal = this.modal.create({
      nzTitle: 'Domain Configuration',
      nzFooter: [],
      nzContent: SuperDomainConfigModalComponent,
      nzComponentParams: {
        data,
        edit
      },
    });

    const instance = modal.getContentComponent();
    modal.afterClose.subscribe(result => {
      if (result) {
        this.load_data();
      }
    });
  }

  showDeleteConfirm(data): void {
    const confirmModal = this.modal.confirm({
      nzTitle: 'Confirm Super Domain Deletion',
      nzContent: 'This action is irreversible. Once a domain is deleted everything related to this domain will also be discarded',
      nzOnOk: () =>
        this.ds.delete(data).subscribe(() => this.load_data())
    });
  }

  navigate(r) {
    this.router.navigate(r);
  }

  CreateChildDomain(data)
  {
    const childData = new SuperDomain()
    childData.parent_super_domain_id = data.id
    this.openConfig(childData)
  }

}
