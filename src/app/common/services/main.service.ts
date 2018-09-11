import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionService} from '../../shared/session.service';

@Injectable()
export class MainService {
  public province = [
    '贵州省',
    '云南省',
    '四川省',
  ];
  public city = {
    name: '贵州省',
    children: [
      '贵阳市', '六盘水', '安顺市'
    ]
  };
  public towns = {
    name: '贵阳市',
    children: [
      '南明区', '云岩区', '白云区'
    ]
  };
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': ['application/x-www-form-urlencoded']});
  constructor(
    private http: HttpClient,
    private session: SessionService,
  ) {
    this.headers = this.headers.append('accessToken', this.session.get('accessToken'));
  }
  public getWellDate(params): Observable<any> {
    console.log(this.headers.get('accessToken'));
    return this.http.post('http://120.78.137.182:8888//pipe-network/homepage', params, {headers: this.headers});
  }
}
