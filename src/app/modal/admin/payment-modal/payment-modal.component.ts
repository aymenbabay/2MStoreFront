import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Invoice } from '../../../models/admin/invoice';
import { CashPayment } from '../../../models/admin/CashPayment';
import { PaymentService } from '../../../services/admin/payment.service';
import { CheckPayment } from '../../../models/admin/CheckPayment';
import { BillPayment } from '../../../models/admin/BillPayment';
import { BankTransferPayment } from '../../../models/admin/BankTransferPayment';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {

  
  Form!:FormGroup
  type = "choise"
  constructor(private ref: MatDialogRef<PaymentModalComponent>, public fb: FormBuilder, private paymentService : PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: { invoice: Invoice}){
     
      console.log(data.invoice)
     this.Form = fb.group({
      'cash' :[],
      'check':[],
      'bill':[],
      'bank':[]
     })
    }


    ngOnInit(): void {
      
    }
    
    submitChoise(type : string){
     
      this.type = type
      switch(type){
        
        case 'cash':
          this.Form = this.fb.group({
            'amount':[],
            'invoicecode' : this.data.invoice.code,
            'clientname' : this.data.invoice.client.name,
            'solde' : this.data.invoice.prix_invoice_tot
            
          })
          break;
          
          case 'check':
            this.Form = this.fb.group({
              'amount' :[],
              'number' :[],
              'delay' :[],
              'agency' : [],
              'bankAccount': this.data.invoice.client.bankaccountnumber,
              'invoicecode' : this.data.invoice.code,
              'clientname' : this.data.invoice.client.name,
              'solde' : this.data.invoice.prix_invoice_tot,
            })
            break;
            
            case 'bill':
              this.Form = this.fb.group({
                'amount' :[],
                'number' :[],
                'delay' :[],
                'agency' : [],
                'bankAccount': this.data.invoice.client.bankaccountnumber,
                'invoicecode' : this.data.invoice.code,
                'clientname' : this.data.invoice.client.name,
                'solde' : this.data.invoice.prix_invoice_tot,
              })
        break;

        case 'bank':
          this.Form = this.fb.group({
            'amount' :[],
            'transaction' :[],
            'delay' :[],
            'agency' : [],
            'bankAccount': this.data.invoice.client.bankaccountnumber,
            'invoicecode' : this.data.invoice.code,
            'clientname' : this.data.invoice.client.name,
            'solde' : this.data.invoice.prix_invoice_tot,
        })
        break;
        
    }
    }


submit(){
switch(this.type){
  case 'cash':
    const cash = new CashPayment()
    cash.invoice = this.data.invoice
    cash.amount = this.Form.value.amount
  this.paymentService.paymentCash(cash).subscribe()
  break;

  
  case 'check':
    const check = new CheckPayment()
    check.invoice = this.data.invoice
    check.amount = this.Form.value.amount
    check.number = this.Form.value.number
    check.delay = this.Form.value.delay
    check.agency = this.Form.value.agency
    check.bankAccount = this.Form.value.bankAccount

  this.paymentService.paymentCheck(check).subscribe()
  break;
  
  case 'bill':
    const bill = new BillPayment()
    bill.invoice = this.data.invoice
    bill.amount = this.Form.value.amount
    bill.number = this.Form.value.number
    bill.delay = this.Form.value.delay
    bill.agency = this.Form.value.agency
    bill.bankAccount = this.Form.value.bankAccount
  this.paymentService.paymentBill(bill).subscribe()
  break;


  case 'bank':
    const bank = new BankTransferPayment()
    bank.invoice = this.data.invoice
    bank.amount = this.Form.value.amount
    bank.transactionId = this.Form.value.transaction
    bank.agency = this.Form.value.agency
    bank.bankAccount = this.Form.value.bankAccount
    console.log(bank)
    console.log(this.Form.value.transaction)
  this.paymentService.paymentBank(bank).subscribe()
  break;
  

}
this.close("successfuly")
}
  
close(status : string){
  this.ref.close(status)
}

}
