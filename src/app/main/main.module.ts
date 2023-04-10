import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {AuthGuard} from "../shared/services/auth/auth.guard";

const routes: Routes = [
  {path: '', canActivateChild: [AuthGuard], component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
      {path: 'page', loadChildren: () => import('./user-page/user-page.module').then(m => m.UserPageModule)},
    ]}
];

@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class MainModule { }
