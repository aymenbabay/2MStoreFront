import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CashPayment } from '../../models/admin/CashPayment';
import { CheckPayment } from '../../models/admin/CheckPayment';
import { BillPayment } from '../../models/admin/BillPayment';
import { BankTransferPayment } from '../../models/admin/BankTransferPayment';
import { Payment } from '../../models/admin/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
 
   
  baseUrl = 'werehouse/payment/'
  constructor(private http : HttpClient) { }
  
  paymentCash(cash : CashPayment):Observable<any>{
    return this.http.post(`${this.baseUrl}cash`,cash)
  }
  
  paymentCheck(check: CheckPayment):Observable<any> {
    return this.http.post(`${this.baseUrl}check`,check)
  }
  
  paymentBill(bill: BillPayment):Observable<any> {
    return this.http.post(`${this.baseUrl}bill`,bill)
  }
  
  paymentBank(bank: BankTransferPayment):Observable<any> {
    return this.http.post(`${this.baseUrl}bank`,bank)
  }

  getAllMyPayment() :Observable<Payment[]>{
    return this.http.get<Payment[]>(`${this.baseUrl}get_all_my`)
  }

  getAllMyPaymentAsCompany():Observable<Payment[]>{
    return this.http.get<Payment[]>(`${this.baseUrl}get_all_my_as_company`)
  }

  getAllMyPaymentAsClient():Observable<Payment[]>{
    return this.http.get<Payment[]>(`${this.baseUrl}get_all_my_as_client`)
  }

  getMyById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}${id}`)
  }

  paymentResponse(response: string, id: number) {
    return this.http.get(`${this.baseUrl}${response}/${id}`)
  }

}
