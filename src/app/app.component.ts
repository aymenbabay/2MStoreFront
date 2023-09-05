import { AfterViewInit, Component, OnInit } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { InvoiceService } from './services/admin/invoice.service';
import { ClientInvoice } from './models/admin/ClientInvoice';
import { Observable , of} from 'rxjs'
import { Invoice } from './models/admin/invoice';
import { ProviderService } from './services/admin/provider.service';
import { ClientService } from './services/admin/client.service';
import { Store } from '@ngrx/store';
import { clientIdSelector, providerIdSelector } from './store/reducer/state.reducer';
import { Init } from './store/actions/state.action';
import { Router } from '@angular/router';
import { CommandLineService } from './services/admin/command-line.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'majesty';
  openedNotification = false
  invoice$! : Observable< ClientInvoice[]>
  providerId! : number
  clientId! : number

  user!:string
  logedIn = false
constructor(private invoiceService : InvoiceService, private store : Store, private providerService : ProviderService,
  private clientService : ClientService, private router: Router, private commandService : CommandLineService
  ){

    let token = localStorage.getItem('jwt') ?? ''
  if(token){
    console.log("token ")
    this.user = jwt_decode<any>(token).sub 
    this.logedIn = true
  }
  
  this.providerService.getMyProviderid()
  this.clientService.getMyClientId()
   this.invoice$ = invoiceService.getAllInvoiceNotAccepted()

}

ngOnInit(): void {
  
  this.store.select(providerIdSelector).subscribe(x => {
    this.providerId = x
    console.log(x)
  })
  this.store.select(clientIdSelector).subscribe(x =>{
    this.clientId = x
    console.log(x)
  })

}


openNotification(){
  this.openedNotification = !this.openedNotification
}

InvoiceStatus(status : string,invoiceCode : number){
  this.openedNotification = false;
  this.invoiceService.InvoiceStatus(status,invoiceCode).subscribe()
}


review(invoice : ClientInvoice){
  this.commandService.clientAddress = invoice.clientAddress;
  this.commandService.clientPhone = invoice.clientPhone;
  this.commandService.clientName = invoice.clientName;
  this.commandService.factureCode = of(invoice.invoice)
  this.commandService.invoiceDate = invoice.invoiceDate
  this.commandService.providerAddress = invoice.providerAddress
  this.commandService.providerPhone = invoice.providerPhone
  this.commandService.providerMatriculeFiscal = invoice.providerMatriculeFiscal
  this.commandService.clientMatriculeFiscal = invoice.clientMatriculeFiscal;
  this.commandService.invoiceId = invoice.invoiceId
  this.commandService.view = true
  this.openedNotification = false
  this.router.navigate(["my-company/invoice/command"])
}

  logout(){
    this.router.navigate(["login"])
    localStorage.clear()
    this.user = ''
    this.store.dispatch(new Init())
    this.logedIn = false
  }
}
