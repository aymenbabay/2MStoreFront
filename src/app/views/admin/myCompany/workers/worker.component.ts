import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { WorkerService } from '../../../../services/admin/worker.service';
import { Worker } from '../../../../models/admin/worker';
import { LoginService } from '../../../../services/guest/login/login.service';
import { WorkerModalComponent } from '../../../../modal/admin/worker-modal/worker-modal.component';
import { User } from '../../../../models/user/user';
import { SignUp } from '../../../../models/user/signup';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  workers!:Observable<Worker[]>
  worker$!:Worker[];
  user$ !:Observable<SignUp[]>
  type = "worker"
  entity = ""

  constructor(private dialog : MatDialog, private workerService: WorkerService, private loginService : LoginService){
   
  }

  ngOnInit(): void {
    this.getAllWorkers()
  }
  
  getAllWorkers(){
    this.workers = this.workerService.getAllWorkers()
    this.workers.subscribe(x =>console.log(x))
  
  }

  searchWorker(type : string){
    switch(type){
      case 'worker':
        this.type = "worker"
        this.workerService.searchWorker(this.entity).subscribe(x => {
          this.worker$ = x
        })
        break;
      
      case 'user' :
        this.type = "user"
        this.user$ = this.loginService.searchUser(this.entity)
      
      }
    
  }

  

  addWorker(){
    this.workerService.addWorker(this.worker$[0]).subscribe()
  }

  openWorkerModal(type : string, user : SignUp|null){
    console.log(user)
    const dialogRef = this.dialog.open(WorkerModalComponent,
      {
        data: { type, user },
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
     dialogRef.afterClosed().subscribe(result => {
      if (result !== "undefined") {
        this.ngOnInit()
      }
     });
  }

  UpdateWorkerServer(worker : Worker){
    this.workerService.update = true
   // this.openWorkerModal(worker,"worker")
  }

  addVacation(worker:Worker){
   // this.openWorkerModal(worker,"vacation")
  }

  deleteWorkerServer( name: String, id : number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.workerService.deleteWorker(id).subscribe(x =>{
        this.getAllWorkers()
      })
    }

  }



}

