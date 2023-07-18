import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../services/user/company/company.service';
import { EMPTY, Observable } from 'rxjs';
import { Company } from '../../../models/user/company';
import { ArticleService } from '../../../services/admin/article.service';
import { Article } from '../../../models/admin/Article';
import { CompanyArticle } from '../../../models/admin/companyArticle';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  id!:number|0
  company$! : Company
  article$ : Observable<CompanyArticle[]> = EMPTY
constructor(private activatedRoute: ActivatedRoute, private companyService : CompanyService, private articleService : ArticleService){}

ngOnInit(): void {
  this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')??'');
  this.getCompany()
  this.getAllArticleByCompanyId()
}

getCompany(){
  if(this.id != null){
    this.companyService.getCompanyById(this.id).subscribe(data =>{
      this.company$ = data
    })
  }
}

getAllArticleByCompanyId(){
  this.article$ = this.articleService.getAllArticles(this.id)
}

}
