import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { InvoiceService } from './services/admin/invoice.service';
import { EMPTY, Observable , of} from 'rxjs'
import { Invoice } from './models/admin/invoice';
import { ClientService } from './services/admin/client.service';
import { Store } from '@ngrx/store';
import { clientIdSelector, companyIdSelector } from './store/reducer/state.reducer';
import { CompanyId, Init, ParentId } from './store/actions/state.action';
import { Router } from '@angular/router';
import { CommandLineService } from './services/admin/command-line.service';
import { CompanyService } from './services/user/company/company.service';
import { Invetation } from './models/admin/Invetation';
import { InvetationService } from './services/admin/invetation.service';
import { MessageService } from './services/user/message.service';
import { Message } from './models/user/message';
import { LoginService } from './services/guest/login/login.service';
import { PurchaseOrderService } from './services/user/purchase-order.service';
import { PurchaseOrder } from './models/user/PurchaseOrder';
import { Type } from './enums/Type';
import { Company } from './models/user/company';
import { ProviderService } from './services/admin/provider.service';
import { OrderDelivery } from './models/user/OrderDelivery';
import { OrderDeliveryService } from './services/shared/order-delivery.service';
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
  openedShopping = false
  openedCompanies = false
  invoice$! : Observable<Invoice[]>
  invetation$! : Observable<Invetation[]>
  shopping$! : Observable<PurchaseOrder[]>
  orders$!   : Observable<OrderDelivery[]>
  companies$  :Observable<Company[]> = of([])
  companyId! : number
  clientId! : number
  conversations : any[]=[]
  user!:string
  logedIn = false
  type = Type
  hasCompany = false
constructor(private invoiceService : InvoiceService, private store : Store, private companyService : CompanyService, private orderDeliveryService : OrderDeliveryService,
  private clientService : ClientService, private router: Router, private commandService : CommandLineService,private providerService : ProviderService,
   private invetationService: InvetationService, public messageService : MessageService, private loginService : LoginService, private purchaseOrderService : PurchaseOrderService
  ){
    
   
}

ngOnInit(): void {
  let token = localStorage.getItem('jwt') ?? ''
    if(token){
      this.user = jwt_decode<any>(token).sub 
      this.logedIn = true
      if(this.companyService.checkCompany()){
        console.log("check company true")
        this.hasCompany = true
        this.companyService.getMyCompanyId()
        this.clientService.getMyClientId()
        this.providerService.getMyProviderid()
        this.invoiceService.invoices$ = this.invoice$ = this.invoiceService.getAllInvoiceNotAccepted()
        this.store.select(companyIdSelector).subscribe(x => {
        this.companyId = x
      })
      this.store.select(clientIdSelector).subscribe(x =>{
        this.clientId = x
      })
      this.getBranches() 
    }
    this.getAllOrderForAymen()
    this.invetation$ = this.invetationService.getAllInvetations()
  this.getAllMyConversation()
  this.shopping$ = this.purchaseOrderService.getOrder()
}

}

getAllOrderForAymen(){
  this.orders$ = this.orderDeliveryService.getAllOrderForAymen();
  this.orders$.subscribe(x => console.log(x))
}

goToOrder(id : number){
  this.router.navigate([`/my-company/order/${id}`])
  this.openShopping()
}

goToOrder2(id : number){
  this.router.navigate([`/user/order/${id}`])
  this.openShopping()
}

getBranches(){
  this.companies$ = this.companyService.getBranches()
  this.companies$.subscribe(x => console.log(x))
}

openCompanies(){
  this.openedCompanies = !this.openedCompanies;
  this.openedNotification = false
  this.openedInvetation = false
  this.openedShopping = false
}

openShopping(){
  this.openedShopping = !this.openedShopping
  this.openedNotification = false
  this.openedInvetation = false
  this.openedCompanies = false
}

openNotification(){
  this.openedNotification = !this.openedNotification
  this.openedShopping = false
  this.openedInvetation = false
  this.openedCompanies = false
}

openInvetation(){
  this.openedInvetation = !this.openedInvetation
  this.openedNotification = false
  this.openedShopping = false
  this.openedCompanies = false
}

openConversation(){
  this.openedConversation = !this.openedConversation;
}

InvoiceStatus(status : string,invoiceCode : number){
  this.openedNotification = false;
  this.invoiceService.InvoiceStatus(status,invoiceCode).subscribe()
}

requestResponse(status : string,invetation:Invetation){
  console.log(status,invetation.id)
  this.openedInvetation = false
    this.invetationService.requestResponse(status, invetation.id).subscribe(x =>{
      console.log(x)
      if(invetation.user != null){
        this.loginService.refreshToken().subscribe(data =>{
          let token = data['token'];
          localStorage.setItem('jwt',token)
          this.router.navigate(["/my-company"])
        })
      }
    }
      )
 
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

changeCompany(id : number, parentId : number){
  if(parentId !== 0){
    this.store.dispatch(new ParentId(parentId))
  }
  this.store.dispatch(new CompanyId(id))
  this.openedCompanies = !this.openedCompanies
  this.router.navigate(["my-company"])
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
