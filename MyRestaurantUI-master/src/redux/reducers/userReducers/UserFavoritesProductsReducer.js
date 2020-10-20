import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'


export default function UserFavoritesProductsReducer(state=initialState.userFavoritesProducts,action){
    switch (action.type) {
        case actionTypes.GET_USER_FAVORITES_PRODUCT:
            return action.payload
        default:
            return state;
    }
} 