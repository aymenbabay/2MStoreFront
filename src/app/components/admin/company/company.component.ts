import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../services/user/company/company.service';
import { EMPTY, Observable } from 'rxjs';
import { Company } from '../../../models/user/company';
import { ArticleService } from '../../../services/admin/article.service';
import { Article } from '../../../models/admin/Article';
import { Category } from '../../../models/admin/category';
import { SubCategory } from '../../../models/admin/sub-category';
import { CategoryService } from '../../../services/admin/category.service';
import { SousCategoryService } from '../../../services/admin/sous-category.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  id!:number|0
  company$! : Company
  article$ : Observable<Article[]> = EMPTY
  category$! : Observable<Category[]>
  subCategory$! : Observable<SubCategory[]>
constructor(private activatedRoute: ActivatedRoute, private companyService : CompanyService, private articleService : ArticleService,
  private categoryService : CategoryService, private subCategoryService : SousCategoryService){}

ngOnInit(): void {
  this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')??'');
  this.getCompany()
  this.getAllCategories()
  this.getAllArticleByCompanyId()
}

getCompany(){
  if(this.id != null){
    this.companyService.getCompanyById(this.id).subscribe(data =>{
      this.company$ = data
    })
  }
}

getAllCategories(){
  this.category$ = this.categoryService.getAllCategories(this.id)
}

getAllSubCategories(categoryId : number, companyId : number){
  console.log(categoryId, companyId)
  this.subCategory$ = this.subCategoryService.getAllByCategoryId(categoryId, companyId);
  this.article$ = this.articleService.getAllArticleByCategory(categoryId,companyId);
}
getAllArticleByCompanyId(){
  this.article$ = this.articleService.getAllArticlesByCompanyId(this.id)
}

getAllBySubCategory(subCategoryId : number, companyId : number){
  this.article$ = this.articleService.getAllArticleBySubCategoryId(subCategoryId, companyId)
}

}
