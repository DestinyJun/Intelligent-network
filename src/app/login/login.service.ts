import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SessionService} from '../shared/session.service';
import {Url} from '../url';

@Injectable()
export class LoginService {

  url = new Url().getUrl();
  private header = {["Content-Type"]: "application/x-www-form-urlencoded"};
  constructor(
    private http: HttpClient,
    private session: SessionService,
  ) {}

  // 登陆验证
  public submitForm(body): Observable<any> {
    return this.http.post('http://' + this.url + '/pipe-network/login', body,
      {headers: this.header});
  }
}
