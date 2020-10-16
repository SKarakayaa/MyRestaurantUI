import {combineReducers} from 'redux';
import productReducer from './productReducers/productReducer';
import customerInfoReducer from './customerReducers/customerInfoReducer';
import customerMoreInfoReducer from './customerReducers/customerMoreInfoReducer';
import currentUserReducer from './userRedocers/currentUserReducer';
import userRegisterReducer from './userRedocers/registerUserReducer';

const rootReducer = combineReducers({
    productReducer,
    customerInfoReducer,
    customerMoreInfoReducer,
    currentUserReducer,
    userRegisterReducer
})

export default rootReducer;