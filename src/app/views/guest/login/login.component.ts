import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/guest/login/login.service';
import { CompanyService } from '../../../services/user/company/company.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DatePipe]
})
export class LoginComponent {

  isOffline:boolean=false;
  @HostListener('window:offline', ['$event'])
  isWindowOffline(event:any){
    alert(event)
  }
  loginForm : FormGroup
  constructor(private loginService : LoginService, public fb : FormBuilder, private datePipe : DatePipe, private router : Router,
              private companyService  :CompanyService){
    this.loginForm = this.fb.group({
      'userName':[null, Validators.required],
      'password':[null, Validators.required]
    })
  }

  onSubmit(){
  const val = this.loginForm.value
 this.loginService.login(val).subscribe((data) =>{
    let token = data['token'];
    localStorage.setItem('jwt',token)
    console.log(val)
    this.router.navigate(["user"]) 

 })
  }

 
  dataTransform(date:Date){
    return this.datePipe.transform(date, 'yyyy-MM-dd')
  }
}
