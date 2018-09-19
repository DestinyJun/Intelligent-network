import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionService} from './session.service';
import {UrlModul} from '../model/url.modul';
declare let $;
@Injectable()
export class FaultService {

  public token: any = sessionStorage.getItem('token');
  public headers = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
  fault = new Fault();
  sendOut = new SendOut();
  sendInstruction = new SendInstruction();
  url = new UrlModul().getUrl();
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
    this.fault.provinceRegionId = '5';
    console.log(this.fault);
    const that = this;
    let fault;
    $.ajax({
      url: 'http://'+ this.url + '/pipe-network/fault1',
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
  history(state, currentPage, pageSize, ) {
    this.fault.state = state;
    this.fault.currentPage = currentPage;
    this.fault.pageSize = pageSize;
    this.fault.provinceRegionId = '5';
    console.log(this.fault);
    const that = this;
    let fault;
    $.ajax({
      url: 'http://'+ this.url + '/pipe-network/historyManhole',
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
      url: 'http://'+ this.url + '/pipe-network/sendOut',
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
        sendOut = data['WorkUser'];
      },
      error: function (err) {
        console.log(err);
      }
    });
    return sendOut;
  }
  sendInstruction1(username: string) {
    this.sendInstruction.manholeId = this.sendOut.manholeId;
    this.sendInstruction.username = username;
    console.log(this.sendInstruction);
    const that = this;
    let sendInstruction;
    $.ajax({
      url: 'http://'+ this.url + '/pipe-network/sendInstruction',
      type: 'POST',
      async: false,
      cache: false,
      data: this.sendInstruction,
      beforeSend: function(request) {
        request.setRequestHeader('accessToken', that.session.get('accessToken'))
      },
      contentType: 'application/x-www-form-urlencoded',
      success: function(data) {
        console.log(data);
        sendInstruction = data;
      },
      error: function (err) {
        console.log(err);
      }
    });
    return sendInstruction;
  }
}
class Fault {
  state: string;
  currentPage: string;
  pageSize: string;
  provinceRegionId = '5';
  cityRegionId: string;
  countyRegionId: string;
  townRegionId: string;
}
class SendOut {
  manholeId: string;
  landState = '0';
  workState = '0';
}
class SendInstruction {
  username: string;
  manholeId: string;
}
