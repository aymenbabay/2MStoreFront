import { Component, HostListener ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/guest/login/login.service';
import { AppComponent } from '../../../app.component';

import jwt_decode from 'jwt-decode';

declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DatePipe]
})
export class LoginComponent implements OnInit{

  isOffline:boolean=false;
  @HostListener('window:offline', ['$event'])
  isWindowOffline(event:any){
    alert(event)
  }
  loginForm : FormGroup
  constructor(private loginService : LoginService, public fb : FormBuilder, private datePipe : DatePipe, private router : Router,
    private appComponent : AppComponent
    ){
    this.loginForm = this.fb.group({
      'username':[null, Validators.required],
      'password':[null, Validators.required]
    })
  }

  ngOnInit(): void {
    FB.init({
      appId: '103879366037944',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v11.0'
    });
  }
  loginWithFacebook(): void {
    // Use the Facebook SDK to request the user's permission to access their profile information
    FB.login((response: any) => {
      if (response.authResponse) {
        const token = response.authResponse.accessToken;
        console.log(token); // Log the access token to the console
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email' });
  }


  onSubmit(){
  const val = this.loginForm.value
 this.loginService.login(val).subscribe(data =>{
  let token = data['token'];
  localStorage.setItem('jwt',token)
  this.router.navigate(["user"]) 
  this.appComponent.logedIn = true
  this.appComponent.user = jwt_decode<any>(token).sub
})
  }


 
  dataTransform(date:Date){
    return this.datePipe.transform(date, 'yyyy-MM-dd')
  }
}
