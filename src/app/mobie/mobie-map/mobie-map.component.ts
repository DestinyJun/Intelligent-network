import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mobie-map',
  templateUrl: './mobie-map.component.html',
  styleUrls: ['./mobie-map.component.css']
})
export class MobieMapComponent implements OnInit {

  token: string;
  constructor(private activatedRoute: ActivatedRoute) {
    this.token = this.activatedRoute.snapshot.params['token'];
  }

  ngOnInit() {
  }

}
