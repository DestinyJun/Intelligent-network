import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageService} from '../../../common/services/page.service';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.css']
})
export class CommonTableComponent implements OnInit {

  @Input() tHead: Array<string>; // 表格头部列式信息
  @Input() fontSize: number; // 字体大小
  @Input() prop: Array<string>; // 类的成员信息排列
  @Input() tBody: Array<object>[]; // 表格主体数据
  @Input() title: string; // 表格标题
  @Input() btnGroup: Array<string> = []; // 按钮组
  @Input() page: PageService;
  @Output() sendOut = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  send(manholeId) {
    this.sendOut.emit(manholeId);
  }
}
