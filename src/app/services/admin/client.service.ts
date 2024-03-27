import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../../models/admin/client';
import { Observable, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ClientId } from '../../store/actions/state.action';
import { clientIdSelector, companyIdSelector } from '../../store/reducer/state.reducer';
import { ClientCompany } from '../../models/admin/ClientCompnay';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  getAllClientContaininga(arg0:string) :Observable<any>{
    return this.http.get(`${this.baseUrl}${arg0}`)
  }
 
 
  update = false
  baseUrl="werehouse/client/"
  constructor(private http: HttpClient, private store : Store) { }


  deleteClient(id: number):Observable<any>{
    return  this.http.delete(`${this.baseUrl}delete/${id}`)
  }
  getAllMyClients():Observable<any>{
    return this.getCompanyId().pipe(
      switchMap(companyId => this.http.get(`${this.baseUrl}get_all_my/${companyId}`))
    );
  }

  getAllClientContaining(variable : string): Observable<ClientCompany[]> {
   return this.getCompanyId().pipe(
    switchMap(companyId =>this.http.get<ClientCompany[]>(`${this.baseUrl}get_all_containing/${variable}/${companyId}`))
   )
  }

  addClient(client : Client):Observable<any>{
    console.log(client)
    return this.http.post(`${this.baseUrl}add`,client)
  }
  addAsClient(id: number):Observable<any> {
    return this.http.get(`${this.baseUrl}add_as_client/${id}`)
  }
    
  updateClient(client: Client) :Observable<any>{
    return this.http.put(`${this.baseUrl}update`,client)
  }

  getAllMyProvider():Observable<any>{
    return this.http.get(`${this.baseUrl}get_all_my_provider`)
  }


  getAllMyClientContaining(value: string): Observable<Client[]> {
    return this.getCompanyId().pipe(
      switchMap(companyId => this.http.get<Client[]>(`${this.baseUrl}get_all_my_containing/${value}/${companyId}`))
    )
  }

  getMyClientId() {
    this.getMyClientid().subscribe(x =>{
      console.log("dispatching client service"+x)
      this.store.dispatch(new ClientId(x))
    })
  }

  getCompanyId():Observable<number>{
    return this.store.select(companyIdSelector).pipe(
      map(companyId => companyId as number) 
      
    );
  }

  getMyClientid():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}get_my_client_id`)
  }

  getMyclientid():Observable<number>{
    return this.store.select(clientIdSelector)
  }
  
}
