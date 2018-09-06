import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {MainRoutersModule} from './main.routers.module';
import {NgxEchartsModule} from 'ngx-echarts';
import { MainService } from '../../common/services/main.service';

@NgModule({
  imports: [
    CommonModule,
    MainRoutersModule,
    NgxEchartsModule
  ],
  declarations: [
    MainComponent,
  ],
  providers: [MainService],
  exports: [MainComponent]
})
export class MainModule { }
