import { Component, OnDestroy , OnInit, signal} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyModalComponent } from '../../../modal/user/add-company-modal/add-company-modal.component';
import { CompanyService } from '../../../services/user/company/company.service';
import { EMPTY, Subscription, Observable } from 'rxjs';
import { Article } from '../../../models/admin/Article';
import { ArticleService } from '../../../services/admin/article.service';
import { Company } from '../../../models/user/company';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/admin/client.service';
import { ProviderService } from '../../../services/admin/provider.service';
import { MessageService } from '../../../services/user/message.service';
import { PurchaseOrderModalComponent } from '../../../modal/user/bon-decommand-modal/bon-decommand-modal.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy, OnInit{

  s! :Subscription
  has_company = false
  article$ : Observable<Article[]> = EMPTY
  company$ : Observable<Company[]> = EMPTY
  sig = signal(1)
  constructor(public dialog: MatDialog, private companyService : CompanyService, private articleService : ArticleService,
     private router : Router, private providerService : ProviderService, private clientService : ClientService,
      private messageService : MessageService ){
    
  }

  ngOnInit(): void {
    this.sig.update(value => value+2)
    console.log(this.sig())
    this.check()
    this.getRandomArticleWithRandomCompany()
    this.getAllCompany()
    if(this.companyService.checkCompany()){

      this.providerService.getMyProviderid()
      this.clientService.getMyClientId()
      this.companyService.getMyCompanyId()
    }
  }

 

  openDialog() {
    let type = "add"
    const dialogRef = this.dialog.open(AddCompanyModalComponent,
      {
        data : {type},
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
  }

  openMessanger(userName : string){
    this.messageService.receiver = userName;
    this.messageService.show = true
    this.messageService.getAllMyMessage().subscribe(x =>this.messageService.messages=x)
  }

  addToCart(company : Company, article : Article){
    const dialogRef = this.dialog.open(PurchaseOrderModalComponent,
      {
        data : {company,article},
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
    
  }
  getRandomArticleWithRandomCompany(){
    this.article$ = this.articleService.getRandomArticleWithRandomCompany()
    this.article$.subscribe(x =>console.log(x))
  }
  check(){
    this.has_company = this.companyService.checkCompany()
  }

  getCompanyById(){
    this.companyService.getCompanyById(1).subscribe(data=>console.log(data))
  }

  getAllCompany(){
   this.company$ =  this.companyService.getAllCompany()
   this.company$.subscribe(x =>console.log(x))
  }



  ngOnDestroy(): void {
    if(this.s){
      this.s.unsubscribe()
    }
  }
}
