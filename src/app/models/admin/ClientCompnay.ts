import { Company } from "../user/company";
import { Client } from "./client";

export class ClientCompany{
    client              !:Client
    company             !:Company
    mvt                 !:number
    credit              !:number
}