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
  providerInvoices! : Invoice[]
  clientInvoices! : Invoice[]
  constructor(private dialog : MatDialog, private invoiceService: InvoiceService, private store : Store,
    private router : Router, private commandLineService : CommandLineService){
   
  }

  ngOnInit(): void {
    this.getAllInvoices()
    if(this.commandLineService.view){
      console.log(this.commandLineService.invoice$)
    }
  }
  
  getAllInvoices(){
   this.invoices$ = this.invoiceService.invoices$
    this.me = false
    this.getAllMyInvoiceAsProvider()
   
  
  }

  getAllMyInvoiceAsProvider() {
    this.provider = true;
    this.store.select(clientIdSelector).subscribe(clientId => {
      this.store.select(companyIdSelector).subscribe(companyId => {
        this.invoices$.subscribe((invoices: Invoice[]) => {
          console.log(clientId +" "+companyId)
          this.clientInvoices = invoices.filter(invoice => invoice.client.id === clientId);
          this.providerInvoices = invoices.filter(invoice => invoice.company.id === companyId);
          console.log("Client Invoices: ", this.clientInvoices);
          console.log("Provider Invoices: ", this.providerInvoices);
        });
      });
    });
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
        this.getAllInvoices()
      }
     });
  }
 
  getAllMyInvoicesAsProvider(){
    this.provider = true
  }

  getInvoiceAsClient(){
    this.provider = false

  }

  updateInvoiceServer(invoice : Invoice){
    this.commandLineService.view = false
    console.log( this.commandLineService.view)
    this.commandLineService.invoice$ = invoice
    console.log(invoice.id)
    this.router.navigate(['/my-company/invoice/command'])
  }

   deleteInvoiceServer( name: number, id : number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
       this.invoiceService.deleteInvoice(id).subscribe(data =>{
         this.getAllInvoices()

       })
    }

  }



}
