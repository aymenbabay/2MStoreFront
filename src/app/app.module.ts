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
import { AdminComponent } from './modal/admin/admin/admin.component';
import { MatButtonModule } from '@angular/material/button';
import { CloudinaryModule } from '@cloudinary/ng';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent
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
    CloudinaryModule
  ],
  providers: [httpInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
