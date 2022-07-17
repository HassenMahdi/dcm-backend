import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { selectFileData, selectDomain } from '../store/selectors/import.selectors';
import { Injectable } from '@angular/core';
import { selectUpdatedSheet } from './../store/selectors/preview.selectors';
import { selectMandatories, selectMappingId, selectMappingValid } from './../store/selectors/mapping.selectors';
import { selectCleansingErrors } from '../store/selectors/cleansing.selectors';
import { selectUploadingStatus } from '../store/selectors/upload.selectors';

@Injectable()
export class UploadGuard implements CanActivate {
  fileData: any;
  selectedDomain: string;
  mappingId: string;
  selectedSheet: string;
  mandatories: number;
  errors: number;
  mappingValid: boolean;
  uploadStatus: string;
  // Store
  fileData$: Observable<any>;
  errors$: Observable<any>;
  mappingId$: Observable<any>;
  selectedDomain$: Observable<any>;
  selectedSheet$: Observable<string>;
  mandatories$: Observable<number>;
  mappingValid$: Observable<boolean>;
  uploadStatus$: Observable<string>;
  constructor(private store: Store<AppState>) {
    this.fileData$ = this.store.select(selectFileData);
    this.errors$ = this.store.select(selectCleansingErrors);
    this.mappingValid$  = this.store.select(selectMappingValid);
    this.uploadStatus$ = store.select(selectUploadingStatus);
    this.mappingId$ = this.store.select(selectMappingId);
    this.selectedDomain$ = this.store.select(selectDomain);
    this.selectedSheet$ = this.store.select(selectUpdatedSheet);
    this.mandatories$ = this.store.select(selectMandatories);
    this.errors$.subscribe((errors) => {this.errors = errors; });
    this.fileData$.subscribe((res) => {this.fileData = res; });
    this.mappingId$.subscribe((mappingId) => { this.mappingId = mappingId; });
    this.mandatories$.subscribe((mandatories) => { this.mandatories = mandatories; });
    this.uploadStatus$.subscribe((uploadStatus) => {this.uploadStatus = uploadStatus; });
    this.mappingValid$.subscribe((mappingValid) => { this.mappingValid = mappingValid; });
    this.selectedSheet$.subscribe((sheet) => { this.selectedSheet = sheet; });
    this.selectedDomain$.subscribe((domain) => { if (domain) { this.selectedDomain = domain.id; } });
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    switch (next.data.route) {
      case 'IMPORT': {
        return ['READY'].includes(this.uploadStatus);
      }
      case 'TRANSFORM': {
        if (this.fileData.metaData && this.selectedDomain && ['READY'].includes(this.uploadStatus)) {
            return true;
        } else {
            return false;
        }
      }
      case 'MAPPING': {
        if (this.fileData.metaData && this.selectedDomain && this.selectedSheet != null &&
            ['READY'].includes(this.uploadStatus)) {
            return true;
        } else {
            return false;
        }
      }
      case 'CLEANSING': {
        if (this.fileData.metaData && this.selectedDomain && this.mandatories === 0 &&
            this.mappingId && this.mappingValid && ['READY'].includes(this.uploadStatus)) {
            return true;
        } else {
            return false;
        }
      }
      case 'UPLOAD': {
        return true
        if (this.fileData.metaData && this.selectedDomain && this.mandatories === 0 && this.errors === 0) {
            return true;
        } else {
            return false;
        }
      }
      default:
                return true;
    }
  }
}
