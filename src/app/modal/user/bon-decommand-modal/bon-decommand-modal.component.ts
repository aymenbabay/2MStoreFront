import { Component,Inject, OnInit } from '@angular/core';
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
export class PurchaseOrderModalComponent implements OnInit {

  bonCommandForm! : FormGroup
  imageUrl!: string| null
 // selectedOption = false


  constructor(private ref : MatDialogRef<PurchaseOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { company: Company, article : Article, line :PurchaseOrderLine, type :string },
  public fb : FormBuilder, private purchaseOrderService : PurchaseOrderService){
    this.bonCommandForm = fb.group({
      'selectedOption' : [true],
      'quantity' : [''],
      'comment' : [''],

    })
    this.imageUrl = `http://localhost:8080/werehouse/image/${this.data.article.image}/article/${this.data.article.provider.company.user.username}`
  }

  ngOnInit(): void {
    if(this.data.type === "update"){
      this.bonCommandForm.setValue({
        selectedOption : this.data.line.delivery,
        quantity : this.data.line.quantity,
        comment : this.data.line.comment
      })
    }
  }


//a verifier pour le commentaire de company
  submit(){
    if(this.data.type != "update"){

      const order = new PurchaseOrderLine()
      order.article = this.data.article
      order.quantity = this.bonCommandForm.value.quantity
      order.comment = this.bonCommandForm.value.comment
      order.delivery = this.bonCommandForm.value.selectedOption
      console.log(order)
      this.purchaseOrderService.orderList.push(order)
      console.log(this.purchaseOrderService.orderList)
    }else{
      this.data.line.delivery = this.bonCommandForm.value.selectedOption
      this.data.line.comment = this.bonCommandForm.value.comment
      this.data.line.quantity = this.bonCommandForm.value.quantity
      console.log(this.data.line)

      this.purchaseOrderService.updateLine(this.data.line).subscribe()
    }
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
