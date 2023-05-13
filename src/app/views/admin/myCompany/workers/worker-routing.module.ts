import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerComponent } from './worker.component';
import { WorkerByIdComponent } from '../../../../components/admin/worker-by-id/worker-by-id.component';

const routes: Routes = [
  {path:'',component:WorkerComponent},
  {path:':id', component:WorkerByIdComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerRoutingModule { }
