import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkerService } from '../../../services/admin/worker.service';
import { Vacation } from '../../../models/admin/vacation';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { WorkerModalComponent } from '../../../modal/admin/worker-modal/worker-modal.component';

@Component({
  selector: 'app-worker-by-id',
  templateUrl: './worker-by-id.component.html',
  styleUrls: ['./worker-by-id.component.css']
})
export class WorkerByIdComponent implements OnInit {

  history$! : Observable<Vacation[]>
  id! : number|0
  constructor(private dialog : MatDialog,private activatedRoute : ActivatedRoute, private workerService: WorkerService){}

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')??'');
    this.getWorkerHistory()
  }

  getWorkerHistory(){
   this.history$ = this.workerService.getWorkerHistory(this.id)
   this.history$.subscribe(x => console.log(x))
  }

  addVacation(vacation:Vacation){
    this.openWorkerModal(vacation,"vacation")
  }

  openWorkerModal(entity:Vacation,type : string){
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
}
