import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobieMapComponent } from './mobie-map/mobie-map.component';
import {RouterModule, Routes} from '@angular/router';
import {MainModule} from '../business/main/main.module';
import { MobieComponent } from './mobie/mobie.component';

const routes: Routes = [
  {path: 'map/:token', component: MobieMapComponent}
];
@NgModule({
  imports: [
    CommonModule,
    MainModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MobieMapComponent, MobieComponent]
})
export class MobieModule { }
