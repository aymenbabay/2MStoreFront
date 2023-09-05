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
  invoiceUrl="werehouse/invoice/"
  clientInvoiceUrl ="werehouse/clientinvoice/"
  client!: Client;
   
  constructor(private http: HttpClient) { }


  deleteInvoice(id: number):Observable<any>{
    return  this.http.delete(`${this.invoiceUrl}delete/${id}`)
  }
  getAllInvoices():Observable<any>{
    return this.http.get(`${this.invoiceUrl}getMyByCompany`)
  }

  getAllInvoiceAsProvider():Observable<any>{
    return this.http.get(`${this.invoiceUrl}getMyInvoiceAsProvider`)
  }
  addInvoice(client : Client):Observable<any>{
    console.log(client)
    return this.http.post(`${this.invoiceUrl}add`,client)
  }

  getInvoices(): Observable<number> {
    return this.http.get<number>(`${this.invoiceUrl}getlastinvoice`)
  }
    
  updateInvoice(invoice: Invoice) :Observable<any>{
    return this.http.put(`${this.invoiceUrl}update`,invoice)
  }

  getInvoiceAClient(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.invoiceUrl}getAsClient`)
  }

  getAllInvoiceNotAccepted():Observable<any>{
    return this.http.get(`${this.clientInvoiceUrl}getnotaccepted`)
  }

  InvoiceStatus(status: string, invoiceCode : number):Observable<any> {
   return this.http.get(`${this.clientInvoiceUrl}response/${status}/${invoiceCode}`)
  }
}
