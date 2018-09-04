import { Component, OnInit } from '@angular/core';
import {Fault, WorkUser} from '../Fault';
import {FaultService} from '../fault.service';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../../commonModule/page.service';

@Component({
  selector: 'app-assigning',
  templateUrl: './assigning.component.html',
  styleUrls: ['./assigning.component.css']
})
export class AssigningComponent implements OnInit {
  fault: Fault;
  workUser: WorkUser;
  tHead = ['编号ID', '故障时间', '水位', '水流量'];
  prop = ['id', 'failureTime', 'waterLevel', 'flow'];
  btnGroup;
  tBody: any;
  constructor(private faultService: FaultService, private route: ActivatedRoute,
              public page: PageService) {
    this.page.setRow(20);
    this.page.setUrl('/home/operation/fault/assigning');
    this.route.params.subscribe(() => {
      this.page.setNowPage(Number(this.route.snapshot.params['page']));
      this.fault = this.faultService.fault1(1, this.page.getNowPage(), this.page.getRow());
      this.tBody = this.fault.datas;
      this.page.setMax(this.fault.totalPage);
      console.log(this.fault);
    });
  }
  ngOnInit() {
  }

}
