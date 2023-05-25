import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AdminComponent } from '../../../../modal/admin/admin/admin.component';
import { ProviderService } from '../../../../services/admin/provider.service';
import { Fournisseur } from '../../../../models/admin/fournisseur';
import { LoginService } from '../../../../services/guest/login/login.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  providers$!:Observable<Fournisseur[]>
  providers!:Observable<Fournisseur[]>
  constructor(private dialog : MatDialog, private providerService: ProviderService, public loginService : LoginService){
   
  }

  ngOnInit(): void {
    this.getAllProviders()
    this.getAllMyProviders()
  }
  
  getAllProviders(){
    this.providers$ = this.providerService.getAllProviders()
  }
  
  getAllMyProviders(){
    this.providers = this.providerService.getAllMyProviders()

  }

  openProviderModal(entity : Fournisseur|null){
    let type = 'provider'
    const dialogRef = this.dialog.open(AdminComponent,
      {
        data: { entity, type },
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
     dialogRef.afterClosed().subscribe(result => {
      if (result !== "undefined") {
        this.ngOnInit()
      }
     });
  }

  
  addExistProvider($event:any){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.providerService.addExistProvider($event.target.value).subscribe(x =>{
        this.ngOnInit()
      })
    }

  }

  updateProviderServer(provider : Fournisseur){
    this.providerService.update = true
    this.openProviderModal(provider)
  }

  deleteProviderServer( name: String, id : number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.providerService.deleteProvider(id).subscribe(x =>{
        this.ngOnInit()
      })
    }

  }



}
