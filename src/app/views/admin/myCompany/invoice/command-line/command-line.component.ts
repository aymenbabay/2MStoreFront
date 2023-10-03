import { Component, OnDestroy, OnInit  } from '@angular/core';
import { CommandLineService } from '../../../../../services/admin/command-line.service';
import { CompanyService } from '../../../../../services/user/company/company.service';
import { Company } from '../../../../../models/user/company';
import { BehaviorSubject, EMPTY, Observable, map, of, switchMap } from 'rxjs';
import { InvoiceService } from '../../../../../services/admin/invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminComponent } from '../../../../../modal/admin/admin/admin.component';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Article } from '../../../../../models/admin/Article';
import { CommandLine } from '../../../../../models/admin/lineCommande';
import { Client } from '../../../../../models/admin/client';
import { DatePipe } from '@angular/common';
import { Line } from '../../../../../models/admin/Line';
import { CommandLineModalComponent } from '../../../../../modal/admin/command-line-modal/command-line-modal.component';
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
  facture$: Observable<number> = EMPTY
  client! : Client
  commandLine$: CommandLine[]=[]
  currentDate!: string;
  total = {"tottva":0,"totprice":0,"totgeneral":0}
  constructor(public commandService : CommandLineService, private companyServce : CompanyService,private router : Router,
     private invoiceService: InvoiceService, private dialog : MatDialog, private datePipe: DatePipe){
      // this.navigationStartSubscription = router.events.subscribe((event) => {
      //   if (event instanceof NavigationStart) {
      //     console.log("en event start line command");
      //     this.resetCommandData();
      //   }
      // });
  
      this.navigationEndSubscription = router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          console.log("en event end line command");
          this.resetCommandData();
        }
      });
     }

  ngOnInit(): void {
    if(this.commandService.view || this.commandService.invoice$ != null ){
      this.currentDate = this.datePipe.transform(this.commandService.invoice$.lastModifiedDate,'yyyy-MM-dd')||"";
      console.log(this.commandService.invoice$.code)
      this.getCommandLines()
      this.facture$ = of(this.commandService.invoice$.code);
      this.company$ = of(this.commandService.invoice$.company)
      this.client = this.commandService.invoice$.client
      this.total.totgeneral = this.commandService.invoice$.prix_invoice_tot
      this.total.totprice = this.commandService.invoice$.prix_article_tot
      this.total.tottva = this.commandService.invoice$.tot_tva_invoice
    }else{
      this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')||"";
      this.client = this.invoiceService.client 
      this.facture$ = this.invoiceService.getInvoices();
      this.company$ = this.companyServce.getMe()
    }
  
    console.log(this.commandService.view)
  }

  getCommandLines(){
    this.commandService.getCommandLines().subscribe(x =>{
      this.commandLine$ = x
      this.commandService.commandLine$ = x
      console.log(x)
    })
  }
  
  addLine(entity : CommandLine|null, index : number){
    let type = "command"
    if(entity != null){
      this.commandService.update = true
      console.log("ist update cv"+ this.commandService.update)
     
    }else{
      
      this.commandService.update = false
    }
    console.log(index)
    const dialogRef = this.dialog.open(CommandLineModalComponent,
      {
        data: { entity, type, index },
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
     dialogRef.afterClosed().subscribe(result => {
      if (result !== "undefined") {

    this.commandService.change()
    this.commandLine$ = this.commandService.commandLine$;
    console.log(this.commandLine$)
    this.total = this.commandService.total
      }
     });
  }

  deleteLine(line : CommandLine, id:number){
    
    const conf = window.confirm(`are you sure to delete it !!`)
    if(conf){
      this.commandService.commandLine$.splice(id,1)
      this.total.totprice = this.total.totprice - line.prixArticleTot;
      this.total.tottva = this.total.tottva - line.totTva;
      this.total.totgeneral = this.total.totprice + line.totTva;
      console.log(this.commandService.commandLine$)
     // this.commandLine$.splice(id,1)
      console.log(this.commandLine$)
      console.log(this.total)
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
     
      this.commandLine$ = []
      this.commandService.commandLine$ = []
      this.commandService.article$! = new Article()
      this.router.navigate(["/my-company/invoice"])
    })
  }



 
  ngOnDestroy() {
   // this.navigationStartSubscription.unsubscribe();
    this.navigationEndSubscription.unsubscribe();
  }

  private resetCommandData() {
     this.commandLine$ = [];
     this.commandService.commandLine$ = []
     this.total = { 'totgeneral': 0, 'totprice': 0, 'tottva': 0 };
     this.commandService.total = { 'totgeneral': 0, 'totprice': 0, 'tottva': 0 };
  }
}
