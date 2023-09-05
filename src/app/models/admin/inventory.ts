import { Company } from "../user/company"
import { CompanyArticle } from "./companyArticle"

export class Inventory{
    id!: number
    current_quantity!: number
    out_quantity!: number
    in_quantity!: number
    libelle_article!: string
    articleCode!: string
    bestClient!: number
    articleCost!: number
    articleSelling!: number
    company       !:Company
    companyArticle !:CompanyArticle
}