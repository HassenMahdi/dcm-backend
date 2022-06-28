import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { take } from 'rxjs/operators';
import { ReferenceUtilsService } from '../../componenets/references/reference-utils.service';
import { ReferenceService } from '../../componenets/references/reference.service';
import { AdminNavigator } from '../../services/admin-navigator.service';

@Component({
  selector: 'app-global-reference-data',
  templateUrl: './global-reference-data.component.html',
  styleUrls: ['./global-reference-data.component.css']
})
export class GlobalReferenceDataComponent implements OnInit {
  activeRefType$ = new BehaviorSubject(null);
  referenceData$: Subject<any> = new Subject();
  loading;
  uploadURI;
  updateURI;
  ref_type_id;

  constructor(private route: ActivatedRoute, private nav: AdminNavigator,
              public utils: ReferenceUtilsService, public service: ReferenceService) {
    this.route.params.subscribe(params => {
      this.ref_type_id = params.id;
      this.laodData();
    });
  }

  ngOnInit(): void {}

  onBack() {
    this.nav.gotToRefTypes();
  }

  laodData() {
    this.referenceData$.next([]);
    this.loading = true;
    forkJoin([this.service.getReferenceDataByType(this.ref_type_id), this.service.getReferenceTypesById(this.ref_type_id)])
    .subscribe(
      ([data, refrence]: any) => {
        this.referenceData$.next(data);
        this.activeRefType$.next(refrence);
        this.updateURI = this.service.ReferenceDataUpdate(refrence);
        this.uploadURI = this.service.ReferenceDataImport(refrence);
        this.loading = false;
     });
  }

  addRefrenceType() {
    this.activeRefType$.pipe(take(1)).subscribe(
      (activeRefType: any) => this.utils.onAddRefData(activeRefType).subscribe(res => this.laodData())
    );
  }

  editRefrenceType(data) {
    this.utils.onEditRefData(data).subscribe(res => this.laodData());
  }

  deleteRefrenceType(data) {
    this.utils.onDeleteRefData(data).subscribe(res => this.laodData());
  }

  handleChange(info: any): void {
    if (info.file.status !== 'uploading') {
      this.loading = true;
    }
    if (info.file.status === 'done') {
      this.laodData();
    } else if (info.file.status === 'error') {
      this.laodData();
    }
  }

  download() {
    this.activeRefType$.pipe(take(1)).subscribe((activeRefType: any) => {
      this.service.downloadReferenceData(activeRefType);
    });
  }

}
