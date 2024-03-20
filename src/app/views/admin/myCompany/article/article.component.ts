import {  Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from '../../../../services/admin/article.service';
import { Article } from '../../../../models/admin/Article';
import { Observable, Subscription, of } from 'rxjs';
import { LoginService } from '../../../../services/guest/login/login.service';
import { ProviderService } from '../../../../services/admin/provider.service';
import { ArticleModalComponent } from '../../../../modal/admin/article-modal/article-modal.component';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result, BarcodeFormat, Exception  } from '@zxing/library';


@Component({
  selector: 'app-addarticle',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy{

  unsubscribe! : Subscription
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];
  //allowedFormats = ['QR_CODE', 'EAN_13', 'CODE_128'];
  scannerEnabled = true;
  scanSuccess = false;
  scanFailure = false;
  scanResult!: Result| undefined;
  articles!:Observable<Article[]>
  table= false
  companyId! : number
  isAdmin$: Observable<boolean> = of(false);

  page : number = 1;
  count : number = 0;
  tableSize : number = 1;
  tableSizes =  [5,10];

  constructor(private dialog : MatDialog, private articleService: ArticleService, public loginService : LoginService,
    private providerService : ProviderService){
  
  }
  sendMessage(): void {
  
  }


  resetScanner() {
    this.scanSuccess = false;
    this.scanFailure = false;
    this.scanResult = undefined;
    this.scannerEnabled = true;
  }

  ngOnInit(): void {
    this.providerService.getMyProviderid()
    this.getAllArticles(this.page, this.tableSize)
    this.isAdmin$ = this.isAdmin()
    this.unsubscribe = this.providerService.getMyProviderId().subscribe()

   
  }
  isAdmin(): Observable<boolean> {
    return this.loginService.isadmin()
  }
  
  
  

  getAllArticles(page: number, pageSize: number){
      this.articles = this.articleService.getAllArticles(page,pageSize)
      this.articles.subscribe(x => console.log(x))
    
  }

  vuSwitch(){
    this.table = !this.table
  }
  openArticleModal(entity : Article|null, type:string){
    const dialogRef = this.dialog.open(ArticleModalComponent,
      {
        data: { entity, type },
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
      this.unsubscribe = dialogRef.afterClosed().subscribe(result => {
      this.articleService.update = false
      if (result !== "undefined") {
        this.getAllArticles(this.page, this.tableSize)
      }
     });
  }

  addQuantity(article: Article){
    this.openArticleModal(article,"Quantity")
  }

  updateArticleServer(article : Article){
    this.articleService.update = true
    this.unsubscribe = this.providerService.getMeProviderId().subscribe(x =>{
      this.openArticleModal(article,"article")
      
    })
  }

  deleteArticleServer( name: String, id : number){
    console.log(id)
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.unsubscribe = this.articleService.deleteArticle(id).subscribe(x =>{
        this.getAllArticles(this.page, this.tableSize)
      })
     
    }

  }

  onTableDataChange(event : any){
    this.page = event;
    console.log(event)
    this.getAllArticles(event.target.value.page,event.target.value.tableSize)
  }
  
  onTableSizeChange(event : any){
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllArticles(this.page, this.tableSize)
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe()
  }
 
  
}
