import { Company } from "../user/company"
import { Worker } from "./worker"

export class Vacation {
    id             !:number
    year         ! : number
    startdate    ! : Date
    enddate      ! : Date
    worker       ! : Worker
    company      ! : Company
}