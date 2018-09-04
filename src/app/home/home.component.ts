import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  ws: WebSocket;
  webSoc: any;
  constructor() { }

  ngOnInit() {
   this.webSoc = this.createObservableSocket('ws://192.168.28.65:8080/pipe-network/websocket').subscribe(
      data => {
      }
    );
   setTimeout(() => this.webSoc, 1000);
   setTimeout(() => this.ws.send('websocket4'), 3000);
  }

  wsClose() {
    this.ws.send('websocket44');
    this.ws.close();
  }
  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    const that = this;
    return new Observable<any>(observer => {
      this.ws.onopen = (event) => observer.next(event);
      this.ws.onmessage = (event) => observer.next(console.log(event.data));
      this.ws.onerror = (event) => observer.error(event);
      this.ws.onclose = (event) => observer.complete();
    })
  }
}
