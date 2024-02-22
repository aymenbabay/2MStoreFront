import { Injectable } from '@angular/core';
import { Invetation } from '../../models/admin/Invetation';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs'
import { FormGroup } from '@angular/forms';
import { Worker } from '../../models/admin/worker';
@Injectable({
  providedIn: 'root'
})
export class InvetationService {

  
  
  
  baseUrl = 'werehouse/invetation/'
  constructor(private http : HttpClient) { }
  
  getAllInvetations(): Observable<Invetation[]> {
    console.log('get all invetation')
    return this.http.get<Invetation[]>(`${this.baseUrl}get_invetation`)
  }
  
  requestResponse(status: string, invetationId: number):Observable<any> {
    return this.http.get(`${this.baseUrl}response/${status}/${invetationId}`)
  }
  
  cancelRequestOrDeleteFriend(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}cancel/${id}`)
  }
  
  sendWorkerInvetation(worker: Worker):Observable<any> {
    return this.http.post(`${this.baseUrl}worker`,worker)
  }

  sendParentInvetation(id: number) :Observable<any>{
    return this.http.get(`${this.baseUrl}parent/${id}`)
  }


}
