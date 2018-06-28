import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../../http-service.service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.css']
})
export class ProcessingComponent implements OnInit {
  currentPage: number;
  fault: Fault;
  skpPage: number;
  workUser: WorkUser;
  constructor(private httpService: HttpServiceService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(() => {
      this.currentPage = this.route.snapshot.params['currentPage'];
      this.fault = this.httpService.fault1({
        start: this.route.snapshot.params['start'],
        currentPage: this.currentPage,
        pageSize: this.route.snapshot.params['pageSize']
      });
      console.log(this.fault);
    });
  }

  ngOnInit() {
    console.log(this.fault);
  }
  sendOut() {
    this.workUser = this.httpService.sendOut();
    console.log(this.workUser);
  }
  firstPage() {
    if (this.fault.totalPage >= 1) {
      this.router.navigate(['/home/operation/fault/processing', 112, 1, 20]);
    }
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.router.navigate(['/home/operation/fault/processing', 112, this.currentPage - 1, 20]);
    }
  }
  nextPage() {
    if (this.currentPage < this.fault.totalPage) {
      this.router.navigate(['/home/operation/fault/processing', 112, this.currentPage + 1, 20]);
    }
  }
  lastPage() {
    if (this.fault.totalPage >= 1) {
      this.router.navigate(['/home/operation/fault/processing', 112, this.fault.totalPage, 20]);
    }
  }
  appointPage() {
    console.log(this.skpPage);
    if (this.skpPage <= this.fault.totalPage) {
      this.router.navigate(['/home/operation/fault/processing', 112, this.skpPage, 20]);
    }
  }
}
class FaultRecordManholeCover {
  id: string;
  regionId: string;
  failureTime: string;
  state: string;
  repairFrequency: string;
  gpsPosition: string;
  gpsId: string;
  repairState: string;
  completeTime: string;
}
class Fault {
  currentPage: number;
  pageSize: number;
  startRecord: number;
  totalPage: number;
  totalRecord: number;
  datas: Array<FaultRecordManholeCover>;
}
class WorkUser {
  id: string;
  nickname: string;
  username: string; // 账号
  password: string; // 密码（这个可以忽略）
  gender: string; // 用户性别
  age: string; // 用户年纪
  phone: string; // 用户电话
  address: string; // 用户住址
  locked: string; // 账号是否锁定，1：锁定，0未锁定
}
