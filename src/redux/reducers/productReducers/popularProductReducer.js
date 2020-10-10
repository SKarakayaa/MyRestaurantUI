import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

export default function productReducer(state = initialState.mostPopularProducts, action) {
    switch (action.type) {
        case actionTypes.GET_MOST_POPULAR_PRODUCTS:
            return action.payload
        default:
            return state;
    }
}