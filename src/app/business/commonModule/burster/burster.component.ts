import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-burster',
  templateUrl: './burster.component.html',
  styleUrls: ['./burster.component.css']
})
export class BursterComponent implements OnInit {

  @Output() nextPage = new EventEmitter();
  @Output() lastPage = new EventEmitter();
  @Output() skipPage = new EventEmitter();
  @Input() max: number;
  @Input() row: number;
  @Input() nowPage: number;
  constructor() {
  }

  ngOnInit() {  }
  next() {
    this.nextPage.emit('next');
  }
  skip(value) {
    console.log(value);
    this.skipPage.emit(value);
  }
  last() {
    this.lastPage.emit('last');
  }
}
