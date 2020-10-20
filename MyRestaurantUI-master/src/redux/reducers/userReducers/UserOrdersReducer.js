import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

 
export default function UserOrders(state=initialState.userOrders,action){
    switch (action.type) {
        case actionTypes.GET_USER_ORDERS:
            return action.payload
        default:
            return state;
    }
}
 