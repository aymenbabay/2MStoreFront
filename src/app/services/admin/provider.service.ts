import { Injectable } from '@angular/core';
import { Provider } from '../../models/admin/provider';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get(`${this.baseUrl}get_all_my`)
  }

  addProvider(provider : Provider):Observable<any>{
    console.log(provider)
    return this.http.post(`${this.baseUrl}add`,provider)
  }

    
  updateProvider(provider: Provider,id : number) :Observable<any>{
    return this.http.put(`${this.baseUrl}update/${id}`,provider)
  }

  
  addMeAsProvider(code:string) :Observable<any>{
    return this.http.get(`${this.baseUrl}add_me/${code}`)
  }

  addExistProvider(id: any) {
    return this.http.get(`${this.baseUrl}add_exist/${id}`)
  }
}
