import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {AuthValidator} from "../../../shared/validators/auth-validator";
import {Router} from "@angular/router";
import {AlertService} from "../../../components/alert/alert.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  error!: string
  registrationForm!: FormGroup
  showPassword!: boolean
  submittingAForm!: boolean

  destroy$ = new Subject()

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    this.submittingAForm = false
    this.showPassword = false
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, AuthValidator.correctLogin]),
      password: new FormControl('', Validators.required)
    })
  }

  registration() {
    this.submittingAForm = true
    if(this.registrationForm.invalid){
      return
    }
    this.authService.registration(this.registrationForm.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.alertService.success('Регистрация прошла успешно')
        return this.router.navigate(['/auth/login'])
      },
      error: () => {
        this.alertService.error('Некорректные данные для регистрации')
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
