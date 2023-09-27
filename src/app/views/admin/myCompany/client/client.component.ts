import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../models/admin/client';
import { EMPTY, Observable, forkJoin, map, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../../../services/admin/client.service';
import { LoginService } from '../../../../services/guest/login/login.service';
import { ClientModalComponent } from '../../../../modal/admin/client-modal/client-modal.component';
import { clientIdSelector } from '../../../../store/reducer/state.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  MyClients!:Observable<Client[]>
  clients$:Observable<Client[]> = EMPTY
  search = false
  isClientResult = false
  myClientId! : number
  constructor(private dialog : MatDialog, private clientService: ClientService, public loginService : LoginService,
    private store : Store){

  }

  ngOnInit(): void {
    this.getAllMyClients()
    this.store.select(clientIdSelector).subscribe(x =>{
      this.myClientId = x
      console.log(x)
    })
  }

  getAllMyClients(){
    this.MyClients = this.clientService.getAllMyClients()

  }

  getAllClientContaining(value : string){
    this.search = true
   this.clients$ = this.clientService.getAllClientContaining(value).pipe(
      switchMap(clients => {
        // Create an array of observables for checking client status
        const observables = clients.map(client => {
          return this.clientService.checkClient(client.id).pipe(
            map(isYours => ({
              ...client,
              myClient: isYours
            }))
          );
        });

        // Combine all observables into a single observable
        return forkJoin(observables);
      })
    );
  }
    
  addAsClient(id : number){
    this.clientService.addAsClient(id).subscribe();
  }
  

  isClient(client : Client) {
    
    this.clientService.checkClient(client.id).subscribe()
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


  updateClientServer(client : Client){
    this.clientService.update = true
    console.log(client)
    this.openClientModal(client)
  }

  visitClient(client : Client){
    console.log("visit this client "+client.name)
  }
  deleteClientServer( name: String, id : number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.clientService.deleteClient(id).subscribe(x =>{
        this.ngOnInit()
      })
     
    }

  }


}
