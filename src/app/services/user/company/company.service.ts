import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Company } from '../../../models/user/company';
import { Store } from '@ngrx/store';
import { companyIdSelector } from '../../../store/reducer/state.reducer';
import { CompanyId } from '../../../store/actions/state.action';

import jwt_decode from 'jwt-decode';
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

checkCompany() :boolean{
  
  let token = localStorage.getItem('jwt') ?? ''
  if(token){
    if(jwt_decode<any>(token).Authorization[0].authority === "ADMIN" || jwt_decode<any>(token).Authorization[0].authority === "WORKER" ){
      return true;
    }
  }
  return false
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

getMyParent(): Observable<Company> {
  return this.getMycompanyid().pipe(
    switchMap(companyId => this.http.get<Company>(`${this.baseUrl}get_my_parent/${companyId}`))
  )
}

getBranches(): Observable<Company[]> {
  return this.http.get<Company[]>(`${this.baseUrl}get_branches`)
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
