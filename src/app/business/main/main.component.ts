import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgxEchartsService} from 'ngx-echarts';
import {animation} from './right-sider-animation';
import {SessionService, UserRegion} from '../../shared/session.service';
import {Url} from '../../url';
import {MainService} from '../../common/services/main.service';
import {FaultRecordManholeCover, HomepageMsg, PointData} from '../../common/model/main.model';
declare let BMap, BMAP_ANCHOR_BOTTOM_LEFT;
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
  public pointData = []; // GPS数组
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

  }

  ngOnInit() {
    this.getData();
    // 全屏点击事件
    window.document.addEventListener('click', (e) => {
     /* if ((this.provinceShow && this.cityShow && this.townsShow) || !(this.flag === 'location')){
        console.log(111);
        this.provinceShow = false;
        this.cityShow = false;
      }*/
    });
  }

  public addMarker(fMC: Array<FaultRecordManholeCover>): any {
    // 标注点,由于该死的后端弄得数据不容易处理,(initialManhole, flowOutManhole)两个类分开遍历
    let lng, lat, usrLng, usrLat;
    for (let i = 0; i < fMC.length; i++) {
      if (fMC[i].flag === 0) {
        const gpsId = fMC[i].initialManhole.gpsId.split(',');
        let gpsIdUsr;
        console.log(gpsId);
        if (fMC[i].workUser !== null) {
          gpsIdUsr = fMC[i].workUser.gpsPoint.split(',');
          lng = gpsId[0]; lat = gpsId[1]; usrLng = gpsIdUsr[0]; usrLat = gpsIdUsr[1];
          this.pointData.push(
            [{name: fMC[i].initialManhole.gpsPosition, value: [lng, lat, '2']}],
            [{name: fMC[i].workUser.name, value: [usrLng, usrLat, '3']}]
          );
        }
      }
      else {
        const gpsId = fMC[i].initialManhole.gpsId.split(','); // 拿出flowOutManhole里的gpsId
        let gpsIdUsr;
        if (fMC[i].workUser !== null) {
          gpsIdUsr = fMC[i].workUser.gpsPoint.split(',');
          console.log(gpsIdUsr);
          const lng = gpsId[0], lat = gpsId[1], usrLng = gpsIdUsr[0], usrLat = gpsIdUsr[1];
          this.pointData.push(
            [{name: fMC[i].initialManhole.gpsPosition, value: [lng, lat, '2']}],
            [{name: fMC[i].workUser.name, value: [usrLng, usrLat, '3']}]
          );
        }
      }
    }
    return  this.pointData;
  }

  public getData(): void {
    this.mainService.getWellDate({}).subscribe(
      (data) => {
        this.homepageMsg = data['homepageMsg'];
        this.session.set('regionId', data['homepageMsg'].cityRegionId);
        console.log(this.addMarker(data['homepageMsg'].faultRecordManholeCoverInfo));
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
    console.log(pointData);
    // pointData[1][0].value = ['106.656504', '26.681777', '3'];
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
          },
        },
        series: [
          {
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: pointData[1],
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
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: pointData[0],
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
          },
        /*  {
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: pointData[1],
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
                  console.log(params.value[2]);
                  return that.color[Number()];
                }
              }
            }
          }*/
        ]
      }
    );
    const bmap = myChart.getModel().getComponent('bmap').getBMap();
    // 添加切换地图、卫星、三维切换控件
    bmap.addControl(new BMap.MapTypeControl({
      // 靠左上角位置
      anchor: BMAP_ANCHOR_BOTTOM_LEFT,
    }));
    // 添加定位控件
    bmap.addControl(new BMap.GeolocationControl());
    // 设置地图最小缩放级别
    bmap.setMinZoom(15);
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


