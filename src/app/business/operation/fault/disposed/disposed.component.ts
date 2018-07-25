import { Component, OnInit } from '@angular/core';
import {GlobalService, PageBody} from '../../../../shared/global.service';
import {ReqService} from '../../../../shared/req.service';
import {Observable} from 'rxjs/Observable';
import {HttpServiceService} from '../../http-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-disposed',
  templateUrl: './disposed.component.html',
  styleUrls: ['./disposed.component.css']
})
export class DisposedComponent implements OnInit {

  currentPage: number;
  fault: Fault;
  skpPage: number;
  constructor(private httpService: HttpServiceService, private route: ActivatedRoute, private router: Router, private global: GlobalService) {
    console.log(this.global.sessionStorage);
    this.route.params.subscribe(() => {
      this.currentPage = this.route.snapshot.params['currentPage'];
      this.fault = this.httpService.fault1({
        start: this.route.snapshot.params['start'],
        currentPage: this.currentPage,
        pageSize: this.route.snapshot.params['pageSize'],
        regionId: this.global.get('regionId')
      });
      console.log(this.fault);
    });
  }

  ngOnInit() {
    console.log(this.fault);
  }
  firstPage() {
    if (this.fault.totalPage >= 1) {
      this.router.navigate(['/home/operation/fault/processing', 113, 1, 20]);
    }
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.router.navigate(['/home/operation/fault/processing', 113, this.currentPage - 1, 20]);
    }
  }
  nextPage() {
    if (this.currentPage < this.fault.totalPage) {
      this.router.navigate(['/home/operation/fault/processing', 113, this.currentPage + 1, 20]);
    }
  }
  lastPage() {
    if (this.fault.totalPage >= 1) {
      this.router.navigate(['/home/operation/fault/processing', 113, this.fault.totalPage, 20]);
    }
  }
  appointPage() {
    console.log(this.skpPage);
    if (this.skpPage <= this.fault.totalPage) {
      this.router.navigate(['/home/operation/fault/processing', 113, this.skpPage, 20]);
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
