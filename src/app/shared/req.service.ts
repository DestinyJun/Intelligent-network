import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ReqService {
  public Token: any = localStorage.getItem('token');
  public headers = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};

  constructor(private http: HttpClient) {

  }

  // 登陆验证
  public submitForm(body): Observable<any> {
    return this.http.post('http://120.78.137.182:8888/pipe-network/login', body, this.headers);
   // return this.http.post('http://120.78.138.104:8080/pipe-network/login', body, this.headers);
  }

  // 首页的数据获取
  public home(body): Observable<any> {
    return this.http.post('http://120.78.137.182:8888/pipe-network/homepage', body);
    // return this.http.post('http://120.78.138.104:8080/pipe-network/homepage', body);
  }

  // 故障详情的数据获取
  public Fault(body): Observable<any> {
    return this.http.post('http://120.78.137.182:8888/pipe-network/fault1', body, this.headers);
    // return this.http.post('http://120.78.138.104:8080/pipe-network/fault1', body, this.headers);
  }
}

