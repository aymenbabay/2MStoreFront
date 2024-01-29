import { Company } from "../user/company";
import { SignUp } from "../user/signup";
import { Client } from "./client";
import { Provider } from "./provider";

export class Invetation{
    id!        :number
    client! : Client
    provider! : Provider
    company!  :Company
    status ! :String
    user !: SignUp
    salary !:number
    jobtitle !:string
    department !: string
    totdayvacation !: number
    statusvacation !: number



}