import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home.component';
const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', loadChildren: 'app/business/main/main.module#MainModule'},
      {path: 'operation', loadChildren: 'app/business/operation/operation.module#OperationModule'},
      {path: 'bigdata', loadChildren: 'app/business/big-data/big-data.module#BigDataModule'},
      {path: 'history', loadChildren: 'app/business/history-info/history-info.module#HistoryInfoModule'},
      {path: 'inspection', loadChildren: 'app/business/inspection-all/inspection-all.module#InspectionAllModule'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutersModule {}
