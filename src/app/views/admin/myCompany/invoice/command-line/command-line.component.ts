import { Component, OnDestroy, OnInit  } from '@angular/core';
import { CommandLineService } from '../../../../../services/admin/command-line.service';
import { CompanyService } from '../../../../../services/user/company/company.service';
import { Company } from '../../../../../models/user/company';
import { BehaviorSubject, EMPTY, Observable, map } from 'rxjs';
import { InvoiceService } from '../../../../../services/admin/invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminComponent } from '../../../../../modal/admin/admin/admin.component';
import { Router } from '@angular/router';
import { Article } from '../../../../../models/admin/Article';
import { CommandLine } from '../../../../../models/admin/lineCommande';
import { Client } from '../../../../../models/admin/client';
import { DatePipe } from '@angular/common';
import { Line } from '../../../../../models/admin/Line';
import { CompanyArticle } from '../../../../../models/admin/companyArticle';
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
      this.currentDate = this.datePipe.transform(this.commandService.invoiceDate,'yyyy-MM-dd')||"";
      this.getCommandLines()
    }else{
      this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')||"";
    }
    console.log(this.commandService.view)
   this.client = this.invoiceService.client
   console.log(this.client)
    this.getMe()
    this.getInvoice()
  }

  getCommandLines(){
    this.commandService.getCommandLines().subscribe(x =>{
      this.commandLine$ = x
      let y = x.prixArticleTot
      this.total.totprice = this.total.totprice+y;
      console.log(x[0].prixArticleTot+" "+y)

    })
  }

  getMe(){
    if(!this.commandService.view){
      this.company$ = this.companyServce.getMe()
    }else{
      // const currentValue = this.company$$.getValue()
      // const newCompany : (Company) ={
      //   ...currentValue,
      //   address: this.commandService.providerAddress,
      //  matfisc: this.commandService.providerMatriculeFiscal,
      //  phone : this.commandService.providerPhone,
       
      // }
      // console.log("get me else")
      // this.company$$.next(
      //   newCompany
      // )
    }
   // this.company$.subscribe(x => this.getInvoice())
  }

  getInvoice(){
    if(this.commandService.view){
      this.facture$ = this.commandService.factureCode;
    }else
    this.facture$ = this.invoiceService.getInvoices();

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
  
    console.log(code)
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
     
      this.commandLine$ = this.commandService.line = this.commandService.commandLine$ = []
      this.commandService.article$! = new Article()
      this.router.navigate(["/my-company/invoice"])
    })
  }

  updateLineServer(line: Line){
    this.commandService.update = true
    //this.addLine(line)
  }

  ngOnDestroy(): void {

    this.commandService.line = this.commandService.commandLine$=[]
     this.commandService.total={'totgeneral':0,'totprice':0,'tottva':0}
  }
}
