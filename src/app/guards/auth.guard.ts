import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let has = localStorage.getItem('jwt')
     // let has = localStorage.getItem('has_company')
      console.log(has)
      if(has){
        return true;
        
      }
      this.router.navigate(['/guest'])
      return false; 
  }
  
}
