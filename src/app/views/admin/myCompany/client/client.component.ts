import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../models/admin/client';
import { AdminComponent } from '../../../../modal/admin/admin/admin.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../../../services/admin/client.service';
import { LoginService } from '../../../../services/guest/login/login.service';
import { ClientModalComponent } from '../../../../modal/admin/client-modal/client-modal.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients!:Observable<Client[]>
  clients$!:Observable<Client[]>

  constructor(private dialog : MatDialog, private clientService: ClientService, public loginService : LoginService){

  }

  ngOnInit(): void {
    this.getAllMyClients()
    this.getAllClients()
  }

  getAllMyClients(){
    this.clients = this.clientService.getAllMyClients()

  }

  getAllClients(){
    this.clients$ = this.clientService.getAllClients()
  }

  addExistClient($event:any){
    const conf = window.confirm(`are you sure to add ${$event.target.value} !!`)
    if(conf){
      this.clientService.addExistClient($event.target.value).subscribe(x =>{
        this.ngOnInit()
      })
    }
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

  deleteClientServer( name: String, id : number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.clientService.deleteClient(id).subscribe(x =>{
        this.ngOnInit()
      })
     
    }

  }


}
