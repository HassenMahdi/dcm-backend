import { Component, Input, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-connector-preview',
  templateUrl: './connector-preview.component.html',
  styleUrls: ['./connector-preview.component.css'],
})
export class ConnectorPreviewComponent implements OnInit {

  @Input("data") set _data(value){
    this.data = value
  }
  data
  
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  
  data$ = new BehaviorSubject<any>(null);
  size$ = new BehaviorSubject<number>(200);
  gridReady$ = new Subject<string>();
  paginator$: any;
  
  private customerDiffer: KeyValueDiffer<string, any>;

  constructor(private differs: KeyValueDiffers, private service: FileImportService) {
    this.paginator$ = combineLatest([this.size$, this.data$, this.gridReady$]).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    )
    .subscribe(([size, data, grid]) => {
      this.onReset();
        this.generateDataSource(grid, data, size);
    });
  }

  generateDataSource(gridApi: any, data, size: number) {
    const that = this;
    // this.gridApi = gridApi;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        that.loading$.next(true);
        that.service.previewConnectorData(data).subscribe((res: any) => {
          that.loading$.next(false);
          if (page <= 1) {
            const headers = res.headers.map(h => ({field: h, headerName:h, cellRenderer: 'autoTypeRenderer'}));
            that.headers$.next(headers);
          }
          const lastRow = () => res.total;
          params.successCallback(res.data, lastRow());
        }, (error) => {
            params.failCallback();
            // that.onError(error);
        });
      }
    });
  }

  ngOnInit(): void {
    this.customerDiffer = this.differs.find(this.data).create();
  }

  dataChanged(changes: KeyValueChanges<string, any>) {
    this.data$.next(this.data)
  }

  ngDoCheck(): void {
      const changes = this.customerDiffer.diff(this.data);
      if (changes) {
        this.dataChanged(changes);
      }
  }

  onReset = () => {
    this.headers$.next(null);
    this.loading$.next(false);
  }
}
