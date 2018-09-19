import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SessionService} from './session.service';
import {UrlModul} from '../model/url.modul';

@Injectable()
export class LoginService {

  url = new UrlModul().getUrl();
  private header = {['Content-Type']: 'application/x-www-form-urlencoded'};

  constructor(
    private http: HttpClient,
    private session: SessionService,
  ) {
  }

  // 登陆验证
  public submitForm(body): Observable<any> {
    return this.http.post('http://' + this.url + '/pipe-network/login', body,
      {headers: this.header});
  }
}
