import { Provider } from "../constants"

export class ProviderId{
    type : string = Provider.Provider
    payload : any

    constructor(payload: any){
        this.payload=payload
    }
}

export class ClientId{
    type : string = Provider.Client
    payload : any

    constructor(payload:any){
        this.payload = payload
    }
}

export class CompanyId{
    type : string = Provider.Company
    payload : any

    constructor(payload:any){
        this.payload = payload
    }
}

export class ParentId{
    type :string = Provider.Parent
    payload : any
    constructor(payload: any){
        this.payload = payload
    }
}
export class Init{
    type : string = Provider.Init
   

    constructor(){
    }
}