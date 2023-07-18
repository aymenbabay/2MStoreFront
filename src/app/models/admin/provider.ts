import { Company } from "../user/company"

export class Provider{
    id!: number
    name! : string
    code!: string
    bankaccountnumber!:string
    matfisc ! :string
    phone ! :string
    address ! :string
    indestrySector ! :string
    mvt!: number
    credit!: number
    nature!: string
    company! : Company

}