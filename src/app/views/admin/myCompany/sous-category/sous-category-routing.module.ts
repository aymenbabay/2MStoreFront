import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SousCategoryComponent } from './sous-category.component';

const routes: Routes = [
  {path:'',component:SousCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SousCategoryRoutingModule { }
