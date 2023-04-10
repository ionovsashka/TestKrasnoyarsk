import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Subject, take, takeUntil} from "rxjs";
import {setToken} from "../../../reducers/token";
import {AuthResponse} from "../../../shared/interfaces/auth/auth.interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  error!: string
  loginForm!: FormGroup
  showPassword!: boolean
  submittingAForm!: boolean

  destroy$ = new Subject()

  constructor(private authService: AuthService, private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.submittingAForm = false
    this.showPassword = false
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    this.submittingAForm = true
    if(this.loginForm.invalid){
      return
    }
    this.authService.login(this.loginForm.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: AuthResponse) => {
        this.store.dispatch(setToken({token: response.token}))
        return this.router.navigate(['/'])
      },
      error: (error) => {
        if(error.error.error.includes('user not found')){
          this.error = 'Пользователь с такими данными не найден'
        }
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
