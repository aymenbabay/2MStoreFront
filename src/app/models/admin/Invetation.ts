import { Company } from "../user/company";
import { Client } from "./client";
import { Provider } from "./provider";

export class Invetation{
    id!        :number
    client! : Client
    provider! : Provider
    company!  :Company
    status ! :String
}