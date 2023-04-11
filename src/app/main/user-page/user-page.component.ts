import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../shared/services/main/home/users.service";
import {ActivatedRoute, Params} from "@angular/router";
import {DataUserPage, UserPage} from "../../shared/interfaces/user-page/user-page.interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../components/alert/alert.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy{

  id!: number
  user!: DataUserPage
  edit!: boolean
  editForm!: FormGroup
  submittingAForm!: boolean

  destroy$ = new Subject()


  constructor(private usersService: UsersService, private route: ActivatedRoute, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.submittingAForm = false
    if(localStorage.getItem('user')){
      this.user = JSON.parse(<string>localStorage.getItem('user'))
      this.id = this.user.id
    } else{
      this.route.queryParams.subscribe((params: Params) => {
        if(!+params.id){
          this.id = (JSON.parse(<string>localStorage.getItem('user')) as DataUserPage).id
        } else{
          this.id = +params.id
        }
        this.getUser(this.id)
      })
    }
  }

  getUser(id: number){
    this.usersService.getUser(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((response:UserPage) => {
      this.user = response.data
      localStorage.setItem('user', JSON.stringify(this.user))
    })
  }

  editPersonalData() {
    this.edit = true
    this.editForm = new FormGroup({
      avatar: new FormControl(this.user.avatar),
      id: new FormControl(this.user.id),
      last_name: new FormControl(this.user.last_name, Validators.required),
      first_name: new FormControl(this.user.first_name, Validators.required),
      email: new FormControl(this.user.email, Validators.required)
    })
  }

  submitEdit() {
    this.submittingAForm = true
    if(this.editForm.invalid){
      return
    }
    this.usersService.editUser(this.editForm.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        localStorage.setItem('user', JSON.stringify(this.editForm.value))
        this.alertService.success('Пользователь успешно изменен')
        this.edit = false
        this.user = JSON.parse(<string>localStorage.getItem('user'))
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
    localStorage.removeItem('user')
  }
}
