import {combineReducers} from 'redux';
import productReducer from './productReducers/productReducer';
import customerInfoReducer from './customerReducers/customerInfoReducer';
import customerMoreInfoReducer from './customerReducers/customerMoreInfoReducer';
import currentUserReducer from './userRedocers/currentUserReducer';
import userRegisterReducer from './userRedocers/registerUserReducer';
import categoryReducer from './productReducers/categoryReducer';
import cartReducer from './cartReducers/cartReducer';
import productMenusReducer from './productReducers/productMenusReducer';

const rootReducer = combineReducers({
    productReducer,
    customerInfoReducer,
    customerMoreInfoReducer,
    currentUserReducer,
    userRegisterReducer,
    categoryReducer,
    cartReducer,
    productMenusReducer
})

export default rootReducer;