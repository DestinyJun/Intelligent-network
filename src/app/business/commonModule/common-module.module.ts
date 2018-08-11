import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from './table/table.component';
import {BursterComponent} from './burster/burster.component';
import {CommonFaultComponent} from './common-fault/common-fault.component';
import { ModalFaultComponent } from './modal-fault/modal-fault.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TableComponent,
    BursterComponent,
    CommonFaultComponent,
    ModalFaultComponent
  ],
  exports: [
    TableComponent,
    BursterComponent,
    CommonFaultComponent,
    ModalFaultComponent
  ]
})
export class CommonModuleModule { }
