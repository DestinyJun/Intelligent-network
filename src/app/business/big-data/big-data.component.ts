import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-big-data',
  templateUrl: './big-data.component.html',
  styleUrls: ['./big-data.component.css']
})
export class BigDataComponent implements OnInit {
  public bigDateSeries = {};
  public lineDateSeries = {};

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.buildEchart();
    this.buildEchartLine();
  }

  public buildEchart(): void {
    this.http.get('assets/data/data-1504965328785-rJKAz_-cW.json').subscribe(
      (value) => {
        const points = value;
        const colorList = ['#778899', '#FFD700', '#7CFC00', '#00BFFF', '#FF8C00', '#FF0000', '#9400D3'];
        const labels = ['0', '0~10', '10~20', '20~30', '30~50', '50~80', '>80'];
        let series = labels.map((i, j) => {
          let name = i;
          let data = points[name];
          for (let index in data) {
            let tempArr = [];
            let tempStr = String(data[index]);
            tempArr.push(Number(tempStr.split(',')[0]));
            tempArr.push(Number(tempStr.split(',')[1]));
            tempArr.push(tempStr.split(',')[2]);
            tempArr.push(tempStr.split(',')[3]);
            data[index] = tempArr;
          }
          let color = colorList[j];
          return {
            name: name,
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: data,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            itemStyle: {
              normal: {
                color: color
              }
            },
            blendMode: 'lighter'
          };
        });
        this.bigDateSeries = {
          animation: true,
          bmap: {
            center: [125.35, 43.86],
            zoom: 12,
            roam: true,
            mapStyle: {
              styleJson: [
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
          legend: {
            orient: 'vertical',
            bottom: '55',
            left: '1',
            backgroundColor: 'rgba(255,255,255,0.6)',
            data: labels.reverse(),
            formatter: (name) => {
              return '速度:' + name + 'km/h';
            }
          },
          series: series,
          tooltip: {
            formatter: function (params) {
              var retStr = '车牌号: ' + params.data[3] + '<br />经度: ' + params.data[0] + '   纬度: ' + params.data[1] + '<br />速度: ' + params.data[2] + '    km/h';
              return retStr;
            }
          },
        };
      }
    );
  }

  public buildEchartLine(): void {
    this.http.get('assets/data/data-1519279347346-BkslpCjwf.json').subscribe(
      (value) => {
        console.log(value);
        const geoCoordMap = {
          '省委': [117.37, 31.786],
          '合肥市': [117.37, 31.386],
          '六安市': [116.27, 31.786],
          '滁州市': [118.07, 32.486],
          '蚌埠市': [117.27, 33.086],
          '淮南市': [116.67, 32.786],
          '宿州市': [117.77, 33.486],
          '淮北市': [116.67, 33.686],
          '亳州市': [116.27, 33.386],
          '阜阳市': [115.57, 32.986],
          '安庆市': [116.47, 30.486],
          '池州市': [117.47, 30.386],
          '黄山市': [118.17, 29.886],
          '宣城市': [119.27, 30.916],
          '芜湖市': [118.17, 31.186],
          '马鞍山市': [118.47, 31.616],
          '铜陵市': [117.87, 30.956],
        };
        const moveLine = {
          normal: [
            {'fromName': '省委', 'toName': '合肥市', 'coords': [[117.37, 31.786], [117.37, 31.386]]},
          ]
        };
        const data = [
          {name: '省委', value: 190},
          {name: '合肥市', value: 190},
          {name: '六安市', value: 190},
          {name: '滁州市', value: 190},
          {name: '蚌埠市', value: 190},
          {name: '淮南市', value: 90},
          {name: '宿州市', value: 120},
          {name: '淮北市', value: 120},
          {name: '亳州市', value: 120},
          {name: '阜阳市', value: 120},
          {name: '安庆市', value: 190},
          {name: '池州市', value: 190},
          {name: '黄山市', value: 190},
          {name: '宣城市', value: 190},
          {name: '芜湖市', value: 190},
          {name: '马鞍山市', value: 190},
          {name: '铜陵市', value: 90},
        ];
        const max = 480, min = 9; // todo
        const maxSize4Pin = 100, minSize4Pin = 20;
        const convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };
        this.lineDateSeries = {
          backgroundColor: '#091c3d',
          title: {
            top: 20,
            text: '',
            subtext: '',
            x: 'center',
            textStyle: {
              color: '#ccc'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              console.log(params);
              if (typeof(params.value)[2] === 'undefined') {
                return params.name + ' : ' + params.value;
              } else {
                return params.name + ' : ' + params.value[2];
              }
            }
          },
          legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['pm2.5'],
            textStyle: {
              color: '#fff'
            }
          },
          visualMap: {
            show: false,
            min: 0,
            max: 500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            inRange: {
              // color: ['#3B5077', '#031525'] // 蓝黑
              // color: ['#ffc0cb', '#800080'] // 红紫
              // color: ['#3C3B3F', '#605C3C'] // 黑绿
              //color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
              //color: ['#23074d', '#cc5333'] // 紫红
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#1488CC', '#2B32B2'] // 浅蓝
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#00467F', '#A5CC82'] // 蓝绿

            }
          },
          geo: {
            show: true,
            map: '江西',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: 'transparent',
                borderColor: '#3fdaff',
                borderWidth: 2,
                shadowColor: 'rgba(63, 218, 255, 0.5)',
                shadowBlur: 30
              },
              emphasis: {
                areaColor: '#2B91B7',
              }
            }
          },
          series: [
            {
              name: 'light',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(data),
              symbolSize: function (val) {
                return val[2] / 10;
              },
              label: {
                normal: {
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
                  color: '#F4E925'
                }
              }
            },
            {
              type: 'map',
              map: 'jiangxi',
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#FFFFFF',
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              },
              animation: false,
              data: data
            },
            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
              }).slice(0, 5)),
              symbolSize: function (val) {
                return val[2] / 10;
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#F4E925',
                  shadowBlur: 10,
                  shadowColor: '#05C3F9'
                }
              },
              zlevel: 1
            },
            {
              name: '线路',
              type: 'lines',
              coordinateSystem: 'geo',
              zlevel: 2,
              large: true,
              effect: {
                show: true,
                constantSpeed: 30,
                symbol: 'arrow',//ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                symbolSize: 0,
                trailLength: 0,
              },

              lineStyle: {
                normal: {
                  color: '#0fff17',
                  /*
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0, color: '#58B3CC'
                      }, {
                          offset: 1, color: '#F58158'
                      }], false),*/
                  width: 2,
                  opacity: 1.0,
                  curveness: 0.15
                }
              },
              data: moveLine.normal
            },
          ]
        };
      }
    );
  }

}
