
import { Article } from "../admin/Article"

export class PurchaseOrderLine{

    id          !:number
    article     !:Article
    comment     !:string
    quantity    !:number
    
}