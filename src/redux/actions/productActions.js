import agent from '../api/agent';
import * as actionTypes from './actionTypes';

export function getProductList(products){
    return {type:actionTypes.GET_PRODUCTS,payload:products.data}
}

export function getProducts(customerid){
    return function(dispatch){
        agent.Products.list(customerid).then(result => dispatch(getProductList(result)));
    }
}