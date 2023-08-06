import { Component, OnDestroy, OnInit  } from '@angular/core';
import { CommandLineService } from '../../../../../services/admin/command-line.service';
import { CompanyService } from '../../../../../services/user/company/company.service';
import { Company } from '../../../../../models/user/company';
import { EMPTY, Observable } from 'rxjs';
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

 
  company$: Observable<Company> = EMPTY
  facture$: Observable<number> = EMPTY
  client! : Client
  commandLine$: Line[]=[]
  currentDate!: string;
  total = {"tottva":0,"totprice":0,"totgeneral":0}
  constructor(private commandService : CommandLineService, private companyServce : CompanyService,private router : Router,
     private invoiceService: InvoiceService, private dialog : MatDialog, private datePipe: DatePipe){}

  ngOnInit(): void {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')||"";

   this.client = this.invoiceService.client
   console.log(this.client)
    this.getMe()
    this.getInvoice()
  }


  getMe(){
    this.company$ = this.companyServce.getMe()
   // this.company$.subscribe(x => this.getInvoice())
  }

  getInvoice(){
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
     
      this.commandService.commandLine$ = []
      this.commandLine$ = []
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
