import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SousCategoryRoutingModule } from './sous-category-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { SousCategoryComponent } from './sous-category.component';


@NgModule({
  declarations: [
    SousCategoryComponent
  ],
  imports: [
    CommonModule,
    SousCategoryRoutingModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class SousCategoryModule { }
