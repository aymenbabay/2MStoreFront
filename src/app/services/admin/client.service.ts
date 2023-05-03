import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../../models/admin/client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {


 
  update = false
  baseUrl="werehouse/client/"
  constructor(private http: HttpClient) { }


  deleteClient(id: number):Observable<any>{
    return  this.http.delete(`${this.baseUrl}delete/${id}`)
  }
  getAllMyClients():Observable<any>{
    return this.http.get(`${this.baseUrl}get_all_my`)
  }

  getAllClients():Observable<Client[]>{
    return this.http.get<Client[]>(`${this.baseUrl}get_all`)
  }

  addClient(client : Client):Observable<any>{
    console.log(client)
    return this.http.post(`${this.baseUrl}add`,client)
  }
  addExistClient(id: any) {
    return this.http.get(`${this.baseUrl}add_exist/${id}`)
  }
    
  updateClient(client: Client, id:number) :Observable<any>{
    return this.http.put(`${this.baseUrl}update/${id}`,client)
  }

  addMeAsClient(code:string):Observable<any>{
    return this.http.get(`${this.baseUrl}add_me/${code}`)
  }
  
}
