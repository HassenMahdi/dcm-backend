import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { DatasetComponent } from '@app/datacapture/pages/upload/components/import/dataset/dataset.component';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { environment } from '@env/environment';
import { NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-manual-import-node',
  templateUrl: './manual-import-node.component.html',
  styleUrls: ['./manual-import-node.component.css']
})
export class ManualImportNodeComponent extends PipelineNodeComponent implements OnInit {

  importing = false
  imported = false
  
  url = environment.import + '?domainId=' + null;
  
  constructor(private ntf: NotificationService, private service: FileImportService, private modal: NzModalService) { 
    super()

    this.paginator$ = combineLatest([this.size$, this.data$, this.gridReady$]).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    )
    .subscribe(([size, data, grid]) => {
      this.loading$.next(false)
      this.headers$.next([])
      if(data && data.sheet_id)
      {
        this.generateDataSource(grid, data, size);
      }
    });
  }

  ngOnInit(){
    if (this.data.file_id){
      this.imported = true
    }
    this.data$.next(this.data)
  }

  
  handleChange({ file, fileList }): void {
    const status = file.status;
    if (status === 'uploading') {
      this.importing = true
    }
    if (status === 'done') {
      const result = file.response
      this.data.filename = file.name
      this.data.sheets = result.worksheets
      this.data.file_id = result.file_id 
      
      this.imported = true
      this.importing = false
      this.ntf.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.ntf.error(`${file.name} file upload failed.`);
      this.importing = false
    }
  }
  
  removeData(){
    delete this.data.filename
    delete this.data.sheets
    delete this.data.file_id
    delete this.data.sheetId
    delete this.data.sheet_id
    delete this.data.row_range
    delete this.data.col_range

    this.imported = false
    this.importing = false
  }
  
  onSheetSelected(e){
    const row_range = this.data.row_range || [0, 0]
    const col_range = this.data.col_range || [0, 0]
    this.data.sheetId = e.sheetId
    this.importing = true
    this.ntf.default('Preparing Dataset')
    this.service.generateSheet(this.data.file_id, this.data.sheetId, col_range[0], col_range[1], row_range[0], row_range[1]).subscribe((generated_sheet:any)=>{
      this.importing = false
      this.data.label = e.sheetName
      this.data.sheet_id = generated_sheet.sheet_id
      this.ntf.success('Dataset ready')

      this.data$.next(this.data)

    }, err=> this.imported = false)
  }

  
  openConfig(): void {
    const row_range = this.data.row_range || [0, 0]
    const col_range = this.data.col_range || [0, 0]

    const modal = this.modal.create({
      nzTitle: 'Dataset Ranges',
      nzContent: DatasetComponent,
      nzComponentParams: {
        colValue: col_range,
        rowValue: row_range
      },
      nzClosable: false,
      nzWrapClassName: 'vertical-center-modal',
      nzWidth: 'xXL',
      nzOnOk: componentInstance => {
        this.onRangeSelected(componentInstance.rowValue, componentInstance.colValue)
      }
    });
  }

  onRangeSelected(row_range, col_range) {
    this.data.row_range = row_range
    this.data.col_range = col_range

    const sheetId = this.data.sheetId
    const sheetName = this.data.label
    if (sheetId) {
      this.onSheetSelected({ sheetId, sheetName })
    }
  }

  paginator$: any;
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  
  data$ = new BehaviorSubject<any>(null);
  size$ = new BehaviorSubject<number>(200);
  gridReady$ = new Subject<string>();

  generateDataSource(gridApi: any, data, size: number) {
    const that = this;
    // this.gridApi = gridApi;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        that.loading$.next(true);
        that.service.getFileData(page, data.sheet_id, size).subscribe((res: any) => {
          that.loading$.next(false);
          if (page <= 1) {
            const headers = res.headers.map((h) => ({field: h, headerName:h, cellRenderer: 'autoTypeRenderer'}));
            that.headers$.next(headers);
          }
          const lastRow = () => res.total;
          const rows = [];
          for (const row of res.data) {
            const rowObject = {};
            let i = 0;
            for (const h of res.headers) {
              rowObject[h] = row[i];
              i++;
            }
            rows.push(rowObject);
          }
          params.successCallback(rows, lastRow());
        }, (error) => {
            params.failCallback();
        });
      }
    });
  }
}

/**
 * 
 * import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationService } from '@app/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { environment } from '@env/environment';
import { NzModalService } from 'ng-zorro-antd';
import * as _ from 'lodash'
import { DatasetComponent } from '@app/shared/dataset/dataset.component';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';

import { GAPIAllFilterParams, GAPIFilterComponenet, GAPIFilters, INDEX_HEADER } from '@app/shared/utils/grid-api.utils';

@Component({
  selector: 'app-manual-import-node',
  templateUrl: './manual-import-node.component.html',
  styleUrls: ['./manual-import-node.component.css']
})
export class ManualImportNodeComponent extends PipelineNodeComponent implements OnInit {

  @Output() update = new EventEmitter<any>()

  @Input() previewGrid = false;
  isDatasetReady = false;
  data
  importing = false
  imported = false


  url = environment.import + '?domainId=' + null;

  paginator$: any;
  size$ = new BehaviorSubject<number>(200);
  gridReady$ = new Subject<string>();
  viewGrid = false;
  noData = true;
  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  providedHeader = null

  style = {
    marginTop: '20px',
    marginBottom: '20px',
    width: '100%',
    height: '225px',
  };

  listOfCols : any[];

  constructor(private ntf: NotificationService, private service: FileImportService, private modal: NzModalService) {
    super()
  }

  ngOnInit() {
    if (this.data.file_id) {
      this.imported = true
    }
  }

  sortByCategory = (a: any, b: any) => a.category.localeCompare(b.category);
  sortByColumn = (a: any, b: any) => a.column.localeCompare(b.column);

  handleChange({ file, fileList }): void {
    const status = file.status;
    if (status === 'uploading') {
      this.importing = true
    }
    if (status === 'done') {
      const result = file.response
      this.data.filename = file.name
      this.data.sheets = result.worksheets
      this.data.file_id = result.file_id

      this.imported = true
      this.importing = false
      this.ntf.success(`${file.name} file uploaded successfully.`);

      this.disptach()
    } else if (status === 'error') {
      this.ntf.error(`${file.name} file upload failed.`);
      this.importing = false
    }
  }

  removeData() {
    delete this.data.filename
    delete this.data.sheets
    delete this.data.file_id
    delete this.data.sheetId
    delete this.data.sheet_id
    delete this.data.headers

    this.imported = false
    this.importing = false

    this.disptach()
  }

  onSheetSelected(sheetData) {
    this.data.sheetId = sheetData.sheetId

    this.importing = true
    const row_range = this.data.row_range || [0, 0]
    const col_range = this.data.col_range || [0, 0]
    const headers = (this.providedHeader)? this.providedHeader.split(";") : null 
    this.service.generateSheet(this.data.file_id, this.data.sheetId, col_range[0], col_range[1], row_range[0], row_range[1], headers).subscribe((generated_sheet: any) => {
      this.service.getFileData(1, generated_sheet.sheet_id, 0).subscribe((data) => {
        // this.data.headers = data.headers
        this.importing = false
        this.data.sheet_id = generated_sheet.sheet_id
        this.ntf.success('Dataset ready');
        this.data.label = sheetData.sheetName;
        this.isDatasetReady = true;
        this.listOfCols = data.categories;
        this.prepareGrid(this.data.sheet_id);
        this.disptach()
      })

    }, err => { this.imported = false })
  }

  prepareGrid(sheet_id) {
    combineLatest([this.gridReady$]).subscribe(([grid]: any) => {
      combineLatest([this.size$])
        .subscribe(([size]: any) => {
          this.onReset()
          this.generateDataSource(grid, sheet_id, size);
        });
    });
  }

  onReset() {
    this.headers$.next(null);
    this.loading$.next(false);
  }

  generateDataSource(gridApi: any, sheet_id: string, size: number) {
    this.noData = false;
    const that = this;
    // this.gridApi = gridApi;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        const filters = GAPIFilters(params.request.filterModel);
        that.loading$.next(true);
        that.service.getFileData(page, sheet_id, size, filters).subscribe((res: any) => {
          that.loading$.next(false);
          if (page <= 1) {
            const previewData = {};
            res.headers.forEach((e, i) => {
              previewData[e] = res.data.slice(1, 10).map((f: any) => f[i]);
            });
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
          const lastRow = () => 5;
          const data = [];
          for (const row of res.data.slice(0, 5)) {
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


}

<div class="button-spacing">
<button nz-button (click)="openConfig()"><i nz-icon nzType="setting"></i>Select Range</button>
<!-- <button nz-button (click)="resetRange()"><i nz-icon nzType="redo"></i>Reset Range</button> -->
</div>
 */