import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthchildGuard } from './guards/authchild.guard';
import { AdminLayoutComponent } from './layoutes/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './layoutes/guest-layout/guest-layout.component';
import { UserLayoutComponent } from './layoutes/user-layout/user-layout.component';
import { HasCompanyGuard } from './guards/has-company.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: '/guest', pathMatch: 'full'},

  {path:"guest",component:GuestLayoutComponent,
  canActivateChild:[AuthchildGuard],
    children:[
      {path:'', loadChildren:()=>import('./views/guest/login/login.module').then(m=>m.LoginModule)}
    ]},

  {path:"my-company",component:AdminLayoutComponent,
  canActivateChild:[HasCompanyGuard],
  children:[
    {path:'', loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  ]},

  {path:"user",component:UserLayoutComponent,
  canActivate:[AuthGuard],
  children:[
    {path:'',loadChildren:()=>import('./views/user/home/home.module').then(m=>m.HomeModule)},
  ]},
  {path: '**', redirectTo: '/guest', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
