import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '../../services/domain.service';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Column } from '../../models/column';
import { FieldModalComponent } from '../../modals/field-modal/field-modal.component';
import { Field } from '../../models/field';
import { NzModalService } from 'ng-zorro-antd';
import { TargetFieldsService } from '../../services/fields.service';
import { NotificationService } from '@app/core';
import { ChecksService } from '../../services/checks.service';
import { deepCopy } from '@app/shared/utils/objects.utils';
import { StoreService } from '../../services/store.service';
import { DATA_TYPES } from '@app/shared/utils/types';
import { ALL_CHECKS, DataCheckFactory } from '../../models/datachecks.model';

@Component({
  selector: 'app-fields-page',
  templateUrl: './fields-page.component.html',
  styleUrls: ['./fields-page.component.css']
})
export class FieldsPageComponent implements OnInit, OnDestroy {
  @Input() id: number;
  subid: any;
  loading;
  uploadURI;
  searchTerm = '';
  private sub: any;

  list$ = new BehaviorSubject<any>([]);
  checks$ = new BehaviorSubject<any>({});
  profile$: Observable<any>;
  columns = [
    new Column('Label', 'label'),
    new Column('Type', 'type'),
    new Column('Reference', 'ref_type'),
    new Column('Description', 'description'),
    new Column('Mandatory', 'mandatory'),
    // new Column('Editable', 'editable'),
    new Column('Checks', 'rules'),
    new Column('', 'action'),
  ];

  data_types = {}

  constructor(private notification: NotificationService,
              private route: ActivatedRoute,
              private cs: ChecksService,
              private ds: TargetFieldsService,
              private modal: NzModalService,
              public s: StoreService,
              private router: Router) {}

  ngOnInit() {
    this.profile$ = this.s.getProfile();
    this.sub = this.route.parent.params.subscribe(params => {
      this.id = params.id || this.id;
      this.subid = params.subid;
      this.load_data();
    });

    this.data_types = {}
    DATA_TYPES.forEach(type => {
      this.data_types[type.value]= type.label
    });
  }

  enableAddbtn(profile): boolean {
    if(profile){
      if( profile.admin ){
        return true
      }else{
        const roles = profile.roles || []
        const i = roles.map((e) => e.domain_id).indexOf(this.subid);
        if (i >= 0) {
          if (roles[i].role === 'domainAdmin') {
            return true;
          }
        }
      }  
    }
    return false;
  }

  onBack() {
    this.router.navigate(['/datacapture/admin/domains', this.subid, 'collection']);
  }

  load_data() {
    this.loading = true;
    this.uploadURI = this.ds.fileUploadUrl(this.id);

    forkJoin(this.ds.get(this.id), this.cs.getDomainChecksMap(this.id)).subscribe(([fields, checks]) => {
      this.list$.next(fields);
      const checks_map = {}
      ALL_CHECKS.forEach(c=>checks_map[c.id]=c)
      this.checks$.next(checks_map);
      this.loading = false;
    }, err => this.loading = false);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openConfig(data) {
    const edit = data ? true : false;
    let obj:any =  new Field();
    if (data) {
      obj = deepCopy(data);
    }

    obj.rules = DataCheckFactory.toUIChecksModel(obj)

    const modal = this.modal.create({
      nzTitle: null,
      nzFooter: null,
      nzContent: FieldModalComponent,
      nzComponentParams: {
        data: obj,
        edit,
        domain_id: this.id
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
      nzTitle: 'Confirm Target Field Deletion',
      nzContent: 'This action is irreversible.',
      nzOnOk: () =>
        this.ds.delete(this.id, data).subscribe(() => this.load_data())
    });
  }

  handleChange(info: any): void {
    if (info.file.status !== 'uploading') {
      this.loading = true;
    }
    if (info.file.status === 'done') {
      this.notification.success(`Fields updated successfully from file ${info.file.name}.`);
      this.load_data();
    } else if (info.file.status === 'error') {
      this.notification.error(`Failed to update.`);
      this.load_data();
    }
  }

}
