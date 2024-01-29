import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Company } from '../../../models/user/company';
import { Article } from '../../../models/admin/Article';
import { PurchaseOrderService } from '../../../services/user/purchase-order.service';
import { PurchaseOrderLine } from '../../../models/user/purchaseOrderLine';
import { Client } from '../../../models/admin/client';

@Component({
  selector: 'app-bon-decommand-modal',
  templateUrl: './bon-decommand-modal.component.html',
  styleUrls: ['./bon-decommand-modal.component.css']
})
export class PurchaseOrderModalComponent {

  bonCommandForm! : FormGroup

  constructor(private ref : MatDialogRef<PurchaseOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { company: Company, article : Article },
  public fb : FormBuilder, private purchaseOrderService : PurchaseOrderService){
    this.bonCommandForm = fb.group({
      'quantity' : [''],
      'comment' : ['']
    })
  }
//a verifier pour le commentaire de company
  submit(){
    const order = new PurchaseOrderLine()
    console.log(this.data.article)
    console.log(this.bonCommandForm.value)
    order.article = this.data.article
   // order.company = this.data.company
    order.quantity = this.bonCommandForm.value.quantity
    order.comment = this.bonCommandForm.value.comment
    console.log(order)
    this.purchaseOrderService.orderList.push(order)
    this.close()
  }

  send(){
    this.submit()
    this.purchaseOrderService.addToCart().subscribe(x =>{
      this.purchaseOrderService.orderList = []
    })
  }

  close(){
    this.ref.close()
  }
}
