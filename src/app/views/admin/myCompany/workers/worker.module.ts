import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerRoutingModule } from './worker-routing.module';
import { WorkerComponent } from './worker.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkerByIdComponent } from '../../../../components/admin/worker-by-id/worker-by-id.component';


@NgModule({
  declarations: [
    WorkerComponent,
    WorkerByIdComponent
  ],
  imports: [
    CommonModule,
    WorkerRoutingModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class WorkerModule { }
