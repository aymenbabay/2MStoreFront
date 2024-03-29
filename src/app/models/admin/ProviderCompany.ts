import { Company } from "../user/company";
import { Provider } from "./provider";

export class ProviderCompany{

    provider            !: Provider
    company             !:Company
    mvt                 !:number
    credit              !:number
    deleted           !:boolean
    advance             !:number
}