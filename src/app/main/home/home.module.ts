import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {UserCardModule} from "./components/user-card/user-card.module";
import {ResourceCardModule} from "./components/resource-card/resource-card.module";

const routes: Routes = [
  {path: '', component: HomeComponent}
];


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    UserCardModule,
    ResourceCardModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
