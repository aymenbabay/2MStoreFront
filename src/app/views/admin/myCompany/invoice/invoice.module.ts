import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { CommandLineComponent } from './command-line/command-line.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  providers: [DatePipe],
  declarations: [
    InvoiceComponent,
    CommandLineComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    FormsModule
  ]
})
export class InvoiceModule { }
