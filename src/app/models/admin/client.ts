import { Company } from "../user/company"
import { User } from "../user/user"
import { Provider } from "./provider"

export class Client{
    id!: number
    name!: string
    code!: string
    mvt!: number
    credit!: number
    nature!: string
    bankaccountnumber! :string
    matfisc ! :string
    phone ! :string 
    address ! : string
    indestrySector ! :string
    email !: string
    company! : Company
    providers! : Provider[];
    virtual! : boolean
}