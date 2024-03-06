import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Payment } from '../../../models/admin/Payment';
import { PaymentService } from '../../../services/admin/payment.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentStatus } from '../../../enums/PaymentStatus';
import { PaymentMode } from '../../../enums/PaymentMode';
import { Status } from '../../../enums/status';

@Component({
  selector: 'app-payment-by-id',
  templateUrl: './payment-by-id.component.html',
  styleUrls: ['./payment-by-id.component.css']
})
export class PaymentByIdComponent implements OnInit, OnDestroy{

  private routeParamsSubscription!: Subscription;
  payment$! :  Observable<Payment>
  paymentStatus = PaymentStatus
  paymentType = PaymentMode
  status = Status
  constructor(private paymentService : PaymentService, private activatedRoute : ActivatedRoute){
    console.log("constructor")
  }
  
  ngOnInit(): void {
    this.routeParamsSubscription = this.activatedRoute.paramMap.subscribe(params => {
      // Get the new id value from the route parameters
      const id = parseInt(params.get('id') ?? '');
      this.getMyPaymentById(id);

      // Reload the page if the id has changed
    
    });
  }

  getMyPaymentById(id : number){
    this.payment$ = this.paymentService.getMyById(id)
    this.payment$.subscribe(x =>{ console.log(x)})
  }

  paymentResponse(response : Status, id : number){
   this.paymentService.paymentResponse(response, id).subscribe(x => console.log(x))
  }


ngOnDestroy(): void {
  this.routeParamsSubscription.unsubscribe()
  console.log("destroy payment by id")
}


}
