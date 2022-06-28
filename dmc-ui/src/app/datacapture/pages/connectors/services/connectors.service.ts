import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectorsService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(`${environment.admin}connectors/`)
  }

  getOne(id){
    return this.http.get(`${environment.admin}connectors/${id}`)
  }

  save(data){
    return this.http.post(`${environment.admin}connectors/`, data)
  }

  delete(id){
    return this.http.delete(`${environment.admin}connectors/${id}`)
  }

  getAllByType(type){
    return this.http.get(`${environment.admin}connectors/type/${type}`)
  }
}
