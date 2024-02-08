
import { Status } from "../../enums/status"
import { Article } from "../admin/Article"

export class PurchaseOrderLine{

    id          !:number
    article     !:Article
    comment     !:string
    quantity    !:number
    status      !:Status
}