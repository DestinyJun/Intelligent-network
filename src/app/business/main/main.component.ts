import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgxEchartsService} from 'ngx-echarts';
import {animation} from './right-sider-animation';
import {FaultRecordManholeCover, HomepageMsg} from './jinggailei';
import {SessionService, UserRegion} from '../../shared/session.service';
import {Url} from '../../url';
import {MainService} from '../../common/services/main.service';

declare let $, BMap;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [animation]
})
export class MainComponent implements OnInit {

  @Input() public mobile = true;
  @Input() public token: string;
  public url = new Url().getUrl();
  public homepageMsg: HomepageMsg;
  public faultRecordManholeCover = Array<FaultRecordManholeCover>(); // 井部分信息数组
  public pointData: Array<PointData>; // GPS数组
  // 省市联动
  public selectDate = '贵州省';
  public flag: string;
  public provinceDate: string;
  public citeDate: string;
  public townsDate: string;
  public province: any;
  public city: any;
  public towns: any;
  public provinceShow = false;
  public cityShow = false;
  public townsShow = false;

  public onlist = 'off';
  public userRegion: UserRegion;
  public color = ['rgba(249, 82, 63, .8)', 'rgba(15, 147, 255, .8)', 'rgba(148, 0, 211, .8)', 'rgba(124, 252, 0, .8)'];
  public index: number;

  constructor(
    public http: HttpClient,
    private es: NgxEchartsService,
    private session: SessionService,
    private mainService: MainService
  ) {
    // this.faultRecordManholeCover = [];
    this.pointData = [];

  }

  ngOnInit() {
    this.getData();
    // 全屏点击事件
    window.document.addEventListener('click', (e) => {
      this.flag = e.srcElement.parentElement.className;
      if ((this.provinceShow || this.cityShow || this.townsShow) && !(this.flag === 'location')) {
        this.provinceShow = false;
        this.cityShow = false;
      }
    });
    // let headers = new HttpHeaders({['Content-Type']: 'application/x-www-form-urlencoded'});
    // headers = headers.append('accessToken', this.session.get('accessToken'));
    // console.log(headers);
    // this.http.post('http://' + this.url + '/pipe-network/homepage', '', {
    //   headers: headers
    // }).subscribe(data => {
    //   console.log(data);
    // })
  }

  public addMarker(fMC: Array<FaultRecordManholeCover>): any {
    // 标注点,由于该死的后端弄得数据不容易处理,(initialManhole, flowOutManhole)两个类分开遍历
    for (let i = 0; i < fMC.length; i++) {
      if (fMC[i].flag === 0) {
        const gpsId = fMC[i].initialManhole.gpsId;
        let lng = '', lat = '', j;
        for (j = 0; gpsId[j] !== ','; j++) { // 拿出纬度
          lng = lng + gpsId[j];
        }
        for (j = j + 1; j < gpsId.length; j++) { // 拿出经度
          lat = lat + gpsId[j];
        }
        this.pointData.push({name: fMC[i].initialManhole.gpsPosition, value: [lng, lat, '2']});
      } else {
        const gpsId = fMC[i].flowOutManhole.gpsId; // 拿出flowOutManhole里的gpsId
        let lng = '', lat = '', j;
        for (j = 0; gpsId[j] !== ','; j++) {
          lng = lng + gpsId[j];
        }
        for (j = j + 1; j < gpsId.length; j++) {
          lat = lat + gpsId[j];
        }
        this.pointData.push({name: fMC[i].flowOutManhole.gpsPosition, value: [lng, lat, '2']});
      }

    }
    return  this.pointData;
  }

  public getData(): void {
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
    this.mainService.getWellDate({}).subscribe(
      (data) => {
        this.homepageMsg = data['homepageMsg'];
        this.session.set('regionId', data['homepageMsg'].cityRegionId);
        console.log(data['homepageMsg'].faultRecordManholeCoverInfo);
        this.echartsBMap(this.addMarker(data['homepageMsg'].faultRecordManholeCoverInfo));
        this.userRegion = new UserRegion(this.homepageMsg.cityRegionId, this.homepageMsg.provinceRegionId,
          this.homepageMsg.countyRegionId, this.homepageMsg.townRegionId);
        this.session.setUserRegion(this.userRegion);
      }
    );
  }

  public toggleOnlist(): void {
    this.onlist = this.onlist === 'off' ? 'open' : 'off';
  }

  public echartsBMap(pointData: Array<PointData>): void {
    const that = this;
    const myChart = this.es.init(document.getElementById('myMap'));
    myChart.setOption(
      {
        bmap: {
          center: [106.656504, 26.681777],
          zoom: 15,
          roam: true,
          mapStyle: {
            'styleJson': [
              {
                'featureType': 'water',
                'elementType': 'all',
                'stylers': {
                  'color': '#031628'
                }
              },
              {
                'featureType': 'land',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#000102'
                }
              },
              {
                'featureType': 'highway',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'arterial',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'arterial',
                'elementType': 'geometry.stroke',
                'stylers': {
                  'color': '#0b3d51'
                }
              },
              {
                'featureType': 'local',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'railway',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'railway',
                'elementType': 'geometry.stroke',
                'stylers': {
                  'color': '#08304b'
                }
              },
              {
                'featureType': 'subway',
                'elementType': 'geometry',
                'stylers': {
                  'lightness': -70
                }
              },
              {
                'featureType': 'building',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'all',
                'elementType': 'labels.text.fill',
                'stylers': {
                  'color': '#857f7f'
                }
              },
              {
                'featureType': 'all',
                'elementType': 'labels.text.stroke',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'building',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#022338'
                }
              },
              {
                'featureType': 'green',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#062032'
                }
              },
              {
                'featureType': 'boundary',
                'elementType': 'all',
                'stylers': {
                  'color': '#465b6c'
                }
              },
              {
                'featureType': 'manmade',
                'elementType': 'all',
                'stylers': {
                  'color': '#022338'
                }
              },
              {
                'featureType': 'label',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }
            ]
          },
        },
        series: [
          {
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: pointData,
            symbolSize: 13,
            legendHoverLink: 'true',
            label: {
              normal: {
                color: 'white',
                formatter: '{b}',
                position: 'right',
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  return that.color[Number(params.value[2])];
                }
              }
            }
          }
        ]
      }
    );
    const bmap = myChart.getModel().getComponent('bmap').getBMap();
    // 添加切换地图、卫星、三维切换控件
    bmap.addControl(new BMap.MapTypeControl());
    // 添加定位控件
    bmap.addControl(new BMap.GeolocationControl());
    // 设置地图最小缩放级别
    bmap.setMinZoom(1);
    // 设置地图最大缩放级别
    bmap.setMaxZoom(19);
    window.addEventListener('resize', function() {
      myChart.resize();
    });
   /* this.options = {
      backgroundColor: '#404a59',
      title: {
        text: '井盖异常位置图',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      bmap: {
        show: false,
        center: [106.631929, 26.687097],
        zoom: 18,
        label: {
          show: false,
        },
        roam: 'move',
        scaleLimit: {
          min: 15,
          max: 19
        },
        mapStyle: {
          'styleJson': [
            {
              'featureType': 'water',
              'elementType': 'all',
              'stylers': {
                'color': '#031628'
              }
            },
            {
              'featureType': 'land',
              'elementType': 'geometry',
              'stylers': {
                'color': '#000102'
              }
            },
            {
              'featureType': 'highway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            },
            {
              'featureType': 'arterial',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#000000'
              }
            },
            {
              'featureType': 'arterial',
              'elementType': 'geometry.stroke',
              'stylers': {
                'color': '#0b3d51'
              }
            },
            {
              'featureType': 'local',
              'elementType': 'geometry',
              'stylers': {
                'color': '#000000'
              }
            },
            {
              'featureType': 'railway',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#000000'
              }
            },
            {
              'featureType': 'railway',
              'elementType': 'geometry.stroke',
              'stylers': {
                'color': '#08304b'
              }
            },
            {
              'featureType': 'subway',
              'elementType': 'geometry',
              'stylers': {
                'lightness': -70
              }
            },
            {
              'featureType': 'building',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#000000'
              }
            },
            {
              'featureType': 'all',
              'elementType': 'labels.text.fill',
              'stylers': {
                'color': '#857f7f'
              }
            },
            {
              'featureType': 'all',
              'elementType': 'labels.text.stroke',
              'stylers': {
                'color': '#000000'
              }
            },
            {
              'featureType': 'building',
              'elementType': 'geometry',
              'stylers': {
                'color': '#022338'
              }
            },
            {
              'featureType': 'green',
              'elementType': 'geometry',
              'stylers': {
                'color': '#062032'
              }
            },
            {
              'featureType': 'boundary',
              'elementType': 'all',
              'stylers': {
                'color': '#465b6c'
              }
            },
            {
              'featureType': 'manmade',
              'elementType': 'all',
              'stylers': {
                'color': '#022338'
              }
            },
            {
              'featureType': 'label',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }
          ]
        }
      },
     series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: pointData,
          symbolSize: 15,
          legendHoverLink: 'true',
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: function (params) {
                return that.color[Number(params.value[2])];
              }
            }
          }
        }
      ]
    };*/
  }
  // 地图初始化事件
  public onChartEvent(e): void {
    const myChart = e;
    const bmap = myChart.getModel().getComponentMap('bmap').getBMap();
    bmap.addControl(new BMap.MapTypeControl());
  /*  console.log(myChart.resize());
    console.log(myChart.getHeight());
    console.log(myChart.getOption());*/
    // console.log(myChart.getMap('bmap'));
  }

  // 中部地图省市联动
  public administrativeClick() {
    this.provinceShow = true;
    this.province = this.mainService.province;
  }
  public provinceMouseEnter(item) {
    this.townsShow = false;
    if (item === '贵州省') {
      this.cityShow = true;
      this.provinceDate = item;
      this.city = this.mainService.city.children;
    } else {
      this.city = ['对不起，' + item + '暂未开通'];
    }
  }
  public provinceDataClick(item) {
    this.provinceShow = false;
    this.cityShow = false;
    this.townsShow = false;
    if (item === '贵州省') {
      this.selectDate = item;
    } else {
      window.confirm(item + '暂未开通');
    }
  }
  public cityMouseEnter(item) {
    if (item === '贵阳市') {
      this.townsShow = true;
      this.citeDate = item;
      this.towns = this.mainService.towns.children;
    } else {
      this.towns = ['对不起，' + item + '暂未开通'];
    }
  }
  public cityDataClick(item) {
    this.provinceShow = false;
    this.cityShow = false;
    this.townsShow = false;
    if (item === '贵阳市') {
      this.selectDate = this.provinceDate + this.citeDate;
    } else {
      window.confirm(item + '暂未开通');
    }
  }
  public townsDataClick(item) {
    this.provinceShow = false;
    this.cityShow = false;
    this.townsShow = false;
    this.selectDate = this.provinceDate + this.citeDate + item;
  }
}


class PointData {
  name: string;
  value: Array<string>;
}
