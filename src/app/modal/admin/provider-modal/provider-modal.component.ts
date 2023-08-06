import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProviderService } from '../../../services/admin/provider.service';

@Component({
  selector: 'app-provider-modal',
  templateUrl: './provider-modal.component.html',
  styleUrls: ['./provider-modal.component.css']
})
export class ProviderModalComponent implements OnInit {

  Form!:FormGroup
  Add!: string
  type!: string
  constructor(private ref: MatDialogRef<ProviderModalComponent>, public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { entity: any, type: string}, private providerService : ProviderService){
      this.Form = this.fb.group({
        'name': [''],
        'matfisc': [''],
        'bankaccountnumber': [''],
        'indestrySector': [''],
        'code': [''],
        'nature': [''],
        'credit': [''],
        'mvt': [''],
        'phone': [''],
        'address': [''],
        'email': [''],
        'id': [''],
        'virtual':['']
      })
    }

ngOnInit(): void {
  
  if(this.providerService.update){
    this.Add = "update"
    console.log(this.data.entity)
    this.Form.setValue({
      name: this.data.entity.name,
      code: this.data.entity.code,
      matfisc: this.data.entity.matfisc,
      bankaccountnumber: this.data.entity.bankaccountnumber,
      indestrySector: this.data.entity.indestrySector,
    nature: this.data.entity.nature,
    credit: this.data.entity.credit,
    mvt: this.data.entity.mvt,
    phone: this.data.entity.phone,
    address: this.data.entity.address,
    email: this.data.entity.email,
    id: this.data.entity.id,
    virtual: this.data.entity.virtual
  })
}
}

submit(){
  if (this.providerService.update) {
    this.providerService.updateProvider(this.Form.value,this.Form.value.id).subscribe()
  } else {
    this.providerService.addProvider(this.Form.value).subscribe()
  }
  this.close("successfully")
}

close(status : string){
  this.ref.close(status)

      this.providerService.update = false
  


}

}
