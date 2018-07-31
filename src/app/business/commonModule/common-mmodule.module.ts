import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from './table/table.component';
import {BursterComponent} from './burster/burster.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TableComponent,
    BursterComponent
  ],
  exports: [
    TableComponent,
    BursterComponent,
  ]
})
export class CommonMmoduleModule { }
