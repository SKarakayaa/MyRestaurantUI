import * as actionTypes from '../../actions/actionTypes'
import initialState from '../initialState'

export default function categoryReducer(state = initialState.categories, action) {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_CATEGORIES:
            return action.payload
        default:
            return state;
    }
}