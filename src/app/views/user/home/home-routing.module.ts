import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CompanyComponent } from '../../../components/admin/company/company.component';
import { AllCompanyComponent } from '../../../components/user/all-company/all-company.component';
import { ProfilComponent } from '../../../components/user/profil/profil.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'company/:id', component:CompanyComponent},
  {path:'all-company', component:AllCompanyComponent},
  {path:'my-profil', component:ProfilComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
