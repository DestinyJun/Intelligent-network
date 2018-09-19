import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BigDataComponent} from './big-data.component';
const mainRoutes: Routes = [
  {path: '', component: BigDataComponent},
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class BigDataRoutersModule {}
