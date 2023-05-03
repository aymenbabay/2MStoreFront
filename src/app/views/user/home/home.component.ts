import { Component, OnDestroy , OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyModalComponent } from '../../../modal/user/add-company-modal/add-company-modal.component';
import { CompanyService } from '../../../services/user/company/company.service';
import { take, Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy, OnInit{

  s! :Subscription

  constructor(public dialog: MatDialog, private companyService : CompanyService){
  
  }

  ngOnInit(): void {
    this.check()
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddCompanyModalComponent,
      {enterAnimationDuration:'1000ms', exitAnimationDuration:'1000ms'});
  
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  check(){
    this.s= this.companyService.checkCompany().subscribe(x =>
       localStorage.setItem('has_company',x))
  }

  getCompanyById(){
    this.companyService.getCompanyById(1).subscribe(data=>console.log(data))
  }

  ngOnDestroy(): void {
    if(this.s){
      this.s.unsubscribe()
    }
  }
}
