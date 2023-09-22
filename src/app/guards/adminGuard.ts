import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { LoginService } from '../services/guest/login/login.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {
  isAdmin: boolean = false
  token! : string
  constructor(){}
  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = localStorage.getItem('jwt')??''
    if(this.token){
      const decodeToken = jwt_decode<any>(this.token)
      decodeToken.Authorization.forEach((element:any) =>{
        this.isAdmin = element.authority === 'admin'? true: this.isAdmin
        console.log(this.isAdmin)
      })
    }
    if(this.isAdmin){
      return true;
    }
    return false

  }
  
}
