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
  constructor(private ref: MatDialogRef<WorkerModalComponent>, public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { type: string, user : SignUp|null,entity :any },
              private workerService : WorkerService, private invetationService : InvetationService
  ){

    this.type = data.type
      switch(this.type){
        case 'exist':
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
        break;
        case 'new':
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
          break;
        case 'vacation':
          this.Form = fb.group({
            'startdate':[],
            'enddate':[],
            'remainingday':[],
            'usedday':[],
            'worker':[]
          })
          break;
      
        }
  }

  ngOnInit(): void {
    console.log(this.data.user)
    switch(this.type){
      case 'exist':
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
    break;
      case 'vacation':
                  console.log(this.data.entity)
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
                  this.Form.setValue({
                    startdate: today.toISOString().substring(0, 10),
                    enddate: tomorrow.toISOString().substring(0, 10),
                    remainingday : this.data.entity.remainingday,
                    usedday : this.data.entity.totdayvacation-this.data.entity.remainingday,
                    worker: this.data.entity.id
                  })
            
      break;
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
          break;
          case 'vacation':
            this.Form.setValue({
        startdate: this.Form.value.startdate,
        enddate: this.Form.value.enddate,
        remainingday: this.Form.value.remainingday,
        usedday: this.Form.value.usedday,
        worker : {id:this.Form.value.worker}
      })
      this.workerService.addVacation(this.Form.value).subscribe()
      break;
    }
    
    this.close("successfully")
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
