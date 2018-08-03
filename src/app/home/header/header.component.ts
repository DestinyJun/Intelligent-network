import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() logout = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  loginOut() {
    this.logout.emit('2');
  }
}
