import { Component, OnInit, Renderer2 } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { InvoiceService } from './services/admin/invoice.service';
import { Observable , of} from 'rxjs'
import { Invoice } from './models/admin/invoice';
import { ClientService } from './services/admin/client.service';
import { Store } from '@ngrx/store';
import { clientIdSelector, companyIdSelector } from './store/reducer/state.reducer';
import { Init } from './store/actions/state.action';
import { Router } from '@angular/router';
import { CommandLineService } from './services/admin/command-line.service';
import { CompanyService } from './services/user/company/company.service';
import { Invetation } from './models/admin/Invetation';
import { InvetationService } from './services/admin/invetation.service';
import { MessageService } from './services/user/message.service';
import { Message } from './models/user/message';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'majesty';
  openedNotification = false
  openedInvetation = false
  openedConversation = false
  invoice$! : Observable<Invoice[]>
  invetation$! : Observable<Invetation[]>
  companyId! : number
  clientId! : number
  conversations : any[]=[]
  user!:string
  logedIn = false
constructor(private invoiceService : InvoiceService, private store : Store, private companyService : CompanyService,
  private clientService : ClientService, private router: Router, private commandService : CommandLineService,
   private invetationService: InvetationService, public messageService : MessageService
  ){

   
}

ngOnInit(): void {
  let token = localStorage.getItem('jwt') ?? ''
    if(token){
      console.log("token ")
      this.user = jwt_decode<any>(token).sub 
      this.logedIn = true
      
      this.companyService.getMyCompanyId()
      this.clientService.getMyClientId()
      this.invoiceService.invoices$ = this.invoice$ = this.invoiceService.getAllInvoiceNotAccepted()
    this.invetation$ = this.invetationService.getAllInvetations()
    
    this.store.select(companyIdSelector).subscribe(x => {
    this.companyId = x
    console.log(x+"company id")
  })
  this.store.select(clientIdSelector).subscribe(x =>{
    this.clientId = x
    console.log(x+"client id")
  })
  this.getAllMyConversation()
}
}



openNotification(){
  this.openedNotification = !this.openedNotification
}

openInvetation(){
  this.openedInvetation = !this.openedInvetation
}

openConversation(){
  this.openedConversation = !this.openedConversation;
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
  this.openedNotification = false
  this.commandService.view = true
  this.commandService.invoice$ = invoice
  this.router.navigate(["my-company/invoice/command"])
  console.log(this.commandService.view)
}

cancelInvoice(id : number){
  this.invoiceService.cancelInvoice(id).subscribe()
  this.openedNotification = false
}

cancelRequestOrDeleteFriend(id : number){
  this.openedInvetation = false
  this.invetationService.cancelRequestOrDeleteFriend(id).subscribe()
}

updateInvoice(invoice : Invoice){
  this.commandService.view = false
  this.openedNotification = false
  this.commandService.invoice$ = invoice
  this.router.navigate(["my-company/invoice/command"])

}

sendMessageButton(message : HTMLInputElement){
  let mes = new Message
  mes.content = message.value
  message.value = ''
  this.messageService.sendMessage(mes).subscribe(x => {
   this.scrollToBottom()
  })
}

getAllMyMessage(user : string){
  this.messageService.receiver = user
  this.messageService.getAllMyMessage().subscribe(x => this.messageService.messages = x)
}

getAllMyConversation(){
  this.messageService.getAllMyConversation().subscribe(x =>{
    this.conversations = x
    console.log(x)
  })
}

display(){
}

openMessanger(user:string){
  this.messageService.show = true
  this.openedConversation = false
  console.log(user) 
  if(this.messageService.show){

    this.getAllMyMessage(user)
    setTimeout(() => {
      this.scrollToBottom();
    },70);
  }

}

scrollToBottom() {
  const container = document.getElementById('messages_container');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

closeMessanger(){
  this.messageService.show = false
  this.messageService.receiver = ''
}

  logout(){
    this.router.navigate(["login"])
    localStorage.clear()
    this.user = ''
    this.store.dispatch(new Init())
    this.logedIn = false
  }
}
