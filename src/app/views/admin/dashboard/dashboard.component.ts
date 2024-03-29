import { Component ,OnDestroy,OnInit} from '@angular/core';
import { LoginService } from '../../../services/guest/login/login.service';
import { Company } from '../../../models/user/company';
import { CompanyService } from '../../../services/user/company/company.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyModalComponent } from '../../../modal/user/add-company-modal/add-company-modal.component';
import { Store } from '@ngrx/store';
import { companyIdSelector } from '../../../store/reducer/state.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

isAdmin = false
role = ""
company$! : Company
stars = [1,2,3,4,5]
image = "../assets/349640050_1953693264993335_7294341398407994137_n.jpg"
lambologo ="../assets/lambologo.jpg"
providerId = 0
unsubscribe! : Subscription
  constructor(private loginService : LoginService, private companyService : CompanyService,public dialog: MatDialog, private store : Store){}

  ngOnInit(): void {
    this.getMyCompany()
    this.admin()
  
  }

  


 admin(){
 this.isAdmin = this.loginService.admin()
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
  this.unsubscribe =  this.store.select(companyIdSelector).subscribe(companyId =>{

    this.unsubscribe =  this.companyService.getMe(companyId).subscribe(x => {
      this.company$ = x
    })
})
 }

 star(x : number, id:number){
console.log(x)
  this.companyService.rate(x,id).subscribe()
 }

 ngOnDestroy(): void {
  this.unsubscribe.unsubscribe()
 }
 
}
