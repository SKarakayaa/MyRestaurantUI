import {combineReducers} from 'redux';
import productReducer from './productReducers/productReducer';
import customerInfoReducer from './customerReducers/customerInfoReducer';
import customerMoreInfoReducer from './customerReducers/customerMoreInfoReducer';
import userAddressReducer from './userReducers/UserAddressReducer';
import userCardsReducer from './userReducers/UserCardsReducer';
import userFavoritesProductsReducer from './userReducers/UserFavoritesProductsReducer';
import userInfoReducer from './userReducers/UserInfoReducer';
import userOffersReducer from './userReducers/UserOffersReducer';
import usersOrdersReducer from './userReducers/UserOrdersReducer';



 const rootReducer = combineReducers({
    productReducer,
    customerInfoReducer,
    customerMoreInfoReducer,
    userAddressReducer,
    userCardsReducer,
    userFavoritesProductsReducer,
    userInfoReducer,
    userOffersReducer,
    usersOrdersReducer,
})

export default rootReducer;