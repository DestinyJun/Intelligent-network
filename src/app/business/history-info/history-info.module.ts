import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryInfoComponent } from './history-info.component';
import {CommonTableComponent} from './common-table/common-table.component';
import {RouterModule, Routes} from '@angular/router';
import {PageService} from '../../common/services/page.service';
const routes: Routes = [
  {
    path: '', component: HistoryInfoComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HistoryInfoComponent,
    CommonTableComponent
  ],
  providers: [PageService]
})
export class HistoryInfoModule { }
