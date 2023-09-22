import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Client } from '../../../models/admin/client';
import { Observable } from 'rxjs'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../../../services/admin/client.service';
@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.css']
})
export class InvoiceModalComponent implements OnInit {

  Form!: FormGroup
  Add = "Add"
  type = ""
  client$! : Observable<Client[]>
  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { entity: any, type: string },
   private clientService : ClientService){
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
    
    this.getAllClient();
  }

  getAllClient(){
    this.client$ = this.clientService.getAllMyClients();
    this.client$.subscribe(data =>console.log(data))
  }

  submit(){

  }
}
