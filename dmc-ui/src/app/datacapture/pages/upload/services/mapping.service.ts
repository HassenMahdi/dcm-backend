import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(private http: HttpClient) {
  }

  getTargetFields(domainId: string) {
    return this.http.get( environment.admin + `domain/${domainId}/fields`);
  }

  checkName(domainId: string, name: string) {
    return this.http.get(environment.mapping + `/check?domainId=${domainId}&name=${name}`);
  }

  getPreviouslyMappings(domainId: string) {
    return this.http.get( environment.mapping + `/previous-mappings/${domainId}`);
  }

  getMappingById(domainId: string, SheetId: string, mappingId: string) {
    return this.http.get(environment.mapping + `/apply?file=${SheetId}&domainId=${domainId}&mappingId=${mappingId}`);
  }

  deleteMappingById(mappingId: string) {
    return this.http.delete(environment.mapping + `/apply?mapping_id=${mappingId}`);
  }

  loadAutoMappingById(domainId: string, SheetId: string, transformed?: string) {
     // tslint:disable-next-line: max-line-length
     return this.http.get(environment.mapping + `/load_auto?file=${SheetId}&domainId=${domainId}${transformed ? '&transformed=' + transformed : ''}`);
  }

  updateMapping(targets: any[], mappingId: string, sheetId: string, domainId: string) {
    return this.http.post(environment.mapping + '/', this.getMappingBody(targets, mappingId, sheetId, domainId));
  }

  // tslint:disable-next-line: max-line-length
  postAutomaticMapping(domainId: string, SheetId: string, name: string, mapping: any, parentId: any, description, transformed?: string): Observable<any> {
    const payload = {
      file: SheetId,
      domainId,
      name,
      parentMappingId: parentId,
      transformed,
      description,
      mapping: mapping.map(t => {if (t.value) { return {source: [t.value], target: t.name}; }}).filter((e) => {if (e) { return e; }})
    };
    // tslint:disable-next-line: max-line-length
    return this.http.post(environment.mapping + `/save`, payload);
  }

  checkUsability(mappingId: string): Observable<any> {
    return this.http.get(environment.mapping + `/check-usability/${mappingId}`);
  }

  private getMappingBody(targets: any[], mappingId: string, sheetId: string, domainId: string): any {
    return {
      file: sheetId,
      mapping_id: mappingId,
      domainId,
      mapping: targets.map(t => {if (t.value) { return {source: [t.value], target: t.name}; }}).filter((e) => {if (e) { return e; }})
    };
  }

  
}
