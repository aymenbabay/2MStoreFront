import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../../models/admin/client';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ClientId } from '../../store/actions/state.action';
import { clientIdSelector } from '../../store/reducer/state.reducer';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
 
  update = false
  baseUrl="werehouse/client/"
  constructor(private http: HttpClient, private sotre : Store) { }


  deleteClient(id: number):Observable<any>{
    return  this.http.delete(`${this.baseUrl}delete/${id}`)
  }
  getAllMyClients():Observable<any>{
    return this.http.get(`${this.baseUrl}get_all_my`)
  }

  getAllClientContaining(variable : string): Observable<Client[]> {
   return this.http.get<Client[]>(`${this.baseUrl}get_all_containing/${variable}`)
  }

  addClient(client : Client):Observable<any>{
    console.log(client)
    return this.http.post(`${this.baseUrl}add`,client)
  }
  addAsClient(id: number):Observable<any> {
    return this.http.get(`${this.baseUrl}add_as_client/${id}`)
  }
    
  updateClient(client: Client, id:number) :Observable<any>{
    return this.http.put(`${this.baseUrl}update/${id}`,client)
  }

  getAllMyProvider():Observable<any>{
    return this.http.get(`${this.baseUrl}get_all_my_provider`)
  }

  checkClient(id: number):Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}checkClient/${id}`)
  }


  getMyClientId() {
    this.getMyClientid().subscribe(x =>{
      console.log("dispatching client service"+x)
      this.sotre.dispatch(new ClientId(x))
    })
  }

  getMyClientid():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}get_my_client_id`)
  }

  getMyclientid():Observable<number>{
    return this.sotre.select(clientIdSelector)
  }
  
}
