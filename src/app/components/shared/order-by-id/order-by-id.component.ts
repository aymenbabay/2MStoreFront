import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrderService } from '../../../services/user/purchase-order.service';
import { PurchaseOrder } from '../../../models/user/PurchaseOrder';
import { Status } from '../../../enums/status';

@Component({
  selector: 'app-order-by-id',
  templateUrl: './order-by-id.component.html',
  styleUrls: ['./order-by-id.component.css']
})
export class OrderByIdComponent implements OnInit{

  id! :number
  order! : PurchaseOrder
  status = Status
  mycompany = false
  constructor(private activatedRoute : ActivatedRoute, private orderService : PurchaseOrderService){

  }

  ngOnInit(): void {
    console.log("on init")
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')??'');
    const shoppingJson = this.activatedRoute.snapshot.paramMap.get('shopping');
    this.order = shoppingJson ? JSON.parse(shoppingJson) : new PurchaseOrder();
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

  //we dont need it anymore
  getOrder(){
    this.orderService.getOrderById(this.id).subscribe((x:PurchaseOrder) =>{
      console.log(x)
      this.order = x
    })
  }


}
