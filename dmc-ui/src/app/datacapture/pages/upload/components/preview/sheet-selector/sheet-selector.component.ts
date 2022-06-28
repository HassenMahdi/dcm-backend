import { Component, OnInit, ViewChild, TemplateRef, Input, ElementRef } from '@angular/core';
import { ActionSelectSheet } from '../../../store/actions/preview.actions';
import { selectFileData } from '../../../store/selectors/import.selectors';
import { selectSelectedSheet } from '../../../store/selectors/preview.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { NzModalService } from 'ng-zorro-antd';
import { SheetSelectionConfirmComponent } from './sheet-selection-confirm/sheet-selection-confirm.component';
import { take, map } from 'rxjs/operators';
import { TranformationService } from '../../transformation/services/tranformation.service';
import { combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { AnyAaaaRecord } from 'dns';

@Component({
  selector: 'app-sheet-selector',
  templateUrl: './sheet-selector.component.html',
  styleUrls: ['./sheet-selector.component.css']
})
export class SheetSelectorComponent implements OnInit {
  max$ = new BehaviorSubject(2);
  showDropdown$ = new Subject();
  sheets$: any;
  selectedSheet$: any;

  @Input() type = 'grid';

  constructor(
    private host: ElementRef,
    private store: Store<AppState>,
    private modal: NzModalService,
    private pipe: TranformationService) {
    this.selectedSheet$   = this.store.select(selectSelectedSheet);
    // tslint:disable-next-line: max-line-length
    this.sheets$    = this.store.select(selectFileData).pipe(map((file: any) => (file && file.metaData) ? file.metaData.worksheets : []));
    combineLatest(this.sheets$, this.max$).subscribe(
      ([sheets, max]: any) => {
        this.showDropdown$.next(sheets.length > max);
      }
    );
  }
  ngOnInit(): void {}

  onSheetSelected(index: any): void {
    combineLatest(this.pipe.active$, this.selectedSheet$).pipe(take(1)).subscribe(
      ([activePipe, selectedSheet]) => {
        // IF SAME SHEET RETURN
        // if (selectedSheet === index) { return; }
        // CHECK IF PIPE IS ACTIVE
        if (activePipe) {
          this.openConfirmationModal(index);
        } else {
          this.selectSheet(index);
        }
    });
  }

  openConfirmationModal(index: any) {
    const modal = this.modal.create({
      nzContent: SheetSelectionConfirmComponent,
      nzOnOk: () => this.selectSheet(index)
    });
    modal.afterClose.pipe(take(1)).subscribe((result) => {
      if (result) {
        if (result.keepPipe) {
          this.selectSheet(index);
        } else {
          this.pipe.setActive(null);
          this.pipe.upadatePreviewMode('SOURCE');
          this.selectSheet(index);
        }
      }
    });
  }

  selectSheet(index) {
    this.store.dispatch(new ActionSelectSheet(index));
  }

  onResize(event) {
    const width = event.newWidth;
    let max = 0;
    if (width > 400 ) { max = 3; } else if (width > 300 ) { max = 2; } else if (width > 200 ) { max = 1; }
    this.max$.next(max);
  }
}
