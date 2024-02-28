import {  Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminComponent } from '../../../../modal/admin/admin/admin.component';
import { ArticleService } from '../../../../services/admin/article.service';
import { Article } from '../../../../models/admin/Article';
import { Observable, catchError, combineLatest, map, of, switchMap, take } from 'rxjs';
import { LoginService } from '../../../../services/guest/login/login.service';
import { ProviderService } from '../../../../services/admin/provider.service';
import { ArticleModalComponent } from '../../../../modal/admin/article-modal/article-modal.component';
import { Store } from '@ngrx/store';
import { companyIdSelector, parentIdSelector } from '../../../../store/reducer/state.reducer';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result, BarcodeFormat, Exception  } from '@zxing/library';


@Component({
  selector: 'app-addarticle',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{
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
  constructor(private dialog : MatDialog, private articleService: ArticleService, public loginService : LoginService,
    private providerService : ProviderService, private store : Store){
  
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
    this.getAllArticles()
    this.isAdmin$ = this.isAdmin()
    this.providerService.getMyProviderId().subscribe()

   
  }
  isAdmin(): Observable<boolean> {
    return this.loginService.isadmin()
  }
  
  
  

  getAllArticles(){
    this.store.select(companyIdSelector).subscribe(x =>{

      this.articles = this.articleService.getAllArticles(x)
      this.articles.subscribe(x =>console.log(x))
    })
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
     dialogRef.afterClosed().subscribe(result => {
      this.articleService.update = false
      if (result !== "undefined") {
        this.getAllArticles()
      }
     });
  }

  addQuantity(article: Article){
    this.openArticleModal(article,"Quantity")
  }

  updateArticleServer(article : Article){
    this.articleService.update = true
    this.providerService.getMeProviderId().subscribe(x =>{
      console.log(x)
      this.openArticleModal(article,"article")
      
    })
  }

  deleteArticleServer( name: String, id : number){
    console.log(id)
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.articleService.deleteArticle(id).subscribe(x =>{
        this.getAllArticles()
      })
     
    }

  }

 
  
}
