import { Company } from "../user/company"
import { Article } from "./article"

export interface CompanyArticle{
    id : number
    discription : string
    cost : number
    quantity : number
    minQuantity : number
    tva : number
    sellingPrice : number
    article : Article
    company :Company
}