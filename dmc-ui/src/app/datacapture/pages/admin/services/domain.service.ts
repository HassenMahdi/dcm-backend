import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  url = environment.admin

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get( this.url + "domain/")
  }

  getAllBySuperId(super_id){
    return this.http.get( this.url + "domain/super/" + super_id)
  }

  saveDomain(domain){
    return this.http.post( this.url + "domain/", domain)
  }

  duplicateDomain(domain){
    return this.http.put( this.url + "domain/", domain)
  }

  deleteDomain(domain){
    return this.http.request('DELETE', this.url + "domain/", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
        body: domain
    })
  }

  getById(domain_id){
    return this.http.get( this.url +  `domain/${domain_id}`)
  }

  getInfoById(domain_id){
    return this.http.get( this.url +  `domain/${domain_id}/info`)
  }

  getTargetFields(domain_id){
    return this.http.get( this.url + `domain/${domain_id}/fields`)
  }

  saveTargetField(domain_id, target_field){
    return this.http.post( this.url + `domain/${domain_id}/fields`, target_field)
  }

  getDomainChecks(domain_id){
    return this.http.get( this.url + `domain/${domain_id}/checks`)
  }

  getAllSuper(){
    return this.http.get( this.url + "domain/super")
  }

  saveSuperDomain(domain){
    return this.http.post( this.url + "domain/super/", domain)
  }
}
