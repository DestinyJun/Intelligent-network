import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionService} from './session.service';

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
  public colorList  = [
    {states: '井盖丢失', colors: 'btn-danger'},
    {states: '水位过高', colors: 'btn-primary'},
    {states: '管道堵塞', colors: 'btn-violet'},
    {states: '井盖传感器异常', colors: 'btn-warning'},
    {states: '水位传感器异常', colors: 'btn-success'}
    ];
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': ['application/x-www-form-urlencoded']});
  constructor(
    private http: HttpClient,
    private session: SessionService,
  ) {
    this.headers = this.headers.append('accessToken', this.session.get('accessToken'));
  }
  public getWellDate(params): Observable<any> {
    // console.log(this.headers.get('accessToken'));
    return this.http.post('http://120.78.137.182:8888//pipe-network/homepage', params, {headers: this.headers});
    // 获取主页面元素
    /*const that = this;
    $.ajax({
      url: 'http://' + this.url + '/pipe-network/homepage',
      type: 'POST',
      async: false,
      cache: false,
      headers: {
        'accessToken': this.token === undefined ? this.session.get('accessToken') : this.token
      },
      contentType: 'application/x-www-form-urlencoded',
      success: function (data) {
        console.log(data);
        that.homepageMsg = data['homepageMsg'];
        that.session.set('regionId', data['homepageMsg'].regionId);
        that.addMarker(data['homepageMsg'].faultRecordManholeCoverInfo);
        that.echartsBMap(that.pointData);
        console.log(that.homepageMsg.cityRegionId);
        that.userRegion = new UserRegion(that.homepageMsg.cityRegionId, that.homepageMsg.provinceRegionId,
          that.homepageMsg.countyRegionId, that.homepageMsg.townRegionId);
        that.session.setUserRegion(that.userRegion);
        console.log(sessionStorage);
      },
      error: function (err) {
        /!*console.log(err);
        console.log('请求出错');*!/
      }
    });*/
  }
}
