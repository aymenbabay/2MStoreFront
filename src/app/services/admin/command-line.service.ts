import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandLine } from '../../models/admin/lineCommande';
import { Article } from '../../models/admin/Article';
import { Observable } from 'rxjs';
import { Invoice } from '../../models/admin/invoice';
import { CompanyArticle } from '../../models/admin/companyArticle';
import { InfoComponent } from '../../modal/admin/info/info.component';
import { MatDialog } from '@angular/material/dialog';
import { Line } from '../../models/admin/Line';

@Injectable({
  providedIn: 'root'
})
export class CommandLineService {
 
  
  

  baseUrl = "werehouse/commandline/"
  clientName!:string
  clientAddress!:string
  clientPhone!:string
  clientMatriculeFiscal!:string
  providerMatriculeFiscal!:string
  providerAddress!:string
  providerPhone!:string
  factureCode! : Observable< number>
  invoiceDate!:Date
  invoiceId ! : number
  commandLine$: CommandLine[]=[];
  line :Line[] = [];
  linee :Line[] = [];
  article$! :Article
  companyArticle! : CompanyArticle
  qte =0
  update = false
  view = false
  art! : FormData
  total = {"tottva":0,"totprice":0,"totgeneral":0}
  constructor(private http : HttpClient,private dialog : MatDialog) {
   // this.change() 
  }

  change(){
    if(this.article$){
      console.log(this.article$.id+"command line service ")
      for(let i = 0; i<this.commandLine$.length; i++){

       if(this.commandLine$[i].companyArticle === this.companyArticle.id){
         console.log(this.article$.id+"article id")
         let message = `this article ${this.article$.libelle} is already added`
       this.openInfoModal(message)
        return;
       }
      }
       let newCommandLine  = new CommandLine();
      let newLine  = new Line();
      console.log(newCommandLine)
      newCommandLine.companyArticle =  this.companyArticle.id
      newLine.companyarticle = {...this.companyArticle}
      
      newLine.totTva =  this.article$.tva * this.qte * (this.companyArticle.cost * this.companyArticle.margin /100)
      newCommandLine.totTva = this.article$.tva * this.qte * (this.companyArticle.cost * this.companyArticle.margin /100)
      newLine.prixArticleTot = this.companyArticle.cost * this.companyArticle.margin * this.qte
      newCommandLine.prixArticleTot = this.companyArticle.cost * this.companyArticle.margin * this.qte
      newLine.quantity = this.qte
      newCommandLine.quantity = this.qte
     // newCommandLine.invoice = new Invoice()
      this.commandLine$.push(newCommandLine )
      this.linee.push(newLine)
      console.log(newCommandLine )
      console.log(newLine )
      let totTva = 0;
      let totPrice = 0;
      let totGeneral = 0;
      for (let i = 0; i < this.commandLine$.length; i++) {
        totTva += this.commandLine$[i].totTva;
        totPrice += this.commandLine$[i].prixArticleTot;
      }
      totGeneral = totPrice + totTva;
      
      this.total = {tottva: totTva, totprice: totPrice, totgeneral: totGeneral};
      
      console.log(this.total.tottva+"total")
      console.log(this.commandLine$)
      console.log(this.linee)
    }
  }
  
  addInvoice(code:number, type: string, clientId:number) :Observable<Blob>{
  console.log(this.commandLine$)
    return this.http.post(`${this.baseUrl}${type}/${code}/${clientId}`,this.commandLine$,{responseType:'blob'});
  }

  openInfoModal(message:any){
    let type = "articlealreadyadded"
    const dialogRef = this.dialog.open(InfoComponent,
      {
        data: { message, type },
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
     dialogRef.afterClosed().subscribe(result => {
      if (result !== "undefined") {

      }
     });
  }

  getCommandLines() :Observable<any>{
    console.log(this.invoiceId)
    return this.http.get(`${this.baseUrl}getcommandline/${this.invoiceId}`)
  }
  
}
