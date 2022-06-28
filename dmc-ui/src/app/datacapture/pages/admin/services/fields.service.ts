import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TargetFieldsService {

  url = environment.admin;

  constructor(private http: HttpClient) { }

  get(domain_id) {
    return this.http.get( this.url + `domain/${domain_id}/fields`);
  }

  getSimple(domain_id) {
    return this.http.get( this.url + `domain/${domain_id}/fields/simple`);
  }

  save(domain_id, target_field) {
    return this.http.post( this.url + `domain/${domain_id}/fields`, target_field);
  }

  delete(domain_id, target_field) {
    return this.http.request('DELETE', this.url + `domain/${domain_id}/fields`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
        body: target_field
    })
  }

  fileUploadUrl(domain_id) {
    return this.url + `domain/${domain_id}/fields/file`;
  }

}
