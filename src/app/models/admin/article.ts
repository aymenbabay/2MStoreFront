
import { PrivacySetting } from "../../enums/PrivacySetting"
import { Unit } from "../../enums/Unit"
import { Company } from "../user/company"
import { SubArticle } from "./SubArticle"
import { Category } from "./category"
import { Provider } from "./provider"
import { SubCategory } from "./sub-category"

export class Article{
    id            !:number
    libelle       !:string
    code          !:string
    unit          !:Unit
    discription   !:string
    cost          !:number
    quantity      !:number
    minQuantity   !:number
    margin        !:number
    barcode       !:string
    tva           !:number
    category      !:Category
    subCategory  !:SubCategory
     provider     !:Provider
     image        !:string
     company      !:Company
     sharedPoint  !:string
     isVisible    !:PrivacySetting
     subArticle    !:SubArticle[]
}
