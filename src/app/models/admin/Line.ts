import { Article } from "./Article"
import { Invoice } from "./invoice"

export class Line {
    id             ! :number
    quantity       ! :number
    totTva         ! :number
    prixArticleTot ! :number
   // invoice        ! :Invoice
    article        ! :Article
    articleLibelle        ! :string
    articleCost           ! :number
    articleTva            ! :number
    articleMargin           ! :number
    articleUnit         ! : string
    articleCode     ! : string

}