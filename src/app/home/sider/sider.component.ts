import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NavList, NavListChild} from '../../common/services/session.service';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css']
})
export class SiderComponent implements OnInit {

  height: number;
  navList1: NavList[]= [ //操作菜单
    new NavList('故障详情', 'operation/fault', 'glyphicon glyphicon-lock',  [
      new NavListChild('未处理', false, 'glyphicon glyphicon-lock', 'operation/fault/untreated/1'),
      new NavListChild('指派中', false, 'glyphicon glyphicon-lock', 'operation/fault/assigning/1'),
      new NavListChild('处理中', false, 'glyphicon glyphicon-lock', 'operation/fault/processing/1'),
      new NavListChild('已处理', false, 'glyphicon glyphicon-lock', 'operation/fault/disposed/1'),
    ], false, '0'),
    new NavList('巡检', 'operation/inspection', 'glyphicon glyphicon-warning-sign', [], false,'0')
  ];
  navList2: NavList[] = [];
  navList3: NavList[] = [
    new NavList('历史记录', '', 'glyphicon glyphicon-time', [], false, '0'),
    new NavList('巡检点总汇', '', 'glyphicon glyphicon-th', [], false, '0'),
    new NavList('个人信息', '', 'glyphicon glyphicon-user', [], false, '0'),
  ];
  constructor(private router: Router) {
    this.height = 40;
  }
  ngOnInit() {
    /*console.log(this.navList1[0].height);
    console.log(this.navList1[0].children.length);*/
  }

  navListInit(navList: NavList[], index: number) {
    navList[index].height = navList[index].children.length * this.height + 'px';
    return navList;
  }
  onMouseClick(navList: NavList) {

  }
  public bigDataClick(): void {
    console.log(1);
    this.router.navigate(['/home/bigdata']);
  }
  toggleList(navList: number, index: number) {
    switch (navList) {
      case 1:
        // console.log('navList1');
        if (this.navList1[index].height !== '0') {
          this.navList1[index].height = '0';
        } else {
          for (let i = 0; i < this.navList1.length; i++) {
            this.navList1[i].open = false;
            this.navList1[i].height = '0';
          }
          this.navList1[index].open = true;
          this.navList1 = this.navListInit(this.navList1, index);
        }
        break;
      case 2:
        if (this.navList2[index].height !== '0') {
          this.navList2[index].height = '0';
        } else {
          for (let i = 0; i < this.navList2.length; i++) {
            this.navList2[i].open = false;
            this.navList2[i].height = '0';
          }
          this.navList2[index].open = true;
          this.navList2 = this.navListInit(this.navList2, index);
        }
        break;
      case 3:
        if (this.navList3[index].height !== '0') {
          this.navList3[index].height = '0';
        } else {
          for (let i = 0; i < this.navList3.length; i++) {
            this.navList3[i].open = false;
            this.navList3[i].height = '0';
          }
          this.navList3[index].open = true;
          this.navList3 = this.navListInit(this.navList3, index);
        }
        break;
    }
  }
  toggleListChild(navList: number, listIndex: number, listChildrenIndex: number) {
    switch (navList) {
      case 1:
        for (let i = 0; i < this.navList1[listIndex].children.length; i++) {
          if (i === listChildrenIndex) {
            this.navList1[listIndex].children[listChildrenIndex].open = true;
          } else {
            this.navList1[listIndex].children[i].open = false;
          }
        }
        break;
      case 2:
        for (let i = 0; i < this.navList2[listIndex].children.length; i++) {
          if (i === listChildrenIndex) {
            this.navList2[listIndex].children[listChildrenIndex].open = true;
          } else {
            this.navList2[listIndex].children[i].open = false;
          }
        }
        break;
      case 3:
        for (let i = 0; i < this.navList3[listIndex].children.length; i++) {
          if (i === listChildrenIndex) {
            this.navList3[listIndex].children[listChildrenIndex].open = true;
          } else {
            this.navList3[listIndex].children[i].open = false;
          }
        }
        break;
    }
  }

}
