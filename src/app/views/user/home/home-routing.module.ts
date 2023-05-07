import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CompanyComponent } from '../../../components/company/company.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'add-company',loadChildren:()=>import('../../user/addcompany/addcompany.module').then(m=>m.AddcompanyModule)},
  {path:':id', component:CompanyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
