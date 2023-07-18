import { Article } from "./Article"
import { Invoice } from "./invoice"

export class CommandLine{
    
    id             ! :number
    quantity       ! :number
    totTva         ! :number
    prixArticleTot ! :number
    invoice        ! :Invoice
    companyarticle        ! :number
}