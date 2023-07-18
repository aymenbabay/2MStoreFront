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
  commandLine$: CommandLine[]=[]
  line :Line[] = []
  article$! :Article
  qte =0
  update = false
  art! : FormData
  total = {"tottva":0,"totprice":0,"totgeneral":0}
  constructor(private http : HttpClient,private dialog : MatDialog) {
    this.change() 
  }

  change(){
    if(this.article$){
      console.log(this.article$.id+"command line service ")
      for(let i = 0; i<this.commandLine$.length; i++){
       if(this.commandLine$[i].companyarticle === this.article$.id){
         console.log(this.commandLine$[i].companyarticle+"command line id")
         console.log(this.article$.id+"article id")
         let message = `this article ${this.article$.libelle} is already added`
       this.openInfoModal(message)
        return;
       }
      }
       let newLine = new CommandLine()
      let line = new Line()
      line.article = this.article$
       newLine.companyarticle = this.article$.id
       line.totTva= newLine.totTva = this.article$.tva * this.qte * (this.article$.cost * this.article$.margin /100)
       line.prixArticleTot = newLine.prixArticleTot = this.article$.cost * this.article$.margin * this.qte
      line.quantity = newLine.quantity = this.qte
      console.log(this.article$)
      line.invoice = newLine.invoice = new Invoice()
      this.commandLine$.push(newLine)
      this.line.push(line)
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

  
  
}
