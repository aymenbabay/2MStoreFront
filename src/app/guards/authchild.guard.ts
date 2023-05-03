import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthchildGuard implements CanActivateChild {
  constructor(private router : Router){}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      let token = localStorage.getItem('jwt')
      if(token){
        this.router.navigate(['/user'])
        return false;
        
      }
      return true;
  }
  
}
