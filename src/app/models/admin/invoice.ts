import { Company } from "../user/company"
import { Client } from "./client"

export class Invoice{
    id! : number
    code! : number
    tot_tva_invoice! : number
    prix_invoice_tot! : number
    prix_article_tot! : number
    status = false
    client! : Client
    company! : Company
    createdDate! : Date

}