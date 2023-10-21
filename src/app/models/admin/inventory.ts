import { Company } from "../user/company"
import { Article } from "./Article"

export class Inventory{
    id                  !: number
    out_quantity        !: number
    in_quantity         !: number
    bestClient          !: number
	articleCost         !: number
	articleSelling      !: number
    discountOut         !: number
    discountIn          !: number
    company             !: Company
    article             !: Article
}