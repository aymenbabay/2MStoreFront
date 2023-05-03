import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../../../models/user/company';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  baseUrl = "werehouse/company/"
  constructor(private http: HttpClient) { }

addCompany(data:FormData):Observable<any>{
  console.log(JSON.stringify(data));
  return this.http.post(`${this.baseUrl}add`,data)
}

getCompanyById(id:number):Observable<any>{
  return this.http.get(`${this.baseUrl}${id}`)
}

getMe():Observable<Company>{
  return this.http.get<Company>(`${this.baseUrl}mycompany`)
}

checkCompany() :Observable<any>{
  return this.http.get(`${this.baseUrl}has_company`)
}
}
