import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../../models/admin/Payment';
import { EMPTY, Observable } from 'rxjs';
import { PaymentService } from '../../../../services/admin/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  payments$! : Observable<Payment[]>
  asCompany = true
  constructor(private paymentService : PaymentService){

  }

  ngOnInit(): void {
    this.getAllMyPayments()
  }

  getAllMyPayments(){
    if(this.asCompany){

      this.payments$ = this.paymentService.getAllMyPaymentAsCompany()
    }else{
      this.payments$ = this.paymentService.getAllMyPaymentAsClient()
    }
  }

  changePayment(){
    this.asCompany = !this.asCompany
    this.getAllMyPayments()
  }


}
