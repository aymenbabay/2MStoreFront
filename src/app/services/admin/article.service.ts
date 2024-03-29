import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../../models/admin/Article';
import { Observable, map, switchMap } from 'rxjs'
import { FormGroup } from '@angular/forms';
import { LoginService } from '../guest/login/login.service';
import { Store } from '@ngrx/store';
import { companyIdSelector } from '../../store/reducer/state.reducer';
import { SubArticle } from '../../models/admin/SubArticle';



@Injectable({
  providedIn: 'root'
})
export class ArticleService {
 

 
  update = false
  baseUrl="werehouse/article/"

  constructor(private http: HttpClient, private store : Store) {}

  deleteArticle(id: number):Observable<any>{
    return  this.http.delete(`${this.baseUrl}delete/${id}`)
  }

  getAllArticles(offset:number, pageSize: number):Observable<Article[]>{
    return this.getCompanyId().pipe(
      switchMap(companyId => this.http.get<Article[]>(`${this.baseUrl}getAllMyArticle/${companyId}/${offset}/${pageSize}`)))
  }

  addArticle(article : FormData):Observable<any>{
    console.log(article)
    return this.http.post(`${this.baseUrl}add`,article)
  }


  updateArticle(article: FormData) :Observable<any>{
    return this.http.put(`${this.baseUrl}update`,article)
  }


  addQuantity(quantity: number, id:number):Observable<any> {
    return this.http.get(`${this.baseUrl}${id}/${quantity}`)
  }

  getRandomArticleWithRandomCompany(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}getrandom`)
  }

  getAllArticlesByProviderId(value: any):Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}getAllProvidersArticleByProviderId/${value}`)
  }

  getAllArticlesByCompanyId(id: number):Observable<Article[]>{
    return this.http.get<Article[]>(`${this.baseUrl}get_all_articles/${id}/0/1`)
  }


  getAllArticleByCategory(categoryId: number, companyId: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}category/${categoryId}/${companyId}`)
  }

  getAllArticleBySubCategoryId(subCategoryId: number, companyId: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}sub_category/${subCategoryId}/${companyId}`)
  }
  UpdateCompanyArticle(form: Article) :Observable<any>{
    return this.http.put(`${this.baseUrl}updatecompanyarticle`,form)
  }

  getMyArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}my_article/${id}`)
  }

  addChildToParent(parentId: number, childId: number,quantity: number):Observable<any> {
    return this.http.get(`${this.baseUrl}child/${parentId}/${childId}/${quantity}`)
  }

  deleteSubArticle(id: number) :Observable<any>{
    return this.http.get(`${this.baseUrl}delete_sub/${id}`)
  }

  getCompanyId():Observable<number>{
    return this.store.select(companyIdSelector).pipe(
      map(companyId => companyId as number)
    )
  }

}
