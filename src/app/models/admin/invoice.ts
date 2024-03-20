import { PaymentMode } from "../../enums/PaymentMode"
import { PaymentStatus } from "../../enums/PaymentStatus"
import { Company } from "../user/company"
import { BaseEntity } from "./BaseEntity"
import { Client } from "./client"

export class Invoice{
    id! : number
    code! : number
    tot_tva_invoice! : number
    prix_invoice_tot! : number
    prix_article_tot! : number
    status! : String
    client! : Client
    company! : Company
      
    lastModifiedDate! : Date
    createdDate! : Date
    lastModifiedBy! : number
    createdBy! : number
    discount        ! :number
    paid             !:PaymentStatus;
    rest                !: number
}