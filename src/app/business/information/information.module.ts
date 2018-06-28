import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './information.component';
import { HistoricalComponent } from './historical/historical.component';
import { CheckpointSummaryComponent } from './checkpoint-summary/checkpoint-summary.component';
import { PersonalComponent } from './personal/personal.component';
import {PaginationModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule
  ],
  declarations: [
    InformationComponent,
    HistoricalComponent,
    CheckpointSummaryComponent,
    PersonalComponent,]
})
export class InformationModule { }
