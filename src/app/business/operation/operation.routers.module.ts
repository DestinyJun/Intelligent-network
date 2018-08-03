import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OperationComponent} from './operation.component';
import {InspectionComponent} from './inspection/inspection.component';
const routes: Routes = [
  {
    path: '', component: OperationComponent,
    children: [
      {path: 'fault', loadChildren: 'app/business/operation/fault/fault.module#FaultModule'},
      {path: 'inspection', component: InspectionComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OperationRoutersModule {}
