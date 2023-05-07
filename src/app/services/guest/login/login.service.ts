import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../../models/user/user';
import { loginResponse } from '../../../interface/loginResponse';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  public formData: FormGroup ;
  loginresponse! : loginResponse
  baseUrl = 'api/auth/'
  isAdmin = false
  token!: string|null
  constructor(private http : HttpClient, private fb : FormBuilder) {
    this.formData = this.fb.group({
      userName: ['example@example.com'],
      password: ['password']
    });
   }

  login(data:User):Observable<loginResponse>{
   return this.http.post<loginResponse>(`${this.baseUrl}authentication`, data)
  }

  forget():Observable<Object>{
    return this.http.get(`${this.baseUrl}users/verif/aymen1/password`)
  }

  searchUser(search: string):Observable<any> {
    return this.http.get(`${this.baseUrl}get/${search}`)
  }

  refreshToken():Observable<any>{
    this.getToken()
    this.admin()
   return this.http.post(`${this.baseUrl}refresh`,this.token)
  }
  admin():boolean{

    return this.isAdmin
  }

  getToken(){
    this.token = localStorage.getItem('jwt')
  }
}
