import { CustomAction } from "../store"
import { Provider } from "../constants"
import { createFeatureSelector, createSelector } from "@ngrx/store"

export interface state{
    providerId : number
    clientId     : number
    companyId  :number
}


let initstate ={
    providerId : 0,
    clientId : 0,
    companyId : 0
}


export function stateReducer(state: state = initstate, action: CustomAction):state{
    switch(action.type){
        case Provider.Provider:
        return{

            ...state,
            providerId : action.payload
        }
        case Provider.Client:
            return {
                ...state,
                clientId : action.payload
            }
        case Provider.Company:
            return{
                ...state,
                companyId : action.payload
            }
        case Provider.Init:
            return  initstate
            
        default:
            return state;
        };
}



let statefs = createFeatureSelector<state>('state');
export let providerIdSelector = createSelector(statefs, n => n.providerId);
export let clientIdSelector   = createSelector(statefs, n => n.clientId);
export let companyIdSelector   = createSelector(statefs, n => n.companyId);
