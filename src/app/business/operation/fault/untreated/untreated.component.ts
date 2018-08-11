import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Fault, WorkUser} from '../Fault';
import {FaultService} from '../fault.service';
import {PageService} from '../../../commonModule/page.service';

@Component({
  selector: 'app-untreated',
  templateUrl: './untreated.component.html',
  styleUrls: ['./untreated.component.css']
})
export class UntreatedComponent implements OnInit {
  fault: Fault;
  workUser: Array<WorkUser>;
  workProp: Array<string>[];
  workName: Array<string>[];
  tHead = ['编号ID', '故障时间', '水位', '水流量', '发送检修指令'];
  prop = ['id', 'failureTime', 'waterLevel', 'flow'];
  btnGroup = ['发送'];
  tBody: any;
  constructor(private faultService: FaultService, private route: ActivatedRoute,
              public page: PageService) {
    this.workProp = [['id', 'name'], ['phone', 'age'], ['gender', 'managementArea']];
    this.workName = [['ID', '姓名'], ['电话', '年纪'], ['性别', '管理区域']];
    this.workUser = [];
    this.page.setRow(20);
    this.page.setUrl('/home/operation/fault/untreated');
    this.route.params.subscribe(() => {
      this.page.setNowPage(Number(this.route.snapshot.params['page']));
      this.getData();
      this.tBody = this.fault.datas;
      this.page.setMax(this.fault.totalPage);
      console.log(this.fault);
    });
  }
  getData() {
    this.fault = this.faultService.fault1(0, this.page.getNowPage(), this.page.getRow());
  }
  sendOut(event) {
    this.workUser = this.faultService.sendOut1(event);
    console.log(this.workUser);
    console.log(this.faultService.sendOut1(event));
  }
  sendInstruction(username) {
    this.faultService.sendInstruction1(username);
  }
  ngOnInit() {
    console.log(this.fault);
  }
}
