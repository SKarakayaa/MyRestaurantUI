import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'


export default function UserCardsReducer(state=initialState.userCards,action){
    switch (action.type) {
        case actionTypes.GET_USER_CARDS:
            return action.payload
        default:
            return state;
    }
}
 