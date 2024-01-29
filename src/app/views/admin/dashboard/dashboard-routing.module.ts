import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminGuard } from '../../../guards/adminGuard';

const routes: Routes = [
  {path:'', component:DashboardComponent},

  {path:'category', loadChildren:()=>import('../../admin/myCompany/category/category.module').then(m=>m.CategoryModule),
  canActivate:[AdminGuard]},
{path:'inventory', loadChildren:()=>import('../../admin/myCompany/inventory/inventory.module').then(m=>m.InventoryModule),
canActivate:[AdminGuard]},
{path:'invoice', loadChildren:()=>import('../../admin/myCompany/invoice/invoice.module').then(m=>m.InvoiceModule)},
{path:'provider', loadChildren:()=>import('../../admin/myCompany/provider/provider.module').then(m=>m.ProviderModule)},
{path:'sous-category', loadChildren:()=>import('../../admin/myCompany/sous-category/sous-category.module')
.then(m=>m.SousCategoryModule), canActivate:[AdminGuard]},
{path:'worker', loadChildren:()=>import('../myCompany/workers/worker.module').then(m=>m.WorkerModule)
,canActivate:[AdminGuard]},
  {path:'client', loadChildren:()=>import('../../admin/myCompany/client/client.module').then(m=>m.ClientModule)},
    {path:'article', loadChildren:()=>import('../../admin/myCompany/article/article.module').then(m=>m.ArticleModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
