import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { CommandLineComponent } from './command-line/command-line.component';

const routes: Routes = [
  {path:'',component:InvoiceComponent},
  {path:'command', component:CommandLineComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
