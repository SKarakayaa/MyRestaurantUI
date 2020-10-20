import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

 

export default function UserInfoReducer(state=initialState.userInfo,action){
    switch (action.type) {
        case actionTypes.GET_USER_INFO:
            return action.payload
        default:
            return state;
    }
} 