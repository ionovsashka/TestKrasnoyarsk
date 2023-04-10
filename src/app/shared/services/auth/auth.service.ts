import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthInterface, AuthResponse} from "../../interfaces/auth/auth.interfaces";
import {select, Store} from "@ngrx/store";
import {tokenSelector} from "../../../reducers/token";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host: string = 'https://reqres.in/api'

  constructor(private http: HttpClient, private store: Store) { }

  isAuth$ = this.store.pipe(
    select(tokenSelector),
    map(authData => !!authData)
  )

  login(loginForm: AuthInterface){
    return this.http.post<AuthResponse>(`${this.host}/login`, loginForm)
  }

  registration(registrationForm: AuthInterface){
    return this.http.post(`${this.host}/register`, registrationForm)
  }
}
