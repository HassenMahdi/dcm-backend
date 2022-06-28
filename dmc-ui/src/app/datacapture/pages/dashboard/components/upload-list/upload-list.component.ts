import { Component, Input, OnInit } from '@angular/core';
import { AppState, NotificationService } from '@app/core';
import { AuditComponent } from '@app/shared/audit/audit.component';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DashboardService } from '../../service/dashboard.service';
import { ActionSavePage, ActionSaveSize, ActionSaveSort } from '../../store/actions/dashboard.actions';
import { selectPage, selectSize, selectSort } from '../../store/selectors/dashboard.selectors';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent {
  @Input() set selectedDomain(value: boolean) {
    if (value) {
      this._selectedDomain = value;
      this.loadData(this._selectedDomain.id);
    }
  }
  _selectedDomain: any;
  data: any[];
  pagesSize = 1;
  // Store
  page$: Observable<number>;
  size$: Observable<number>;
  sort$: Observable<any>;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private service: DashboardService,
    private store: Store<AppState>,
    private modalService: NzModalService,
    private notification: NotificationService) {
      this.page$ = this.store.select(selectPage);
      this.size$ = this.store.select(selectSize);
      this.sort$ = this.store.select(selectSort);
      this.data = [];
  }

  loadData(id: string): void {
    try {
      this.loading$.next(true);
      forkJoin(this.page$.pipe(take(1)), this.size$.pipe(take(1)), this.sort$.pipe(take(1))).subscribe(([page, size, sort]) => {
        this.service.getDashboardData(id, page, size, sort.sortKey, sort.sortAcn).subscribe((res: any) => {
          this.pagesSize = res.total;
          this.data = res.content;
          this.loading$.next(false);
        });
      });
    } catch (error) {
      this.loading$.next(false);
    }
  }

  sort(event: any) {
    this.store.dispatch(new ActionSaveSort({sortKey: event.key, sortAcn: (event.value === 'ascend' ? 1 : -1)}));
    this.loadData(this._selectedDomain.id);
  }

  onPageChange(page: number) {
    this.store.dispatch(new ActionSavePage(page));
    this.loadData(this._selectedDomain.id);
  }

  onSizeChange(size: number) {
    this.store.dispatch(new ActionSaveSize(size));
    this.loadData(this._selectedDomain.id);
  }

  auditTrial(ws: any): void {
    const worksheet = ws.transformation_id ? ws.transformation_id.split('/').pop() : ws.sheet_id;
    this.service.getAuditTrial(worksheet, this._selectedDomain.id).subscribe((res) => {
      const modal: NzModalRef = this.modalService.create({
        nzTitle: 'Audit Trail',
        nzClosable: false,
        nzWrapClassName: 'vertical-center-modal',
        nzWidth: 'xXL',
        nzContent: AuditComponent,
        nzOkText: null,
        nzComponentParams: {
          audits: res
        },
      });
    });
  }

}
