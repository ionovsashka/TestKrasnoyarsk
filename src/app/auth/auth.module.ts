import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
      {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
      {path: 'registration', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)}
    ]}
];

@NgModule({
  declarations: [
    AuthLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
