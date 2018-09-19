import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-big-data',
  templateUrl: './big-data.component.html',
  styleUrls: ['./big-data.component.css']
})
export class BigDataComponent implements OnInit {
  public bigDateSeries = {};

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.buildEchart();
  }

  public buildEchart(): void {
    this.http.get('assets/data/data-1504965328785-rJKAz_-cW.json').subscribe(
      (value) => {
        let points = JSON.parse(value);
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

}
