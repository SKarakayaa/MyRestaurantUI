import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

export default function customerInfoReducer(state=initialState.customerInfo,action){
    switch (action.type) {
        case actionTypes.GET_CUSTOMER_INFO:
            return action.payload
        default:
            return state;
    }
}