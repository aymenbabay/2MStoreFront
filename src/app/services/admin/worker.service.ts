import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Worker } from '../../models/admin/worker';
import { Vacation } from '../../models/admin/vacation';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
 
  update = false
  baseUrl="werehouse/worker/"
   
  constructor(private http: HttpClient) { }


  deleteWorker(id: number):Observable<any>{
    return  this.http.delete(`${this.baseUrl}delete/${id}`)
  }
  getAllWorkers():Observable<any>{
    return this.http.get(`${this.baseUrl}getbycompany`)
  }

  addWorker(worker : Worker):Observable<any>{
    //en cas d'erreur peut etre Worker 
    return this.http.post(`${this.baseUrl}add`,worker)
  }

  addVacation(vacation: Vacation):Observable<any> {
    return this.http.post(`${this.baseUrl}addvacation`,vacation)
  }

  updateWorker(worker: Worker) :Observable<any>{
    return this.http.put(`${this.baseUrl}update`,worker)
  }

  getWorkerHistory(id: number): Observable<Vacation[]> {
   return this.http.get<Vacation[]>(`${this.baseUrl}history/${id}`)
  }
}
