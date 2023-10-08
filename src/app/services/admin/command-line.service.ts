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
  article$! :Article
  qte =0
  update = false
  view = false
  invoice$! : Invoice |null
  go = false

  total = {"tottva":0,"totprice":0,"totgeneral":0}
  discount!: number;
  globalDiscount!: number;
  constructor(private http : HttpClient,private dialog : MatDialog) {
   console.log(this.invoice$)
  }

  change(){
    if(this.article$){
      console.log(this.update+" in th service")
      console.log(this.article$.id+"command line service ")
      for(let i = 0; i<this.commandLine$.length; i++){

       if(this.commandLine$[i].article.id === this.article$.id && !this.update){
         console.log(this.article$.id+"article id")
         let message = `this article ${this.article$.libelle} is already added`
       this.openInfoModal(message)
        return;
       }
      }
      if(!this.update){

        let newCommandLine  = new CommandLine();
        newCommandLine.article =  this.article$
        newCommandLine.totTva = this.article$.tva * this.qte * this.article$.cost /100
        newCommandLine.prixArticleTot = (this.article$.cost + ((this.article$.cost * this.article$.tva /100)+(this.article$.cost * this.article$.margin /100)-(this.article$.cost * this.discount/100))) * this.qte
        newCommandLine.quantity = this.qte
        newCommandLine.discount = this.discount
        this.commandLine$.push(newCommandLine )
      }
      let totTva = 0;
      let totPrice = 0;
      let totGeneral = 0;
      for (let i = 0; i < this.commandLine$.length; i++) {
        if(this.update){
          this.commandLine$[i].totTva = this.commandLine$[i].article.tva * this.commandLine$[i].quantity * this.commandLine$[i].article.cost * this.commandLine$[i].article.margin/100
          this.commandLine$[i].prixArticleTot =   this.commandLine$[i].article.cost * this.commandLine$[i].article.margin * this.commandLine$[i].quantity
          
        }
        totTva += this.commandLine$[i].totTva;
        totPrice += this.commandLine$[i].prixArticleTot;
        totPrice = totPrice - totPrice*this.globalDiscount/100
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

  getCommandLines() :Observable<any>{
    let id;
    if(this.invoice$ !== null){
      id = this.invoice$.id
    }
    return this.http.get(`${this.baseUrl}getcommandline/${id}`)
  }
  
}
