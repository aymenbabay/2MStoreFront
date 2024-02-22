import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../services/user/company/company.service';
import { Company } from '../../../../models/user/company';
import { Observable, of } from 'rxjs';
import { InvetationService } from '../../../../services/admin/invetation.service';
import { LoginService } from '../../../../services/guest/login/login.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit{

  branshe = ''
  companies! : Observable<Company[]>
  myParent! : Company
  search = false
  isadmin :Observable<boolean> = of(false)
  constructor(private companyService : CompanyService, private invetationService : InvetationService, private loginService : LoginService){

  }

  ngOnInit(): void {
    this.getMyParent()
    this.isadmin = this.isAdmin()
  }
  searchCompany(){
    this.search = true
    this.companies = this.companyService.getCompanyContaining(this.branshe)
  }

  addParent(id :number){
    this.invetationService.sendParentInvetation(id).subscribe(x =>{
      console.log(x)
    })
  }

  getMyParent(){
     this.companyService.getMyParent().subscribe(x =>{
      this.myParent = x
      console.log(x)
     })
  }

  isAdmin(): Observable<boolean>{
    return this.loginService.isadmin()
  }


}
