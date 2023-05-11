import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/user/company/company.service';
import { EMPTY, NEVER, Observable, map, of } from 'rxjs';
import { Company } from '../../models/user/company';

@Component({
  selector: 'app-all-company',
  templateUrl: './all-company.component.html',
  styleUrls: ['./all-company.component.css']
})
export class AllCompanyComponent implements OnInit {

  company$ : Observable<Company[]> = EMPTY
  company1$ : Observable<Company[]> = EMPTY
  sectors$ : string[] =[]
  address : string[] =[]
  constructor(private companyService : CompanyService){}


  ngOnInit(): void {
    this.getAllCompany()
  }

  getAllCompany(){
    this.company1$ = this.companyService.getAllCompany()
    this.company$ = this.company1$
    this.company$.subscribe(companies => {
      const sectors = companies.map(company => company.indestrySector);
      const address$ = companies.map(company => company.address);
      this.sectors$ = Array.from(new Set(sectors));
      this.address = Array.from(new Set(address$));

    })
    }

    filter($event: any, type : string){
      this.company$ = this.company1$
      console.log($event.target.value)
      this.company$.subscribe(companies =>{
        switch (type){
          case 'address':
            this.company$ = of(companies.filter(company => company.address === $event.target.value));
            break
          case 'sector':
          this.company$ = of(companies.filter(company => company.indestrySector === $event.target.value));
        }

   
      })
    }
}
