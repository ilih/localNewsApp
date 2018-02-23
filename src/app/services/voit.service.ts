import { Injectable } from '@angular/core';
import { environment } from '../../../../GRAPH-DB-general/graphDb-client/src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { VoitStatus } from '../model/voit-status';

@Injectable()
export class VoitService {
  status = true;

  constructor(private http: HttpClient) { }


  getVoitStatus(profile): Observable<VoitStatus | string> {
    return this.http.get<VoitStatus | string>(environment.baseData + '?id=' + profile);
  }

  setVoitStatus(profile) {
    this.http.post<VoitStatus>(environment.baseData, profile);
  }

}
