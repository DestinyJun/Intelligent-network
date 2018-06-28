import { Component, OnInit } from '@angular/core';
import {NavList, NavListChild} from '../../shared/global.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css']
})
export class SiderComponent implements OnInit {

  public navlist: NavList[]= [
    new NavList('故障详情', 'operation/fault', 'glyphicon glyphicon-lock',  [
      new NavListChild('未处理', false, 'glyphicon glyphicon-lock', 'operation/fault/untreated/111/1/20'),
      new NavListChild('处理中', false, 'glyphicon glyphicon-lock', 'operation/fault/processing/112/1/20'),
      new NavListChild('已处理', false, 'glyphicon glyphicon-lock', 'operation/fault/disposed/113/1/20'),
    ], true),
    new NavList('巡检', 'operation/inspection', 'glyphicon glyphicon-warning-sign', [], true)
  ];
  public slidinghight: number;
  public slidingTop: number;
  public difulHeight: number;
  constructor(private router: Router) {}
  ngOnInit() {}
  onMouseleave() {
    this.slidingTop = -160;
  }
  mainLiMouseEnter(element) {
    this.slidingTop =  element.offsetTop;
    this.slidinghight = element.offsetHeight;
  }
  mainLiClick(mainul, element, list) {
    if (list.routers) {
      this.router.navigate(['/home/' + list.routers]);
    }
    this.difulHeight = 0;
    if (!(list.children.length > 0)) {
      // this.router.navigate(['/home']);
      for (let i = 0; i < mainul.children.length; i++) {
        mainul.children[i].children[1].style.height = '0px';
      }
      this.navlist.forEach((item) => {
        item.open = true;
        item.children.forEach((itemchild) => {
          itemchild.setState = false;
        });
      });
      list.clsstate = true;
      return;
    }
    if (element.offsetHeight === 0) {
      this.navlist.forEach((item) => {
        item.open = true;
      });
      list.open = false;
      for (let i = 0; i < mainul.children.length; i++) {

      }
      for (let i = 0; i < list.children.length; i++) {
        this.difulHeight = this.difulHeight + 45;
      }
      element.style.height = this.difulHeight.toString() + 'px';
    } else {
      list.open = true;
      this.difulHeight = 0;
      element.style.height = this.difulHeight.toString() + 'px';
      setTimeout(() => {
        list.open = true;
      }, 200);
    }
  }
  menuliMouseEnter(element) {
    this.slidingTop =  element.offsetTop;
    this.slidinghight = element.offsetHeight;
    element.setState = true;
  }
  menuliClick(element) {
    this.navlist.forEach((item) => {
      item.children.forEach((itemchild) => {
        itemchild.setState = false;
      });
    });
    element.setState = true;
  }
}
