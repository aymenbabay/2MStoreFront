import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderComponent } from './provider.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ProviderComponent
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class ProviderModule { }
