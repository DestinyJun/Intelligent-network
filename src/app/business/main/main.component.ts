import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgxEchartsService} from 'ngx-echarts';
import {ReqService} from '../../shared/req.service';
import {GlobalService} from '../../shared/global.service';
import {animation} from './right-sider-animation';
declare let $, BMap;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [animation]
})
export class MainComponent implements OnInit {

  homepageMsg: HomepageMsg;
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
    private globalService: GlobalService
  ) {
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
    this.marker[i].z.uj.imageUrl = './assets/marker_blue_sprite.png';
    this.map.addOverlay(this.marker[i]);
  }
  marker_blue_leave(i) { // 切换标注红色
    if (this.index !== i) {
      this.map.removeOverlay(this.marker[i]);
      this.marker[i].z.uj.imageUrl = './assets/marker_red_sprite.png';
      this.map.addOverlay(this.marker[i]);
    }
  }
  addMarker() { // 标注点
    for (let i =  0; i < this.homepageMsg.faultRecordManholeCoverInfo.length; i++) {
      const gpsId = this.homepageMsg.faultRecordManholeCoverInfo[i].gpsId;
      let lng = '', lat = '', j;
      for (j = 0; gpsId[j] !== ','; j++)  {
        lng = lng + gpsId[j];
      }
      for (j = j + 1; j < gpsId.length; j++) {
        lat = lat + gpsId[j];
      }
      const point = new BMap.Point(lng, lat);
      this.marker[i] = (new BMap.Marker(point));
      this.marker[i].z.uj.imageUrl = '/assets/marker_red_sprite.png';
      this.map.addOverlay(this.marker[i]);
    }
  }
  ionViewWillEnter() { // 初始化百度地图元素
    let that;
    that = this;
    // 使用百度地图时，并不需要用angular获取dom元素，
    // 百度地图本身就具备通过ID寻找dom元素的，你又何必多此一举，
    // 记住了
    this.map = new BMap.Map(this.mapElement.nativeElement);
    const point = new BMap.Point(106.681659, 26.627171);
    this.map.centerAndZoom(point, 12);
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
      url: 'http://120.78.137.182:8888/pipe-network/homepage',
      type: 'POST',
      async: false,
      cache: false,
      headers: {
        'accessToken': this.globalService.get('accessToken')
      },
      contentType: 'application/x-www-form-urlencoded',
      success: function(data) {
        that.homepageMsg = data['homepageMsg'];
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
class Menus  { // 菜单
  id: string; // 权限的id
  name: string; // 资源名称
  type: string; // 资源类型：menu,button...
  percode: string; // 权限代码字符串
  available: string; // 是否可用,1：可用，0不可用
}
class FaultRecordManholeCover { // 异常井信息
  id: string; // 井id
  regionId: string; // 井的区域id
  failureTime: string; // 发生故障时间
  state: string; // 井的状态
  repairFrequency: string; // 维修次数
  gpsPosition: string; // 井的位置
  gpsId: string; // 在地图中的坐标
  repairState: string; // 修理状态
  completeTime: string; // 维修时间
}
class HomepageMsg {
  faultRecordManholeCoverInfo: Array<FaultRecordManholeCover>;
  menus: Array<Menus>;
  nickname: string; // 用户昵称
  username: string; // 用户账号
  userid: string; // 用户id
}
