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

export class Init{
    type : string = Provider.Init
   

    constructor(){
    }
}