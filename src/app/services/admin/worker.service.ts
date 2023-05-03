import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Worker } from '../../models/admin/worker';

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

    
  updateWorker(worker: Worker) :Observable<any>{
    return this.http.put(`${this.baseUrl}update`,worker)
  }
}
