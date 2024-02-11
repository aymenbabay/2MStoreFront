import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/user/company/company.service';
import { Company } from '../../models/user/company';
import { Store } from '@ngrx/store';
import { companyIdSelector } from '../../store/reducer/state.reducer';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit{

  company! : Company
  constructor( private companyService : CompanyService, private store : Store){}

  ngOnInit(): void {
this.getCompany()
  }

  getCompany(){
    this.store.select(companyIdSelector).subscribe(companyId =>{
      this.companyService.getMe(companyId).subscribe(x => this.company=x)
    })
  }

}
