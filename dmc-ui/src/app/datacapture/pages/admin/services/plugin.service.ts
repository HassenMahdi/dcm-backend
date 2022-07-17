import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class PluginService {

  url = environment.admin;

  constructor(private http: HttpClient) { }


  getAll(domainId: string) {
    return this.http.get(`${this.url}plugins/${domainId}`)
  }

  save(plugin) {
    console.log('PS:', plugin);
    return this.http.post(this.url + "plugins/", plugin)
  }

}
