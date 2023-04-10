import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import {RouterModule, Routes} from "@angular/router";
import {InputModule} from "../../components/input/input.module";
import {FormModule} from "../../shared/modules/form.module";

const routes: Routes = [
  {path: '', component: UserPageComponent}
];

@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputModule,
    FormModule
  ]
})
export class UserPageModule { }
