import { AfterViewInit, Component, OnInit } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { InvoiceService } from './services/admin/invoice.service';
import { Observable , of} from 'rxjs'
import { Invoice } from './models/admin/invoice';
import { ProviderService } from './services/admin/provider.service';
import { ClientService } from './services/admin/client.service';
import { Store } from '@ngrx/store';
import { clientIdSelector, companyIdSelector, providerIdSelector } from './store/reducer/state.reducer';
import { Init } from './store/actions/state.action';
import { Router } from '@angular/router';
import { CommandLineService } from './services/admin/command-line.service';
import { CompanyService } from './services/user/company/company.service';
import { Invetation } from './models/admin/Invetation';
import { InvetationService } from './services/admin/invetation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'majesty';
  openedNotification = false
  openedInvetation = false
  invoice$! : Observable<Invoice[]>
  invetation$! : Observable<Invetation[]>
  companyId! : number
  clientId! : number

  user!:string
  logedIn = false
constructor(private invoiceService : InvoiceService, private store : Store, private companyService : CompanyService,
  private clientService : ClientService, private router: Router, private commandService : CommandLineService,
   private invetationService: InvetationService
  ){

    let token = localStorage.getItem('jwt') ?? ''
  if(token){
    console.log("token ")
    this.user = jwt_decode<any>(token).sub 
    this.logedIn = true
  }
  
  this.companyService.getMyCompanyId()
  this.clientService.getMyClientId()
   this.invoiceService.invoices$ = this.invoice$ = invoiceService.getAllInvoiceNotAccepted()
   this.invoice$.subscribe((x:Invoice[]) =>{console.log(x[0])})
  this.invetation$ = invetationService.getAllInvetations()
  this.invetation$.subscribe(x =>console.log(x[0]))

}

ngOnInit(): void {
  
  this.store.select(companyIdSelector).subscribe(x => {
    this.companyId = x
    console.log(x+"company id")
  })
  this.store.select(clientIdSelector).subscribe(x =>{
    this.clientId = x
    console.log(x+"client id")
  })

}


openNotification(){
  this.openedNotification = !this.openedNotification
}

openInvetation(){
  this.openedInvetation = !this.openedInvetation
}

InvoiceStatus(status : string,invoiceCode : number){
  this.openedNotification = false;
  this.invoiceService.InvoiceStatus(status,invoiceCode).subscribe()
}

requestResponse(status : string,invetationId:number){
  console.log(status,invetationId)
  this.openedInvetation = false
    this.invetationService.requestResponse(status, invetationId).subscribe(x =>console.log(x))
 
}


review(invoice : Invoice){
  // this.commandService.clientAddress = invoice.clientAddress;
  // this.commandService.clientPhone = invoice.clientPhone;
  // this.commandService.clientName = invoice.clientName;
  // this.commandService.factureCode = of(invoice.invoice)
  // this.commandService.invoiceDate = invoice.invoiceDate
  // this.commandService.providerAddress = invoice.providerAddress
  // this.commandService.providerPhone = invoice.providerPhone
  // this.commandService.providerMatriculeFiscal = invoice.providerMatriculeFiscal
  // this.commandService.clientMatriculeFiscal = invoice.clientMatriculeFiscal;
  // this.commandService.invoiceId = invoice.invoiceId
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
