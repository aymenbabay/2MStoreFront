import { Component } from '@angular/core';
import { CompanyService } from '../../../../services/user/company/company.service';
import { Company } from '../../../../models/user/company';
import { Observable } from 'rxjs';
import { InvetationService } from '../../../../services/admin/invetation.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent {

  branshe = ''
  companies! : Observable<Company[]>

  constructor(private companyService : CompanyService, private invetationService : InvetationService){

  }

  searchCompany(){
    this.companies = this.companyService.getCompanyContaining(this.branshe)
  }

  addParent(id :number){
    this.invetationService.sendParentInvetation(id).subscribe(x =>{
      console.log(x)
    })
  }
}
