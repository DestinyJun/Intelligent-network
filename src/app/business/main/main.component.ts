import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgxEchartsService} from 'ngx-echarts';
import {animation} from './right-sider-animation';
import {FaultRecordManholeCover, HomepageMsg} from './jinggailei';
import {SessionService, UserRegion} from '../../shared/session.service';
declare let $, BMap;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [animation]
})
export class MainComponent implements OnInit {

  private publicUrl = '120.78.137.182:8888';
  private privateUrl = '192.168.28.65:8080';
  homepageMsg: HomepageMsg;
  faultRecordManholeCover: Array<FaultRecordManholeCover>; // 井部分信息数组
  pointData: Array<PointData>; // GPS数组
  onlist = 'off';
  userRegion: UserRegion;
  color = ['rgba(249, 82, 63, .8)', 'rgba(15, 147, 255, .8)', 'rgba(148, 0, 211, .8)', 'rgba(124, 252, 0, .8)'];
  index: number;
  public options = {};
  constructor(
    public http: HttpClient,
    private es: NgxEchartsService,
    private session: SessionService) {
    this.faultRecordManholeCover = [];
    this.pointData = [];
  }

  ngOnInit() {
    this.getData();
  }
  addMarker(fMC: Array<FaultRecordManholeCover>) {// 标注点,由于该死的后端弄得数据不容易处理,(initialManhole, flowOutManhole)两个类分开遍历
    for (let i =  0; i < fMC.length; i++) {
      if (fMC[i].flag === '0') {
        const gpsId = fMC[i].initialManhole.gpsId;
        let lng = '', lat = '', j;
        for (j = 0; gpsId[j] !== ','; j++)  { // 拿出纬度
          lng = lng + gpsId[j];
        }
        for (j = j + 1; j < gpsId.length; j++) { // 拿出经度
          lat = lat + gpsId[j];
        }
        this.pointData.push({name: fMC[i].initialManhole.gpsPosition, value: [lng, lat, '2']})
      } else {
        const gpsId = fMC[i].flowOutManhole.gpsId; // 拿出flowOutManhole里的gpsId
        let lng = '', lat = '', j;
        for (j = 0; gpsId[j] !== ','; j++)  {
          lng = lng + gpsId[j];
        }
        for (j = j + 1; j < gpsId.length; j++) {
          lat = lat + gpsId[j];
        }
        this.pointData.push({name: fMC[i].flowOutManhole.gpsPosition, value: [lng, lat, '2']})
      }

    }
    console.log(this.pointData);
  }

  getData(): void { // 获取主页面元素
    const that = this;
    $.ajax({
      url: 'http://' + this.privateUrl /*+ this.privateUrl*/ + '/pipe-network/homepage',
      type: 'POST',
      async: false,
      cache: false,
      headers: {
        'accessToken': this.session.get('accessToken')
      },
      contentType: 'application/x-www-form-urlencoded',
      success: function(data) {
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
        console.log(err);
        console.log('请求出错');
      }
    });
  }
  toggleOnlist() {
    this.onlist = this.onlist === 'off' ? 'open' : 'off';
}
  echartsBMap(pointData: Array<PointData>) {
    const that = this;
    this.options = {
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
        center: [106.631929,26.687097],
        zoom: 8,
        roam: true,
        mapStyle: {
          'styleJson': [
            {
              'featureType': 'land',
              'elementType': 'geometry',
              'stylers': {
                'color': '#212121'
              }
            },
            {
              'featureType': 'building',
              'elementType': 'geometry',
              'stylers': {
                'color': '#2b2b2b'
              }
            },
            {
              'featureType': 'highway',
              'elementType': 'all',
              'stylers': {
                'lightness': -42,
                'saturation': -91
              }
            },
            {
              'featureType': 'arterial',
              'elementType': 'geometry',
              'stylers': {
                'lightness': -77,
                'saturation': -94
              }
            },
            {
              'featureType': 'green',
              'elementType': 'geometry',
              'stylers': {
                'color': '#1b1b1b'
              }
            },
            {
              'featureType': 'water',
              'elementType': 'geometry',
              'stylers': {
                'color': '#181818'
              }
            },
            {
              'featureType': 'subway',
              'elementType': 'geometry.stroke',
              'stylers': {
                'color': '#181818'
              }
            },
            {
              'featureType': 'railway',
              'elementType': 'geometry',
              'stylers': {
                'lightness': -52
              }
            },
            {
              'featureType': 'all',
              'elementType': 'labels.text.stroke',
              'stylers': {
                'color': '#313131'
              }
            },
            {
              'featureType': 'all',
              'elementType': 'labels.text.fill',
              'stylers': {
                'color': '#8b8787'
              }
            },
            {
              'featureType': 'manmade',
              'elementType': 'geometry',
              'stylers': {
                'color': '#1b1b1b'
              }
            },
            {
              'featureType': 'local',
              'elementType': 'geometry',
              'stylers': {
                'lightness': -75,
                'saturation': -91
              }
            },
            {
              'featureType': 'subway',
              'elementType': 'geometry',
              'stylers': {
                'lightness': -65
              }
            },
            {
              'featureType': 'railway',
              'elementType': 'all',
              'stylers': {
                'lightness': -40
              }
            },
            {
              'featureType': 'boundary',
              'elementType': 'geometry',
              'stylers': {
                'color': '#8b8787',
                'weight': '1',
                'lightness': -29
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
    };
  }
}
class PointData{
  name: string;
  value: Array<string>;
}
