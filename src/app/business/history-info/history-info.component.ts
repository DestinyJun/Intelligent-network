import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageService} from '../../common/services/page.service';

@Component({
  selector: 'app-history-info',
  templateUrl: './history-info.component.html',
  styleUrls: ['./history-info.component.css']
})
export class HistoryInfoComponent implements OnInit {
  tHead = ['类型', '平均水位深度', '异常次数百分比', '时间'];
  constructor() { }

  ngOnInit() {

  }
}
