import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkerService } from '../../../services/admin/worker.service';
import { Vacation } from '../../../models/admin/vacation';
import { EMPTY, Observable } from 'rxjs';
import { AdminComponent } from '../../../modal/admin/admin/admin.component';
import { MatDialog } from '@angular/material/dialog';
import { Worker } from '../../../models/admin/worker';

@Component({
  selector: 'app-worker-by-id',
  templateUrl: './worker-by-id.component.html',
  styleUrls: ['./worker-by-id.component.css']
})
export class WorkerByIdComponent implements OnInit {

  history$ : Observable<Vacation[]> = EMPTY
  id! : number|0
  constructor(private dialog : MatDialog,private activatedRoute : ActivatedRoute, private workerService: WorkerService){}

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')??'');
    this.getWorkerHistory()
  }

  getWorkerHistory(){
   this.history$ = this.workerService.getWorkerHistory(this.id)
  }

  addVacation(worker:Worker){
    this.openWorkerModal(worker,"vacation")
  }

  openWorkerModal(entity:Worker,type : string){
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
}
