import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../shared/services/main/home/users.service";
import {User} from "../../../shared/interfaces/home/home.interfaces";
import {AlertService} from "../../../components/alert/alert.service";
import {Store} from "@ngrx/store";
import {clearToken} from "../../../reducers/token";
import {Router} from "@angular/router";
import {ResourceData} from "../../../shared/interfaces/resource-page/resource-page.interfaces";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users!: Array<User>
  resources!: Array<ResourceData>

  constructor(private usersService: UsersService, private alertService: AlertService, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.getUsers()
    this.getResources()
  }

  getUsers(){
    this.usersService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response.data
      }
    })
  }

  getResources(){
    this.usersService.getResources().subscribe({
      next: (response: any) => {
        this.resources = response.data
        console.log(this.resources)
      }
    })
  }

  deleteUser($event: number) {
    this.usersService.deleteUser($event).subscribe({
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
}
