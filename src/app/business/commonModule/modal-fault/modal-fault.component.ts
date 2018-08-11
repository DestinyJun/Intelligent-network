import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-fault',
  templateUrl: './modal-fault.component.html',
  styleUrls: ['./modal-fault.component.css']
})
export class ModalFaultComponent implements OnInit {

  @Input() modalData: Array<any>;
  @Input() prop: Array<string>[];
  @Input() dataName: Array<string>[];
  constructor() { }

  ngOnInit() {
  }

}
class Repairman {
  id: string;
  name: string;//姓名
  phone: string;//电话
  age: string;//年纪
  gender: string;//性别
  managementArea: string;//管理区域

}
