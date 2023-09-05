import {  Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminComponent } from '../../../../modal/admin/admin/admin.component';
import { ArticleService } from '../../../../services/admin/article.service';
import { Article } from '../../../../models/admin/Article';
import { Observable } from 'rxjs';
import { LoginService } from '../../../../services/guest/login/login.service';
import { CompanyArticle } from '../../../../models/admin/companyArticle';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../store/store';
import { providerIdSelector } from '../../../../store/reducer/state.reducer';
import { ProviderService } from '../../../../services/admin/provider.service';
import { ProviderId } from '../../../../store/actions/state.action';
import { ArticleModalComponent } from '../../../../modal/admin/article-modal/article-modal.component';


@Component({
  selector: 'app-addarticle',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{

  articles!:Observable<CompanyArticle[]>
  table= false
  constructor(private dialog : MatDialog, private articleService: ArticleService, public loginService : LoginService,
    private providerService : ProviderService , private store : Store<StoreInterface>){
  
  }
  sendMessage(): void {
  
  }
  ngOnInit(): void {
   this.providerService.getMyProviderid()
    this.getAllArticles()
    this.providerService.getMyProviderId().subscribe()
  }

  getAllArticles(){
    this.articles = this.articleService.getAllArticles(0)
    this.articles.subscribe(x =>console.log(x))
  }

  vuSwitch(){
    this.table = !this.table
  }
  openArticleModal(entity : CompanyArticle|Article|null, type:string){
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

  addQuantity(article: CompanyArticle){
    this.openArticleModal(article,"Quantity")
  }

  updateArticleServer(article : CompanyArticle){
    this.articleService.update = true
    this.providerService.getMeProviderId().subscribe(x =>{
      console.log(x)
      if (article.article.provider.id === x){
        this.openArticleModal(article.article,"article")
      } 
      else{
        this.openArticleModal(article,"companyArticle")

      }
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

  isAdmin():boolean{
    return this.loginService.admin()
  }
}
