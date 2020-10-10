import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

export default function customerMoreInfoReducer(state=initialState.customerMoreInfo,action){
    switch (action.type) {
        case actionTypes.GET_CUSTOMER_MORE_INFO:
            return action.payload
        default:
            return state;
    }
}