import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs/Observable';
import {LoginService} from './login.service';
import {SessionService} from '../shared/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('flyIn', [
      state('in', style({opacity: 1})),
      state('void', style({opacity: 0})),
      transition('void => in', [
        animate(800)
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {


  public formModel: FormGroup;
  public tj;
  public tips;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private login: LoginService,
    private session: SessionService
  ) {
    this.formModel = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      mode: ['web'],
    });

  }

  ngOnInit() {

  }


  public Submit(): void {
    if (this.formModel.valid) {
      console.log(this.parameterSerializationForm(this.formModel.value));
      this.login.submitForm(this.parameterSerializationForm(this.formModel.value))
        .subscribe(res => {
          this.tj = res.msg;
          console.log(res);
          if (this.tj === 14) {
            this.session.set('accessToken', res.token);
            this.router.navigate(['/home']);
          } else if (this.tj === 10) {
            this.tips = '用户不存在';
          } else if (this.tj === 12) {
            this.tips = '系统错误！';
          } else if (this.tj === 11) {
            this.tips = '密码错误';
          }
        });
    }
  }

  // 表单参数序列化
  private parameterSerializationForm(obj: object): string {
    let result: string;
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (!result) {
          result = prop + '=' + obj[prop];
        } else {
          result += '&' + prop + '=' + obj[prop];
        }
      }
    }
    return result;
  }


}
