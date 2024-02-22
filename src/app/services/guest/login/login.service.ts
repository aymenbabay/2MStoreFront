import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { User } from '../../../models/user/user';
import { loginResponse } from '../../../interface/loginResponse';


import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { Company } from '../../../models/user/company';
import { Store } from '@ngrx/store';
import { companyIdSelector, parentIdSelector } from '../../../store/reducer/state.reducer';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  public formData: FormGroup ;
  loginresponse! : loginResponse
  baseUrl = 'api/auth/'
  isAdmin = false
  role = ""
  token!: string|null
  
  constructor(private http : HttpClient, private fb : FormBuilder, private router : Router,private store : Store) {
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
    this.rolefunc()
   return this.http.post(`${this.baseUrl}refresh`,this.token)
  }
  rolefunc():string{
    this.getToken();
    if(this.token){
      const decodedToken = jwt_decode<any>(this.token);
      switch (decodedToken.Authorization[0].authority){
        case "ADMIN":
        this.role = "ADMIN";
        break;
        case "WORKER":
          this.role = "WORKER"
          break
      }
    }
    return this.role
  }

  admin():boolean{
    this.role = this.rolefunc()
 if(this.role == "ADMIN"){
  this.isAdmin = true;
 }
 console.log(this.isAdmin)
 return this.isAdmin
  }

  isadmin(): Observable<boolean> {
    return this.store.select(companyIdSelector).pipe(
      switchMap(companyId => {
        return this.store.select(parentIdSelector).pipe(
          map(parentId => {
            if (!this.admin()) {
              console.log("parent id : "+parentId +" companyid : "+ companyId)
              return false;
            }
            if (parentId !== 0 && companyId !== parentId) {
              console.log("parent id : "+parentId +" companyid : "+ companyId)
              return false;
            }
            console.log("parent id : "+parentId +" companyid : "+ companyId)
            return true;
          })
        );
      })
    );
  }
  
  getToken(){
    this.token = localStorage.getItem('jwt')
  }
}
