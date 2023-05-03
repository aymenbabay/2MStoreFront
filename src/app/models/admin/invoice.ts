import { Company } from "../user/company"
import { Client } from "./client"

export class Invoice{
    id! : number
    tot_tva! : number
    code! : string
    tot_tva_invoice! : number
    prix_article_tot! : number
    prix_invoice_tot! : number
    createdDate! : number
    client! : Client
    company! : Company
	 status = false

}