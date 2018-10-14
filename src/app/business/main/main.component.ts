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
  public myChart: any; // 定义图表
  public myChartOption: any; // 定义图表
  public url = new UrlModul().getUrl(); // 保存服务器地址
  public exceptionList = []; // 异常事件列表
  public exceptionDes = []; // 报警描述
  public homepageWell: any;  // 所有的井
  public wellPointData = []; // 井的GPS数组
  public homepagePipe: any;  // 所有的管道
  public pipePointData = []; // 管道的GPS数组
  public mapCenterPoint = [106.656286, 26.681845];

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
   /* setInterval(() => {
      this.getData();
  }, 3000);*/
  }
  // 拿到井数据
  public getData(): void {
    this.mainService.getWellDate({}).subscribe(
      (data) => {
        this.homepageWell = data.homePageDate.manholeStateList;
        this.homepagePipe = data.homePageDate.pipeStateList;
        this.exceptionList = data.AbnormalEventsDate;
        this.exceptionList.map((val, index) => {
          if (val.abnormaType === 1) {
            this.exceptionDes.push(
              this.mainService.pipeState.decade[parseInt(val.state.toString().split('')[0], 10) - 1] + ';' +
              this.mainService.pipeState.individual[parseInt(val.state.toString().split('')[1], 10) - 1]
            );
          } else if (val.abnormaType === 2) {
            this.exceptionDes.push(
              this.mainService.manholeState.decade[parseInt(val.state.toString().split('')[0], 10) - 1] + ';' +
              this.mainService.manholeState.individual[parseInt(val.state.toString().split('')[1], 10) - 1]
            );
          }
        });
        this.echartsBMap(this.addWellMarker(this.homepageWell), this.addPipeMarker(this.homepagePipe));
        this.session.setUserRegion(this.userRegion);
      }
    );
   /* setInterval(() => {
      // this.getData();
      this.mainService.getWellDate({}).subscribe(
        (data) => {
          this.homepageWell = data.homePageDate.manholeStateList;
          this.homepagePipe = data.homePageDate.pipeStateList;
          this.wellPointList = data.AbnormalEventsDate.abnormalManholeList;
          this.pipePointList = data.AbnormalEventsDate.abnormalPipeList;
          this.echartsBMap(this.addWellMarker(this.homepageWell), this.addPipeMarker(this.homepagePipe));
          this.addExceptionList(this.wellPointList, this.pipePointList);
        }
      );
    }, 3000);*/
  }
  // 遍历出异常井的坐标点
  public addWellMarker(well: any): any {
    console.log(well);
    for (let i = 0; i < well.length; i++) {
      const wllState = well[i].manholeState.toString();
      if (wllState[0] !== '1' || wllState[1] !== '1') {
        const gpsId = well[i].gpsId.split(',');
        this.wellPointData.push(
          {
            name: well[i].gpsPosition,
            value: [gpsId[0], gpsId[1], wllState, well[i].manholeState],
            visualMap: false,
          }
        );
      }
    }
    return  this.wellPointData;
  }
  // 遍历出管道的坐标点
  public addPipeMarker(pipe: any): any {
    for (let i = 0; i < pipe.length; i++) {
        const pipeInGps = pipe[i].inFlowGpsId.split(',');
        const pipeOutGps = pipe[i].flowOutGpsId.split(',');
        this.pipePointData.push(
          {
            flow: pipe[i].flow, // 管道流量
            permeability: pipe[i].permeability, // 管道渗透率
            loadRate: pipe[i].loadRate, // 管道载荷率
            coords: [pipeInGps, pipeOutGps],
            value: pipe[i].flow * 100
          }
        );
    }
    return  this.pipePointData;
  }
  // 拿到异常警报列表
  public addUnPipeMarker(pipe: any): any {
    console.log(pipe);
    for (let i = 0; i < pipe.length; i++) {
      const pipeInGps = pipe[i].inFlowGpsId.split(',');
      const pipeOutGps = pipe[i].flowOutGpsId.split(',');
      this.pipePointData.push(
        {
          flow: pipe[i].flow, // 管道流量
          permeability: pipe[i].flow.permeability, // 管道渗透率
          loadRate: pipe[i].flow.loadRate, // 管道载荷率
          coords: [pipeInGps, pipeOutGps]
        }
      );
    }
    return  this.pipePointData;
  }
  // echartk开始画点及线
  public echartsBMap(wellPointGps: any, pipePointGps: any): void {
    const that = this;
    this.myChart = this.es.init(document.getElementById('myMap'));
    this.myChartOption =  {
      visualMap: {
        max: 100,
        inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        },
        bottom: '40%',
        textStyle: {
          color: 'white'
        }
      },
      bmap: {
        center: this.mapCenterPoint,
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
      tooltip: {},
      series: [
        {
          name: '井',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: wellPointGps,
          symbolSize: 10,
          legendHoverLink: 'true',
          tooltip: {
            formatter: function (params) {
              const wellState = params.data.value[2].toString().split('');
              return `<p>${that.mainService.manholeState.decade[parseInt(wellState[0], 10) - 1]}；
                        ${that.mainService.manholeState.individual[parseInt(wellState[1], 10) - 1]}</p>`;
            }
          },
          itemStyle: {
            normal: {
              color: function (params) {
                const states = params.value[3].toString().split('');
                if (states[0] === '1' && states[1] !== '1') {
                  return '#9400D3';
                } else if (states[0] !== '1') {
                  if (states[0] === '2') {
                    return '#F9523F';
                  } else {
                    return '#0F93FF';
                  }
                }
              }
            }
          }
        },
        {
          name: '管道',
          type: 'lines',
          coordinateSystem: 'bmap',
          zlevel: 2,
          tooltip: {
            formatter: function (params) {
              // console.log(params.data);
              return `<div>
                          <p>管道流量：${params.data.flow}</p>
                          <p>管道渗透率：${params.data.permeability}</p>
                          <p>管道载荷率：${params.data.loadRate}</p>
                      </div> `;
              // const pipeStates = params.data.pipeState.toString().split('');
              /*if (pipeStates[0] === '2') {
                return `<p>${params.data.name}水位大于0.3，低于0.6</p>`;
              } else if (pipeStates[0] === '3') {
                return `<p>${params.data.name}水位大于0.6，低于0.8%</p>`;
              } else if (pipeStates[0] === '4') {
                return `<p>${params.data.name}水位大于0.8，低于等于1</p>`;
              } else if (pipeStates[0] === '5') {
                return `<p>${params.data.name}水位等于0</p>`;
              }*/
            }
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
          data: pipePointGps
        },
        /*  {
            name: '有问题的管道',
            type: 'lines',
            coordinateSystem: 'bmap',
            zlevel: 2,
            tooltip: {
              formatter: function (params) {
                console.log(params.data);
                // const pipeStates = params.data.pipeState.toString().split('');
                /!*if (pipeStates[0] === '2') {
                  return `<p>${params.data.name}水位大于0.3，低于0.6</p>`;
                } else if (pipeStates[0] === '3') {
                  return `<p>${params.data.name}水位大于0.6，低于0.8%</p>`;
                } else if (pipeStates[0] === '4') {
                  return `<p>${params.data.name}水位大于0.8，低于等于1</p>`;
                } else if (pipeStates[0] === '5') {
                  return `<p>${params.data.name}水位等于0</p>`;
                }*!/
              }
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
            data: pipePointGps
          },*/
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
      ]
    };
    this.myChart.setOption(this.myChartOption);
    const bmap = this.myChart.getModel().getComponent('bmap').getBMap();
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
      that.myChart.resize();
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
  // 异常列表点击切换地图中点
  public exceptionListClick(item) {
    this.mapCenterPoint = item.gpsId.split(',');
    this.myChartOption.bmap =  {
        center: this.mapCenterPoint,
    };
    this.myChart.setOption(this.myChartOption);
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


