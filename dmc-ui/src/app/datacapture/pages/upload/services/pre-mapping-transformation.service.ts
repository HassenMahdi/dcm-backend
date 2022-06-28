import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreMappingTransformationService {

  url = environment.transform

  constructor(private http: HttpClient) {
  }

  startJob(fileid: string,  sheetid: string, pipeid: string): Observable<any> {
    return this.http.get( `${this.url}${fileid}/${sheetid}/${pipeid}`);
  }

  getResult(fileid: any, page: any, nrows=10, filter:any[]=[], sort:any=null) {
    // return this.http.get( `${this.url}preview/removeit?page=${page}&nrows=${nrows}&filename=${fileid.replace(/\//g,'\\\\')}`);
    const body = {
      filter,
      sort,
      filename:fileid
    }
    return this.http.post( `${this.url}preview?page=${page}&nrows=${nrows}`, body);
  }
}
