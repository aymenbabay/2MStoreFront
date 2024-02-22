import { Injectable } from '@angular/core';
import { Provider } from '../../models/admin/provider';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../store/store';
import { companyIdSelector, providerIdSelector } from '../../store/reducer/state.reducer';
import { ProviderId } from '../../store/actions/state.action';
import { ProviderCompany } from '../../models/admin/ProviderCompany';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
 
    
  update = false
  baseUrl="werehouse/provider/"
   
  constructor(private http: HttpClient,
    private store :Store<StoreInterface>) { }


  deleteProvider(id: number):Observable<any>{
    return  this.http.delete(`${this.baseUrl}delete/${id}`)
  }


  getAllProviders():Observable<any>{
    return this.http.get(`${this.baseUrl}get_all`)
  }

  getAllMyVirtualProviders():Observable<any>{
    return this.http.get(`${this.baseUrl}get_all_my_virtual`)
  }

  getAllMyProviders():Observable<any>{
    return this.getCompanyId().pipe(
      switchMap(companyId =>  this.http.get(`${this.baseUrl}get_all_my/${companyId}`)))
  }
  addProvider(provider : Provider):Observable<any>{
    console.log(provider)
    return this.http.post(`${this.baseUrl}add`,provider)
  }
    
  updateProvider(provider: Provider) :Observable<any>{
    return this.http.put(`${this.baseUrl}update`,provider)
  }

  addAsProvider(id: number):Observable<any> {
    return this.http.get(`${this.baseUrl}add_as_provider/${id}`)
  }

  findAllProviderContaining(searchInput: String): Observable<ProviderCompany[]> {
    return this.getCompanyId().pipe(
      switchMap(companyId =>this.http.get<ProviderCompany[]>(`${this.baseUrl}get_all_provider_containing/${searchInput}/${companyId}`))
    )
  }

  checkProvider(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}check_provider/${id}`)
  }

  getMyProviderId():Observable<number> {
    return this.http.get<number>(`${this.baseUrl}get_my_provider_id`)
   }

   getMeProviderId():Observable<number>{
   
   return this.store.select(providerIdSelector)
   }

   getMyProviderid(){
    this.getMyProviderId().subscribe((x:number) =>{
      this.store.dispatch(new ProviderId(x))
     })
    }

    getCompanyId():Observable<number>{
      return this.store.select(companyIdSelector).pipe(
        map(companyId => companyId as number) // Assuming clientIdSelector returns a number
        
      );
    }


}
