
import { inject } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router, CanActivateFn } from '@angular/router';

export const AdminGuard :CanActivateFn = (childRoute, state) => {
  const router = inject(Router)
  let token;
  token = localStorage.getItem('jwt')??''
    const decodeToken = jwt_decode<any>(token)
    console.log(decodeToken.Authorization[0].authority)
   if(decodeToken.Authorization[0].authority === "ADMIN"){
    return true
   }
   
   router.navigate(['user'])
  return false
  
  
}
