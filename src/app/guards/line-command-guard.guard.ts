import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CommandLineService } from '../services/admin/command-line.service';

export const lineCommandGuardGuard: CanActivateChildFn = (childRoute, state) => {
   const commandLine = inject(CommandLineService);

  if(commandLine.view || commandLine.go || commandLine.invoice$ !=null){
    return true
  }
  const router = inject(Router)
  router.navigate(['my-company/invoice'])
  return false;
};
