import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Invoice } from '../../models/admin/invoice';
import { Client } from '../../models/admin/client';
import { Store } from '@ngrx/store';
import { companyIdSelector } from '../../store/reducer/state.reducer';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
    
  update = false
  invoiceUrl="werehouse/invoice/"
  clientInvoiceUrl ="werehouse/clientinvoice/"
  client!: Client;
  invoices$! : Observable<Invoice[]>
  invoice! : Invoice
  constructor(private http: HttpClient, private store : Store) { }


 
  getAllInvoices():Observable<any>{
    return this.http.get(`${this.invoiceUrl}getMyByCompany`)
  }

  getAllInvoiceAsProvider():Observable<any>{
    return this.getCompanyId().pipe(
      switchMap(companyId => this.http.get(`${this.invoiceUrl}getMyInvoiceAsProvider/${companyId}`)))
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
    return this.getCompanyId().pipe(
      switchMap(companyId => this.http.get<Invoice[]>(`${this.invoiceUrl}getMyInvoiceAsClient/${companyId}`)))
  }

  getAllInvoiceNotAccepted():Observable<any>{
    return this.http.get(`${this.invoiceUrl}getnotaccepted`)
  }

  cancelInvoice(id: number):Observable<any> {
  return this.http.get(`${this.invoiceUrl}cancel_invoice/${id}`)
  }

  InvoiceStatus(status: string, invoiceCode : number):Observable<any> {
   return this.http.get(`${this.invoiceUrl}response/${status}/${invoiceCode}`)
  }

  getCompanyId():Observable<number>{
    return this.store.select(companyIdSelector).pipe(
      map(companyId => companyId as number)
    )
  }
}
