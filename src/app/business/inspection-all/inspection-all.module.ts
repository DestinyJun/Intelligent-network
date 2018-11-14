import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionAllComponent } from './inspection-all.component';
import {RouterModule, Routes} from '@angular/router';
const routes: Routes = [
  {
    path: '', component: InspectionAllComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InspectionAllComponent]
})
export class InspectionAllModule { }
