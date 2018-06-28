import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {MainRoutersModule} from './main.routers.module';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    MainRoutersModule,
    NgxEchartsModule
  ],
  declarations: [
    MainComponent,
  ],
  providers: [],
})
export class MainModule { }
