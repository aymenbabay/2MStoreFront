import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../../models/admin/Article';
import { Observable } from 'rxjs'
import { CompanyArticle } from '../../models/admin/companyArticle';
import { FormGroup } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  UpdateCompanyArticle(form: CompanyArticle) :Observable<any>{
    return this.http.put(`${this.baseUrl}updatecompanyarticle`,form)
  }

  update = false
  baseUrl="werehouse/article/"

  

  constructor(private http: HttpClient) {
   
   
   }

   

  deleteArticle(id: number):Observable<any>{
    return  this.http.delete(`${this.baseUrl}delete/${id}`)
  }

  getAllArticles(id:number |0):Observable<CompanyArticle[]>{
    return this.http.get<CompanyArticle[]>(`${this.baseUrl}getAllMyArticle`)
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
}
