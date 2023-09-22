import { Injectable } from '@angular/core';
import { Invetation } from '../../models/admin/Invetation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class InvetationService {
 

  baseUrl = 'werehouse/invetation/'
  constructor(private http : HttpClient) { }

  getAllInvetations(): Observable<Invetation[]> {
    return this.http.get<Invetation[]>(`${this.baseUrl}get_invetation`)
  }

  requestResponse(status: string, invetationId: number):Observable<any> {
    return this.http.get(`${this.baseUrl}response/${status}/${invetationId}`)
  }
}
