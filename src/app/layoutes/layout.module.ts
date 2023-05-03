import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { GuestLayoutComponent } from './guest-layout/guest-layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    UserLayoutComponent,
    GuestLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule { }
