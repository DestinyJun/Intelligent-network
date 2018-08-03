import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DisposedComponent} from './disposed/disposed.component';
import {ProcessingComponent} from './processing/processing.component';
import {UntreatedComponent} from './untreated/untreated.component';
import {FaultService} from './fault.service';
import {CommonModuleModule} from '../../commonModule/common-module.module';
import {RouterModule, Routes} from '@angular/router';
import {FaultComponent} from './fault.component';
import {PageService} from '../../commonModule/page.service';

const routes: Routes = [
  {path: '', redirectTo: '/disposed/:page', pathMatch: 'full'},
  {path: 'disposed/:page', component: DisposedComponent},
  {path: 'processing/:page', component: ProcessingComponent},
  {path: 'untreated/:page', component: UntreatedComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModuleModule
  ],
  declarations: [
    DisposedComponent,
    ProcessingComponent,
    UntreatedComponent,
    FaultComponent
  ],
  providers: [FaultService, PageService],
  exports: [FaultComponent]
})
export class FaultModule { }
