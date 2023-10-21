import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../../models/user/purchaseOrder';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  baseUrl = 'werehouse/order/'
  orderList: PurchaseOrder[] = [];

  constructor(private http : HttpClient) { }

  addToCart():Observable<any>{
    return this.http.post(`${this.baseUrl}`,this.orderList)
  }

}
