import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthchildGuard  {
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
