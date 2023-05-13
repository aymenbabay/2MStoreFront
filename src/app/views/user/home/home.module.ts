import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { AddCompanyModalComponent } from '../../../modal/user/add-company-modal/add-company-modal.component';
import { CompanyComponent } from '../../../components/admin/company/company.component';
import { AllCompanyComponent } from '../../../components/user/all-company/all-company.component';

@NgModule({
  declarations: [ 
    HomeComponent,
    AddCompanyModalComponent,
    CompanyComponent,
    AllCompanyComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
     FormsModule,
     ReactiveFormsModule,
     MatButtonModule
  ]
})
export class HomeModule { }
