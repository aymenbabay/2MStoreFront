import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../../models/admin/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

 
  update = false
  baseUrl="werehouse/inventory/"
   
  constructor(private http: HttpClient) { }
 

  getAllInventorys():Observable<Inventory[]>{
    return this.http.get<Inventory[]>(`${this.baseUrl}getbycompany`)
  }

}
