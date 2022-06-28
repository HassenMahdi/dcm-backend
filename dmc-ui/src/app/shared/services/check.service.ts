import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  constructor(private Http: HttpClient) { }

  ApplyModificationAndRerun(result_id, modifications)
  {
    return this.Http.post(environment.cleansing+`/simple/${result_id}/rerun`, {modifications})
  }

  GetCheckMetadata(result_id)
  {
    return this.Http.get(environment.cleansing+"/simple/"+result_id)
  }
}
