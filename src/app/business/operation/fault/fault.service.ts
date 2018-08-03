import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionService} from '../../../shared/session.service';
declare let $;
@Injectable()
export class FaultService {

  public token: any = sessionStorage.getItem('token');
  public headers = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
  fault = new Fault();
  sendOut = new SendOut();
  private publicUrl = '120.78.137.182:8888';
  private privateUrl = '192.168.28.65:8080';
  constructor(private http: HttpClient, private session: SessionService) { 
    this.fault.cityRegionId = this.session.getUserRegion().cityRegionId;
    this.fault.countyRegionId = this.session.getUserRegion().countyRegionId;
    this.fault.townRegionId = this.session.getUserRegion().townRegionId;
    this.fault.provinceRegionId = this.session.getUserRegion().provinceRegionId;
  }

  fault1(state, currentPage, pageSize, ) {
    this.fault.state = state;
    this.fault.currentPage = currentPage;
    this.fault.pageSize = pageSize;
    console.log(this.fault);
    const that = this;
    let fault;
    $.ajax({
      url: 'http://'+ this.privateUrl + '/pipe-network/fault1',
      type: 'POST',
      async: false,
      cache: false,
      data: this.fault,
      beforeSend: function(request) {
        request.setRequestHeader('accessToken', that.session.get('accessToken'))
      },
      contentType: 'application/x-www-form-urlencoded',
      success: function(data) {
        console.log(data);
        fault = data['fault'];
      },
      error: function (err) {
        console.log(err);
      }
    });
    return fault;
  }
  sendOut1(manholeId: string) {
    this.sendOut.manholeId = manholeId;
    console.log(this.sendOut);
    const that = this;
    let sendOut;
    $.ajax({
      url: 'http://'+ this.privateUrl + '/pipe-network/sendOut',
      type: 'POST',
      async: false,
      cache: false,
      data: this.sendOut,
      beforeSend: function(request) {
        request.setRequestHeader('accessToken', that.session.get('accessToken'))
      },
      contentType: 'application/x-www-form-urlencoded',
      success: function(data) {
        console.log(data);
        sendOut = data['fault'];
      },
      error: function (err) {
        console.log(err);
      }
    });
    return sendOut;
  }
}
class Fault {
  state: string;
  currentPage: string;
  pageSize: string;
  provinceRegionId: string;
  cityRegionId: string;
  countyRegionId: string;
  townRegionId: string;
}
class SendOut {
  manholeId: string;
  landState = '0';
  workState = '0';
}
