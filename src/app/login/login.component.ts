import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../shared/req.service';
import {GlobalService} from '../shared/global.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
    private req: ReqService,
    private globalService: GlobalService
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
      this.req.submitForm(this.parameterSerializationForm(this.formModel.value))
        .subscribe(res => {
          this.tj = res.msg;
          if (this.tj === 14) {
            this.globalService.set('accessToken', res.token);
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
