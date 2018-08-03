import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class PageService {

  private nowPage: number; // 当前页码
  private max: number; // 最大页码
  private min: number; // 最小页码
  private countNumber: number; // 计数总数
  private Row: number; // 每页行数
  private url: string;
  constructor(private router: Router) { // 默认当前第一页，最小页码为一页
    this.nowPage = 1;
    this.min = 1;
  }

  setPage(countNumber, Row) { // 输入总数,每页行数, 设置最大页码，每页行数
    this.countNumber = countNumber;
    this.Row = Row;
    if (countNumber % Row === 0 ) {
      this.max = countNumber / Row;
    } else {
      countNumber -= countNumber % Row;
      this.max = countNumber / Row + 1;
    }
  }
  setNowPage(nowPage: number) {
    this.nowPage = nowPage;
  }
  setUrl(url: string) {
    this.url = url;
  }
  setRow(Row: number) {
    this.Row = Row;
  }
  getNowPage(): number {
    return this.nowPage;
  }
  getMax(): number {
    return this.max;
  }
  getMin(): number {
    return this.min;
  }
  getNumber(): number {
    return this.countNumber;
  }
  getRow(): number {
    return this.Row;
  }
  homePage(): boolean {
    if (this.max > 0) {
      this.router.navigate([this.url + '/' + this.nowPage]);
      return true;
    }
    return false;
  }
  endPage(): boolean {
    if (this.max > 0) {
      this.router.navigate([this.url + '/' + this.nowPage]);
      return true;
    }
    return false;
  }
  nextPage(): boolean {
    console.log('nextPage');
    if (this.nowPage < this.max) {
      this.nowPage++;
      this.router.navigate([this.url + '/' + this.nowPage]);
      return true;
    }
    return false;
  }

  lastPage(): boolean {
    console.log('lastPage');
    if (this.nowPage > this.min) {
      this.nowPage--;
      this.router.navigate([this.url + '/' + this.nowPage]);
      return true;
    }
    return false;
  }

  skipPage(skipNumber: number): boolean {
    console.log('skipPage');
    if (skipNumber < this.min || skipNumber > this.max) {
      return false;
    } else {
      if (skipNumber * 10 % 10 !== 0) {
        return false;
      } else {
        this.nowPage = skipNumber;
        this.router.navigate([this.url + '/' + this.nowPage]);
      }
    }
  }
}
