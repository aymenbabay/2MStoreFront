import {  Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminComponent } from '../../../../modal/admin/admin/admin.component';
import { ArticleService } from '../../../../services/admin/article.service';
import { Article } from '../../../../models/admin/article';
import { Observable } from 'rxjs';
import { LoginService } from '../../../../services/guest/login/login.service';

@Component({
  selector: 'app-addarticle',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{

  articles!:Observable<Article[]>
  table= false
  constructor(private dialog : MatDialog, private articleService: ArticleService, public loginService : LoginService){

  }

  ngOnInit(): void {
    this.getAllArticles()
  }

  getAllArticles(){
    this.articles = this.articleService.getAllArticles(0)
  }

  vuSwitch(){
    this.table = !this.table
  }
  openArticleModal(entity : Article|null, type:string){
    const dialogRef = this.dialog.open(AdminComponent,
      {
        data: { entity, type },
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
     dialogRef.afterClosed().subscribe(result => {
      if (result !== "undefined") {
        this.ngOnInit()
      }
     });
  }

  addQuantity(article: Article){
    this.openArticleModal(article,"Quantity")
  }

  updateArticleServer(article : Article){
    console.log(article.id)
    this.articleService.update = true
    this.openArticleModal(article,"article")
  }

  deleteArticleServer( name: String, id : number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.articleService.deleteArticle(id).subscribe()
     this.ngOnInit()
    }

  }

  isAdmin():boolean{
    return this.loginService.admin()
  }
}
