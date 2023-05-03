import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../../models/admin/article';
import { Observable } from 'rxjs'
import { Form } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  

  update = false
  baseUrl="werehouse/article/"
   
  constructor(private http: HttpClient) { }


  deleteArticle(id: number):Observable<any>{
    return  this.http.delete(`${this.baseUrl}delete/${id}`)
  }
  getAllArticles():Observable<Article[]>{
    return this.http.get<Article[]>(`${this.baseUrl}getbycompany`)
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
}
