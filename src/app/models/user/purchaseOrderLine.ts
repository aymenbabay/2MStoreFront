
import { Status } from "../../enums/status"
import { Article } from "../admin/Article"
import { PurchaseOrder } from "./PurchaseOrder"

export class PurchaseOrderLine{

    id          !:number
    article     !:Article
    comment     !:string
    quantity    !:number
    status      !:Status
    delivery    !:boolean
    purchaseorder ! :PurchaseOrder
}