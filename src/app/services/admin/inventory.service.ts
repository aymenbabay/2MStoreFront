import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Inventory } from '../../models/admin/inventory';
import { Store } from '@ngrx/store';
import { companyIdSelector } from '../../store/reducer/state.reducer';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

 
  update = false
  baseUrl="werehouse/inventory/"
   
  constructor(private http: HttpClient, private store : Store) { }
 

  getAllInventorys():Observable<Inventory[]>{
    return this.getCompanyId().pipe(
      switchMap(companyId => this.http.get<Inventory[]>(`${this.baseUrl}getbycompany/${companyId}`))
    )
  }

  getCompanyId():Observable<number>{
    return this.store.select(companyIdSelector).pipe(
      map(companyId => companyId as number)
    )
  }



}
