import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkerService } from '../../../services/admin/worker.service';
import { SignUp } from '../../../models/user/signup';
import { InvetationService } from '../../../services/admin/invetation.service';

@Component({
  selector: 'app-worker-modal',
  templateUrl: './worker-modal.component.html',
  styleUrls: ['./worker-modal.component.css']
})
export class WorkerModalComponent implements OnInit {

  type = ''
  Add = "Add"
  Form!: FormGroup
  constructor(private ref: MatDialogRef<WorkerModalComponent>, public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { type: string, user : SignUp|null },
              private workerService : WorkerService, private invetationService : InvetationService
  ){

    this.type = data.type
    
        this.Form = fb.group({
          'name': [''],
          'salary': [''],
          'phone': [''],
          'address': [''],
          'email': [''],
          'id': [''],
          'jobtitle': [''],
          'department': [''],
          'totdayvacation': [''],
          'statusvacation': [''],
          'user': ['']
        })
      
  }

  ngOnInit(): void {
    console.log(this.data.user)
    if(this.data.user != null){
      this.Form.setValue({
        name : this.data.user.username,
        address : this.data.user.address,
        email : this.data.user.email,
        phone : this.data.user.phone,
        salary : 0,
        jobtitle : '',
        department : '',
        totdayvacation : 0,
        statusvacation: false,
        id : 0,
        user : this.data.user
      })
    }
  }
  submit(){
      switch(this.type){
        case 'new':
        if (this.workerService.update) {
          console.log("update worker")
          this.workerService.updateWorker(this.Form.value).subscribe()
        } else {
          console.log("add worker")
          this.workerService.addWorker(this.Form.value).subscribe()
        }
        break;
        case 'exist':
          this.invetationService.sendWorkerInvetation(this.Form.value).subscribe()
        this.close("successfully")
      }
     
  }

  close(status : string){
    this.ref.close(status)
    switch (this.workerService.update){
      case true:
        this.workerService.update = false
        break;
      case false: 
      break;
    }
  }  

}
