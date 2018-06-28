import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GlobalService} from '../../shared/global.service';
declare let $;
@Injectable()
export class HttpServiceService {
  public Token: any = sessionStorage.getItem('token');
  public headers = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  public fault1(obj: object) {
    let fault;
    $.ajax({
      url: 'http://120.78.137.182:8888/pipe-network/fault1',
      type: 'POST',
      async: false,
      cache: false,
      data: this.parameterSerializationForm(obj),
      headers: {
        'accessToken': this.globalService.get('accessToken')
      },
      contentType: 'application/x-www-form-urlencoded',
      success: function(data) {
        fault = data['fault'];
      },
      error: function (err) {
        console.log(err);
      }
    });
    return fault;
  }
  public sendOut() {
    let WorkUser;
    $.ajax({
      url: 'http://120.78.137.182:8888/pipe-network/sendOut',
      type: 'POST',
      async: false,
      cache: false,
      headers: {
        'accessToken': this.globalService.get('accessToken')
      },
      contentType: 'application/x-www-form-urlencoded',
      success: function(data) {
        WorkUser = data['WorkUser'];
      },
      error: function (err) {
        console.log(err);
      }
    });
    return WorkUser;
  }
  // 表单参数序列化
  private parameterSerializationForm(obj: object): string {
    let result: string;
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (!result) {
          result = prop + '=' + obj[prop];
        } else {
          result += '&' + prop + '=' + obj[prop];
        }
      }
    }
    return result;
  }
}
