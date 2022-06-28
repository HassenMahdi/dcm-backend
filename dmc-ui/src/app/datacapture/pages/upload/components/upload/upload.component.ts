import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { ActionImportReset } from '../../store/actions/import.actions';
import { selectUploadingStatus, selectUploadOverview } from '../../store/selectors/upload.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  metaData$: Observable<any>;
  uploadStatus$: Observable<string>;
  selectedTags: string[] = [];
  constructor(private router: Router, private store: Store<AppState>) {
    this.metaData$ = this.store.select(selectUploadOverview);
    this.uploadStatus$ = store.select(selectUploadingStatus);
  }

  ngOnInit() {
  }

  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToCleansing(): void {
    this.router.navigate(['/datacapture/upload/cleansing']);
  }
}
