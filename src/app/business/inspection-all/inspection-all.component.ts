import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inspection-all',
  templateUrl: './inspection-all.component.html',
  styleUrls: ['./inspection-all.component.css']
})
export class InspectionAllComponent implements OnInit {

  title = '巡检点总汇';
  tHead = [];
  constructor() { }

  ngOnInit() {
  }

}
