import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDelivery } from '../../models/user/OrderDelivery';

@Injectable({
  providedIn: 'root'
})
export class OrderDeliveryService {

  baseUrl = "werehouse/order_delivery/"
  constructor(private http : HttpClient) { }

  getAllOrderForAymen():Observable<OrderDelivery[]>{
    return this.http.get<OrderDelivery[]>(`${this.baseUrl}`)
  }

}
