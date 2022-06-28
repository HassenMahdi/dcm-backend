import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CheckService } from '../services/check.service';
import { GAPIAllFilterParams, GAPIFilterComponenet, GAPIFilters, INDEX_HEADER } from '../utils/grid-api.utils';
import { DefaultGridState, GridState } from './GridState';


@Component({
  selector: 'app-dcm-cleansing-grid',
  templateUrl: './dcm-cleansing-grid.component.html',
  styleUrls: ['./dcm-cleansing-grid.component.css']
})
export class DcmCleansingGridComponent implements OnInit {

  // DATASET
  folder = 'imports'
  file_id = null
  sheet_id = null
  result_id = null

  // DATA
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  total$: BehaviorSubject<Number> = new BehaviorSubject(0);
  checks$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  results: any = [];
  resultMetadata$ : BehaviorSubject<any> = new BehaviorSubject(null);

  // ESSENTIELS
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  size$ = new BehaviorSubject<number>(200);
  gridReady$ = new Subject<any>();
  Load$ = new Subject<any>();
  gridApi = null;
  paginator$: any;

  // PARAMS
  selectionMode = 'single'
  toolbarButtons$ : BehaviorSubject<any[]> = new BehaviorSubject([]);
  footerText$ : BehaviorSubject<string> = new BehaviorSubject("");
  currentState : GridState = null;

  datasetChanged = new EventEmitter<any>()

  // TODO REPLACE THIS WITH A GENERIC PREVIEWR SERVICE FOR ALL STEPS
  constructor(private service: FileImportService, private checkService: CheckService, public injector : Injector) {
    this.LoadState(DefaultGridState) 
  }

  LoadState(stateClass: typeof GridState)
  {
    if(this.currentState)
    {
      const oldState = this.currentState
      oldState.OnEnd()
    }
    
    this.currentState = new stateClass(this);

    this.currentState.OnBegin()
  }

  Reload() {
    this.onReset()
    this.Load$.next()
  }

  UpdateHeaders(fileds)
  {
    const colDefs = this.currentState.GetColDefs(fileds)
    this.headers$.next(colDefs);
  }

  ngOnInit(): void {
    this.paginator$ = combineLatest([this.size$, this.gridReady$, this.Load$])
      .subscribe(([size, grid]) => {
        this.gridApi = grid.api
        if (this.folder && this.file_id && this.sheet_id)
          this.generateDataSource(grid, this.folder, this.file_id, this.sheet_id, this.result_id,size);
        if (this.result_id)
          this.getResultMetadata(this.result_id)
      });

    this.Load$.next()
  }

  getResultMetadata(result_id)
  {
    this.checkService.GetCheckMetadata(result_id).pipe(tap(res=>this.resultMetadata$.next(res))).subscribe()
  }

  onReset = () => {
    this.ResetData()
    this.ResetResults()
  }

  ResetData()
  {
    this.headers$.next(null);
    this.loading$.next(false);
  }

  generateDataSource(gridApi: any, folder: string, file_id: any, sheet_id: any, result_id:any, size: number) {
    const that = this;

    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        const filters = GAPIFilters(params.request.filterModel);


        // that.transformService.filters.next(filters);
        that.loading$.next(true);
        that.service.getFileDataWithResult(page, sheet_id, result_id,size, filters).subscribe((res: any) => {
          that.total$.next(res.total);
          that.loading$.next(false);

          if (page <= 1) {
            that.UpdateHeaders(res.headers)
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

          that.AppendResults(res.check_metadata, res.check_results, res.index)

          gridApi.columnApi.autoSizeAllColumns();
          params.successCallback(data, lastRow());
        }, (error) => {
          params.failCallback();
          // that.onError(error);
        });
      }
    });
  }

  AppendResults(check_metadata, check_results, index)
  {
    if (!(check_metadata && check_results))
      return

    index.forEach((aboluterowindex, relativerowindex) => {
      const rowchecks = check_results[relativerowindex]

      this.results[aboluterowindex] = {}

      check_metadata.forEach((check, checkIndex)=> {
        const type = check[0]
        const field = check[1]
        const level = check[2]
        const code = rowchecks[checkIndex]
      
        if(code>0)
        {
          let target = this.results[aboluterowindex]
          target[field] = target[field] || {}
          target[field][level] = target[field][level] || []
          target[field][level].push({code, type})
        }
      });

    });
  }

  ResetResults()
  {
    this.results = {}
    this.resultMetadata$.next(null)
  }

  UpdateDataset(folder, file_id, sheet_id, result_id)
  {
    this.folder = folder || 'imports'
    this.file_id = file_id
    this.sheet_id = sheet_id
    this.result_id = result_id

    this.datasetChanged.emit({folder, file_id, sheet_id, result_id})
  }
}
