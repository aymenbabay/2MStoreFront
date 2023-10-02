
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';


export const AuthGuard :CanActivateFn = (childRoute, state) => {
  const router = inject(Router)
      let has = localStorage.getItem('jwt')
      if(has){
        return true;
        
      }
      router.navigate(['/guest'])
      return false; 
  
  
}
