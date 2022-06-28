import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { ActionImportReset } from '../../store/actions/import.actions';
import { Observable, forkJoin, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { selectFileData, selectDomain } from '../../store/selectors/import.selectors';
import { selectUpdatedSheet } from '../../store/selectors/preview.selectors';
import { CleansingService } from '../../services/cleansing.service';
import { selectTransformedFilePath } from '../transformation/store/transformation.selectors';
import { selectMappingFields, selectMappingId, selectMappingVersion } from '../../store/selectors/mapping.selectors';
import { CleansingHotKeysService } from '../../services/cleansing-hot-keys.service';
import { shortcutString } from '@app/shared/utils/strings.utils';
import { ActionSaveCleansingErrors, ActionSaveJobId } from '../../store/actions/cleansing.actions';
import { AuditComponent } from '@app/shared/audit/audit.component';
import { isEmpty } from '@app/shared/utils/objects.utils';
import { take } from 'rxjs/operators';
import { currencyFormatter, dateFormatter, GAPIFilters, INDEX_HEADER, mapGridFilter } from '@app/shared/utils/grid-api.utils';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-cleansing',
  templateUrl: './cleansing.component.html',
  styleUrls: ['./cleansing.component.css']
})
export class CleansingComponent implements OnInit, OnDestroy {
  // Data Table Related
  grid: any;
  domain: string;
  results: any;
  worksheet: any;
  fileData: any;
  numberOfRows = 100;
  selectedSheet: number;
  targetFields: any;
  mappingId: string;
  mappingVersion: string;
  jobId: string;
  modifications: any = {};
  keys = Object.keys;
  autosave = true;
  // BS
  filters$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  metaData$: BehaviorSubject<any> = new BehaviorSubject({});
  total$: BehaviorSubject<any> = new BehaviorSubject(0);
  results$: BehaviorSubject<any> = new BehaviorSubject({});
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  data$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  lock$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  expanded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // Store
  selectedSheet$: Observable<any>;
  domain$: Observable<any>;
  fileData$: Observable<any>;
  worksheet$: Observable<any>;
  targetFields$: Observable<any>;
  mappingId$: Observable<any>;
  mappingVersion$: Observable<any>;

  errorLevels = [
    {level: 'all', label: 'All', type: 'primary'}
    , {level: 'errors', label: 'Errors', type: 'danger'}
    // , {level: 'warnings', label: 'Warnings', type: 'warning'}
    // ,{level:'warnings', label:'Warnings', type:'warning'}
  ];
  selectedErrorLevel$ = new BehaviorSubject('all');
  loadCleansingData$;
  datasource$;
  gridReady$ = new Subject();

  constructor(private router: Router,
              private store: Store<AppState>,
              private service: CleansingService,
              private modalService: NzModalService,
              public hotkeys: CleansingHotKeysService,
              private not: NotificationService) {
    this.selectedSheet$ = this.store.select(selectUpdatedSheet);
    this.mappingId$     = this.store.select(selectMappingId);
    this.mappingVersion$     = this.store.select(selectMappingVersion);
    this.fileData$      = this.store.select(selectFileData);
    this.domain$        = this.store.select(selectDomain);
    this.worksheet$     = this.store.select(selectTransformedFilePath);

    this.fileData$.subscribe((res) => {this.fileData = res; });
    this.targetFields$ = this.store.select(selectMappingFields);
    this.mappingId$.subscribe((res) => { this.mappingId = res; });
    this.mappingVersion$.subscribe((res) => { this.mappingVersion = res; });
    this.domain$.subscribe((domain) => { this.domain = (domain)? domain.id : null; });
    this.targetFields$.subscribe((targetFields) => { if (targetFields) { this.targetFields = targetFields; } });
    this.selectedSheet$.subscribe((sheet) => { this.selectedSheet = sheet; });
    this.worksheet$.subscribe((res) => { this.worksheet = res; });

    const isTransformed = this.worksheet !== null;
    const ws = this.worksheet ? this.worksheet : this.selectedSheet;
    // tslint:disable-next-line: max-line-length
    this.service.startJob(this.fileData.metaData.file_id, ws, this.domain, isTransformed, this.mappingVersion || this.mappingId).subscribe((job) => {
      if (job) {
        this.jobId = job.job_id;
        this.store.dispatch(new ActionSaveJobId(job.job_id));
        this.service.getJobMetaData(job.job_id).subscribe((metaData: any) => {
          this.metaData$.next(metaData);
          this.store.dispatch(new ActionSaveCleansingErrors(metaData.totalErrors));
          this.lock$.next(true);
        });
      }
    });

    this.datasource$ = combineLatest([this.gridReady$, this.lock$, this.selectedErrorLevel$]).subscribe(
      ([gridApi, Locked, errorLevel]) => {
        this.fetchCleansingData(gridApi);
      }
    );

    this.hotkeys.register([
      ...this.cleansingHotkeys()
    ]);
  }

  changeErrorLevel(level) {
    this.selectedErrorLevel$.next(level);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.hotkeys.unregister();
    if (this.datasource$) { this.datasource$.unsubscribe(); }
  }

  auditTrial(): void {
    let ws;
    if (this.worksheet) {
      ws = this.worksheet.split('/').pop();
    } else {
      ws = this.selectedSheet;
    }
    this.service.getAuditTrial(ws, this.domain).subscribe((res) => {
      const modal = this.modalService.create({
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

  cleansingHotkeys = () => {
    const that = this;
    const HKSave = 'control.s';
    return [
      {
        name: 'Save modifications',
        tooltip: 'Save and Apply cleansing modifications',
        action: () => that.syncWithServer(),
        shortcut: shortcutString(HKSave),
        key: HKSave,
        icon: 'save',
        alwaysShow: true
      },
      {
        name: 'Inline Check Toggle',
        tooltip: 'Toggle between manula and auto save',
        action: () => that.autosave = !that.autosave,
        shortcut: shortcutString('alt.i'),
        key: 'alt.i',
        icon: 'rocket',
        alwaysShow: true
      },
      {
        name: 'View All',
        tooltip: 'View All Data',
        action: () => that.selectedErrorLevel$.next('all'),
        shortcut: shortcutString('alt.a'),
        key: 'alt.a',
        icon: 'table',
        alwaysShow: true
      },
      {
        name: 'View Data in Error',
        tooltip: 'View All Data',
        action: () => that.selectedErrorLevel$.next('errors'),
        shortcut: shortcutString('alt.e'),
        key: 'alt.e',
        icon: 'warning',
        alwaysShow: true
      }
    ];
  }

  serverSideDatasource = (grid: any) => {
    const that = this;
    return {
      getRows(params) {
        combineLatest([that.lock$, that.selectedErrorLevel$.pipe(take(1))]).subscribe(([isLocked, errorLevel]) => {
          if (isLocked) {
            const page = Number ((params.request.endRow / that.numberOfRows) - 1 );
            const isTransformed = that.worksheet !== null;
            const ws = that.worksheet ? that.worksheet : that.selectedSheet;
            const adaptedFilter = [];
            const adaptedSort: any = {};
            Object.keys(params.request.filterModel).forEach((column) => {
              const filter = {
                column: that.cleanFilter(column),
                operator: mapGridFilter(params.request.filterModel[column].type, params.request.filterModel[column].filterType === 'date'),
                // tslint:disable-next-line: max-line-length
                value: params.request.filterModel[column].filterType === 'date' ? params.request.filterModel[column].dateFrom : params.request.filterModel[column].filter,
              };
              adaptedFilter.push(filter);
            });
            if (params.request.sortModel.length > 0) {
              params.request.sortModel.forEach((e) => {adaptedSort.column = that.cleanFilter(e.colId); adaptedSort.order = e.sort; });
            }
            that.filters$.next(GAPIFilters(params.request.filterModel));
            // tslint:disable-next-line: max-line-length
            that.service.getJobData(that.fileData.metaData.file_id, that.domain, ws, page , that.numberOfRows, adaptedFilter, adaptedSort, isTransformed, errorLevel)
            .subscribe((res: any) => {
              that.total$.next(res.total);
              const newErrors = {};
              Object.keys(res.results).forEach((e: string) => {
                const ind = Number(e);
                newErrors[ind] =  res.results[e];
              });
              that.results = {...that.results, ...newErrors};
              that.results$.next(that.results);
              if (page <= 0 && adaptedFilter.length === 0 && isEmpty(adaptedSort)) {
                const headers = that.targetFields.map((e) => ({field: e.name, headerName: e.label}));
                headers.unshift(INDEX_HEADER);
                that.headers$.next([...headers]);
                grid.api.setColumnDefs(that.setHeadersLogic(headers, that.targetFields));
              }
              if (res.data.length) {
                const lastRow = () => {
                  return res.total;
                };
                grid.columnApi.autoSizeAllColumns();
                params.successCallback(res.data, lastRow());
              } else {
                params.successCallback([], 0);
              }
            }, (error) => {
              params.failCallback();
              // that.not.error(error.message);
            });
          }
        });
      }
    };
  }

  cleanFilter(header: string): string {
    const i = header.lastIndexOf('_');
    if (i >= 0) {
      return header.substring(0, i);
    } else {
      return header;
    }
  }

  fetchData(params: any): void {
    this.gridReady$.next(params);
  }

  fetchCleansingData(params: any): void {
    this.results = {};
    this.results$.next({});
    const datasource = this.serverSideDatasource(params);
    params.api.setServerSideDatasource(datasource);
    this.grid = params;
  }

  setHeadersLogic(headers: any, types: any): any {
    if (headers) {
      headers.map((h, ind) => {
        if (h.colId !== INDEX_HEADER.colId) {
          const cellClass = (params) => {
            
            const f = params.colDef.field;
            const i = (params.data) ? params.data.row_index : -1;
            try {
              if (this.modifications[i][f]) {
                return 'edited-cell';
              }
            } catch (error) {}
            try {
              if (this.results[i][f].errors.length > 0) {
                return 'error-cell';
              }
            } catch (error) {}
            try {
              if (this.results[i][f].warnings.length > 0) {
                return 'warning-cell';
              }
            } catch (error) {}
            return null;
          };
          h.cellClass = cellClass;
          h.cellStyle = {'font-family': 'Roboto,Helvetica,Arial,sans-serif', color: '#363636', 'border-right': '1px solid #ccc'};
          h.resizable = true;
          // h.suppressSizeToFit = false;
          h.tooltipComponent = 'customTooltip';
          // h.tooltipField = h.field;
          h.tooltipComponentParams = {error: this.results$};
          h.tooltipValueGetter = (params) => {
            return { value: params.value, index : (params.data) ? params.data.row_index : '' };
          };
          // Sort
          h.sortable = true;
          // Filter
          h.filterParams = {suppressAndOrCondition: true, buttons: ['reset', 'apply'], debounceMs: 200, closeOnApply: true};
          switch (types[(ind - 1)].type) {
            case 'string':
              h.filter = 'agTextColumnFilter';
              break;
            case 'int':
                // h.valueFormatter = this.currencyFormatter,
                h.filter = 'agNumberColumnFilter';
                break;
            case 'double':
              h.valueFormatter = currencyFormatter,
              h.filter = 'agNumberColumnFilter';
              break;
            case 'date':
              h.valueFormatter = dateFormatter,
              h.filter = 'agDateColumnFilter';
              break;
            default:
              break;
          }
          return h;
        } else {
          return INDEX_HEADER;
        }
      });
    }

    return headers;
  }

  syncWithServer(): void {
    const isTransformed = this.worksheet !== null;
    const ws = this.worksheet ? this.worksheet : this.selectedSheet;
    // tslint:disable-next-line: max-line-length
    this.service.editCell(this.fileData.metaData.file_id, ws, this.domain, this.modifications, isTransformed, this.mappingVersion || this.mappingId, this.jobId).subscribe((res: any) => {
      this.fetchData(this.grid);
      if (this.jobId) {
        this.service.getJobMetaData(this.jobId).subscribe((metaData: any) => {
          this.metaData$.next(metaData);
          this.store.dispatch(new ActionSaveCleansingErrors(metaData.totalErrors));
          this.modifications = {};
          this.not.success('Success');
        });
      }
     });
  }

  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToMapping(): void {
    this.router.navigate(['/datacapture/upload/mapping']);
  }

  goToUpload(): void {
    this.router.navigate(['/datacapture/upload/uploading']);
  }

  editCell(params: any): void {
    this.modifications[params.data.row_index] = {
      ...this.modifications[params.data.row_index],
      [params.colDef.field]: {previous: params.oldValue, new: params.newValue}
    };
  }

  onCellEdit(params) {
    // CHECK IF VALUE HAS CHANGED
    if ( params.oldValue === params.newValue) { return false; }
    this.editCell(params);
    if ( !this.autosave ) { return false; }
    this.rerunModificationOnRow(params);

  }

  rerunModificationOnRow(params) {
    const api = this.grid.api;
    const line = params.data.row_index;
    const rowNode = params.node;
    const isTransformed = this.worksheet !== null;
    const ws = this.worksheet ? this.worksheet : this.selectedSheet;
    rowNode.stub = true;
    api.redrawRows({ rowNodes: [rowNode] });
    this.runWithEditedCell().subscribe(() => {
      this.service.getJobData(this.fileData.metaData.file_id, this.domain,ws, line , 1, [], {}, isTransformed).subscribe((data: any) => {
        // tslint:disable-next-line: variable-name
        const absolute_index = line;
        this.results[absolute_index] = data.results[absolute_index];
        this.results$.next(this.results);
        rowNode.stub = false;
        api.redrawRows({ rowNodes: [rowNode] });
      });
      this.loadMetadata();
      this.modifications = {};
    });
  }

  runWithEditedCell() {
    return new Observable<any>((observer) => {
      const isTransformed = this.worksheet !== null;
      const ws = this.worksheet ? this.worksheet : this.selectedSheet;
      // tslint:disable-next-line: max-line-length
      this.service.editCell(this.fileData.metaData.file_id, ws, this.domain, this.modifications, isTransformed, this.mappingVersion || this.mappingId, this.jobId).subscribe((res: any) => {
        observer.next(); observer.complete();
       });
    });
  }

  loadMetadata() {
    this.service.getJobMetaData(this.jobId).subscribe((metaData: any) => {
      this.metaData$.next(metaData);
      this.store.dispatch(new ActionSaveCleansingErrors(metaData.totalErrors));
    });
  }
}
