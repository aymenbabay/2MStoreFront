import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, forkJoin, map, switchMap } from 'rxjs';
import { AdminComponent } from '../../../../modal/admin/admin/admin.component';
import { ProviderService } from '../../../../services/admin/provider.service';
import { Provider } from '../../../../models/admin/provider';
import { LoginService } from '../../../../services/guest/login/login.service';
import { ClientService } from '../../../../services/admin/client.service';
import { Store } from '@ngrx/store';
import { providerIdSelector } from '../../../../store/reducer/state.reducer';
import { ProviderModalComponent } from '../../../../modal/admin/provider-modal/provider-modal.component';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  providers$!:Observable<Provider[]>
  allproviders$!: Observable<Provider[]>
  myProviderId!: number
  search = false
  constructor(private dialog : MatDialog, private providerService: ProviderService, public loginService : LoginService,
     private store : Store){
   
  }

  ngOnInit(): void {
    this.getAllProviders()
    this.providerService.getMyProviderid()
    this.store.select(providerIdSelector).subscribe(x =>{
      this.myProviderId = x
      console.log(x)
    })
  this.providerService.update = false
  }
 
  getAllProviders(){
    this.providers$ = this.providerService.getAllMyProviders()
    this.providers$.subscribe(x =>{
      console.log(x[0])
    })
  }

  getAllProviderContaining(searchInput : String){
    this.search = true;
   this.allproviders$ = this.providerService.findAllProviderContaining(searchInput).pipe(
    switchMap((providers) => {
      // Create an array of observables for checking client status
      const observables = providers.map(provider => {
        return this.providerService.checkProvider(provider.id).pipe(
          map(isYours => ({
            ...provider,
            myProvider: isYours
          }))
        );
      });

      // Combine all observables into a single observable
      return forkJoin(observables);
    })) 
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
  }

  deleteProvider( name: String, id : number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.providerService.deleteProvider(id).subscribe(x =>{
        this.ngOnInit()
      })
    }

  }

  deleteMyProvider(name:string, id: number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.providerService.deleteMyProvider(id).subscribe(x =>{
        this.ngOnInit()
      })
    }
  }



}
