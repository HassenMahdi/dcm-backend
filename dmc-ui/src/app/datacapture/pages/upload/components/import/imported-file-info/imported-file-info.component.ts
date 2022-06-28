import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { withValue } from '@app/shared/utils/rxjs.utils';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FileImportService } from '../../../services/file-import.service';
import { ActionSelectColRange, ActionSelectRowRange } from '../../../store/actions/import.actions';
import { ActionSelectSheet } from '../../../store/actions/preview.actions';
import { selectColRange, selectFileData, selectRowRange } from '../../../store/selectors/import.selectors';
import { selectSelectedSheet, selectTotal, selectUpdatedSheet } from '../../../store/selectors/preview.selectors';
import { DatasetComponent } from '../dataset/dataset.component';

@Component({
  selector: 'app-imported-file-info',
  templateUrl: './imported-file-info.component.html',
  styleUrls: ['./imported-file-info.component.css']
})

export class ImportedFileInfoComponent implements OnInit {
  selectedSheet = null;
  generatedSheetId = null;
  columns$ = new BehaviorSubject(null);
  // START INDEX 1
  colValue = [0, 0];
  rowValue = [0, 0];
  total = 0;
  descriptions = {};
  // Store
  fileData$: Observable<any>;
  metadata$: Observable<any>;
  sheet$: Observable<any>;
  headers$: Observable<any>;
  total$: Observable<any>;
  rowRange$: Observable<any>;
  colRange$: Observable<any>;

  constructor(private store: Store<AppState>, private service: FileImportService, private modalService: NzModalService) { }

  ngOnInit() {
    this.total$ = this.store.select(selectTotal);
    this.sheet$ = this.store.select(selectSelectedSheet);
    this.fileData$ = this.store.select(selectFileData);
    this.rowRange$ = this.store.select(selectRowRange);
    this.colRange$ = this.store.select(selectColRange);
    this.metadata$ = this.fileData$.pipe(map((data: any) => data.metaData));
    this.headers$ = this.fileData$.pipe(map((data: any) => data.headers));
    this.rowRange$.subscribe((rR) => {this.rowValue = [...rR]; });
    this.colRange$.subscribe((cR) => {this.colValue = [...cR]; });
  }

  rowRangeChanged(): void {
    this.store.dispatch(new ActionSelectRowRange(this.rowValue));
  }

  colRangeChanged(): void {
    this.store.dispatch(new ActionSelectColRange(this.colValue));
  }

  openConfig(): void {
    const modal = this.modalService.create({
      nzTitle: 'Dataset Ranges',
      nzContent: DatasetComponent,
      nzClosable: false,
      nzWrapClassName: 'vertical-center-modal',
      nzWidth: 'xXL',
      nzOnOk: componentInstance => {
        this.selectRange(componentInstance.rowValue, componentInstance.colValue);
      }
    });
  }

  resetRange() {
    this.selectRange([0, 0], [0, 0]);
  }

  selectRange(rows, cols) {
    this.store.dispatch(new ActionSelectRowRange(rows));
    this.store.dispatch(new ActionSelectColRange(cols));
    this.sheet$.pipe(take(1)).subscribe((sheet: any) => {
      this.store.dispatch(new ActionSelectSheet(sheet));
    });
  }

  onColumnChange(column, isActive) {
    if (isActive) {
      this.descriptions[column] = null;
      withValue(this.store.select(selectUpdatedSheet), (sheetId) => {
        this.service.describeColumn(sheetId, column).subscribe(description => {
          this.descriptions[column] = [];
          // tslint:disable-next-line: forin
          for (const key in description) {
            this.descriptions[column].push({label: key, value: description[key]});
          }
        });
      });
    }
  }
}
