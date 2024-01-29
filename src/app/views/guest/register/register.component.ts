import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { loginResponse } from '../../../interface/loginResponse';
import { RegisterService } from '../../../services/guest/register/register.service';
import { AppComponent } from '../../../app.component';


import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  usernam :string = 'usernam'
  registerForm : FormGroup
  checkpassword = false
  constructor( public fb : FormBuilder, private registerService : RegisterService, private router : Router, private appComponent : AppComponent){
    this.registerForm = this.fb.group({
      'username':[null, [Validators.required, Validators.minLength(5)]],
      'password':[null, [Validators.required, Validators.minLength(8)]],
      'email':[null, [Validators.required, Validators.email]],
      'address':[null],
      'phone':[null, [ Validators.pattern("^\\d{2}\\s\\d{3}\\s\\d{3}$")]],
      'repassword':[null, Validators.required]
    })
  }

   checkUserName(){
    let val = this.registerForm.value.userName
    if(val != null){
      console.log('val '+val)
    this.registerService.checkUserName(val).subscribe(data =>
      {
        if(data){
          this.usernam = "username"
        }else{
          this.usernam="usernam"
        }
      })
    }
  }

  checkRePassword(){
    let password = this.registerForm.value.password;
    let repassword = this.registerForm.value.repassword;
    if(password === repassword && password != null){
      this.checkpassword = true
    }else{
      this.checkpassword = false
    }
  }
  register(){
   let val = this.registerForm.value
   this.registerService.signUp(val).subscribe((data:loginResponse) => {
    let token = data['token'];
    localStorage.setItem('jwt',token)
   this.appComponent.logedIn = true
    this.appComponent.user = jwt_decode<any>(token).sub
    this.router.navigate(['/home'])
   }, (error) =>{
    console.log(error)
   });
   
  }

}