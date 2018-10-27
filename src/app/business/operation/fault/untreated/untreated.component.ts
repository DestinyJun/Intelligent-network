import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Fault, WorkUser} from '../../../../common/model/Fault';
import {FaultService} from '../fault.service';
import {PageService} from '../../../../common/services/page.service';

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
      console.log(this.fault);
    });
  }
  ngOnInit() {
    console.log(1);
    this.getData();
  }
  getData() {
    this.faultService.fault1(0).subscribe( data => {
      console.log(data);
      this.tBody = data['AbnormalEventsDate'];
    });
  }
  sendOut(event) {
    this.workUser = this.faultService.sendOut1(event);
    console.log(this.workUser);
    console.log(this.faultService.sendOut1(event));
  }
  sendInstruction(username) {
    this.faultService.sendInstruction1(username);
  }

}
