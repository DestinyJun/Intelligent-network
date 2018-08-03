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
  workUser: WorkUser;
  tHead = ['编号ID', '故障时间', '水位', '水流量', '发送检修指令'];
  prop = ['id', 'failureTime', 'waterLevel', 'flow'];
  btnGroup = ['发送'];
  tBody: any;
  constructor(private faultService: FaultService, private route: ActivatedRoute,
              public page: PageService) {
    this.page.setRow(20);
    this.page.setUrl('/home/operation/fault/untreated');
    this.route.params.subscribe(() => {
      this.page.setNowPage(Number(this.route.snapshot.params['page']));
      this.fault = this.faultService.fault1(0, this.page.getNowPage(), this.page.getRow());
      this.tBody = this.fault.datas;
      console.log(this.fault);
    });
  }

  sendOut(event) {
    console.log(this.faultService.sendOut1(event));
  }
  ngOnInit() {
    console.log(this.fault);
  }
}
