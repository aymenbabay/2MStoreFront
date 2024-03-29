import { Company } from "../user/company"
import { ProviderCompany } from "./ProviderCompany"

export class Provider{
    id!: number
    name! : string
    code!: string
    bankaccountnumber!:string
    matfisc ! :string
    phone ! :string
    address ! :string
    indestrySector ! :string
    nature!: string
    company! : Company
    virtual ! : boolean
    email!: string
    myProvider!: boolean
    providercompany !:ProviderCompany
}