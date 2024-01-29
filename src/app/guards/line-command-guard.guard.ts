import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CommandLineService } from '../services/admin/command-line.service';

export const lineCommandGuardGuard: CanActivateChildFn = (childRoute, state) => {
   const commandLine = inject(CommandLineService);
   const router = inject(Router)

  if(commandLine.view || commandLine.go || commandLine.invoice$ !=null){
    return true
  }
  router.navigate(['my-company/invoice'])
  return false;
}
