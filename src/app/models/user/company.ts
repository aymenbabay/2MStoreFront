import { Client } from "../admin/client"
import { Provider } from "../admin/provider"
import { SignUp } from "./signup"

export class Company{
      id                ! : number
      name              ! : string
      code              ! : string
      codecp              ! : string
      matfisc           ! :string
      address           ! :string
      phone            ! : string
      bankaccountnumber!:String
      email            !  : string
      indestrySector    ! :string
       capital          !  :string
       logo             ! :string
       workForce        ! : number
       margin           ! : number
       rate             ! : number
       raters           ! : number
       user             ! : SignUp
       provider         ! : Provider
       client           ! : Client
}
