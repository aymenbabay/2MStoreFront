
import { Article } from "../admin/Article"
import { Client } from "../admin/client"
import { Company } from "./company"

export class PurchaseOrder{

    id          !:number
    company     !:Company
    client      !:Client
    articles     :Article[] = []
    comment     !:string
    quantity    !:number
    
}