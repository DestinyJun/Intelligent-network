import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

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
  constructor(
    private http: HttpClient
  ) { }
  public getWellDate(params): Observable<any> {
    return this.http.post('', params);
  }
}
