import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../../shared/services/main/home/users.service";
import {User} from "../../../shared/interfaces/home/home.interfaces";
import {AlertService} from "../../../components/alert/alert.service";
import {Store} from "@ngrx/store";
import {clearToken} from "../../../reducers/token";
import {Router} from "@angular/router";
import {ResourceData} from "../../../shared/interfaces/resource-page/resource-page.interfaces";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  users!: Array<User>
  resources!: Array<ResourceData>

  destroy$ = new Subject()

  constructor(private usersService: UsersService, private alertService: AlertService, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.getUsers()
    this.getResources()
  }

  getUsers(){
    this.usersService.getUsers().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: any) => {
        this.users = response.data
      }
    })
  }

  getResources(){
    this.usersService.getResources().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: any) => {
        this.resources = response.data
        console.log(this.resources)
      }
    })
  }

  deleteUser($event: number) {
    this.usersService.deleteUser($event).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.users = this.users.filter(elem => elem.id !== $event)
        this.alertService.success('Пользователь был успешно удален')
      },
      error: () => {
        this.alertService.error('Ошибка связи с сервером')
      }
    })
  }

  logout() {
    localStorage.clear()
    this.store.dispatch(clearToken())
    return this.router.navigate(['/auth/login'])
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
