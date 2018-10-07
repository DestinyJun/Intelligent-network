import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgxEchartsService} from 'ngx-echarts';
import {animation} from '../../common/animation/right-sider-animation';
import {SessionService, UserRegion} from '../../common/services/session.service';
import {UrlModul} from '../../common/model/url.modul';
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
  public url = new UrlModul().getUrl();
  public homepageWell: any;
  public wellPointData = []; // 井的GPS数组
  public homepagePipe: any;
  public pipePointData = []; // 管道的GPS数组
  public faultRecordManholeCover = Array<FaultRecordManholeCover>(); // 井部分信息数组
  public alarmInformation = []; // 报警信息
  public btnClassList = []; // 按钮颜色信息
  // 画线条
  public moveLine = {
    normal: [
      {
        fromName: '省委',
        toName: '合肥市',
        coords: [
        [106.656504, 26.681777], [106.646474, 26.6784825]],
        value: 1
      },
    ]
  };
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
  ) {}

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
  // 拿到井数据
  public getData(): void {
    this.mainService.getWellDate({}).subscribe(
      (data) => {
        this.homepageWell = data.homePageDate.manholeStateList;
        this.homepagePipe = data.homePageDate.pipeStateList;
        this.echartsBMap(this.addWellMarker(this.homepageWell));
        console.log(this.addPipeMarker(this.homepagePipe));
        this.session.setUserRegion(this.userRegion);
      }
    );
  }
  // 拿到报警信息
  public getPublicPolice(alarm): void {
    this.alarmInformation = [];
    let a = '';
    this.btnClassList = this.mainService.colorList;
    alarm.map((value, index) => {
      let wellState = value.state.split('');
      if (
        wellState[0] === '2'
        || wellState[1] === '1' || wellState[1] === '2' || wellState[1] === '3' || wellState[1] === '4'
        || wellState[2] === '1') {
        if (wellState[0] === '2') {
          a = '井水溢出';
        } else if (wellState[1] === '1' || wellState[1] === '2' || wellState[1] === '3') {
          a = a + '且井盖偏移';
        } else if (wellState[1] === '4') {
          a = a + '井盖丢失';
        } else if (wellState[2] === '1') {
          a = a + '且堵塞或泄漏';
        }
        this.alarmInformation.push({time: value.failureTime, type: '报警', description: a});
      }
    });
  }
  // 遍历出异常井的坐标点
  public addWellMarker(well: any): any {
    console.log(well);
    for (let i = 0; i < well.length; i++) {
      if (well[i].manholeState.toString()[0] !== '1' || well[i].manholeState.toString()[1] !== '1') {
        const gpsId = well[i].gpsId.split(',');
        this.wellPointData.push(
          {name: well[i].gpsPosition, value: [gpsId[0], gpsId[1], '15', well[i].manholeState]}
        );
      }
    }
    return  this.wellPointData;
  }
  // 遍历出管道的坐标点
  public addPipeMarker(pipe: any): any {
    // 标注点,由于该死的后端弄得数据不容易处理,(initialManhole, flowOutManhole)两个类分开遍历
    console.log(pipe);
    for (let i = 0; i < pipe.length; i++) {
        console.log(pipe[i]);
        const gpsId = pipe[i].gpsId.split(',');
        console.log(gpsId);
        this.pipePointData.push(
          {name: pipe[i].gpsPosition, value: [gpsId[0], gpsId[1], '1']}
        );

    }
    return  this.pipePointData;
  }
  // echartk开始画点及线
  public echartsBMap(pointData: Array<PointData>): void {
    const that = this;
    const myChart = this.es.init(document.getElementById('myMap'));
    myChart.setOption(
      {
        visualMap: {
          max: 20,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          },
          bottom: '40%'
        },
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
        tooltip: {
          formatter: function (params) {
            console.log(params);
          }
        },
        series: [
          {
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: pointData,
            symbolSize: 10,
            legendHoverLink: 'true',
            tooltip: {
              formatter: function (params) {
                console.log(params);
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
         /* {
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
          },*/
          {
            name: '线路',
            type: 'lines',
            coordinateSystem: 'bmap',
            zlevel: 2,
            tooltip: {
              formatter: '{b0}: {c0}<br />{b1}: {c1}'
            },
            large: true,
            effect: {
              show: true,
              constantSpeed: 30,
              symbol: 'arrow',
              symbolSize: 0,
              trailLength: 0,
            },
            lineStyle: {
              normal: {
                // color: '#0fff17',
                width: 2,
                opacity: 1.0,
                curveness: 0.15
              }
            },
            data: this.moveLine.normal
          },
        ]
      }
    );
    const bmap = myChart.getModel().getComponent('bmap').getBMap();
    // 添加切换地图、卫星、三维切换控件
   /* bmap.addControl(new BMap.MapTypeControl({
      // 靠左上角位置
      anchor: BMAP_ANCHOR_BOTTOM_LEFT,
    }));*/
    // 添加定位控件
    // bmap.addControl(new BMap.GeolocationControl());
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


