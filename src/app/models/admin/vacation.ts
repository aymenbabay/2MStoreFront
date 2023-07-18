import { Company } from "../user/company"
import { Worker } from "./worker"

export class Vacation {
    usedday      ! : number
    remainingday !  : number
    year         ! : number
    startdate    ! : Date
    enddate      ! : Date
    worker       ! : Worker
    company      ! : Company
}