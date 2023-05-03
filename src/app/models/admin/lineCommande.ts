import { Client } from "./client"
import { Invoice } from "./invoice"

export class CommandLine{
    id!:number
    codeArticle!:string
    libelleArticle!:string
    quantity!:number
    unit!: string
    tva!: number
    prixArticleUnit!: number
    invoice!: Invoice
    totTva!: number
    prixArticleTot!: number
    client!: Client
}