import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AdminComponent } from '../../../../modal/admin/admin/admin.component';
import { WorkerService } from '../../../../services/admin/worker.service';
import { Worker } from '../../../../models/admin/worker';
import { LoginService } from '../../../../services/guest/login/login.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  workers!:Observable<Worker[]>
  worker$!:Worker
  entity = ""

  constructor(private dialog : MatDialog, private workerService: WorkerService,
              private loginService : LoginService){
   
  }

  ngOnInit(): void {
    this.getAllWorkers()
  }
  
  getAllWorkers(){
    this.workers = this.workerService.getAllWorkers()
    this.workers.subscribe(x =>console.log(x))
  
  }

  searchUser(){
    this.loginService.searchUser(this.entity).subscribe(x => {this.worker$ = x
    console.log(x)})

  }

  addWorker(){
    this.workerService.addWorker(this.worker$).subscribe()
  }

  openWorkerModal(){
    let type = 'worker'
    let entity = this.worker$
    const dialogRef = this.dialog.open(AdminComponent,
      {
        data: { entity, type },
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
     dialogRef.afterClosed().subscribe(result => {
      if (result !== "undefined") {
        this.ngOnInit()
      }
     });
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

