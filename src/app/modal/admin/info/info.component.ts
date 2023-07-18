import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{
  display = false
  constructor(private ref: MatDialogRef<InfoComponent>, @Inject(MAT_DIALOG_DATA) public data:{message:any, type:any}){ }

  ngOnInit(){
    switch(this.data.type){
      case 'articlealreadyadded':
      this.display = true
      setTimeout(() => {
        this.close()
      }, 4000);
      break
    }
  }

  close(){
    this.ref.close()
  }
}
