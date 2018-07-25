import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgxEchartsService} from 'ngx-echarts';
import {ReqService} from '../../shared/req.service';
import {GlobalService} from '../../shared/global.service';
import {animation} from './right-sider-animation';
import {FaultRecordManholeCover, HomepageMsg} from '../jinggailei';
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
  gpsId: Array<string>; // GPS数组
  onlist = 'off';
  map: any;
  geolocation: any;
  marker: Array<any> = [];
  index: number;
  // show loading spinner:
  public mapLoaded = false;
  // empty option before geoJSON loaded:
  @ViewChild('baidumap') mapElement: ElementRef;
  public options = {};
  constructor(
    private req: ReqService,
    public http: HttpClient,
    private es: NgxEchartsService,
    private globalService: GlobalService) {
    this.faultRecordManholeCover = [];
    this.gpsId = [];
  }

  ngOnInit() {
    this.getData();
    this.ionViewWillEnter();
    this.addMarker();
  }
  backgroundClick(i) {
    if (this.index === i) {
      this.index = undefined;
    } else {
      if (this.index) {
        this.marker_blue_leave(this.index);
      }
      this.marker_blue_over(i);
      this.index = i;
    }
  }
  marker_blue_over(i) { // 切换标注蓝色
    this.map.removeOverlay(this.marker[i]);
    this.marker[i].z.rj.imageUrl = './assets/homeImages/red.png';
    this.map.addOverlay(this.marker[i]);
  }
  marker_blue_leave(i) { // 切换标注红色
    if (this.index !== i) {
      this.map.removeOverlay(this.marker[i]);
      this.marker[i].z.rj.imageUrl = './assets/homeImages/red.png';
      this.map.addOverlay(this.marker[i]);
    }
  }
  addMarker() { // 标注点,由于该死的后端弄得数据不容易处理,(initialManhole, flowOutManhole)两个类分开遍历
    for (let i =  0; i < this.homepageMsg.faultRecordManholeCoverInfo.length; i++) {
      let gpsId = this.homepageMsg.faultRecordManholeCoverInfo[i].initialManhole.gpsId;
      this.gpsId.push(gpsId); // 拿出initialManhole里的gpsId
      let lng = '', lat = '', j;
      for (j = 0; gpsId[j] !== ','; j++)  { // 拿出纬度
        lng = lng + gpsId[j];
      }
      for (j = j + 1; j < gpsId.length; j++) { // 拿出经度
        lat = lat + gpsId[j];
      }
      let point = new BMap.Point(lng, lat);
      this.marker[i * 2] = (new BMap.Marker(point));
      console.log(this.marker[i * 2]);
      this.marker[i * 2].z.rj.imageUrl='./assets/homeImages/red.png'; // 换图片,下方同理
      this.map.addOverlay(this.marker[i * 2]);
      gpsId = this.homepageMsg.faultRecordManholeCoverInfo[i].flowOutManhole.gpsId; // 拿出flowOutManhole里的gpsId
      this.gpsId.push(gpsId); // 拿出initialManhole里的gpsId
      lng = lat = '';
      for (j = 0; gpsId[j] !== ','; j++)  {
        lng = lng + gpsId[j];
      }
      for (j = j + 1; j < gpsId.length; j++) {
        lat = lat + gpsId[j];
      }
      point = new BMap.Point(lng, lat);
      this.marker[i * 2 + 1] = (new BMap.Marker(point));
      console.log(this.marker[i * 2 + 1]);
      this.marker[i * 2 + 1].z.rj.imageUrl='./assets/homeImages/red.png';
      this.map.addOverlay(this.marker[i * 2 + 1]);
    }
    console.log(this.marker);
  }
  ionViewWillEnter() { // 初始化百度地图元素
    let that;
    that = this;
    // 使用百度地图时，并不需要用angular获取dom元素，
    // 百度地图本身就具备通过ID寻找dom元素的，你又何必多此一举，
    // 记住了
    this.map = new BMap.Map(this.mapElement.nativeElement);
    this.map.setMapStyle({style: 'dark'});
    const point = new BMap.Point(106.681659, 26.627171);
    this.map.centerAndZoom(point, 13);
    this.map.enableScrollWheelZoom(true);
    this.geolocation = new BMap.Geolocation();
    this.geolocation.getCurrentPosition(function (r) {
      const geoc = new BMap.Geocoder();
      geoc.getLocation(r.point, function (rs) {
        that.locationTxt = rs.address;
        that.locationState = true;
      });
    }, {enableHighAccuracy: true});
  }

  getData(): void { // 获取主页面元素
    const that = this;
    $.ajax({
      url: 'http://' + this.publicUrl + '/pipe-network/homepage',
      type: 'POST',
      async: false,
      cache: false,
      headers: {
        'accessToken': this.globalService.get('accessToken')
      },
      contentType: 'application/x-www-form-urlencoded',
      success: function(data) {
        that.homepageMsg = data['homepageMsg'];
        that.globalService.set('regionId', data['homepageMsg'].regionId);
        console.log(data);
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

}
