import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandLine } from '../../models/admin/lineCommande';
import { Article } from '../../models/admin/Article';
import { Observable } from 'rxjs';
import { InfoComponent } from '../../modal/admin/info/info.component';
import { MatDialog } from '@angular/material/dialog';
import { Invoice } from '../../models/admin/invoice';

@Injectable({
  providedIn: 'root'
})
export class CommandLineService {

 
  
  baseUrl = "werehouse/commandline/"
  factureCode! : Observable< number>
  commandLine$: CommandLine[]=[];
  update = false
  view = false
  invoice$! : Invoice |null
  go = false
  total = {"tottva":0,"totprice":0,"totgeneral":0}
  globalDiscount= 0;
  constructor(private http : HttpClient,private dialog : MatDialog) {
   console.log(this.invoice$)
  }

  change(){
    console.log("change function"+ this.globalDiscount)
    let totTva = 0;
    let totPrice = 0;
    let totGeneral = 0;
    for (let i = 0; i < this.commandLine$.length; i++) {
      console.log("change function"+ this.globalDiscount)
      let sellingPrice =  (this.commandLine$[i].article.cost + this.commandLine$[i].article.cost * this.commandLine$[i].article.margin/100) * this.commandLine$[i].quantity
      this.commandLine$[i].totTva = this.commandLine$[i].article.tva *sellingPrice/100
      this.commandLine$[i].prixArticleTot =  sellingPrice
      
      totTva += this.commandLine$[i].totTva;
      totPrice += this.commandLine$[i].prixArticleTot;
      totPrice = totPrice - totPrice*this.globalDiscount/100
      console.log("change function"+ this.globalDiscount+" totale price "+ totPrice)
    }
      totGeneral = totPrice + totTva;
      this.total = {tottva: totTva, totprice: totPrice, totgeneral: totGeneral};
    
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
    let id;
    if(this.invoice$ !== null){
      id = this.invoice$.id
    }
    return this.http.get(`${this.baseUrl}getcommandline/${id}`)
  }
  
}
