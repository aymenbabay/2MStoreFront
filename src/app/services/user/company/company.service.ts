import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../../../models/user/company';
import { Store } from '@ngrx/store';
import { companyIdSelector } from '../../../store/reducer/state.reducer';
import { CompanyId } from '../../../store/actions/state.action';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
 


  update = false
  baseUrl = "werehouse/company/"
  constructor(private http: HttpClient, private store : Store) { }

addCompany(data:FormData):Observable<any>{
  console.log(JSON.stringify(data));
  return this.http.post(`${this.baseUrl}add`,data)
}

getCompanyById(id:number):Observable<any>{
  return this.http.get(`${this.baseUrl}${id}`)
}

getMe(id : number):Observable<Company>{
  return this.http.get<Company>(`${this.baseUrl}mycompany/${id}`)
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

getCompanyContaining(branshe: string) :Observable<any>{
  return this.http.get(`${this.baseUrl}search/${branshe}`)
}

rate(x: number, id: number) :Observable<any>{
return this.http.get(`${this.baseUrl}rate/${id}/${x}`)
}

getMyCompanyId() {
  this.getMyCompanyid().subscribe(x =>{
    
    console.log("dispatching company service"+x)
    this.store.dispatch(new CompanyId(x))
  })
}

getMyCompanyid():Observable<number>{
  return this.http.get<number>(`${this.baseUrl}get_my_company_id`)
}

getMycompanyid():Observable<number>{
  return this.store.select(companyIdSelector)
}

}
