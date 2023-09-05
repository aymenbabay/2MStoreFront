import { Article } from "./Article"
import { CompanyArticle } from "./companyArticle"
import { Invoice } from "./invoice"

export class Line {
    id             ! :number
    quantity       ! :number
    totTva         ! :number
    prixArticleTot ! :number
   // invoice        ! :Invoice
    companyarticle        ! :CompanyArticle
    articleLibelle        ! :string
    articleCost           ! :number
    articleTva            ! :number
    articleMargin           ! :number
    articleUnit         ! : string
    articleCode     ! : string

}