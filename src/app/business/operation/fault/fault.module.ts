import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DisposedComponent} from './disposed/disposed.component';
import {ProcessingComponent} from './processing/processing.component';
import {UntreatedComponent} from './untreated/untreated.component';
import {FaultService} from './fault.service';
import {RouterModule, Routes} from '@angular/router';
import {FaultComponent} from './fault.component';
import {PageService} from '../../../common/services/page.service';
import { AssigningComponent } from './assigning/assigning.component';
import {Shared} from '../../../common/shared/shared';

const routes: Routes = [
  {path: '', redirectTo: '/disposed/:page', pathMatch: 'full'},
  {path: 'disposed/:page', component: DisposedComponent},
  {path: 'processing/:page', component: ProcessingComponent},
  {path: 'untreated/:page', component: UntreatedComponent},
  {path: 'assigning/:page', component: AssigningComponent}
];
@NgModule({
  imports: [
    CommonModule,
    Shared,
    RouterModule.forChild(routes),
  ],
  declarations: [
    DisposedComponent,
    ProcessingComponent,
    UntreatedComponent,
    FaultComponent,
    AssigningComponent
  ],
  providers: [FaultService, PageService],
  exports: [FaultComponent]
})
export class FaultModule { }
