import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminGuard } from '../../../guards/adminGuard';
import { OrderByIdComponent } from '../../../components/shared/order-by-id/order-by-id.component';
import { PaymentByIdComponent } from '../../../components/admin/payment-by-id/payment-by-id.component';
import { ArticleByIdComponent } from '../../../components/admin/article-by-id/article-by-id.component';

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
  {path:'article', loadChildren:()=>import('../../admin/myCompany/article/article.module').then(m=>m.ArticleModule)},
   {path:'parents', loadChildren:()=>import('../myCompany/parents/parents.module').then(m=>m.ParentsModule)},
   {path:'payment', loadChildren:()=>import('../myCompany/payment/payment.module').then(m=>m.PaymentModule)},
  {path:'order/:id', component:OrderByIdComponent},
  {path:'payment/:id', component:PaymentByIdComponent},
  {path:'article/:id', component:ArticleByIdComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
