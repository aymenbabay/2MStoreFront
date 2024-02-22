import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../../models/user/PurchaseOrder';
import { PurchaseOrderService } from '../../../services/user/purchase-order.service';
import { Observable, of } from 'rxjs';
import { Status } from '../../../enums/status';
import { Store } from '@ngrx/store';
import { companyIdSelector } from '../../../store/reducer/state.reducer';
import { PurchaseOrderLine } from '../../../models/user/purchaseOrderLine';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseOrderModalComponent } from '../../../modal/user/bon-decommand-modal/bon-decommand-modal.component';
import { LoginService } from '../../../services/guest/login/login.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  order! : Observable<PurchaseOrderLine[]>
  status = Status
  companyId! : number
  isadmin : Observable<boolean> = of(false)
  constructor(private purchaseOrderService : PurchaseOrderService,private store : Store, private orderService : PurchaseOrderService,public dialog: MatDialog, public loginService : LoginService){}

ngOnInit(): void {
  this.getCompany()
  this.getAllMyOrder()
  this.isadmin = this.isAdmin()
}

getAllMyOrder(){
  this.order = this.purchaseOrderService.getOrder()
  this.order.subscribe(x =>console.log(x))
}

statusResponse(id: number, status : Status){
  this.orderService.statusResponse(id,status).subscribe(x =>{
    console.log(x)
  })
}

cancelOrder(id:number){
  this.orderService.cancelOrder(id).subscribe(x =>{
    console.log(x)
  })
}

updateOrder(order: PurchaseOrder, line : PurchaseOrderLine){
  let company = order.company
  let article = line.article
  let type = "update"
  const dialogRef = this.dialog.open(PurchaseOrderModalComponent,
    {
      data : {company,article,line,type},
      enterAnimationDuration:'1000ms',
       exitAnimationDuration:'1000ms'
    });
}

getCompany(){
  this.store.select(companyIdSelector).subscribe(x => {
    this.companyId = x
    console.log(x)
  })
}

isAdmin():Observable<boolean>{
  return this.loginService.isadmin()
}


}
