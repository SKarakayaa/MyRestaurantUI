import initialState from "../initialState";
import * as actionTypes from '../../actions/actionTypes';

export default function materialReducer(state=initialState.materials,action){
    switch (action.type) {
        case actionTypes.GET_MATERIALS:
            return action.payload;
        default:
            return state;
    }
}