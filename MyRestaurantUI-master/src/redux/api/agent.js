import axios from "axios";

axios.defaults.baseURL =
  "http://app.code2.io/rest/276ce05d-837b-4aa1-8f6f-ff02597a0e01";

const responseBody = (response) => response.data;

// const sleep = (ms) => (response) =>
//   new Promise((resolve) => setTimeout(() => resolve(response), ms));

const resolve = (response) =>
  new Promise((resolve) =>  resolve(response));

const request = {
  get: (url) => axios.get(url).then(resolve).then(responseBody),
  post: (url, body) =>
    axios.post(url, body).then(resolve).then(responseBody),
  put: (url, body) => axios.put(url, body).then(resolve).then(responseBody),
  delete: (url) => axios.delete(url).then(resolve).then(responseBody),
};

const Products = {
  list: (customerid) =>
    request.get(`/Product/getProductsList?xcustomer_id=${customerid}`),
};

const Customers = {
  getCustomerInfo: (customerid) =>
    request.get(`/Customer/getCustomerInfo?xcustomer_id=${customerid}`),
  getCustomerMoreInfo: (customerid) =>
    request.get(`/Customer/getMoreInfo?xcustomer_id=${customerid}`),
};

const Users = {
  getUserAddress: (customerid,userid) =>
    request.get(`/Users/getUserAddress?xcustomer_id=${customerid}&xuser_id=${userid}`),
  getUserOffers: (customerid,userid) =>
    request.get(`/Users/getUserOffers?xcustomer_id=${customerid}&xuser_id=${userid}`),
  getUserCards: (customerid,userid) =>
    request.get(`/Users/getUserCards?xcustomer_id=${customerid}&xuser_id=${userid}`),
  getUserInfo: (customerid,userid) =>
    request.get(`/Users/getUserInfo?xcustomer_id=${customerid}&xuser_id=${userid}`),
  getUserFavoritesProducts: (customerid,userid) =>
    request.get(`/Users/getUserFavoritesProducts?xcustomer_id=${customerid}&xuser_id=${userid}`),
  getUserOrders: (customerid,userid) =>
    request.get(`/Users/getUserOrders?xcustomer_id=${customerid}&xuser_id=${userid}`),

};

export default {
  Products,
  Customers,
  Users,


};
