import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import {InputModule} from "../../components/input/input.module";
import {FormModule} from "../../shared/modules/form.module";

const routes: Routes = [
  {path: '', component: LoginComponent}
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    FormModule,
    RouterModule.forChild(routes),
  ]
})
export class LoginModule { }
