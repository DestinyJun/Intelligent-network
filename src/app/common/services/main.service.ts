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
  // 井异常状态码枚举
  public manholeState = {
    decade: ['井盖状态：正常', '井盖状态：井盖移位', '井盖状态：传感器损坏 '], // 井盖
    individual: ['水位：低于30%', '水位：大于0.3，低于0.6', '水位：大于0.6，低于0.8%', // 井的水位
      '水位：大于0.8，低于等于1', '水位：等于0'
    ]
  };
  // 管道异常状态码枚举
  public pipeState = {
    decade: ['水位：正常(水位低于30%)', '水位：大于0.3，低于0.6', '水位：大于0.6，低于0.8%',
    '水位：大于0.8，低于等于1%', '水位：等于0'
    ],
    individual: ['管道状态：正常', '管道状态：堵塞', '管道状态：渗透过高', '管道状态：传感器异常']
  };
  // 维修状态码枚举
  public repairState = ['未处理', '指派中', '处理中', '处理完成'];
  // 井盖颜色
  public colorList  = [];
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': ['application/x-www-form-urlencoded']});
  constructor(
    private http: HttpClient,
    private session: SessionService,
  ) {
    this.headers = this.headers.append('accessToken', this.session.get('accessToken'));
  }
  public getWellDate(params): Observable<any> {
    // console.log(this.headers.get('accessToken'));
    return this.http.post('http://123.249.28.108:8082/pipe-network/homepage', params, {headers: this.headers});
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
