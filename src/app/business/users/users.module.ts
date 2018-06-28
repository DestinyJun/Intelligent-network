import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {UsersRoutersModule} from './users .routers.module';
@NgModule({
  imports: [
    CommonModule,
    UsersRoutersModule
  ],
  declarations: [
    UsersComponent
  ],
  providers: [],
})
export class  UsersModule { }
