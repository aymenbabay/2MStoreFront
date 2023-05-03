import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddcompanyRoutingModule } from './addcompany-routing.module';
import { AddcompanyComponent } from './addcompany.component';


@NgModule({
  declarations: [
    AddcompanyComponent
  ],
  imports: [
    CommonModule,
    AddcompanyRoutingModule
  ]
})
export class AddcompanyModule { }
