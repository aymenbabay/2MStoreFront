import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, catchError, combineLatest, forkJoin, map, of, switchMap, take } from 'rxjs';
import { AdminComponent } from '../../../../modal/admin/admin/admin.component';
import { ProviderService } from '../../../../services/admin/provider.service';
import { Provider } from '../../../../models/admin/provider';
import { LoginService } from '../../../../services/guest/login/login.service';
import { ClientService } from '../../../../services/admin/client.service';
import { Store } from '@ngrx/store';
import { parentIdSelector, providerIdSelector } from '../../../../store/reducer/state.reducer';
import { ProviderModalComponent } from '../../../../modal/admin/provider-modal/provider-modal.component';
import { Router } from '@angular/router';
import { ProviderCompany } from '../../../../models/admin/ProviderCompany';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  providers$!:Observable<ProviderCompany[]>
  allproviders$!: Observable<ProviderCompany[]>
  isAdmin$: Observable<boolean> = of(false);
  myProviderId!: number
  companyId! : number;
  search = false
  constructor(private dialog : MatDialog, private providerService: ProviderService, public loginService : LoginService,
     private store : Store, private router : Router){
   
  }

  ngOnInit(): void {
    this.getCompanyId()
    this.getAllProviders()
    this.providerService.getMyProviderid()
    this.store.select(providerIdSelector).subscribe(x =>{
      this.myProviderId = x
      console.log(x)
    })
  this.providerService.update = false
  this.isAdmin$ = this.isAdmin()
  }
 
  getAllProviders(){
    this.providers$ = this.providerService.getAllMyProviders()
    this.providers$.subscribe(x =>{
      console.log(x[0])
    })
  }

  getAllProviderContaining(searchInput : String){
    this.search = true;
   this.allproviders$ = this.providerService.findAllProviderContaining(searchInput)
    this.allproviders$.subscribe(x => console.log(x))  
  }

  addAsProvider(id : number){
    console.log(id)
    this.providerService.addAsProvider(id).subscribe()
  }

  backToMyProviders(){
    this.search = false
  }

  remove(){
    this.allproviders$ = EMPTY
    console.log("clicked")
  }

  openProviderModal(entity : Provider|null){
    let type = 'provider'
    const dialogRef = this.dialog.open(ProviderModalComponent,
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

  updateProvider(provider : Provider){
    this.providerService.update = true
    this.openProviderModal(provider)
  }

  visitProvider(provider : Provider){
    console.log("visit provider "+ provider.name)
    this.router.navigate([`user/company/${provider.company.id}`])
  }

  deleteProvider( name: String, id : number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.providerService.deleteProvider(id).subscribe(x =>{
        this.ngOnInit()
      })
    }

  }


  isAdmin(): Observable<boolean> {
    return this.loginService.isadmin()
  }

  getCompanyId(){
    this.providerService.getCompanyId().subscribe(x =>{
      this.companyId = x
      console.log(x)
    })
  }


}
