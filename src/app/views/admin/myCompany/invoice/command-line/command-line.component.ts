import { Component, OnDestroy, OnInit  } from '@angular/core';
import { CommandLineService } from '../../../../../services/admin/command-line.service';
import { CompanyService } from '../../../../../services/user/company/company.service';
import { Company } from '../../../../../models/user/company';
import { EMPTY, Observable, map, of, switchMap } from 'rxjs';
import { InvoiceService } from '../../../../../services/admin/invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { CommandLine } from '../../../../../models/admin/lineCommande';
import { Client } from '../../../../../models/admin/client';
import { DatePipe } from '@angular/common';
import { CommandLineModalComponent } from '../../../../../modal/admin/command-line-modal/command-line-modal.component';
import { Store } from '@ngrx/store';
import { companyIdSelector } from '../../../../../store/reducer/state.reducer';
import { LoginService } from '../../../../../services/guest/login/login.service';
//import { saveAs } from 'file-saver';

@Component({
  selector: 'app-command-line',
  templateUrl: './command-line.component.html',
  styleUrls: ['./command-line.component.css']
})
export class CommandLineComponent implements OnInit, OnDestroy {

  private navigationStartSubscription: any;
  private navigationEndSubscription: any;
  company$: Observable<Company> = EMPTY
  factureCode$: Observable<number> = EMPTY
  client! : Client
  currentDate!: string;
  companyId! :number
  isadmin :Observable<boolean> = of(false)
  constructor(public commandService : CommandLineService, private companyServce : CompanyService,private router : Router,
     private invoiceService: InvoiceService, private dialog : MatDialog, private datePipe: DatePipe, private store : Store, public loginService : LoginService){
    

      this.navigationStartSubscription =  router.events.subscribe((event) =>{
        if(event instanceof NavigationStart){
          this.resetCommandData()
        }
      })
  
     }

  ngOnInit(): void {
    this.isadmin = this.isAdmin()
    if(this.commandService.view && this.commandService.invoice$ !== null ){
      this.currentDate = this.datePipe.transform(this.commandService.invoice$.lastModifiedDate,'yyyy-MM-dd')||"";
      console.log(this.commandService.invoice$.code)
      this.getCommandLines()
      this.factureCode$ = of(this.commandService.invoice$.code);
      this.company$ = of(this.commandService.invoice$.company)
      this.client = this.commandService.invoice$.client
      this.commandService.total.totgeneral = this.commandService.invoice$.prix_invoice_tot
      this.commandService.total.totprice = this.commandService.invoice$.prix_article_tot
      this.commandService.total.tottva = this.commandService.invoice$.tot_tva_invoice
      this.commandService.globalDiscount = this.commandService.invoice$.discount
    }else{
      this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')||"";
      this.client = this.invoiceService.client 
      this.factureCode$ = this.invoiceService.getInvoices();
      this.store.select(companyIdSelector).subscribe(companyId =>{
        this.company$ = this.companyServce.getMe(companyId)
      })
    }
  
    console.log(this.commandService.view)
    console.log(this.commandService.update)
  
      this.getCompany()
    
  }

  getCompany(){
    this.store.select(companyIdSelector).subscribe(x => this.companyId = x)
  }

  hasDiscount(): boolean {
    let tr;
    tr = this.commandService.commandLine$.some(line => line.discount !== null && line.discount !== undefined && line.discount !==0);
    console.log(tr+"tr hadhi")
    return tr
  }

  getCommandLines(){
    this.commandService.getCommandLines().subscribe(x =>{
      this.commandService.commandLine$ = x
      console.log(x)
    })
  }
  
  addLine(entity : CommandLine|null, index : number){
    console.log(index)
    let type = "command"
    if(entity != null){
      this.commandService.update = true
    }else{
      this.commandService.update = false
    }

    const dialogRef = this.dialog.open(CommandLineModalComponent,
      {
        data: { entity, type, index },
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
     dialogRef.afterClosed().subscribe(result => {
      if (result !== "undefined") {

    this.commandService.change()
      }
     });
  }

  deleteLine(line : CommandLine, id:number){
    
    const conf = window.confirm(`are you sure to delete it !!`)
    if(conf){
      this.commandService.commandLine$.splice(id,1)
      this.commandService.total.totprice = this.commandService.total.totprice - line.prixArticleTot;
      this.commandService.total.tottva = this.commandService.total.tottva - line.totTva;
      this.commandService.total.totgeneral = this.commandService.total.totprice + line.totTva;
      console.log(this.commandService.commandLine$)
      
    }
  }
  
  addInvoice(code:number, type :string, clientId:number){ 
  
    this.commandService.addInvoice(code,type,clientId).subscribe(x =>{
      console.log(x)
      if(type==="pdf-save-client"){

        const blob = new Blob([x], {type: 'application/pdf'});
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'products.pdf';
        link.dispatchEvent(new MouseEvent('click',{bubbles:true, cancelable:true}));
        setTimeout(() => {
          window.URL.revokeObjectURL(data)
          link.remove();
        }, 100);
      }
     
      this.commandService.commandLine$ = []
      this.router.navigate(["/my-company/invoice"])
    })
  }

  calculateDiscount(){
    this.commandService.change()
  }

isAdmin():Observable<boolean>{
  return this.loginService.isadmin()
}
 
  ngOnDestroy() {
    this.navigationStartSubscription.unsubscribe();
  }

  private resetCommandData() {
     this.commandService.commandLine$ = []
     this.commandService.invoice$ = null
     this.commandService.total = { 'totgeneral': 0, 'totprice': 0, 'tottva': 0 };
     this.commandService.globalDiscount = 0
     this.commandService.view = false
     this.commandService.update = false
  }
}
