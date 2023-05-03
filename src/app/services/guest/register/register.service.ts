import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { loginResponse } from '../../../interface/loginResponse';
import { SignUp } from '../../../models/user/signup';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 

  public formData: FormGroup ;

  constructor(private http : HttpClient, private fb : FormBuilder) { 
    this.formData = this.fb.group({
      userName: ['example@example.com'],
      password: ['password'],
      email: ['email'],
      phone: ['phone'],
      repassword: ['repassword']
    });
  }
  checkUserName(username: string):Observable<any>{
    return this.http.get(`api/auth/username/${username}`)
  }

  signUp(user: SignUp):Observable<loginResponse>{
    return this.http.post<loginResponse>("api/auth/register",user)
         
  }

 
}
