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

  getAllMyProvider():Observable<any>{
    return this.http.get(`${this.baseUrl}get_all_my_provider`)
  }

  getMyClientId() {
    this.getMyClientid().subscribe(x =>{
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
