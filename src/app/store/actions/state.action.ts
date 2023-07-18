import { Provider } from "../constants"

export class ProviderId{
    type : string = Provider.Provider
    payload : any

    constructor(payload: any){
        this.payload=payload
    }
}