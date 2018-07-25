import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  ws: WebSocket;
  constructor() { }

  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url, 'post');
    return new Observable<any>(observer => {
      this.ws.onopen = (event) => observer.next(event);
      this.ws.onmessage = (event) => observer.next(event.data);
      this.ws.onerror = (event) => observer.error(event);
      this.ws.onclose = (event) => observer.complete();
    })
  }
  ngOnInit() {
    /*this.createObservableSocket('ws://192.168.28.65:8080/pipe-network/ws').subscribe(
      data => {
        console.log(data);
      }
    );*/
  }

}
