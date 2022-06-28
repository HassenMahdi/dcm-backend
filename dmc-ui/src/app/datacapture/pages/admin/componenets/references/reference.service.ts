import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {
  references = [];
  referenceType = [];
  constructor(private http: HttpClient) { }

  ReferenceDataImport(activeRefType: any): any {
    return `${environment.admin}reference/type/${activeRefType.id}/import`;
  }

  ReferenceDataUpdate(activeRefType: any): any {
    return `${environment.admin}reference/type/${activeRefType.id}/update`;
  }

  downloadReferenceData(activeRefType: any): any {
    return this.http.post(`${environment.admin}reference/type/${activeRefType.id}/download`, {}, { responseType: 'blob' })
      .subscribe((res: any) => {this.saveFile(res, activeRefType.label, 'xlsx'); });
  }

  saveFile = (blobContent: Blob, fileName: string, type: string) => {
    const blob = new Blob([blobContent], { type: 'application/vnd.ms-excel' });
    const file = new File([blob], fileName + '.' + type, { type: 'application/vnd.ms-excel' });
    saveAs(file);
  }

  getReferenceTypesByCollection(collectionId) {
    return this.http.get(`${environment.admin}reference/type${collectionId ? `?domain_id=${collectionId}` : ''}`);
  }

  getReferenceTypesById(refTypeId) {
    return this.http.get(`${environment.admin}reference/type/${refTypeId}`);
  }

  saveReferenceType(refType) {
    return this.http.post(`${environment.admin}reference/type`, refType);
  }

  getReferenceDataByType(referenceTypeId) {
    return this.http.get(`${environment.admin}reference/type/${referenceTypeId}/data`);
  }

  saveReferenceData(refData) {
    return this.http.post(`${environment.admin}reference/type/${refData.ref_type_id}/data`, refData);
  }

  deleteReferenceData(refData) {
    return this.http.delete(`${environment.admin}reference/data/${refData.id}`);
  }

  deleteReferenceType(refType) {
    return this.http.delete(`${environment.admin}reference/type/${refType.id}`);
  }

  getSimple(collectionId) {
    return this.getReferenceTypesByCollection(collectionId).pipe(
      map((list: any[]) => list.map(e => ({value: e.id, label: e.label})))
    );
  }

  shareReferenceType(refTypeId: any, defaultCheckedKeys: any[]) {
    return this.http.post(`${environment.admin}reference/type/${refTypeId}/share`, {domain_ids: defaultCheckedKeys});
  }
}
