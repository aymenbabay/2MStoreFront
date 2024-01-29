
import { PassingClient } from "../admin/PassingClient"
import { Client } from "../admin/client"
import { Company } from "./company"
import { PurchaseOrderLine } from "./purchaseOrderLine"

export class PurchaseOrder{
    id !: number
    company     !:Company
    client      !:Client
    pclient     !:PassingClient
    lines       !:PurchaseOrderLine[]
    status          !:string
    orderNumber     !:string

}