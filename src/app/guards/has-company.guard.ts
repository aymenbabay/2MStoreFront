
import jwt_decode from 'jwt-decode';
import { LoginService } from '../services/guest/login/login.service';
import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const HasCompanyGuard: CanActivateChildFn = (childRoute, state) => {
   const loginService = inject(LoginService);
   const router = inject(Router)
   let token ;
   token = localStorage.getItem('jwt')??""
   const decodedToken = jwt_decode<any>(token);
  if(decodedToken.Authorization[0].authority === "ADMIN" || decodedToken.Authorization[0].authority === "WORKER"){
   // loginService.isAdmin = true
    return true
  }
  router.navigate(['user'])
  return false;
}
