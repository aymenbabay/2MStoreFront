import { Company } from "../user/company"
import { SignUp } from "../user/signup"

export class Worker{
    id!: number
    name!: string
    phone!: string
    email!: string
    address!: string
    salary!: number
    jobtitle!: string
    department!: string
    totdayvacation!: number
    statusvacation! :boolean
    user! : SignUp
    company !: Company
}