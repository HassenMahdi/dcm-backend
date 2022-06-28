import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { AppState, selectProfile } from '@app/core';
import { Store } from '@ngrx/store';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CleansingService {
  profile: any;
  profile$: Observable<any>;
  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.profile$ = this.store.select(selectProfile);
    this.profile$.subscribe((prof) => {this.profile = prof; });
  }

  startJob(filename: string,  worksheetId: string, domainId: string, isTransformed: boolean, mappingId: string): Observable<any> {
    const payload = {
      job_id: null,
      file_id: filename,
      worksheet_id: worksheetId,
      mapping_id: mappingId,
      domain_id: domainId,
      is_transformed: isTransformed,
      modifications: {}
    };
    return this.http.post(environment.cleansing, payload);
  }

  getJobMetaData(jobId: string): Observable<any> {
    return this.http.get(environment.cleansing + `/metadata/${jobId}`);
  }

  getAuditTrial(worksheetId: string, domain_id: string): Observable<any> {
    return this.http.post(environment.cleansing + `/audit-trial`, {worksheet_id: worksheetId, domain_id: domain_id});
  }

  // tslint:disable-next-line: max-line-length
  getJobData(filename: string, domain_id: string, worksheet: string, page: number, nrows: number, filter: any[], sort: any, isTransformed: boolean, errorLevel: string ='all'): Observable<any> {
    const errors_filter:any = {}
    if(errorLevel!='all') errors_filter.level=errorLevel
    const payload = {
      file_id: filename,
      worksheet_id: worksheet,
      domain_id: domain_id,
      is_transformed: isTransformed,
      filter,
      errors_filter,
      sort
    };
    // tslint:disable-next-line: max-line-length
    return this.http.post(environment.cleansing + `/data?page=${page+1}&nrows=${nrows}`, payload);
  }

  // tslint:disable-next-line: max-line-length
  editCell(filename: string,  worksheetId: string, domainId: string, modifications: any, isTransformed: boolean, mappingId: string, jobId: string): Observable<any> {
    const payload = {
      job_id: jobId,
      file_id: filename,
      worksheet_id: worksheetId,
      mapping_id: mappingId,
      domain_id: domainId,
      is_transformed: isTransformed,
      user_id: this.profile.id,
      modifications
    };
    return this.http.post(environment.cleansing, payload);
  }
}
