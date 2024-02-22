import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../models/admin/client';
import { EMPTY, Observable, catchError, combineLatest, forkJoin, map, of, switchMap, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../../../services/admin/client.service';
import { LoginService } from '../../../../services/guest/login/login.service';
import { ClientModalComponent } from '../../../../modal/admin/client-modal/client-modal.component';
import { clientIdSelector, parentIdSelector } from '../../../../store/reducer/state.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ClientCompany } from '../../../../models/admin/ClientCompnay';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  MyClients!:Observable<ClientCompany[]>
  clients$:Observable<ClientCompany[]> = EMPTY
  isAdmin$: Observable<boolean> = of(false);
  search = false
  isClientResult = false
  myClientId! : number
  companyId! : number;
  constructor(private dialog : MatDialog, private clientService: ClientService, public loginService : LoginService,
    private store : Store, private router : Router){

  }

  ngOnInit(): void {
    this.getMyCompanyId()
    this.getAllMyClients()
    this.store.select(clientIdSelector).subscribe(x =>{
      this.myClientId = x
      console.log(x)
    })
    this.isAdmin$ = this.isAdmin()
  }

  getAllMyClients(){
    this.MyClients = this.clientService.getAllMyClients()
  }

  getAllClientContaining(value : string ){
    this.search = true;
    this.clients$ = this.clientService.getAllClientContaining(value)
  }
  
    
  addAsClient(id : number){
    this.clientService.addAsClient(id).subscribe();
  }
  


  backToMyClients(){
    this.search = false
  }


  openClientModal(entity : Client|null){
    let type = 'client'
    const dialogRef = this.dialog.open(ClientModalComponent,
      {
        data: { entity , type},
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
     dialogRef.afterClosed().subscribe(result => {
      if (result !== "undefined") {
        this.ngOnInit()
      }
     });
  }

  isAdmin(): Observable<boolean> {
    return this.loginService.isadmin()
  }

  updateClientServer(client : Client){
    this.clientService.update = true
    console.log(client)
    this.openClientModal(client)
  }

  visitClient(client : Client){
    console.log("visit this client "+client.name)
    this.router.navigate([`user/company/${client.company.id}`])
  }
  deleteClientServer( name: String, id : number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.clientService.deleteClient(id).subscribe(x =>{
        this.ngOnInit()
      })
     
    }

  }

  getMyCompanyId(){
    this.clientService.getCompanyId().subscribe(x =>{
      this.companyId = x
      console.log(x)
    })
  }


}
