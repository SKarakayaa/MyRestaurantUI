import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

export default function UserAddressReducer(state=initialState.userAddress,action){
    switch (action.type) {
        case actionTypes.GET_USER_ADDRESS:
            return action.payload
        default:
            return state;
    }
}

 