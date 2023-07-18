import { Component ,OnChanges,OnInit, SimpleChanges} from '@angular/core';
import { LoginService } from '../../../services/guest/login/login.service';
import { Company } from '../../../models/user/company';
import { CompanyService } from '../../../services/user/company/company.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyModalComponent } from '../../../modal/user/add-company-modal/add-company-modal.component';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../store/store';
import { ProviderId } from '../../../store/actions/state.action';
import { providerIdSelector } from '../../../store/reducer/state.reducer';
import { ProviderService } from '../../../services/admin/provider.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

isAdmin = false
company$! : Company
rating =0
stars = [1,2,3,4,5]
image = "../assets/349640050_1953693264993335_7294341398407994137_n.jpg"
lambologo ="../assets/lambologo.jpg"
providerId = 0
  constructor(private loginService : LoginService, private companyService : CompanyService,public dialog: MatDialog){}

  ngOnInit(): void {
    this.getMyCompany()
    this.admin()
  
  }



 admin():boolean{
 this.isAdmin = this.loginService.admin()
 console.log(this.isAdmin)
 return this.isAdmin
 }

 openDialog(entity : Company, type : string) {
  this.companyService.update = true
  const dialogRef = this.dialog.open(AddCompanyModalComponent,
    {
      data:{entity,type},
      enterAnimationDuration:'1000ms',
       exitAnimationDuration:'1000ms'
    });

  // dialogRef.afterClosed().subscribe(result => {
  //   console.log(`Dialog result: ${result}`);
  // });
}

 getMyCompany(){
this.companyService.getMe().subscribe(x => {
  this.company$ = x
})
 }

 star(x : number, id:number){
console.log(x)
this.rating = x
  this.companyService.rate(x,id).subscribe()
 }

 
}
