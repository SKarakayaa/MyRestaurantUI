import {combineReducers} from 'redux';
import productReducer from './productReducers/productReducer';
import customerInfoReducer from './customerReducers/customerInfoReducer';
import customerMoreInfoReducer from './customerReducers/customerMoreInfoReducer';
import currentUserReducer from './userRedocers/currentUserReducer'

const rootReducer = combineReducers({
    productReducer,
    customerInfoReducer,
    customerMoreInfoReducer,
    currentUserReducer
})

export default rootReducer;