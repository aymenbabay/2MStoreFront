import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/admin/article.service';
import { SubArticle } from '../../../models/admin/SubArticle';

@Component({
  selector: 'app-article-by-id',
  templateUrl: './article-by-id.component.html',
  styleUrls: ['./article-by-id.component.css']
})
export class ArticleByIdComponent implements OnInit {

  constructor(private articleService : ArticleService){}

  ngOnInit(): void {
    let relations = new SubArticle()
    relations.childArticle = relations.childArticle || {}
    relations.parentArticle = relations.parentArticle || {}
    relations.childArticle.id = 1
    relations.parentArticle.id = 2
    relations.quantity = 3

    this.articleService.addChildToParent(1, relations).subscribe()
   console.log(relations)
  }
}
