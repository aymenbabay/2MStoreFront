import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/user/company/company.service';
import { Company } from '../../models/user/company';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit{

  company! : Company
  constructor( private companyService : CompanyService){}

  ngOnInit(): void {
this.getCompany()
  }

  getCompany(){
    this.companyService.getMe().subscribe(x => this.company=x)
  }
}
