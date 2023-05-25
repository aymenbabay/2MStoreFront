import { Injectable } from '@angular/core';
import { Fournisseur } from '../../models/admin/fournisseur';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../../models/admin/article';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  
  update = false
  baseUrl="werehouse/fournisseur/"
   
  constructor(private http: HttpClient) { }


  deleteProvider(id: number):Observable<any>{
    return  this.http.delete(`${this.baseUrl}delete/${id}`)
  }
  getAllProviders():Observable<any>{
    return this.http.get(`${this.baseUrl}get_all`)
  }

  getAllVirtualProviders():Observable<any>{
    return this.http.get(`${this.baseUrl}get_all_my_virtual`)
  }

  getAllMyProviders():Observable<any>{
    return this.http.get(`${this.baseUrl}get_all_my`)
  }
  addProvider(provider : Fournisseur):Observable<any>{
    console.log(provider)
    return this.http.post(`${this.baseUrl}add`,provider)
  }

    
  updateProvider(provider: Fournisseur,id : number) :Observable<any>{
    return this.http.put(`${this.baseUrl}update/${id}`,provider)
  }


  addExistProvider(id: any) {
    return this.http.get(`${this.baseUrl}add_exist/${id}`)
  }




}
