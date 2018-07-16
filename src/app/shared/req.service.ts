import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GlobalService} from './global.service';

@Injectable()
export class ReqService {
  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) {}
  public options = {
    headers:[new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})]
    //withCredentials: true
  };
  public headers1 = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  public header2 = {["Content-Type"]: "application/x-www-form-urlencoded"};

  // 登陆验证
  public submitForm(body): Observable<any> {
    return this.http.post('http://192.168.28.65:8080/pipe-network/login', body,
      {headers: this.header2});
   // return this.http.post('http://120.78.138.104:8080/pipe-network/login', body, this.headers);
  }

  // 首页的数据获取
  public home(body): Observable<any> {
    console.log(this.header2);
    return this.http.post('http://192.168.28.65:8080/pipe-network/homepage',body, {headers:this.header2});
    // return this.http.post('http://120.78.138.104:8080/pipe-network/homepage', body);
  }

  // 故障详情的数据获取
  public Fault(body): Observable<any> {
    return this.http.post('http://192.168.28.65:8080/pipe-network/fault1', body, {headers:this.header2});
    // return this.http.post('http://120.78.138.104:8080/pipe-network/fault1', body, this.headers);
  }
}

