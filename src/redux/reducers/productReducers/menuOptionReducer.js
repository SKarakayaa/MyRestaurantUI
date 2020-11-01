import * as actionTypes from '../../actions/actionTypes';

export default function menuOptionReducer(state=null,action){
    switch (action.type) {
        case actionTypes.GET_MENU_OPTIONS:
            return action.payload
        default:
            return state;
    }
}