import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrderService } from '../../../services/user/purchase-order.service';
import { PurchaseOrder } from '../../../models/user/PurchaseOrder';
import { Status } from '../../../enums/status';
import { PurchaseOrderLine } from '../../../models/user/purchaseOrderLine';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-by-id',
  templateUrl: './order-by-id.component.html',
  styleUrls: ['./order-by-id.component.css']
})
export class OrderByIdComponent implements OnInit{

  id! :number
  order! : Observable<PurchaseOrderLine[]>
  status = Status
  mycompany = false
  constructor(private activatedRoute : ActivatedRoute, private orderService : PurchaseOrderService){

  }

  ngOnInit(): void {
    console.log("on init")
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')??'');
     this.getPurchaseOrderLinesByPurchaseOrderId(this.id)
    const currentUrl = window.location.href;
    const path = new URL(currentUrl).pathname
    if(path[1] === "m"){
      this.mycompany = !this.mycompany
    }
    console.log(path[1])
   
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

  getPurchaseOrderLinesByPurchaseOrderId(id : number){
    this.order = this.orderService.getPurchaseOrderLinesByPurchaseOrderId(id)
    this.order.subscribe(x => console.log(x))
  }

  


}
