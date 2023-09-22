
import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';



export const AuthchildGuard :CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
 
      let token = localStorage.getItem('jwt')
      if(token){
        router.navigate(['/user'])
        console.log("auth chiled guard false")
        return false;
        
      }
      console.log("auth chiled guard true ")
      return true;
  
  
}
