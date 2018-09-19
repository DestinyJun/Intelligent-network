import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Fault, WorkUser} from '../../../../common/model/Fault';
import {FaultService} from '../../../../common/services/fault.service';
import {PageService} from '../../../../common/services/page.service';

@Component({
  selector: 'app-disposed',
  templateUrl: './disposed.component.html',
  styleUrls: ['./disposed.component.css']
})
export class DisposedComponent implements OnInit {
  fault: Fault;
  workUser: WorkUser;
  tHead = ['编号ID', '故障时间', '水位', '水流量'];
  prop = ['id', 'failureTime', 'waterLevel', 'flow'];
  btnGroup;
  tBody: any;
  constructor(private faultService: FaultService, private route: ActivatedRoute,
              public page: PageService) {
    this.page.setRow(20);
    this.page.setUrl('/home/operation/fault/disposed');
    this.route.params.subscribe(() => {
      this.page.setNowPage(Number(this.route.snapshot.params['page']));
      this.fault = this.faultService.history(3, this.page.getNowPage(), this.page.getRow());
      this.tBody = this.fault.datas;
      this.page.setMax(this.fault.totalPage);
      console.log(this.fault);
    });
  }

  ngOnInit() {
    console.log(this.fault);
  }
}
