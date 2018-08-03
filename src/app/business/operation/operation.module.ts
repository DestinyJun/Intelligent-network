import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationComponent } from './operation.component';
import { InspectionComponent } from './inspection/inspection.component';
import {OperationRoutersModule} from './operation.routers.module';
import {NgxEchartsModule} from 'ngx-echarts';
import {PaginationModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpServiceService} from './http-service.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OperationRoutersModule,
    NgxEchartsModule,
    PaginationModule,
  ],
  declarations: [
    OperationComponent,
    InspectionComponent,
  ],
  providers: [HttpServiceService]
})
export class OperationModule { }
