import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../../../models/user/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  update = false
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
  return this.http.get(`${this.baseUrl}hascompany`)
}

getAllCompany():Observable<any> {
  return this.http.get(`${this.baseUrl}all`)
}

updateCompany(formData: FormData) :Observable<any>{
  return this.http.put(`${this.baseUrl}update`,formData)
}

rate(x: number, id: number) :Observable<any>{
return this.http.get(`${this.baseUrl}rate/${id}/${x}`)
}


}
