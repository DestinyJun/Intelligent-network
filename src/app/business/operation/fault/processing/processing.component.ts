import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FaultService} from '../fault.service';
import {Fault, WorkUser} from '../../../../common/model/Fault';
import {PageService} from '../../../../common/services/page.service';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.css']
})
export class ProcessingComponent implements OnInit {
  fault: Fault;
  workUser: WorkUser;
  tHead = ['编号ID', '故障时间', '水位', '水流量'];
  prop = ['id', 'failureTime', 'waterLevel', 'flow'];
  btnGroup;
  tBody: any;
  constructor(private faultService: FaultService, private route: ActivatedRoute,
              public page: PageService) {
    this.page.setRow(20);
    this.page.setUrl('/home/operation/fault/processing');
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
    this.faultService.fault1(2).subscribe( data => {
      console.log(data);
      this.tBody = data['AbnormalEventsDate'];
    });
  }
}

