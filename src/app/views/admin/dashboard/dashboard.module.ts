import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PaymentModalComponent } from '../../../modal/admin/payment-modal/payment-modal.component';
import { WorkerModalComponent } from '../../../modal/admin/worker-modal/worker-modal.component';
import { OrderByIdComponent } from '../../../components/shared/order-by-id/order-by-id.component';
import { PaymentByIdComponent } from '../../../components/admin/payment-by-id/payment-by-id.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ArticleByIdComponent } from '../../../components/admin/article-by-id/article-by-id.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PaymentModalComponent,
    WorkerModalComponent,
    OrderByIdComponent,
    PaymentByIdComponent,
    ArticleByIdComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class DashboardModule { }
