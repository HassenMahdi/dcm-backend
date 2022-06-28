import { Component, OnInit } from '@angular/core';
import { NotificationService, AppState } from '@app/core';
import { UploadChangeParam } from 'ng-zorro-antd/upload';
import { Store } from '@ngrx/store';
import { ActionUploadFile, ActionImportReset, ActionSaveFile, ActionSelectDomain } from '../../store/actions/import.actions';
import { Observable } from 'rxjs';
import { Import } from '../../store/models/import.model';
import { selectImport } from '../../store/upload.selectors';
import { Router } from '@angular/router';
import { FileImportService } from '../../services/file-import.service';
import * as urls from '@env/environment';
import { selectDomain, selectFileData } from '../../store/selectors/import.selectors';
import { ActionSelectSheet } from '../../store/actions/preview.actions';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  url: string;
  domains: any[];
  selectedDomain: any;
  fileData: any;
  keys = Object.keys;
  // Store
  importState$: Observable<Import>;
  selectedDomain$: Observable<any>;
  fileData$: Observable<any>;
  constructor(private notification: NotificationService,
              private store: Store<AppState>,
              private router: Router,
              private service: FileImportService) {
    this.importState$ = this.store.select(selectImport);
    this.selectedDomain$ = this.store.select(selectDomain);
    this.fileData$ = this.store.select(selectFileData);
    this.fileData$.subscribe((fileData) => {
      this.fileData = fileData;
    })
    this.selectedDomain$.subscribe((domain: any) => {
      this.selectedDomain = domain;
      if (domain) {
        this.url = urls.environment.import + '?domainId=' + domain.id;
      }
    });
    this.domains = [];
  }

  ngOnInit() {
    this.service.getAllSuper().subscribe((domains: any) => {
      this.domains = domains.resultat;
    });
  }

  selectDomain(event: string, name: string, superDomain: string): void {
    this.store.dispatch(new ActionSelectDomain({id: event, name}, superDomain));
  }

  handleChange({ file, fileList }: UploadChangeParam): void {
    const status = file.status;
    if (status === 'uploading') {
      this.store.dispatch(new ActionUploadFile({file: null, importing: true, imported: false, error: false, progress: file.percent}));
    }
    if (status === 'done') {
      const uploadedFile: any = {
        token: file.name,
        sheets: [],
        numberOfRows: [],
        extension: file.name.split('.')[1],
        data: [],
        headers: [],
        file: [file]
      };
      this.store.dispatch(new ActionUploadFile({file: uploadedFile, importing: false, imported: true, error: false, progress: 100}));
      // tslint:disable-next-line: max-line-length
      this.store.dispatch(new ActionSaveFile({metaData: file.response, sheets: Object.keys(file.response.worksheets), data: [], headers: []}));
      // this.store.dispatch(new ActionSelectSheet(0));
      this.notification.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.store.dispatch(new ActionUploadFile({file: null, importing: false, imported: false, error: true, progress: null}));
      this.notification.error(`${file.name} file upload failed.`);
    }
  }

  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToPreview(): void {
    if ( !this.selectedDomain ) {
      this.notification.warn('Please select a domain.');
      return;
    }
    if ( !this.fileData.metaData ) {
      this.notification.warn('Please import your file.');
      return;
    }
    this.router.navigate(['/datacapture/upload/transform']);
  }
}
