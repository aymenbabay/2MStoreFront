import { CustomAction } from "../store"
import { Provider } from "../constants"
import { createFeatureSelector, createSelector } from "@ngrx/store"

export interface state{
    providerId : number
}

let initstate ={
    providerId : 0
}


export function funcstate(state: state = initstate, action: CustomAction):state{
    switch(action.type){
        case Provider.Provider:
        return{

            ...state,
            providerId : action.payload
        }
        default:
            return state;
        };
}



let statefs = createFeatureSelector<state>('state');
export let providerIdSelector = createSelector(statefs, n => n.providerId);