import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Worker } from '../../models/admin/worker';
import { Vacation } from '../../models/admin/vacation';
import { Store } from '@ngrx/store';
import { companyIdSelector } from '../../store/reducer/state.reducer';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  update = false
  baseUrl="werehouse/worker/"
  
  constructor(private http: HttpClient, private store : Store) { }
  
  
  deleteWorker(id: number):Observable<any>{
    return  this.http.delete(`${this.baseUrl}delete/${id}`)
  }
  getAllWorkers():Observable<any>{
    return this.getCompanyId().pipe(
      switchMap(companyId => this.http.get(`${this.baseUrl}getbycompany/${companyId}`)))
  }

  addWorker(worker : Worker):Observable<any>{
    //en cas d'erreur peut etre new Worker 
    return this.http.post(`${this.baseUrl}add`,worker)
  }

  addVacation(vacation: Vacation):Observable<any> {
    return this.http.post(`${this.baseUrl}addvacation`,vacation)
  }

  updateWorker(worker: Worker) :Observable<any>{
    return this.http.put(`${this.baseUrl}update`,worker)
  }
  
  getWorkerHistory(id: number): Observable<Vacation[]> {
    return this.getCompanyId().pipe(
      switchMap(companyId => this.http.get<Vacation[]>(`${this.baseUrl}history/${id}/${companyId}`)))
  }
  
  searchWorker(entity: string) :Observable<any>{
    return this.http.get(`${this.baseUrl}get/${entity}`)
  }

  getCompanyId():Observable<number>{
    return this.store.select(companyIdSelector).pipe(
      map(companyId => companyId as number)
    )
  }
 
}
