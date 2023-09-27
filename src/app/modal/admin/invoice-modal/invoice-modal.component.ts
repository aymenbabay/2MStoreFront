import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Client } from '../../../models/admin/client';
import { EMPTY, Observable, Subscription, of, switchMap } from 'rxjs'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../../services/admin/client.service';
import { InvoiceService } from '../../../services/admin/invoice.service';
import { Router } from '@angular/router';
import { CommandLineService } from '../../../services/admin/command-line.service';
@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.css']
})
export class InvoiceModalComponent implements OnInit {

  
  private subscriptions: Subscription = new Subscription();
  Form!: FormGroup
  Add = "Add"
  type = ""
  client$! : Observable<Client[]>
  constructor(private ref: MatDialogRef<InvoiceModalComponent>, public fb: FormBuilder,private router : Router,
     @Inject(MAT_DIALOG_DATA) public data: { entity: any, type: string },private commandLineService : CommandLineService,
   private clientService : ClientService, private invoiceService : InvoiceService){
      this.Form = fb.group({
        'name': [''],
        'code': [''],
        'nature': [''],
        'credit': [''],
        'mvt': [''],
        'phone': [''],
        'address': [''],
        'email': [''],
        'id': ['']
      })
  }

  ngOnInit(){
    
      if(this.invoiceService.update){
        this.Form.setValue({
          name: this.data.entity.name,
          code: this.data.entity.code,
          nature: this.data.entity.nature,
          credit: this.data.entity.credit,
          mvt: this.data.entity.mvt,
          phone: this.data.entity.phone,
          address: this.data.entity.address,
          email: this.data.entity.email,
          id: this.data.entity.id
        })
      }


  }

  getAllMyClientContaining(value : string){
    this.client$ = this.clientService.getAllMyClientContaining(value);
    this.client$.subscribe(data =>console.log(data))
  }

  submit(){
    if (this.invoiceService.update) {
      this.invoiceService.updateInvoice(this.Form.value.code).subscribe()
    } else {
      const mySubsc = this.client$
      .pipe(
        switchMap(clients => {
          const selectedClient =  clients.find(client => client.id.toString() === this.Form.value.name);
          if (selectedClient) {
            this.invoiceService.client =selectedClient
          }
          return selectedClient ? of(selectedClient) : EMPTY;
        })
      )
      .subscribe(selectedClient => {
        console.log('selectedClient:', selectedClient);
         this.router.navigate(["/my-company/invoice/command"])
      });
      this.subscriptions.add(mySubsc)
      this.commandLineService.go = true
    }
this.close("saved successfully")
  }

  
  close(status : string){
      
    this.ref.close(status)
      }
}
