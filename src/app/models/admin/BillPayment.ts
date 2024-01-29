import { Invoice } from "./invoice"

export class BillPayment{
    amount              !:number
    invoice             !:Invoice
    delay               !:Date
    number              !:string
    agency              !:string
}