import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from './table/table.component';
import {BursterComponent} from './burster/burster.component';
import {CommonFaultComponent} from './common-fault/common-fault.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TableComponent,
    BursterComponent,
    CommonFaultComponent
  ],
  exports: [
    TableComponent,
    BursterComponent,
    CommonFaultComponent
  ]
})
export class CommonModuleModule { }
