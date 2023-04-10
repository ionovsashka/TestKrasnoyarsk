import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataUserPage, UserPage} from "../../../interfaces/user-page/user-page.interfaces";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  host: string = 'https://reqres.in/api'

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${this.host}/users`, {
      params: {
        page: 2,
        delay: 3
      }
    })
  }
  getResources(){
    return this.http.get(`${this.host}/unknown`)
  }

  getUser(id: number){
    return this.http.get<UserPage>(`${this.host}/users/${id}`)
  }

  editUser(user: DataUserPage){
    return this.http.put(`${this.host}/users/${user.id}`, user)
  }

  deleteUser(id: number){
    return this.http.delete(`${this.host}/users/${id}`)
  }
}
