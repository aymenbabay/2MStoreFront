import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CompanyComponent } from '../../../components/admin/company/company.component';
import { AllCompanyComponent } from '../../../components/user/all-company/all-company.component';
import { ProfilComponent } from '../../../components/user/profil/profil.component';
import { AuthGuard } from '../../../guards/auth.guard';
import { OrderByIdComponent } from '../../../components/shared/order-by-id/order-by-id.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'company/:id', component:CompanyComponent},
  {path:'all-company', component:AllCompanyComponent},
  {path:'my-profil', component:ProfilComponent},
  {path:'my-order', loadChildren:()=>import('../order/order.module').then(m=>m.OrderModule),
  canActivate:[AuthGuard]},
  {path:'order/:id', component:OrderByIdComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
