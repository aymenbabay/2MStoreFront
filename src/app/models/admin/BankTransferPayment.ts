import { Invoice } from "./invoice"

export class BankTransferPayment{
    amount              !:number
    invoice             !:Invoice
    agency              !:string
    transactionId       !:string
    bankAccount         !:string


}