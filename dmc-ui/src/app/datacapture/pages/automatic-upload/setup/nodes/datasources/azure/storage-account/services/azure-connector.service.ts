import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AzureConnectorService {

  constructor(private http: HttpClient) { }

  getContainers(conn_string){
    return this.http.post(environment.import+'connectors/azure/containers', {conn_string})
  }

  getBlobs(conn_string,container){
    return this.http.post(environment.import+'connectors/azure/blobs', {conn_string, container})
  }
}
