import { Article } from "./Article"
import { Invoice } from "./invoice"


export class CommandLine{
    
   id                     ! :number
   quantity               ! :number
   totTva                 ! :number
   prixArticleTot         ! :number
    article               ! :Article
    Invoice               ! :Invoice
    discount              ! :number
}