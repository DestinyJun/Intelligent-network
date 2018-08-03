import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionService} from '../../shared/session.service';
declare let $;
@Injectable()
export class HttpServiceService {
  public Token: any = sessionStorage.getItem('token');
  public headers = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};

  private publicUrl = '120.78.137.182:8888';
  private privateUrl = '192.168.28.65:8080';
  constructor(private http: HttpClient, private session: SessionService) { }

  public fault1(obj: object) {
    const that = this;
    console.log(obj);
    let fault;
    $.ajax({
      url: 'http://'+ this.publicUrl + '/pipe-network/fault1',
      type: 'POST',
      async: false,
      cache: false,
      data: obj,
      beforeSend: function(request) {
        request.setRequestHeader('accessToken', that.session.get('accessToken'))
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
      url: 'http://192.168.28.65:8080/pipe-network/sendOut',
      type: 'POST',
      async: false,
      cache: false,
      headers: {
        'accessToken': this.session.get('accessToken')
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
}
