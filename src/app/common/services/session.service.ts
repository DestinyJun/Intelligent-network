import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  public sessionStorage: any;
  constructor() {
    if (!sessionStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.sessionStorage = sessionStorage;
  }
  public set(key: string, value: string): void {
    this.sessionStorage[key] = value;
  }

  public get(key: string): string {
    return this.sessionStorage[key] || false;
  }

  public setObject(key: string, value: any): void {
    this.sessionStorage[key] = value;
  }
  public setUserRegion(value: UserRegion): void {
    this.set('userRegion', JSON.stringify(value));
  }
  public getUserRegion(): UserRegion {
    return this.getObject('userRegion');
  }

  public getObject(key: string): any {
    return JSON.parse(this.sessionStorage[key] || '{}');
  }

  public remove(key: string): any {
    this.sessionStorage.removeItem(key);
  }
}
export class NavList {
  constructor(
    public title: string,
    public routers: string,
    public icon: string,
    public children: NavListChild[],
    public open: boolean,
    public height: string
  ) {}
}
export class NavListChild {
  constructor(
    public title: string,
    public open: boolean,
    public icon: string,
    public routers: string
  ) {}
}
export class PageBody {
  constructor(
    public start: number,
    public pageSize: number,
    public currentPage: number
  ) {}
}
export class UserRegion {
  userId: string;
  provinceRegionId: string; // 省地区id
  cityRegionId: string; // 市地区Id
  countyRegionId: string; //（县/区）地区Id
  townRegionId: string; //（镇或者乡）地区Id
  constructor(provinceRegionId: string, cityRegionId: string, countyRegionId: string, townRegionId: string) {
    this.cityRegionId = cityRegionId;
    this.countyRegionId = countyRegionId;
    this.provinceRegionId = provinceRegionId;
    this.townRegionId = townRegionId;
  }
}
