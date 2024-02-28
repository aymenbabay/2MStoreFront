import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, catchError, combineLatest, map, of, take } from 'rxjs';
import { WorkerService } from '../../../../services/admin/worker.service';
import { Worker } from '../../../../models/admin/worker';
import { LoginService } from '../../../../services/guest/login/login.service';
import { WorkerModalComponent } from '../../../../modal/admin/worker-modal/worker-modal.component';
import { SignUp } from '../../../../models/user/signup';
import { parentIdSelector } from '../../../../store/reducer/state.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  workers!:Observable<Worker[]>
  worker$!:Observable<Worker[]>;
  user$ !:Observable<SignUp[]>
  type = "worker"
  entity = ""
  isAdmin$ :Observable<boolean> = of(false)

  constructor(private dialog : MatDialog, private workerService: WorkerService, private loginService : LoginService, private store : Store, private router : Router){
   
  }

  ngOnInit(): void {
    this.getAllWorkers()
    this.isAdmin$ = this.isAdmin()
  }
  
  getAllWorkers(){
    this.workers = this.workerService.getAllWorkers()
    this.workers.subscribe(x =>console.log(x))
  
  }

  searchWorker(type : string){
    switch(type){
      case 'worker':
        this.type = "worker"
        this.worker$ = this.workerService.searchWorker(this.entity)
        break;
      
      case 'user' :
        this.type = "user"
        this.user$ = this.loginService.searchUser(this.entity)
      
      }
    
  }

  openWorkerModal(type : string, user : SignUp|null, entity : Worker|null){
    console.log(user)
    const dialogRef = this.dialog.open(WorkerModalComponent,
      {
        data: { type, user ,entity},
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
   this.openWorkerModal("new",null,worker)
  }

  addVacation(entity:Worker,type : string){
    const dialogRef = this.dialog.open(WorkerModalComponent,
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
  

  visitWorker(id : number){
    this.router.navigate([`my-company/worker/${id}`])
  }
  deleteWorkerServer( name: String, id : number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.workerService.deleteWorker(id).subscribe(x =>{
        this.getAllWorkers()
      })
    }

  }

  backToMyWorkers(){
    this.worker$ = EMPTY
    this.type = 'worker'
  }

  isAdmin():Observable<boolean>{
    return this.loginService.isadmin()
  }


}

