import {combineReducers} from 'redux';
import productReducer from './productReducers/productReducer';
import customerInfoReducer from './customerReducers/customerInfoReducer';
import customerMoreInfoReducer from './customerReducers/customerMoreInfoReducer';

const rootReducer = combineReducers({
    productReducer,
    customerInfoReducer,
    customerMoreInfoReducer
})

export default rootReducer;