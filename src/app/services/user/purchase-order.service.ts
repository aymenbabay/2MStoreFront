import { Injectable } from '@angular/core';
import { PurchaseOrderLine } from '../../models/user/purchaseOrderLine';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  baseUrl = 'werehouse/order/'
  orderList: PurchaseOrderLine[] = [];

  constructor(private http : HttpClient) { }

  addToCart():Observable<any>{
    console.log(this.orderList)
    return this.http.post(`${this.baseUrl}`,this.orderList)
  }

  getOrder():Observable<any>{
    return this.http.get(`${this.baseUrl}get_order`)
  }

}
