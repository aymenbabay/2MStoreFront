import { Component } from '@angular/core';

import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'majesty';
  user!:string
constructor(){
  let token = localStorage.getItem('jwt') ?? ''
  if(token)
  this.user = jwt_decode<any>(token).sub 
}
  logout(){
    localStorage.clear()
    this.user = ''
  }
}
