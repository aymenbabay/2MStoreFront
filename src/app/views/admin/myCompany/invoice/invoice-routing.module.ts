import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { CommandLineComponent } from './command-line/command-line.component';
import { lineCommandGuardGuard } from '../../../../guards/line-command-guard.guard';

const routes: Routes = [
  {path:'',component:InvoiceComponent},
  {path:'command', component:CommandLineComponent,canActivate: [lineCommandGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
