import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SessionService} from '../shared/session.service';

@Injectable()
export class LoginService {
  private publicUrl = '120.78.137.182:8888';
  private privateUrl = '192.168.28.65:8080';
  private header = {["Content-Type"]: "application/x-www-form-urlencoded"};
  constructor(
    private http: HttpClient,
    private session: SessionService,
  ) {}

  // 登陆验证
  public submitForm(body): Observable<any> {
    return this.http.post('http://' + this.privateUrl /*+ this.privateUrl*/ + '/pipe-network/login', body,
      {headers: this.header});
  }
}
