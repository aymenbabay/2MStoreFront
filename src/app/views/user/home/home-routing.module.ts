import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CompanyComponent } from '../../../components/company/company.component';
import { AllCompanyComponent } from '../../../components/all-company/all-company.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'add-company',loadChildren:()=>import('../../user/addcompany/addcompany.module').then(m=>m.AddcompanyModule)},
  {path:'company/:id', component:CompanyComponent},
  {path:'all-company', component:AllCompanyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
