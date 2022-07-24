import { PluginService } from './../../../admin/services/plugin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, NotificationService } from '@app/core';
import { ActionImportReset } from '../../store/actions/import.actions';
import { selectUploadingStatus, selectUploadOverview } from '../../store/selectors/upload.selectors';
import { merge, Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { flatMap, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  isCreating = false;
  validateForm!: FormGroup;


  metaData$: Observable<any>;
  uploadStatus$: Observable<string>;
  selectedTags: string[] = [];

  constructor(private router: Router, private store: Store<AppState>,
    private fb: FormBuilder,
    private pluginService: PluginService,
    private notificationService: NotificationService) {
    this.metaData$ = this.store.select(selectUploadOverview);
    this.uploadStatus$ = store.select(selectUploadingStatus);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      pluginName: [null],
      pluginType: ['IMPORT_PLUGIN'],
    });
  }

  cancelUpload(): void {
    this.store.dispatch(new ActionImportReset());
  }

  goToCleansing(): void {
    this.router.navigate(['/datacapture/upload/cleansing']);
  }

  onCreatePlugin() {
    //Serach if the name already exists
    this.isCreating = true
    this.metaData$
      .pipe(
        switchMap((data) => this.buildPlugin(data)),
        switchMap(notPlugin => this.pluginService.save(notPlugin)),
      ).subscribe(
        (res: any) => {
          this.notificationService.success(res.message)
          this.isCreating = false
        },
        (err: any) => {
          this.notificationService.error(err.message)
          this.isCreating = false
        },
      )

  }

  buildPlugin(data) {
    let plugin: any = {
      name: this.validateForm.value.pluginName,
      type: this.validateForm.value.pluginType,
      domain_id: data.domainId,
      mapping_id: data.mappingId,
      pipe_id: data.pipeId,
      file_id: data.fileId,
      sheet_id: data.sheetId
    }
    return of(plugin)
  }

}
