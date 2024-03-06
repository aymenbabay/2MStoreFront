import { Invoice } from "./invoice"

export class CheckPayment{
    amount              !:number
    invoice             !:Invoice
    delay               !:Date
    number              !:string
    agency              !:string
    bankAccount         !:string
}