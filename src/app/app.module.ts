import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from './interceptors/httpInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layoutes/layout.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CloudinaryModule } from '@cloudinary/ng';
import {  MatIconModule } from '@angular/material/icon';
import { InfoComponent } from './modal/admin/info/info.component';

import { StoreModule } from '@ngrx/store';
import { reducers } from './store/store';
import { ArticleModalComponent } from './modal/admin/article-modal/article-modal.component';
import { ProviderModalComponent } from './modal/admin/provider-modal/provider-modal.component';
import { ClientModalComponent } from './modal/admin/client-modal/client-modal.component';
import { InvoiceModalComponent } from './modal/admin/invoice-modal/invoice-modal.component';
import { CommandLineModalComponent } from './modal/admin/command-line-modal/command-line-modal.component';
import { CategoryModalComponent } from './modal/admin/category-modal/category-modal.component';
import { SubCategoryModalComponent } from './modal/admin/sub-category-modal/sub-category-modal.component';
import { PurchaseOrderModalComponent } from './modal/user/bon-decommand-modal/bon-decommand-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    ArticleModalComponent,
    ProviderModalComponent,
    ClientModalComponent,
    InvoiceModalComponent,
    CommandLineModalComponent,
    CategoryModalComponent,
    SubCategoryModalComponent,
    PurchaseOrderModalComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CloudinaryModule,
    StoreModule.forRoot(reducers),
    NgxPaginationModule
  ],
  providers: [httpInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
