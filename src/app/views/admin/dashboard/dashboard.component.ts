import { Component ,OnChanges,OnInit, SimpleChanges} from '@angular/core';
import { LoginService } from '../../../services/guest/login/login.service';
import { Company } from '../../../models/user/company';
import { CompanyService } from '../../../services/user/company/company.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
isAdmin = false
company$! : Company
  constructor(private loginService : LoginService, private companyService : CompanyService){}

  ngOnInit(): void {
    this.getMyCompany()
    this.admin()
  }

  

 admin():boolean{
 this.isAdmin = this.loginService.admin()
 console.log(this.isAdmin)
 return this.isAdmin
 }


 getMyCompany(){
this.companyService.getMe().subscribe(x => this.company$ = x)
 }
  
}
