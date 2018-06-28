import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OperationComponent} from './operation.component';
import {FaultComponent} from './fault/fault.component';
import {InspectionComponent} from './inspection/inspection.component';
import {UntreatedComponent} from './fault/untreated/untreated.component';
import {ProcessingComponent} from './fault/processing/processing.component';
import {DisposedComponent} from './fault/disposed/disposed.component';
const mainRoutes: Routes = [
  {
    path: '', component: OperationComponent,
    children: [
      {path: 'fault', component: FaultComponent, children: [
        {path: 'untreated/:start/:currentPage/:pageSize', component: UntreatedComponent},
        {path: 'processing/:start/:currentPage/:pageSize', component: ProcessingComponent},
        {path: 'disposed/:start/:currentPage/:pageSize', component: DisposedComponent}
      ]},
      {path: 'inspection', component: InspectionComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class OperationRoutersModule {}
