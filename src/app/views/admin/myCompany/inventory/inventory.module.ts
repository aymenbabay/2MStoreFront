import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class InventoryModule { }
