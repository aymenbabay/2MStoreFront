import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { LoginService } from '../services/guest/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class HasCompanyGuard implements CanActivateChild {
  isAdmin = false
  constructor(private router : Router, private loginService : LoginService){}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let has_company = localStorage.getItem('has_company')
    
      const token = localStorage.getItem('jwt')
      if(token){

        const decodedToken = jwt_decode<any>(token);
        localStorage.setItem('user',decodedToken.sub)
        decodedToken.Authorization.forEach((element:any) => {
          this.isAdmin = element.authority === 'admin' ? true : this.isAdmin;
          this.loginService.isAdmin = this.isAdmin
          console.log(this.isAdmin)
        })
      }
      if(has_company==='true' || this.isAdmin ){
        return true;
        
      }
      this.router.navigate(['user'])
      return false;
  }
  
}
