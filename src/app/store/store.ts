
import { ActionReducerMap, Action } from '@ngrx/store';
import { stateReducer , state } from './reducer/state.reducer';


export interface StoreInterface {
    state : state;
}


export interface CustomAction extends Action {
    payload : any
}



export const reducers: ActionReducerMap<StoreInterface, CustomAction> = { state: stateReducer }