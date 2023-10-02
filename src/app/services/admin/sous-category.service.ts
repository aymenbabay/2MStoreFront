import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubCategory } from '../../models/admin/sub-category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SousCategoryService {
  
  update = false
  baseUrl="werehouse/subcategory/"
   
  constructor(private http: HttpClient) { }


  deleteSousCategory(id: number):Observable<any>{
    return  this.http.delete(`${this.baseUrl}delete/${id}`)
  }
  getAllSousCategorys():Observable<any>{
    return this.http.get(`${this.baseUrl}getbycompany`)
  }

  addSousCategory(sous_category : FormData):Observable<any>{
    return this.http.post(`${this.baseUrl}add`,sous_category)
  }

    
  updateSousCategory(sous_category: FormData) :Observable<any>{
    return this.http.put(`${this.baseUrl}update`,sous_category)
  }

  getAllByCategoryId(categoryId: number, companyId : number): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.baseUrl}${categoryId}/${companyId}`)
  }
}
