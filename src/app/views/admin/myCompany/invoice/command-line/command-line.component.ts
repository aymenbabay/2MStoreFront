import { Component, OnDestroy, OnInit  } from '@angular/core';
import { CommandLineService } from '../../../../../services/admin/command-line.service';
import { CompanyService } from '../../../../../services/user/company/company.service';
import { Company } from '../../../../../models/user/company';
import { BehaviorSubject, EMPTY, Observable, map, of, switchMap } from 'rxjs';
import { InvoiceService } from '../../../../../services/admin/invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminComponent } from '../../../../../modal/admin/admin/admin.component';
import { Router } from '@angular/router';
import { Article } from '../../../../../models/admin/Article';
import { CommandLine } from '../../../../../models/admin/lineCommande';
import { Client } from '../../../../../models/admin/client';
import { DatePipe } from '@angular/common';
import { Line } from '../../../../../models/admin/Line';
//import { saveAs } from 'file-saver';

@Component({
  selector: 'app-command-line',
  templateUrl: './command-line.component.html',
  styleUrls: ['./command-line.component.css']
})
export class CommandLineComponent implements OnInit, OnDestroy {

   company$$ = new BehaviorSubject<Company|undefined>(undefined);
  company$: Observable<Company> = EMPTY
  facture$: Observable<number> = EMPTY
  client! : Client
  commandLine$: Line[]=[]
  currentDate!: string;
  total = {"tottva":0,"totprice":0,"totgeneral":0}
  constructor(public commandService : CommandLineService, private companyServce : CompanyService,private router : Router,
     private invoiceService: InvoiceService, private dialog : MatDialog, private datePipe: DatePipe){}

  ngOnInit(): void {
    if(this.commandService.view){
      this.currentDate = this.datePipe.transform(this.commandService.invoice.lastModifiedDate,'yyyy-MM-dd')||"";

      this.getCommandLines()
      this.facture$ = this.commandService.factureCode;
      this.company$ = of(this.commandService.invoice.company)
      this.client = this.commandService.invoice.client
      this.total.totgeneral = this.commandService.invoice.prix_invoice_tot
      this.total.totprice = this.commandService.invoice.prix_article_tot
      this.total.tottva = this.commandService.invoice.tot_tva_invoice
    }else{
      this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')||"";
      this.client = this.invoiceService.client 
      this.facture$ = this.invoiceService.getInvoices();
      this.company$ = this.companyServce.getMe()
    }
  
  }

  getCommandLines(){
    this.commandService.getCommandLines().subscribe(x =>{
      this.commandLine$ = x
    })
  }

  addLine(entity : CommandLine|null){
    let type = "command"
    const dialogRef = this.dialog.open(AdminComponent,
      {
        data: { entity, type },
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
     dialogRef.afterClosed().subscribe(result => {
      if (result !== "undefined") {

    this.commandService.change()
    this.commandLine$ = this.commandService.linee;
    console.log(this.commandLine$)
    this.total = this.commandService.total
      }
     });
  }

  deleteLineServer(line: string, id:number){

  }
  
  addInvoice(code:number, type :string, clientId:number){ 
  
    console.log(code+" "+ clientId + " " + type)
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
     
      this.commandLine$ = this.commandService.commandLine$ = []
      this.commandService.article$! = new Article()
      this.router.navigate(["/my-company/invoice"])
    })
  }

  updateLineServer(line: Line){
    this.commandService.update = true
    //this.addLine(line)
  }

  ngOnDestroy(): void {
    console.log("en destroy line command")
    this.commandService.view = false
     this.commandService.commandLine$=[]
     this.commandService.total={'totgeneral':0,'totprice':0,'tottva':0}
  }
}
