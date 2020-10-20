import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

 

export default function UserOffersReducer(state=initialState.userOffers,action){
    switch (action.type) {
        case actionTypes.GET_USER_OFFERS:
            return action.payload
        default:
            return state;
    }
}
 