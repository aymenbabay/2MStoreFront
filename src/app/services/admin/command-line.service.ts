import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandLine } from '../../models/admin/lineCommande';
import { Article } from '../../models/admin/article';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandLineService {
  
  

  baseUrl = "werehouse/commandline/"
  commandLine$: CommandLine[]=[]
  article$!: Article
  qte =0
  update = false
  total = {"tottva":0,"totprice":0,"totgeneral":0}
  constructor(private http : HttpClient) {this.change() }

  change(){
    console.log("chnage function")
    if(this.article$){
      const newLine = new CommandLine()
      newLine.codeArticle = this.article$.code,
      newLine.libelleArticle = this.article$.libelle,
      newLine.unit = this.article$.unit,
      newLine.tva = this.article$.tva,
      newLine.prixArticleUnit = this.article$.sellingPrice,
      newLine.totTva = this.article$.tva * this.qte * (this.article$.sellingPrice /100),
      newLine.prixArticleTot = this.article$.sellingPrice * this.qte,
      newLine.quantity = this.qte
      this.commandLine$.push(newLine)
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
  
    return this.http.post(`${this.baseUrl}${type}/${code}/${clientId}`,this.commandLine$,{responseType:'blob'});
  }

  
  
}
