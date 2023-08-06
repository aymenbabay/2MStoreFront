import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProviderModalComponent } from '../provider-modal/provider-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from '../../../services/admin/client.service';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.css']
})
export class ClientModalComponent implements OnInit {

  Form!:FormGroup
  constructor(private ref: MatDialogRef<ProviderModalComponent>, public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { entity: any, type: string}, private clientService : ClientService ){
      this.Form = fb.group({
        'name': [''],
        'code': [''],
        'nature': [''],
        'bankaccountnumber':[''],
        'indestrySector':[''],
        'matfisc':[''],
        'credit': [''],
        'mvt': [''],
        'phone': [''],
        'address': [''],
        'email': [''],
        'id': ['']
      })
  }

  ngOnInit(): void {
    if(this.clientService.update){
      this.Form.setValue({
        name: this.data.entity.name,
        code: this.data.entity.code,
        nature: this.data.entity.nature,
        bankaccountnumber : this.data.entity.bankaccountnumber,
        indestrySector : this.data.entity.indestrySector,
        matfisc : this.data.entity.matfisc,
        credit: this.data.entity.credit,
        mvt: this.data.entity.mvt,
        phone: this.data.entity.phone,
        address: this.data.entity.address,
        email: this.data.entity.email,
        id: this.data.entity.id
      })
    }
  }

  submit(){
    if (this.clientService.update) {
      console.log(this.Form.value.id)
      this.clientService.updateClient(this.Form.value, this.Form.value.id).subscribe()
    } else {
      this.clientService.addClient(this.Form.value).subscribe()
    }
    this.close("successfully")
  }

  close(status : string){
  this.ref.close(status)
    this.clientService.update = false
  }
}
