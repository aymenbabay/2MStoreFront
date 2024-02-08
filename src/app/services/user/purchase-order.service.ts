import { Injectable } from '@angular/core';
import { PurchaseOrderLine } from '../../models/user/purchaseOrderLine';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { PurchaseOrder } from '../../models/user/PurchaseOrder';
import { Status } from '../../enums/status';
import { FormGroup } from '@angular/forms';

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

  getOrderById(id: number):Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(`${this.baseUrl}${id}`);
  }

  statusResponse(id : number, status: Status):Observable<any> {
    return this.http.get(`${this.baseUrl}${id}/${status}`)
  }

  cancelOrder(id: number) :Observable<any>{
    return this.http.get(`${this.baseUrl}cancel/${id}`)
  }

  updateLine(line: PurchaseOrderLine):Observable<any> {
    return this.http.put(`${this.baseUrl}`,line)
  }

}
