import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(private http: HttpClient) {
  }

  GetAutoMapping(headers, resource)
  {
    const body = {
      "headers": headers,
      "resource": resource
    }

    return this.http.post( environment.mapping + `map_attrs`, body);
  }
}
