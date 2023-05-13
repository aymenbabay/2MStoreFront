import { Worker } from "./worker"

export interface Vacation {
    usedday : number
    remainingday : number
    year : number
    startdate : Date
    enddate : Date
    worker : Worker
}