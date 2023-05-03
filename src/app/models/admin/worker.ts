import { SignUp } from "../user/signup"

export class Worker{
    id!: number
    name!: string
    phone!: string
    email!: string
    address!: string
    salary!: number
    user! : SignUp
}