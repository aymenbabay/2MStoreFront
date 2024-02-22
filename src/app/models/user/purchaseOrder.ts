
import { PassingClient } from "../admin/PassingClient"
import { Client } from "../admin/client"
import { Company } from "./company"

export class PurchaseOrder{
    id !: number
    company     !:Company
    client      !:Client
    pclient     !:PassingClient
    orderNumber     !:string

}