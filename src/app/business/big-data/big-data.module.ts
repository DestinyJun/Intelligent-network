import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigDataComponent } from './big-data.component';
import {BigDataRoutersModule} from './big-data.routers.module';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    BigDataRoutersModule,
    NgxEchartsModule
  ],
  declarations: [BigDataComponent]
})
export class BigDataModule { }
