import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/admin/article.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../../models/admin/Article';
import { MatDialog } from '@angular/material/dialog';
import { ArticleModalComponent } from '../../../modal/admin/article-modal/article-modal.component';

@Component({
  selector: 'app-article-by-id',
  templateUrl: './article-by-id.component.html',
  styleUrls: ['./article-by-id.component.css']
})
export class ArticleByIdComponent implements OnInit, OnDestroy {


  private routeParamsSubscription!: Subscription;
  article$ !: Observable<Article>
  id      !:number
  constructor(private dialog : MatDialog,private articleService : ArticleService, private activatedRoute : ActivatedRoute){}

  ngOnInit(): void {
    this.routeParamsSubscription = this.activatedRoute.paramMap.subscribe(params => {
       this.id = parseInt(params.get('id') ?? '');
      this.getMyArticleById(this.id);
    });
  }

  getMyArticleById(id: number){
   this.article$ = this.articleService.getMyArticleById(id)
   this.article$.subscribe(x => console.log(x))
  }

  addSubArticle(entity : Article){
    let type = "subArticle"
    const dialogRef = this.dialog.open(ArticleModalComponent,
      {
        data: { entity, type },
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
      this.routeParamsSubscription = dialogRef.afterClosed().subscribe(result => {
      this.articleService.update = false
      if (result !== "undefined") {
      }
     });
  }

  deleteSubArticle(id: number) {
    const conf = window.confirm(`are you sure to delete ${id} !!`)
    if(conf){
      this.routeParamsSubscription = this.articleService.deleteSubArticle(id).subscribe(x =>{
      this.getMyArticleById(this.id);
      })
     
    }
    }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe()
  }
}
