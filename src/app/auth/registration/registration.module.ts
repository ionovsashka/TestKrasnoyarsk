import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import {RouterModule, Routes} from "@angular/router";
import {InputModule} from "../../components/input/input.module";
import {FormModule} from "../../shared/modules/form.module";

const routes: Routes = [
  {path: '', component: RegistrationComponent}
];

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    FormModule,
    RouterModule.forChild(routes)
  ]
})
export class RegistrationModule { }
