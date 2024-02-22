import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs'
import { Category } from '../../models/admin/category';
import { Store } from '@ngrx/store';
import { companyIdSelector } from '../../store/reducer/state.reducer';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 
  update = false
  baseUrl="werehouse/category/"
   
  constructor(private http: HttpClient, private store : Store) { }


  deleteCategory(id: number):Observable<any>{
    return  this.http.delete(`${this.baseUrl}delete/${id}`)
  }
  getAllCategories(id : number):Observable<Category[]>{
    return this.getCompanyId().pipe(
      switchMap(companyId => this.http.get<Category[]>(`${this.baseUrl}getbycompany/${companyId}/${id}`)))
  }

  addCategory(category : FormData):Observable<any>{
    return this.http.post(`${this.baseUrl}add`,category)
  }

    
  updateCategory(category: FormData) :Observable<any>{
    return this.http.put(`${this.baseUrl}update`,category)
  }

  getCompanyId():Observable<number>{
    return this.store.select(companyIdSelector).pipe(
      map(companyId => companyId as number)
    )
  }
}
