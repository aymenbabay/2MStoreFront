import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../../models/admin/invoice';
import { Client } from '../../models/admin/client';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
    
  update = false
  baseUrl="werehouse/invoice/"
   
  constructor(private http: HttpClient) { }


  deleteInvoice(id: number):Observable<any>{
    return  this.http.delete(`${this.baseUrl}delete/${id}`)
  }
  getAllInvoices():Observable<any>{
    return this.http.get(`${this.baseUrl}getMyByCompany`)
  }

  addInvoice(client : Client):Observable<any>{
    console.log(client)
    return this.http.post(`${this.baseUrl}add`,client)
  }

  getInvoices(): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.baseUrl}getlastinvoice`)
  }
    
  updateInvoice(invoice: Invoice) :Observable<any>{
    return this.http.put(`${this.baseUrl}update`,invoice)
  }

  getInvoiceAClient(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}getAsClient`)
  }
}
