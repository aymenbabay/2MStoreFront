import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CashPayment } from '../../models/admin/CashPayment';
import { CheckPayment } from '../../models/admin/CheckPayment';
import { BillPayment } from '../../models/admin/BillPayment';
import { BankTransferPayment } from '../../models/admin/BankTransferPayment';

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

}
