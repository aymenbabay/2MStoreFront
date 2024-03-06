import { PaymentMode } from "../../enums/PaymentMode"
import { Status } from "../../enums/status"
import { Invoice } from "./invoice"

export class Payment {
    id                  !: number
    amount              !:number
    invoice             !:Invoice
    delay               !:Date
    number              !:string
    agency              !:string
    bankAccount         !:string
    type                !:PaymentMode
    status              !:Status
    transactionId       !:string
}