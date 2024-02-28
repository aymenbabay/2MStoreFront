import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { loginResponse } from '../../../interface/loginResponse';
import { RegisterService } from '../../../services/guest/register/register.service';
import { AppComponent } from '../../../app.component';


import jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  usernam :string = 'usernam'
  registerForm : FormGroup
  checkpassword = false
  subscription! :Subscription
  noAuthorize = true
  latitude! : number
  longitude! :number
  constructor( public fb : FormBuilder, private registerService : RegisterService, private router : Router, private appComponent : AppComponent){
    this.registerForm = this.fb.group({
      'username':[null, [Validators.required, Validators.minLength(5)]],
      'password':[null, [Validators.required, Validators.minLength(8)]],
      'email':[null, [Validators.required, Validators.email]],
      'address':[null],
      'phone':[null, [ Validators.pattern("^\\d{2}\\s\\d{3}\\s\\d{3}$")]],
      'repassword':[null, Validators.required],
      'latitude':this.latitude,
      'longitude':this.longitude
    })
  }

  ngOnInit(): void {
    
    this.getCurrentLocation()
  }
   checkUserName(){
    let val = this.registerForm.value.userName
    if(val != null){
      console.log('val '+val)
    this.subscription = this.registerService.checkUserName(val).subscribe(data =>
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
 

  register() {
    let val = this.registerForm.value;
    val.longitude = this.longitude
    val.latitude = this.latitude
    this.subscription = this.registerService.signUp(val).subscribe({
      next: (data: loginResponse) => {
        let token = data['token'];
        localStorage.setItem('jwt', token);
        this.appComponent.logedIn = true;
        this.appComponent.user = jwt_decode<any>(token).sub;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              this.noAuthorize = false
              this.latitude = position.coords.latitude
              this.longitude = position.coords.longitude
              console.log(
                'Latitude: ' +
                  position.coords.latitude +
                  'Longitude: ' +
                  position.coords.longitude
              );
              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const location = {
                lat,
                lng,
              };
              resolve(location);
            }
          },
          (error) => console.log(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

ngOnDestroy():void{
  this.subscription.unsubscribe()
  console.log("===================> unsubscribe in ng on destroy in registre component ==================>")
}
  
}