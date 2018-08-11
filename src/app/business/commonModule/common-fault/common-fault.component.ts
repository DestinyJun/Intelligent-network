import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageService} from '../page.service';

@Component({
  selector: 'app-common-fault',
  templateUrl: './common-fault.component.html',
  styleUrls: ['./common-fault.component.css']
})
export class CommonFaultComponent implements OnInit {

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
    console.log(this.page.getMax());
  }

  send(manholeId) {
    this.sendOut.emit(manholeId);
  }

}
