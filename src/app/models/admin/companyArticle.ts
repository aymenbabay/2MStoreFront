import { Company } from "../user/company"
import { Article } from "./Article"
import { Category } from "./category"
import { SubCategory } from "./sub-category"

export class CompanyArticle{
    id           ! : number
    discription  ! : string
    cost         ! : number
    quantity     ! : number
    minQuantity  ! : number
    tva          ! : number
    margin ! : number
    article      ! : Article
    company      ! :Company
    category     ! :Category
    subCategory  ! :SubCategory
}