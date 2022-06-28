import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest, Observable } from 'rxjs';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { selectSelectedSheet, selectUpdatedSheet } from '@app/datacapture/pages/upload/store/selectors/preview.selectors';
import { selectFileData } from '@app/datacapture/pages/upload/store/selectors/import.selectors';
import { GAPIAllFilterParams, GAPIFilterComponenet, GAPIFilters, GAPIformatCell, INDEX_HEADER } from '@app/shared/utils/grid-api.utils';
import { PreviewGridComponent } from '../preview-grid.component';
import { TranformationService } from '../../../transformation/services/tranformation.service';
import { TransformationHotKeysService } from '../../../transformation/services/transformation-hot-keys.service';
import { SaveSourcesPreview } from '@app/datacapture/pages/upload/store/actions/mapping.actions';

@Component({
  selector: 'app-source-preview',
  templateUrl: './source-preview.component.html',
  styleUrls: ['./source-preview.component.css']
})
export class SourcePreviewComponent extends PreviewGridComponent implements OnInit, OnDestroy {
  // Store
  fileData$: Observable<any>;
  selectedSheet$: Observable<any>;
  // Grid
  paginator$: any;
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject(0);
  total$: BehaviorSubject<number> = new BehaviorSubject(0);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  error$ = new BehaviorSubject<string>(null);
  page$ = new BehaviorSubject<number>(1);
  size$ = new BehaviorSubject<number>(200);
  gridReady$ = new Subject<string>();
  constructor(
    private service: FileImportService,
    private store: Store<AppState>,
    _transformService: TranformationService,
    _hotkeys: TransformationHotKeysService) {
      super(_transformService, _hotkeys);
      this.selectedSheet$ = this.store.select(selectUpdatedSheet);
      this.fileData$ = this.store.select(selectFileData);
      this.transformService.reset$.subscribe((res) => {
        if (res && this.gridApi) {this.gridApi.api.setFilterModel(null); }
      });
  }

  ngOnInit(): void {
    this.paginator$ = combineLatest([this.size$, this.fileData$, this.selectedSheet$, this.gridReady$])
      .subscribe(([size, file, selectedSheet, grid]) => {
        this.onReset();
        if (file.metaData) {
          this.generateDataSource(grid, selectedSheet, size);
        }
      });
    this.registerHotKey();
  }

  ngOnDestroy(){
    this.unregisterHotKey();
    if (this.paginator$) { this.paginator$.unsubscribe(); }
  }

  generateDataSource(gridApi: any, worksheet: string, size: number) {
    const that = this;
    this.gridApi = gridApi;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        const filters = GAPIFilters(params.request.filterModel);
        that.transformService.filters.next(filters);
        that.loading$.next(true);
        that.service.getFileData(page, worksheet, size, filters).subscribe((res: any) => {
          that.total$.next(res.total);
          that.loading$.next(false);
          if (page <= 1) {
            const previewData = {};
            res.headers.forEach((e, i) => {
              previewData[e] = res.data.slice(1, 10).map((f: any) => f[i]);
            });
            that.store.dispatch(new SaveSourcesPreview(previewData));
            that.totalRecords$.next(res.total);
            const headers = res.headers.map(h => ({
              field: h,
                colId: h,
                headerName: h,
                editable: false,
                resizable: true,
                cellRenderer: 'autoTypeRenderer',
                filter: GAPIFilterComponenet('string'),
                filterParams: GAPIAllFilterParams(params)
            }));
            headers.unshift(INDEX_HEADER);
            that.headers$.next(headers);
          }
          const lastRow = () => res.total;
          const data = [];
          for (const row of res.data) {
            const rowObject = {};
            let i = 0;
            for (const h of res.headers) {
              rowObject[h] = row[i];
              i++;
            }
            data.push(rowObject);
          }
          gridApi.columnApi.autoSizeAllColumns();
          params.successCallback(data, lastRow());
        }, (error) => {
            params.failCallback();
            // that.onError(error);
        });
      }
    });
  }

  onError = (err) => {
    this.headers$.next(null);
    this.loading$.next(false);
    this.error$.next(err);
  }

  onReset = () => {
    this.error$.next(null);
    this.headers$.next(null);
    this.loading$.next(false);
  }

}
