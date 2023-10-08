import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, filter, map ,combineLatest} from 'rxjs';
import { AdminComponent } from '../../../../modal/admin/admin/admin.component';
import { Invoice } from '../../../../models/admin/invoice';
import { InvoiceService } from '../../../../services/admin/invoice.service';
import { Store } from '@ngrx/store';
import { clientIdSelector, companyIdSelector, providerIdSelector } from '../../../../store/reducer/state.reducer';
import { Router } from '@angular/router';
import { CommandLineService } from '../../../../services/admin/command-line.service';
import { InvoiceModalComponent } from '../../../../modal/admin/invoice-modal/invoice-modal.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

 invoices$!:Observable<Invoice[]>
  me = false
  provider = true
  constructor(private dialog : MatDialog, private invoiceService: InvoiceService, private store : Store,
    private router : Router, private commandLineService : CommandLineService){
   
  }

  ngOnInit(): void {
    this.getAllMyInvoicesAsProvider()
    if(this.commandLineService.view){
      console.log(this.commandLineService.invoice$)
    }
  }
  


  openInvoiceModal(invoice : Invoice|null){
    let type = 'invoice'
    const dialogRef = this.dialog.open(InvoiceModalComponent,
      {
        data: { invoice, type },
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
     dialogRef.afterClosed().subscribe(result => {
      if (result !== "undefined") {
        this.getAllMyInvoicesAsProvider()
      }
     });
  }
 
  getAllMyInvoicesAsProvider(){
    this.provider = true
    this.invoices$ = this.invoiceService.getAllInvoiceAsProvider()
  }

  getInvoiceAsClient(){
    this.provider = false
    this.invoices$ = this.invoiceService.getInvoiceAClient()

  }

  updateInvoiceServer(invoice : Invoice){
    this.commandLineService.view = true
    this.commandLineService.update = true
    console.log( this.commandLineService.view)
    this.commandLineService.invoice$ = invoice
    console.log(invoice.id)
    this.router.navigate(['/my-company/invoice/command'])
  }

 



}
