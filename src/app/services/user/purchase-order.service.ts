import { Injectable } from '@angular/core';
import { PurchaseOrderLine } from '../../models/user/purchaseOrderLine';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs'
import { PurchaseOrder } from '../../models/user/PurchaseOrder';
import { Status } from '../../enums/status';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { companyIdSelector } from '../../store/reducer/state.reducer';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
 

  baseUrl = 'werehouse/order/'
  orderList: PurchaseOrderLine[] = [];

  constructor(private http : HttpClient, private store : Store) { }

  addToCart():Observable<any>{
    console.log(this.orderList)
    return this.http.post(`${this.baseUrl}`,this.orderList)
  }

  getOrder():Observable<PurchaseOrder[]>{
    return this.getCompanyId().pipe(
      switchMap(id => this.http.get<PurchaseOrder[]>(`${this.baseUrl}get_order/${id}`)))
  }

  getAllMyPurchaseOrdersLines():Observable<PurchaseOrderLine[]>{
    return this.getCompanyId().pipe(
      switchMap( companyId => this.http.get<PurchaseOrderLine[]>(`${this.baseUrl}get_all_my_lines/${companyId}`))
    )
    }

  getPurchaseOrderLinesByPurchaseOrderId(id: number): Observable<PurchaseOrderLine[]> {
    return this.http.get<PurchaseOrderLine[]>(`${this.baseUrl}get_lines/${id}`)
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

  getCompanyId():Observable<number>{
    return this.store.select(companyIdSelector).pipe(
      map(companyId => {
        console.log(companyId);
       return companyId as number
      })
     
    )
  }

}
